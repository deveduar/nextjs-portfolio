"use client"
import React from "react";
import Link from "next/link";
import { FaLinkedin, FaTwitter, FaGithub, FaChevronDown } from "react-icons/fa";
import { useSearchContext } from "./navbar";

interface HeroSectionProps {
  socialLinks: {
    linkedin: string;
    twitter: string;
    github: string;
  };
  onScrollToProjects?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ socialLinks, onScrollToProjects }) => {
  const { openContactModal } = useSearchContext();

  const scrollToNext = () => {
    onScrollToProjects?.();
  };

  return (
    <section className="flex flex-col justify-between px-4 py-8 min-h-screen">
      <div className="flex-1 flex flex-col justify-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="mb-4 text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
            Welcome! I&apos;m Eduardo.
          </h1>
          <p className="mb-6 text-lg leading-relaxed text-muted md:text-xl">
           This portfolio showcases a selection of projects focused on building efficient, scalable, and production-ready applications — from modern frontend interfaces to backend services and deployment workflows.

          </p>
          <p className="mb-8 text-lg text-muted">
            Enjoy exploring!
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button 
              onClick={openContactModal}
              className="flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
            >
              Let&apos;s Connect
            </button>
            <Link
              href="/projects"
              className="flex items-center justify-center rounded-lg border border-border/70 bg-surface px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface-alt"
            >
              View My Work
            </Link>
          </div>

          <div className="flex gap-3 justify-center sm:justify-start">
            <Link 
              href={socialLinks.linkedin}
              target="_blank" 
              className="flex items-center justify-center rounded-xl border border-border/70 bg-surface p-3 transition-colors hover:bg-surface-alt"
            >
              <FaLinkedin className="h-5 w-5 text-foreground" />
            </Link>
            <Link 
              href={socialLinks.twitter}
              target="_blank" 
              className="flex items-center justify-center rounded-xl border border-border/70 bg-surface p-3 transition-colors hover:bg-surface-alt"
            >
              <FaTwitter className="h-5 w-5 text-foreground" />
            </Link>
            <Link 
              href={socialLinks.github}
              target="_blank" 
              className="flex items-center justify-center rounded-xl border border-border/70 bg-surface p-3 transition-colors hover:bg-surface-alt"
            >
              <FaGithub className="h-5 w-5 text-foreground" />
            </Link>
          </div>
        </div>
      </div>

      <div className="flex justify-center pb-8">
        <button 
          onClick={scrollToNext}
          className="animate-bounce rounded-full border border-border/70 bg-surface p-3 shadow-theme transition-colors hover:bg-surface-alt"
        >
          <FaChevronDown className="h-5 w-5 text-muted" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
