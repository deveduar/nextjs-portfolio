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
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Projects</h2>
        <Link 
          href="/projects" 
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          See All
        </Link>
      </div>

      <div className="flex flex-col gap-6 overflow-y-auto snap-y snap-mandatory pb-20">
        {loading ? (
          <div className="space-y-6 snap-start">
            {Array(3).fill(null).map((_, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800 rounded-xl overflow-hidden animate-pulse">
                <div className="w-full h-48 md:h-64 bg-gray-200 dark:bg-gray-800" />
                <div className="p-4 md:p-6 space-y-4">
                  <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3" />
                  <div className="flex gap-2">
                    <div className="h-6 w-16 bg-gray-200 dark:bg-gray-800 rounded" />
                    <div className="h-6 w-16 bg-gray-200 dark:bg-gray-800 rounded" />
                    <div className="h-6 w-16 bg-gray-200 dark:bg-gray-800 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : recentProjects.length > 0 ? (
          recentProjects.map((project) => (
            <div key={project.id} className="snap-center min-h-[80vh] flex items-center">
              <div className="w-full">
                <HomeProjectCard project={project} />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8 snap-start">
            No projects to display
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href="/projects"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          View All Projects
          <FaArrowRight className="w-4 h-4" />
        </Link>
        <button 
          onClick={scrollToAbout}
          className="p-3 rounded-full bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all"
        >
          <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default HomeProjectsSection;