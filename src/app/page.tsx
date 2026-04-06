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

export default function Home() {
  const { readmes, loading } = useReadmes();

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
    aboutRef2,
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

      {!loading && recentProjects.map((project, index) => (
        <section
          key={project.id}
          ref={(el) => { projectRefs.current[index] = el; }}
          style={{ minHeight: `calc(100vh - ${SNAP_NAV_HEIGHT}px)` }}
          className="flex items-stretch px-4 py-4 md:px-8"
        >
          <div className="h-auto w-full">
            <HomeProjectCard project={project} />
          </div>
        </section>
      ))}

      <section
        ref={viewAllRef}
        className="flex h-[30vh] items-center justify-center"
      >
        <Link
          href="/projects"
          className="rounded-full bg-blue-600 px-8 py-4 text-lg font-medium text-white shadow-lg transition-colors hover:bg-blue-700"
        >
          View All Projects
        </Link>
      </section>

      <section ref={aboutRef} className="min-h-screen">
        <AboutTop />
      </section>

      <section ref={aboutRef2} className="min-h-screen">
        <AboutBottom />
      </section>

      <section ref={contactRef} className="min-h-screen">
        <ContactSection />
      </section>

      <section
        ref={backToTopRef}
        className="flex h-[30vh] items-center justify-center"
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 rounded-full bg-gray-200 px-8 py-4 text-lg font-medium text-gray-900 shadow-lg transition-colors hover:bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
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
