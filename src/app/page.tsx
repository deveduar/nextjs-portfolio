"use client";

import React, { useRef, useEffect, useCallback, useMemo } from "react";
import HeroSection from "@/components/HeroSection";
import HomeProjectCard from "@/components/HomeProjectCard";
import AboutSection from "@/components/AboutSection";
import { useReadmes } from "@/hooks/useReadmes";
import profile from "@/data/profile";
import Link from "next/link";

export default function Home() {
  const { readmes, loading } = useReadmes();
  const isScrolling = useRef(false);
  const activeSectionRef = useRef(0);
  const lastScrollTime = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

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
      return { top: heroRef.current.offsetTop - navHeight };
    } else if (index === totalSections - 1 && aboutRef.current) {
      return { top: aboutRef.current.offsetTop - navHeight };
    } else {
      const projectIndex = index - 1;
      const projectEl = projectRefs.current[projectIndex];
      if (projectEl) {
        return { top: projectEl.offsetTop - navHeight };
      }
    }
    return { top: 0 };
  }, [totalSections]);

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
    }, 400);
  }, [totalSections, getSectionPosition]);

  const scrollToProjects = useCallback(() => {
    snapToSection(1);
  }, [snapToSection]);

  const handleWheel = useCallback((e: WheelEvent) => {
    if (isScrolling.current) return;

    const now = Date.now();
    if (now - lastScrollTime.current < 350) return;
    lastScrollTime.current = now;

    const direction = e.deltaY > 0 ? 1 : -1;
    const currentSection = activeSectionRef.current;
    const nextSection = direction > 0 
      ? Math.min(currentSection + 1, totalSections - 1)
      : Math.max(currentSection - 1, 0);

    if (nextSection !== currentSection) {
      e.preventDefault();
      snapToSection(nextSection);
    }
  }, [totalSections, snapToSection]);

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [handleWheel]);

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