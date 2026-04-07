"use client"
import React from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import HomeProjectCard from "./HomeProjectCard";
import { useReadmes } from "@/hooks/useReadmes";

interface HomeProjectsSectionProps {
  aboutRef: React.RefObject<HTMLDivElement>;
}

const HomeProjectsSection: React.FC<HomeProjectsSectionProps> = ({ aboutRef }) => {
  const { readmes, loading, error } = useReadmes();

  const recentProjects = loading ? [] : [...readmes]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(-5)
    .reverse();

  if (error) {
    console.error('Error loading projects:', error);
  }

  const scrollToAbout = () => {
    if (aboutRef.current) {
      const navHeight = 56;
      const elementPosition = aboutRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="flex flex-col px-4 py-8 gap-8 min-h-screen">
      <div className="flex justify-between items-center shrink-0">
        <h2 className="text-xl font-bold text-[var(--color-foreground)]">Recent Projects</h2>
        <Link 
          href="/projects" 
          className="text-sm text-[var(--color-accent)] hover:underline"
        >
          See All
        </Link>
      </div>

      <div className="flex flex-col gap-6 overflow-y-auto snap-y snap-mandatory pb-20">
        {loading ? (
          <div className="space-y-6 snap-start">
            {Array(3).fill(null).map((_, index) => (
              <div key={index} className="bg-[var(--color-surface)] border border-[var(--color-border)]/50 rounded-xl overflow-hidden animate-pulse">
                <div className="w-full h-48 md:h-64 bg-[var(--color-surface-alt)]" />
                <div className="p-4 md:p-6 space-y-4">
                  <div className="h-6 bg-[var(--color-surface-alt)] rounded w-3/4" />
                  <div className="h-4 bg-[var(--color-surface-alt)] rounded w-full" />
                  <div className="h-4 bg-[var(--color-surface-alt)] rounded w-2/3" />
                  <div className="flex gap-2">
                    <div className="h-6 w-16 bg-[var(--color-surface-alt)] rounded" />
                    <div className="h-6 w-16 bg-[var(--color-surface-alt)] rounded" />
                    <div className="h-6 w-16 bg-[var(--color-surface-alt)] rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : recentProjects.length > 0 ? (
          recentProjects.map((project) => (
            <div key={project.id} className="snap-center min-h-[80vh] flex items-center">
              <div className="w-full">
                <HomeProjectCard project={project} isProjectSection={false} />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-[var(--color-muted-foreground)] py-8 snap-start">
            No projects to display
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href="/projects"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-accent)] text-[var(--color-accent-foreground)] text-sm font-medium hover:bg-[var(--color-accent-hover)] transition-colors"
        >
          View All Projects
          <FaArrowRight className="w-4 h-4" />
        </Link>
        <button 
          onClick={scrollToAbout}
          className="p-3 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)]/50 shadow-lg hover:shadow-xl transition-all"
        >
          <svg className="w-5 h-5 text-[var(--color-muted-foreground)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default HomeProjectsSection;