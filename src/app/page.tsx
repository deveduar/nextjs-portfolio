"use client";

import React, { useRef, useEffect, useCallback, useMemo, useState } from "react";
import HeroSection from "@/components/HeroSection";
import HomeProjectCard from "@/components/HomeProjectCard";
import AboutSection from "@/components/AboutSection";
import { useReadmes } from "@/hooks/useReadmes";
import profile from "@/data/profile";
import Link from "next/link";

const SCROLL_THRESHOLD = 150;
const SNAP_DURATION = 300;
const TOUCH_THRESHOLD = 2;

export default function Home() {
  const { readmes, loading } = useReadmes();
  const isScrolling = useRef(false);
  const activeSectionRef = useRef(0);
  const scrollAccumulator = useRef(0);
  const lastScrollTime = useRef(0);
  
  const touchStartY = useRef(0);
  const touchAccumulator = useRef(0);
  const touchCooldown = useRef(false);
  const touchStartSection = useRef(0);

  const heroRef = useRef<HTMLElement>(null);
  const viewAllRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const projectRefs = useRef<(HTMLElement | null)[]>([]);

  const recentProjects = useMemo(() => {
    if (loading) return [];
    return [...readmes]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(-5)
      .reverse();
  }, [readmes, loading]);

  const totalSections = recentProjects.length + 3;
  const viewAllSectionIndex = totalSections - 2;
  const aboutSectionIndex = totalSections - 1;

  const getSectionPosition = useCallback((index: number) => {
    const navHeight = 56;
    
    if (index === 0 && heroRef.current) {
      return { top: heroRef.current.offsetTop - navHeight, height: heroRef.current.offsetHeight };
    } else if (index === viewAllSectionIndex && viewAllRef.current) {
      return { top: viewAllRef.current.offsetTop - navHeight, height: viewAllRef.current.offsetHeight };
    } else if (index === aboutSectionIndex && aboutRef.current) {
      return { top: aboutRef.current.offsetTop - navHeight, height: aboutRef.current.offsetHeight };
    } else {
      const projectIndex = index - 1;
      const projectEl = projectRefs.current[projectIndex];
      if (projectEl) {
        return { top: projectEl.offsetTop - navHeight, height: projectEl.offsetHeight };
      }
    }
    return { top: 0, height: 0 };
  }, [viewAllSectionIndex, aboutSectionIndex]);

  const snapToSection = useCallback((index: number) => {
    if (index < 0 || index >= totalSections) return;
    if (isScrolling.current) return;

    const { top, height } = getSectionPosition(index);
    const viewportHeight = window.innerHeight;
    const navHeight = 56;
    const availableSpace = viewportHeight - navHeight;
    
    let scrollTop = top;
    
    if (height < availableSpace) {
      const offset = (availableSpace - height) / 2;
      scrollTop = top - offset;
    }
    
    isScrolling.current = true;
    activeSectionRef.current = index;
    scrollAccumulator.current = 0;
    lastScrollTime.current = Date.now();
    
    window.scrollTo({
      top: scrollTop,
      behavior: "smooth"
    });
    
    setTimeout(() => {
      isScrolling.current = false;
    }, SNAP_DURATION);
  }, [totalSections, getSectionPosition]);

  const scrollToProjects = useCallback(() => {
    snapToSection(1);
  }, [snapToSection]);

  const handleWheel = useCallback((e: WheelEvent) => {
    if (e.ctrlKey) {
      return;
    }
    
    const currentSection = activeSectionRef.current;
    
    if (currentSection === aboutSectionIndex && e.deltaY < 0) {
      if (!isScrolling.current && aboutRef.current) {
        const aboutTop = aboutRef.current.offsetTop - 56;
        const viewportTop = window.scrollY;
        const threshold = 200;
        
        if (viewportTop > aboutTop + threshold) {
          window.scrollTo({ top: aboutTop, behavior: "smooth" });
        } else {
          snapToSection(viewAllSectionIndex);
        }
      }
      return;
    }

    if (currentSection === aboutSectionIndex) {
      return;
    }

    if (currentSection === viewAllSectionIndex && e.deltaY < 0) {
      const lastProjectIndex = totalSections - 3;
      snapToSection(lastProjectIndex);
      return;
    }

    if (isScrolling.current) {
      e.preventDefault();
      return;
    }

    const now = Date.now();
    if (now - lastScrollTime.current < 150) {
      e.preventDefault();
      return;
    }

    scrollAccumulator.current += e.deltaY;
    e.preventDefault();

    if (Math.abs(scrollAccumulator.current) >= SCROLL_THRESHOLD) {
      const direction = scrollAccumulator.current > 0 ? 1 : -1;
      
      let nextSection;
      if (direction > 0) {
        nextSection = Math.min(currentSection + 1, totalSections - 1);
      } else {
        nextSection = Math.max(currentSection - 1, 0);
      }

      if (nextSection !== currentSection) {
        snapToSection(nextSection);
      } else {
        scrollAccumulator.current = 0;
      }
    }
  }, [totalSections, snapToSection, viewAllSectionIndex, aboutSectionIndex]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartSection.current = activeSectionRef.current;
    touchAccumulator.current = 0;
    touchCooldown.current = false;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (touchCooldown.current) return;
    
    const currentY = e.touches[0].clientY;
    const deltaY = touchStartY.current - currentY;
    touchAccumulator.current = deltaY;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (touchCooldown.current) {
      return;
    }
    
    const startSection = touchStartSection.current;
    const distance = touchAccumulator.current;
    
    if (startSection === aboutSectionIndex) {
      if (distance < 0 && Math.abs(distance) >= TOUCH_THRESHOLD) {
        if (aboutRef.current) {
          const aboutTop = aboutRef.current.offsetTop - 56;
          const viewportTop = window.scrollY;
          
          if (viewportTop > aboutTop + 150) {
            window.scrollTo({ top: aboutTop, behavior: "smooth" });
          } else {
            snapToSection(viewAllSectionIndex);
          }
        }
      }
      return;
    }

    if (startSection === viewAllSectionIndex && distance > 0 && Math.abs(distance) >= TOUCH_THRESHOLD) {
      snapToSection(aboutSectionIndex);
      return;
    }

    if (startSection === viewAllSectionIndex && distance < 0 && Math.abs(distance) >= TOUCH_THRESHOLD) {
      snapToSection(totalSections - 3);
      return;
    }

    if (Math.abs(distance) >= TOUCH_THRESHOLD) {
      const direction = distance > 0 ? 1 : -1;
      let nextSection;
      
      if (direction > 0) {
        nextSection = Math.min(startSection + 1, totalSections - 1);
      } else {
        nextSection = Math.max(startSection - 1, 0);
      }

      touchCooldown.current = true;
      snapToSection(nextSection);
      setTimeout(() => {
        touchCooldown.current = false;
      }, 300);
    }
  }, [totalSections, snapToSection, viewAllSectionIndex, aboutSectionIndex]);

  const updateActiveSection = useCallback(() => {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const viewportCenter = scrollY + viewportHeight / 2;
    const navHeight = 56;

    if (heroRef.current) {
      const top = heroRef.current.offsetTop - navHeight;
      const bottom = top + heroRef.current.clientHeight;
      if (viewportCenter >= top && viewportCenter <= bottom) {
        activeSectionRef.current = 0;
        return;
      }
    }

    projectRefs.current.forEach((el, i) => {
      if (el) {
        const top = el.offsetTop - navHeight;
        const bottom = top + el.clientHeight;
        if (viewportCenter >= top && viewportCenter <= bottom) {
          activeSectionRef.current = i + 1;
        }
      }
    });

    if (viewAllRef.current) {
      const top = viewAllRef.current.offsetTop - navHeight;
      const bottom = top + viewAllRef.current.clientHeight;
      if (viewportCenter >= top && viewportCenter <= bottom) {
        activeSectionRef.current = viewAllSectionIndex;
        return;
      }
    }

    if (aboutRef.current) {
      const top = aboutRef.current.offsetTop - navHeight;
      const bottom = top + aboutRef.current.clientHeight;
      if (viewportCenter >= top && viewportCenter <= bottom) {
        activeSectionRef.current = aboutSectionIndex;
      }
    }
  }, [viewAllSectionIndex, aboutSectionIndex]);

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleWheel, updateActiveSection, handleTouchStart, handleTouchMove, handleTouchEnd]);

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen">
        <HeroSection
          socialLinks={profile.socialLinks}
          onScrollToProjects={scrollToProjects}
        />
      </section>

      {/* Projects */}
      {!loading && recentProjects.map((project, index) => (
        <section 
          key={project.id}
          ref={el => { projectRefs.current[index] = el; }}
          style={{ minHeight: 'calc(100vh - 56px)' }}
          className="flex items-stretch px-4 md:px-8 py-4"
        >
          <div className="w-full h-auto">
            <HomeProjectCard project={project} />
          </div>
        </section>
      ))}

      {/* View All Projects Section */}
      <section 
        ref={viewAllRef}
        className="h-[30vh] flex items-center justify-center"
      >
        <Link 
          href="/projects" 
          className="px-8 py-4 bg-blue-600 text-white rounded-full font-medium text-lg hover:bg-blue-700 transition-colors shadow-lg"
        >
          View All Projects
        </Link>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="min-h-screen">
        <AboutSection onScrollToTop={scrollToProjects} />
      </section>
    </>
  );
}