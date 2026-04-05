"use client";

import React, { useRef, useEffect, useCallback, useMemo } from "react";
import HeroSection from "@/components/HeroSection";
import HomeProjectCard from "@/components/HomeProjectCard";
import AboutSection from "@/components/AboutSection";
import { useReadmes } from "@/hooks/useReadmes";
import profile from "@/data/profile";
import Link from "next/link";

const SNAP_DURATION = 400;
const SCROLL_CHECK_INTERVAL = 200;

export default function Home() {
  const { readmes, loading } = useReadmes();
  const isScrolling = useRef(false);
  const lastScrollTime = useRef(0);
  const scrollCheckTimer = useRef<NodeJS.Timeout | null>(null);
  const activeSectionRef = useRef(0);

  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const projectRefs = useRef<(HTMLElement | null)[]>([]);

  const recentProjects = useMemo(() => {
    if (loading) return [];
    return [...readmes]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(-5)
      .reverse();
  }, [readmes, loading]);

  const totalSections = recentProjects.length + 2;

  const getSectionPosition = useCallback((index: number) => {
    const navHeight = 56;
    
    if (index === 0 && heroRef.current) {
      return { top: heroRef.current.offsetTop - navHeight, height: heroRef.current.clientHeight };
    } else if (index === totalSections - 1 && aboutRef.current) {
      return { top: aboutRef.current.offsetTop - navHeight, height: aboutRef.current.clientHeight };
    } else {
      const projectIndex = index - 1;
      const projectEl = projectRefs.current[projectIndex];
      if (projectEl) {
        return { top: projectEl.offsetTop - navHeight, height: projectEl.clientHeight };
      }
    }
    return { top: 0, height: 0 };
  }, [totalSections]);

  const getNearestSection = useCallback(() => {
    const scrollTop = window.scrollY;
    const viewportHeight = window.innerHeight;
    const viewportCenter = scrollTop + (viewportHeight / 2);

    let nearestIndex = 0;
    let minDistance = Infinity;

    for (let i = 0; i < totalSections; i++) {
      const { top, height } = getSectionPosition(i);
      const sectionCenter = top + (height / 2);
      const distance = Math.abs(viewportCenter - sectionCenter);

      if (distance < minDistance) {
        minDistance = distance;
        nearestIndex = i;
      }
    }

    return nearestIndex;
  }, [totalSections, getSectionPosition]);

  const snapToSection = useCallback((index: number) => {
    if (index < 0 || index >= totalSections) return;
    if (isScrolling.current) return;

    const { top } = getSectionPosition(index);
    
    isScrolling.current = true;
    activeSectionRef.current = index;
    
    window.scrollTo({
      top,
      behavior: "smooth"
    });
    
    setTimeout(() => {
      isScrolling.current = false;
    }, SNAP_DURATION);
  }, [totalSections, getSectionPosition]);

  const scrollToProjects = useCallback(() => {
    snapToSection(1);
  }, [snapToSection]);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    lastScrollTime.current = Date.now();

    if (scrollCheckTimer.current) {
      clearTimeout(scrollCheckTimer.current);
    }

    scrollCheckTimer.current = setTimeout(() => {
      const timeSinceLastScroll = Date.now() - lastScrollTime.current;
      
      if (timeSinceLastScroll >= SCROLL_CHECK_INTERVAL && !isScrolling.current) {
        const nearestSection = getNearestSection();
        
        if (nearestSection !== activeSectionRef.current) {
          snapToSection(nearestSection);
        }
      }
    }, SCROLL_CHECK_INTERVAL + 50);
  }, [totalSections, getNearestSection, snapToSection]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollCheckTimer.current) {
        clearTimeout(scrollCheckTimer.current);
      }
    };
  }, [handleScroll]);

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen">
        <HeroSection
          socialLinks={profile.socialLinks}
          onScrollToProjects={scrollToProjects}
        />
      </section>

      {/* Projects Header */}
      <div className="py-8 px-4">
        <div className="flex justify-between items-center max-w-4xl mx-auto mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Projects</h2>
          <Link href="/projects" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
            See All
          </Link>
        </div>
      </div>

      {/* Projects */}
      {!loading && recentProjects.map((project, index) => (
        <section 
          key={project.id}
          ref={el => { projectRefs.current[index] = el; }}
          className="min-h-screen flex items-center py-8"
        >
          <div className="w-full max-w-4xl px-4">
            <HomeProjectCard project={project} />
          </div>
        </section>
      ))}

      {/* About Section */}
      <section ref={aboutRef} className="min-h-screen">
        <AboutSection onScrollToTop={scrollToProjects} />
      </section>
    </>
  );
}