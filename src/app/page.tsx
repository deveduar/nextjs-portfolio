"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import HomeProjectCard from "@/components/HomeProjectCard";
import AboutTop from "@/components/about-sections/AboutTop";
import AboutBottom from "@/components/about-sections/AboutBottom";
import ContactSection from "@/components/ContactSection";
import profile from "@/data/profile";
import { useReadmes } from "@/hooks/useReadmes";
import { useHomeSectionSnap } from "@/hooks/useHomeSectionSnap";
import { SNAP_NAV_HEIGHT } from "@/lib/sectionSnap";
import { useTheme } from "@/context/ThemeContext";
import { getProjectSectionGradient } from "@/lib/themes";

export default function Home() {
  const { readmes, loading } = useReadmes();
  const { palette } = useTheme();

  const recentProjects = useMemo(() => {
    if (loading) return [];

    return [...readmes]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(-5)
      .reverse();
  }, [readmes, loading]);

  const {
    heroRef,
    viewAllRef,
    aboutRef,
    contactRef,
    backToTopRef,
    projectRefs,
    scrollToProjects,
  } = useHomeSectionSnap({ projectCount: recentProjects.length });

  return (
    <>
      <section ref={heroRef} className="min-h-screen">
        <HeroSection
          socialLinks={profile.socialLinks}
          onScrollToProjects={scrollToProjects}
        />
      </section>

      {!loading && recentProjects.map((project, index) => {
        const gradient = getProjectSectionGradient(palette, index);
        
        return (
          <section
            key={project.id}
            ref={(el) => { projectRefs.current[index] = el; }}
            className="relative flex items-center justify-center overflow-hidden p-4 pb-14 sm:p-6 md:p-8 md:pb-0"
            style={{
              height: `calc(100vh - ${SNAP_NAV_HEIGHT}px)`,
              backgroundImage: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
            }}
          >
            <div className="w-full h-full max-w-6xl">
              <HomeProjectCard project={project} />
            </div>
          </section>
        );
      })}

      {!loading && recentProjects.map((project, index) => {
        if (index !== recentProjects.length - 1) return null;
        
        return (
          <section
            ref={viewAllRef}
            key="view-all"
            className="flex h-[30vh] items-center justify-center"
          >
            <Link
              href="/projects"
              className="rounded-full bg-accent px-8 py-4 text-lg font-medium text-accent-foreground shadow-theme transition-colors hover:bg-accent-hover"
            >
              View All Projects
            </Link>
          </section>
        );
      })}

      <section
        ref={aboutRef}
        className="min-h-screen flex flex-col"
        style={{
          backgroundImage: `linear-gradient(180deg, rgb(var(--color-background)) 0%, rgb(var(--color-surfaceMuted) / 0.7) 100%)`,
        }}
      >
        <AboutTop />
        <AboutBottom />
      </section>

      <section ref={contactRef} className="min-h-screen">
        <ContactSection />
      </section>

      <section
        ref={backToTopRef}
        className="flex h-[30vh] items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(180deg, rgb(var(--color-surfaceMuted) / 0.7) 0%, rgb(var(--color-background)) 100%)`,
        }}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 rounded-full border border-border/70 bg-surface px-8 py-4 text-lg font-medium text-foreground shadow-theme transition-colors hover:bg-surface-alt"
        >
          <span>Back to Top</span>
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </section>
    </>
  );
}
