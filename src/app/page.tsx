"use client";

import React, { useRef, useEffect, useCallback, useMemo } from "react";
import HeroSection from "@/components/HeroSection";
import HomeProjectCard from "@/components/HomeProjectCard";
import { useReadmes } from "@/hooks/useReadmes";
import profile from "@/data/profile";
import Link from "next/link";
import AboutTop from "@/components/about-sections/AboutTop";
import AboutBottom from "@/components/about-sections/AboutBottom";
import ContactSection from "@/components/ContactSection";

const SCROLL_THRESHOLD = 150;
const SNAP_DURATION = 300;
const TOUCH_THRESHOLD_SMALL = 2;
const TOUCH_THRESHOLD_LARGE = 200;

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
  const aboutRef2 = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const backToTopRef = useRef<HTMLElement>(null);
  const projectRefs = useRef<(HTMLElement | null)[]>([]);

  const recentProjects = useMemo(() => {
    if (loading) return [];
    return [...readmes]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(-5)
      .reverse();
  }, [readmes, loading]);

  const totalSections = recentProjects.length + 6;
  const viewAllSectionIndex = totalSections - 5;
  const aboutSectionIndex = totalSections - 4;
  const aboutSectionIndex2 = totalSections - 3;
  const contactSectionIndex = totalSections - 2;
  const backToTopSectionIndex = totalSections - 1;

  const getSectionPosition = useCallback((index: number) => {
    const navHeight = 56;
    
    if (index === 0 && heroRef.current) {
      return { top: heroRef.current.offsetTop - navHeight, height: heroRef.current.offsetHeight };
    } else if (index === viewAllSectionIndex && viewAllRef.current) {
      return { top: viewAllRef.current.offsetTop - navHeight, height: viewAllRef.current.offsetHeight };
    } else if (index === aboutSectionIndex && aboutRef.current) {
      return { top: aboutRef.current.offsetTop - navHeight, height: aboutRef.current.offsetHeight };
    } else if (index === aboutSectionIndex2 && aboutRef2.current) {
      return { top: aboutRef2.current.offsetTop - navHeight, height: aboutRef2.current.offsetHeight };
    } else if (index === contactSectionIndex && contactRef.current) {
      return { top: contactRef.current.offsetTop - navHeight, height: contactRef.current.offsetHeight };
    } else if (index === backToTopSectionIndex && backToTopRef.current) {
      return { top: backToTopRef.current.offsetTop - navHeight, height: backToTopRef.current.offsetHeight };
    } else {
      const projectIndex = index - 1;
      const projectEl = projectRefs.current[projectIndex];
      if (projectEl) {
        return { top: projectEl.offsetTop - navHeight, height: projectEl.offsetHeight };
      }
    }
    return { top: 0, height: 0 };
  }, [viewAllSectionIndex, aboutSectionIndex, aboutSectionIndex2, contactSectionIndex, backToTopSectionIndex]);

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
    
    if (currentSection === backToTopSectionIndex && e.deltaY < 0) {
      snapToSection(contactSectionIndex);
      return;
    }
    
    if (currentSection === backToTopSectionIndex && e.deltaY > 0) {
      return;
    }
    
    if (currentSection === contactSectionIndex && e.deltaY < 0) {
      snapToSection(aboutSectionIndex);
      return;
    }
    
    if (currentSection === contactSectionIndex && e.deltaY > 0) {
      snapToSection(backToTopSectionIndex);
      return;
    }

    if (currentSection === aboutSectionIndex && e.deltaY > 0) {
      if (!isScrolling.current && aboutRef.current) {
        const aboutTop = aboutRef.current.offsetTop - 56;
        const aboutHeight = aboutRef.current.offsetHeight;
        const viewportTop = window.scrollY;
        const viewportHeight = window.innerHeight;
        const threshold = 100;
        
        if (viewportTop + viewportHeight >= aboutTop + aboutHeight - threshold) {
          snapToSection(aboutSectionIndex2);
        }
      }
      return;
    }
    
    if (currentSection === aboutSectionIndex && e.deltaY < 0) {
      if (!isScrolling.current && aboutRef.current) {
        const aboutTop = aboutRef.current.offsetTop - 56;
        const aboutHeight = aboutRef.current.offsetHeight;
        const viewportTop = window.scrollY;
        const viewportHeight = window.innerHeight;
        const threshold = 100;
        
        if (viewportTop <= aboutTop + threshold) {
          // AT TOP - allow free scroll (do nothing)
          return;
        } else if (viewportTop + viewportHeight >= aboutTop + aboutHeight - threshold) {
          // AT BOTTOM - go to AboutBottom
          snapToSection(aboutSectionIndex2);
        } else {
          // MIDDLE - allow free scroll (do nothing)
          return;
        }
      }
      return;
    }
    
    if (currentSection === aboutSectionIndex2 && e.deltaY > 0) {
      if (!isScrolling.current && aboutRef2.current) {
        const aboutTop = aboutRef2.current.offsetTop - 56;
        const aboutHeight = aboutRef2.current.offsetHeight;
        const viewportTop = window.scrollY;
        const viewportHeight = window.innerHeight;
        const threshold = 100;
        
        if (viewportTop <= aboutTop + threshold) {
          // AT TOP - allow free scroll (do nothing)
          return;
        } else if (viewportTop + viewportHeight >= aboutTop + aboutHeight - threshold) {
          // AT BOTTOM - go to Contact
          snapToSection(contactSectionIndex);
        }
      }
      return;
    }
    
    if (currentSection === aboutSectionIndex2 && e.deltaY < 0) {
      if (!isScrolling.current && aboutRef2.current) {
        const aboutTop = aboutRef2.current.offsetTop - 56;
        const aboutHeight = aboutRef2.current.offsetHeight;
        const viewportTop = window.scrollY;
        const viewportHeight = window.innerHeight;
        const threshold = 100;
        
        if (viewportTop <= aboutTop + threshold) {
          // AT TOP - go to AboutTop
          snapToSection(aboutSectionIndex);
        } else if (viewportTop + viewportHeight >= aboutTop + aboutHeight - threshold) {
          // AT BOTTOM - allow free scroll (do nothing)
          return;
        } else {
          // MIDDLE - go to Contact
          window.scrollTo({ top: aboutTop + aboutHeight, behavior: "smooth" });
        }
      }
      return;
    }
    
    if (currentSection === aboutSectionIndex2 && e.deltaY < 0) {
      if (!isScrolling.current && aboutRef2.current) {
        const aboutTop = aboutRef2.current.offsetTop - 56;
        const aboutHeight = aboutRef2.current.offsetHeight;
        const viewportTop = window.scrollY;
        const viewportHeight = window.innerHeight;
        const threshold = 100;
        
        if (viewportTop <= aboutTop + threshold) {
          // AT TOP - go to AboutTop
          snapToSection(aboutSectionIndex);
        } else if (viewportTop + viewportHeight >= aboutTop + aboutHeight - threshold) {
          // AT BOTTOM - allow free scroll (do nothing)
          return;
        } else {
          // MIDDLE - go to Contact
          window.scrollTo({ top: aboutTop + aboutHeight, behavior: "smooth" });
        }
      }
      return;
    }

    if (currentSection === viewAllSectionIndex && e.deltaY < 0) {
      const lastProjectIndex = totalSections - 6;
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
  }, [totalSections, snapToSection, viewAllSectionIndex, aboutSectionIndex, aboutSectionIndex2, contactSectionIndex, backToTopSectionIndex]);

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
    
    if (startSection === backToTopSectionIndex && distance < 0 && Math.abs(distance) >= TOUCH_THRESHOLD_SMALL) {
      snapToSection(contactSectionIndex);
      return;
    }

    if (startSection === contactSectionIndex && distance > 0 && Math.abs(distance) >= TOUCH_THRESHOLD_SMALL) {
      if (contactRef.current) {
        const contactTop = contactRef.current.offsetTop - 56;
        const contactHeight = contactRef.current.offsetHeight;
        const viewportTop = window.scrollY;
        const viewportHeight = window.innerHeight;
        
        if (viewportTop + viewportHeight >= contactTop + contactHeight - 150) {
          snapToSection(backToTopSectionIndex);
        } else {
          snapToSection(aboutSectionIndex2);
        }
      }
      return;
    }

    if (startSection === contactSectionIndex && distance < 0 && Math.abs(distance) >= TOUCH_THRESHOLD_SMALL) {
      snapToSection(aboutSectionIndex2);
      return;
    }

    if (startSection === aboutSectionIndex2 && distance > 0 && Math.abs(distance) >= TOUCH_THRESHOLD_LARGE) {
      if (aboutRef2.current) {
        const aboutTop = aboutRef2.current.offsetTop - 56;
        const aboutHeight = aboutRef2.current.offsetHeight;
        const viewportTop = window.scrollY;
        const viewportHeight = window.innerHeight;
        const threshold = 100;
        
        if (viewportTop <= aboutTop + threshold) {
          // AT TOP - allow free scroll (do nothing)
          return;
        } else if (viewportTop + viewportHeight >= aboutTop + aboutHeight - threshold) {
          // AT BOTTOM - go to Contact
          snapToSection(contactSectionIndex);
        }
      }
      return;
    }

    if (startSection === aboutSectionIndex2 && distance < 0 && Math.abs(distance) >= TOUCH_THRESHOLD_LARGE) {
      if (aboutRef2.current) {
        const aboutTop = aboutRef2.current.offsetTop - 56;
        const aboutHeight = aboutRef2.current.offsetHeight;
        const viewportTop = window.scrollY;
        const viewportHeight = window.innerHeight;
        const threshold = 100;
        
        if (viewportTop <= aboutTop + threshold) {
          // AT TOP - go to AboutTop
          snapToSection(aboutSectionIndex);
        } else if (viewportTop + viewportHeight >= aboutTop + aboutHeight - threshold) {
          // AT BOTTOM - allow free scroll (do nothing)
          return;
        } else {
          // MIDDLE - go to Contact
          window.scrollTo({ top: aboutTop + aboutHeight, behavior: "smooth" });
        }
      }
      return;
    }

    if (startSection === aboutSectionIndex && distance < 0 && Math.abs(distance) >= TOUCH_THRESHOLD_LARGE) {
      if (aboutRef.current) {
        const aboutTop = aboutRef.current.offsetTop - 56;
        const aboutHeight = aboutRef.current.offsetHeight;
        const viewportTop = window.scrollY;
        const viewportHeight = window.innerHeight;
        const threshold = 100;
        
        if (viewportTop <= aboutTop + threshold) {
          // AT TOP - go to ViewAll
          snapToSection(viewAllSectionIndex);
        } else if (viewportTop + viewportHeight >= aboutTop + aboutHeight - threshold) {
          // AT BOTTOM - allow free scroll (do nothing)
          return;
        } else {
          // MIDDLE - go to AboutBottom
          snapToSection(aboutSectionIndex2);
        }
      }
      return;
    }

    if (startSection === aboutSectionIndex && distance > 0 && Math.abs(distance) >= TOUCH_THRESHOLD_LARGE) {
      if (aboutRef.current) {
        const aboutTop = aboutRef.current.offsetTop - 56;
        const aboutHeight = aboutRef.current.offsetHeight;
        const viewportTop = window.scrollY;
        const viewportHeight = window.innerHeight;
        const threshold = 100;
        
        if (viewportTop <= aboutTop + threshold) {
          // AT TOP - allow free scroll (do nothing)
          return;
        } else if (viewportTop + viewportHeight >= aboutTop + aboutHeight - threshold) {
          // AT BOTTOM - go to AboutBottom
          snapToSection(aboutSectionIndex2);
        }
      }
      return;
    }

    if (startSection === aboutSectionIndex && distance < 0 && Math.abs(distance) >= TOUCH_THRESHOLD_LARGE) {
      if (aboutRef.current) {
        const aboutTop = aboutRef.current.offsetTop - 56;
        const viewportTop = window.scrollY;
        
        // Solo ir a ViewAll si estamos en la parte superior (haciendo swipe up desde el top)
        if (viewportTop <= aboutTop + 100) {
          snapToSection(viewAllSectionIndex);
        }
        // En cualquier otra posición, permitir scroll libre (no hacer nada)
      }
      return;
    }

    if (startSection === aboutSectionIndex && distance > 0 && Math.abs(distance) >= TOUCH_THRESHOLD_LARGE) {
      if (aboutRef.current) {
        const aboutTop = aboutRef.current.offsetTop - 56;
        const aboutHeight = aboutRef.current.offsetHeight;
        const viewportTop = window.scrollY;
        const viewportHeight = window.innerHeight;
        const threshold = 100;
        
        if (viewportTop <= aboutTop + threshold) {
          // AT TOP - allow free scroll (do nothing)
          return;
        } else if (viewportTop + viewportHeight >= aboutTop + aboutHeight - threshold) {
          // AT BOTTOM - go to AboutBottom
          snapToSection(aboutSectionIndex2);
        }
      }
      return;
    }

    if (startSection === viewAllSectionIndex && distance > 0 && Math.abs(distance) >= TOUCH_THRESHOLD_SMALL) {
      snapToSection(aboutSectionIndex);
      return;
    }

    if (startSection === viewAllSectionIndex && distance < 0 && Math.abs(distance) >= TOUCH_THRESHOLD_SMALL) {
      snapToSection(totalSections - 7);
      return;
    }

    if (Math.abs(distance) >= TOUCH_THRESHOLD_SMALL) {
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
  }, [totalSections, snapToSection, viewAllSectionIndex, aboutSectionIndex, aboutSectionIndex2, contactSectionIndex, backToTopSectionIndex]);

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
        return;
      }
    }

    if (aboutRef2.current) {
      const top = aboutRef2.current.offsetTop - navHeight;
      const bottom = top + aboutRef2.current.clientHeight;
      if (viewportCenter >= top && viewportCenter <= bottom) {
        activeSectionRef.current = aboutSectionIndex2;
        return;
      }
    }

    if (contactRef.current) {
      const top = contactRef.current.offsetTop - navHeight;
      const bottom = top + contactRef.current.clientHeight;
      if (viewportCenter >= top && viewportCenter <= bottom) {
        activeSectionRef.current = contactSectionIndex;
        return;
      }
    }

    if (backToTopRef.current) {
      const top = backToTopRef.current.offsetTop - navHeight;
      const bottom = top + backToTopRef.current.clientHeight;
      if (viewportCenter >= top && viewportCenter <= bottom) {
        activeSectionRef.current = backToTopSectionIndex;
      }
    }
  }, [viewAllSectionIndex, aboutSectionIndex, aboutSectionIndex2, contactSectionIndex, backToTopSectionIndex]);

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

      {/* About Section - Part 1 */}
      <section ref={aboutRef} className="min-h-screen">
        <AboutTop />
      </section>

      {/* About Section - Part 2 */}
      <section ref={aboutRef2} className="min-h-screen">
        <AboutBottom />
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="min-h-screen">
        <ContactSection />
      </section>

      {/* Back to Top Section */}
      <section 
        ref={backToTopRef}
        className="h-[30vh] flex items-center justify-center"
      >
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="px-8 py-4 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white rounded-full font-medium text-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors shadow-lg flex items-center gap-2"
        >
          <span>Back to Top</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </section>
    </>
  );
}