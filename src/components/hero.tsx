"use client"
import React from "react";
import Link from "next/link";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import RecentProjectItem from '@/components/recentProjectItem';
import { useReadmes } from '@/hooks/useReadmes';
import ProfileInfo from "./profileInfo";
import TechMarquee from "./techMarquee";
import { useSearchContext } from "./navbar";
import profile from "@/data/profile";
import Typewriter from 'typewriter-effect';
import Image from "next/image";

interface HeroProps {
  name: string;
  specialty: string;
  description: string[];
  socialLinks: {
    linkedin: string;
    twitter: string;
    github: string;
  };
}

const Hero: React.FC<HeroProps> = ({ name, specialty, description, socialLinks }) => {
  const { readmes, loading, error } = useReadmes();
  const { openContactModal } = useSearchContext();

  const recentProjects = loading ? [] : [...readmes]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(-4)
    .reverse();

  if (error) {
    console.error('Error loading projects:', error);
  }

  return (
    <div className="flex flex-col gap-4">
      <TechMarquee />
      
      {/* Welcome Text */}
      <div className="text-lg text-[var(--color-muted-foreground)]">
        <p className="leading-relaxed">
          Welcome to my portfolio.

          Here you&apos;ll find a selection of projects focused on performance, scalability, and real-world reliability — from modern frontend applications to backend services and automated deployments.

          Enjoy exploring!
        </p>
      </div>

      {/* Buttons and Social Icons */}
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <div className="flex gap-2 flex-1 w-full sm:w-auto">
          <button 
            onClick={openContactModal}
            className="flex-1 sm:flex-none bg-[var(--color-accent)]/20 rounded-lg px-6 py-3 flex items-center justify-center font-medium hover:opacity-80 transition-opacity text-[var(--color-foreground)] text-sm"
          >
            Let&apos;s Connect
          </button>
          <Link
            href="/projects"
            className="flex-1 sm:flex-none bg-[var(--color-surface)] border border-[var(--color-border)]/50 rounded-lg px-6 py-3 flex items-center justify-center font-medium hover:bg-[var(--color-surface-alt)] transition-colors text-[var(--color-foreground)] text-sm"
          >
            View My Work
          </Link>
        </div>
        <div className="flex gap-2">
          <Link 
            href={socialLinks.linkedin}
            target="_blank" 
            className="bg-[var(--color-surface)] border border-[var(--color-border)]/50 rounded-xl p-3 flex items-center justify-center hover:bg-[var(--color-surface-alt)] transition-colors"
          >
            <FaLinkedin className="w-5 h-5 text-[var(--color-foreground)]" />
          </Link>
          <Link 
            href={socialLinks.twitter}
            target="_blank" 
            className="bg-[var(--color-surface)] border border-[var(--color-border)]/50 rounded-xl p-3 flex items-center justify-center hover:bg-[var(--color-surface-alt)] transition-colors"
          >
            <FaTwitter className="w-5 h-5 text-[var(--color-foreground)]" />
          </Link>
          <Link 
            href={socialLinks.github}
            target="_blank" 
            className="bg-[var(--color-surface)] border border-[var(--color-border)]/50 rounded-xl p-3 flex items-center justify-center hover:bg-[var(--color-surface-alt)] transition-colors"
          >
            <FaGithub className="w-5 h-5 text-[var(--color-foreground)]" />
          </Link>
        </div>
      </div>

      {/* Bottom Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        {/* About Me with ProfileInfo */}
        <div className="rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]/50 overflow-hidden">
          <div className="p-4 border-b border-[var(--color-border)]/50">
            <div className="flex items-center gap-3">
              <Image
                src="/images/profile.webp"
                width={48}
                height={48}
                alt="Profile"
                className="rounded-full"
              />
              <div>
                <h2 className="text-base font-bold text-[var(--color-foreground)]">{profile.name}</h2>
                <p className="text-xs text-[var(--color-accent)]">
                  <Typewriter
                    options={{ autoStart: true, loop: true }}
                    onInit={(typewriter) => {
                      typewriter
                        .typeString("Full Stack Developer")
                        .pauseFor(2000)
                        .deleteAll()
                        .pauseFor(500)
                        .typeString("System Administrator")
                        .pauseFor(2000)
                        .deleteAll()
                        .start();
                    }}
                  />
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar">
                        <div>
              <div className="space-y-1">
                {profile.description.map((paragraph, i) => (
                  <p key={i} className="text-xs leading-5 text-[var(--color-muted-foreground)]">{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[var(--color-muted-foreground)]">📍 Spain</span>
              <span className="text-[var(--color-muted-foreground)]">•</span>
              <span className="text-[var(--color-accent)] font-medium">Available for projects</span>
            </div>

            <div className="flex gap-1.5">
              <Link href={profile.socialLinks.linkedin} target="_blank" className="p-1.5 bg-[var(--color-surface-alt)] rounded-lg hover:bg-[var(--color-surface)]">
                <FaLinkedin className="w-3.5 h-3.5" />
              </Link>
              <Link href={profile.socialLinks.twitter} target="_blank" className="p-1.5 bg-[var(--color-surface-alt)] rounded-lg hover:bg-[var(--color-surface)]">
                <FaTwitter className="w-3.5 h-3.5" />
              </Link>
              <Link href={profile.socialLinks.github} target="_blank" className="p-1.5 bg-[var(--color-surface-alt)] rounded-lg hover:bg-[var(--color-surface)]">
                <FaGithub className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-[var(--color-foreground)] mb-1">Experience</h4>
              <div className="space-y-1">
                {profile.workExperience.map((exp, i) => (
                  <div key={i} className="border-l-2 border-[var(--color-accent)] pl-1.5">
                    <p className="text-xs font-medium text-[var(--color-foreground)]">{exp.title}</p>
                    <p className="text-[10px] text-[var(--color-muted-foreground)]">{exp.company} • {exp.period}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-[var(--color-foreground)] mb-1">Education</h4>
              <div className="space-y-1">
                {profile.education.map((edu, i) => (
                  <div key={i} className="border-l-2 border-[var(--color-accent-alt)] pl-1.5">
                    <p className="text-xs font-medium text-[var(--color-foreground)]">{edu.title}</p>
                    <p className="text-[10px] text-[var(--color-muted-foreground)]">{edu.institution} • {edu.year}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-[var(--color-foreground)] mb-1">Skills</h4>
              <div className="flex flex-wrap gap-1">
                {profile.skills.programmingLanguages.map((s, i) => (
                  <span key={i} className="px-1.5 py-0.5 text-[10px] bg-[var(--color-accent)]/20 text-[var(--color-accent)] rounded">{s}</span>
                ))}
                {profile.skills.frontend.frameworks.map((s, i) => (
                  <span key={i} className="px-1.5 py-0.5 text-[10px] bg-[var(--color-accent)]/20 text-[var(--color-accent)] rounded">{s}</span>
                ))}
                {profile.skills.frontend.styles.map((s, i) => (
                  <span key={i} className="px-1.5 py-0.5 text-[10px] bg-[var(--color-accent)]/20 text-[var(--color-accent)] rounded">{s}</span>
                ))}
                {profile.skills.backend.frameworks.map((s, i) => (
                  <span key={i} className="px-1.5 py-0.5 text-[10px] bg-[var(--color-accent)]/20 text-[var(--color-accent)] rounded">{s}</span>
                ))}
                {profile.skills.backend.databases.map((s, i) => (
                  <span key={i} className="px-1.5 py-0.5 text-[10px] bg-[var(--color-accent)]/20 text-[var(--color-accent)] rounded">{s}</span>
                ))}
                {profile.skills.devOps.map((s, i) => (
                  <span key={i} className="px-1.5 py-0.5 text-[10px] bg-[var(--color-accent)]/20 text-[var(--color-accent)] rounded">{s}</span>
                ))}
              </div>
            </div>


          </div>
        </div>

        {/* Recent Projects */}
        <div className="rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]/50 overflow-hidden">
          <div className="p-3 border-b border-[var(--color-border)]/50 flex justify-between items-center">
            <h3 className="text-sm font-semibold text-[var(--color-foreground)]">Recent Projects</h3>
            <Link href="/projects" className="text-xs text-[var(--color-accent)] hover:underline">
              See More
            </Link>
          </div>
          <div className="p-2 space-y-2 max-h-[350px] overflow-y-auto custom-scrollbar">
            {recentProjects.length > 0 ? (
              recentProjects.map((project) => (
                <RecentProjectItem key={project.id} project={project} />
              ))
            ) : (
              <div className="text-center text-[var(--color-muted-foreground)] text-sm py-4">
                No projects to display
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
