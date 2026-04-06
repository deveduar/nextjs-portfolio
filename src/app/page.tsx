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
        const gradientClasses = [
          "from-blue-100 to-indigo-100 dark:from-blue-950 dark:to-indigo-950",
          "from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950",
          "from-emerald-100 to-teal-100 dark:from-emerald-950 dark:to-teal-950",
          "from-cyan-100 to-sky-100 dark:from-cyan-950 dark:to-sky-950",
          "from-sky-100 to-indigo-100 dark:from-sky-950 dark:to-indigo-950",
        ];
        const gradientIndex = index % gradientClasses.length;
        const gradient = gradientClasses[gradientIndex];
        
        return (
          <section
            key={project.id}
            ref={(el) => { projectRefs.current[index] = el; }}
            style={{ height: `calc(100vh - ${SNAP_NAV_HEIGHT}px)` }}
            className={`relative flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden pb-14 md:pb-0 bg-gradient-to-br ${gradient}`}
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
              className="rounded-full bg-blue-600 px-8 py-4 text-lg font-medium text-white shadow-lg transition-colors hover:bg-blue-700"
            >
              View All Projects
            </Link>
          </section>
        );
      })}

      <section ref={aboutRef} className="min-h-screen flex flex-col bg-violet-100 dark:bg-violet-950/40">
        <AboutTop />
        <AboutBottom />
      </section>

      <section ref={contactRef} className="min-h-screen">
        <ContactSection />
      </section>

      <section
        ref={backToTopRef}
        className="flex h-[30vh] items-center justify-center bg-violet-100 dark:bg-violet-950/40"
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
