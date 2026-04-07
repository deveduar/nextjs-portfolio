"use client"
import React from "react";
import Link from "next/link";
import { FaLinkedin, FaTwitter, FaGithub, FaChevronUp } from "react-icons/fa";
import RecentProjectItem from '@/components/recentProjectItem';
import { useReadmes } from '@/hooks/useReadmes';
import profile from "@/data/profile";
import Typewriter from 'typewriter-effect';
import Image from "next/image";

interface AboutProjectsSectionProps {
  firstSectionRef: React.RefObject<HTMLDivElement>;
}

const AboutProjectsSection: React.FC<AboutProjectsSectionProps> = ({ firstSectionRef }) => {
  const { readmes, loading, error } = useReadmes();

  const recentProjects = loading ? [] : [...readmes]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(-5)
    .reverse();

  if (error) {
    console.error('Error loading projects:', error);
  }

  const scrollToTop = () => {
    firstSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex flex-col px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-[var(--color-foreground)]">About & Projects</h2>
        <button 
          onClick={scrollToTop}
          className="p-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)]/50 shadow hover:shadow-md transition-all"
        >
          <FaChevronUp className="w-4 h-4 text-[var(--color-muted-foreground)]" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
        {/* About Me */}
        <div className="rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]/50 overflow-hidden flex flex-col max-h-[70vh]">
          <div className="p-4 border-b border-[var(--color-border)]/50 shrink-0">
            <div className="flex items-center gap-3">
              <Image
                src="/images/profile.webp"
                width={56}
                height={56}
                alt="Profile"
                className="rounded-full"
              />
              <div>
                <h2 className="text-lg font-bold text-[var(--color-foreground)]">{profile.name}</h2>
                <p className="text-sm text-[var(--color-accent)]">
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

          <div className="p-4 space-y-4 overflow-y-auto custom-scrollbar">
                        <div>
              <div className="space-y-2">
                {profile.description.map((paragraph, i) => (
                  <p key={i} className="text-sm leading-6 text-[var(--color-muted-foreground)]">{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-[var(--color-muted-foreground)]">📍 Spain</span>
              <span className="text-[var(--color-muted-foreground)]">•</span>
              <span className="text-[var(--color-accent)] font-medium">Available for projects</span>
            </div>

            <div className="flex gap-2">
              <Link href={profile.socialLinks.linkedin} target="_blank" className="p-2 bg-[var(--color-surface-alt)] rounded-lg hover:bg-[var(--color-surface)]">
                <FaLinkedin className="w-4 h-4 text-[var(--color-muted-foreground)]" />
              </Link>
              <Link href={profile.socialLinks.twitter} target="_blank" className="p-2 bg-[var(--color-surface-alt)] rounded-lg hover:bg-[var(--color-surface)]">
                <FaTwitter className="w-4 h-4 text-[var(--color-muted-foreground)]" />
              </Link>
              <Link href={profile.socialLinks.github} target="_blank" className="p-2 bg-[var(--color-surface-alt)] rounded-lg hover:bg-[var(--color-surface)]">
                <FaGithub className="w-4 h-4 text-[var(--color-muted-foreground)]" />
              </Link>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[var(--color-foreground)] mb-2">Experience</h3>
              <div className="space-y-2">
                {profile.workExperience.map((exp, i) => (
                  <div key={i} className="border-l-2 border-[var(--color-accent)] pl-3">
                    <p className="text-sm font-medium text-[var(--color-foreground)]">{exp.title}</p>
                    <p className="text-xs text-[var(--color-muted-foreground)]">{exp.company} • {exp.period}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[var(--color-foreground)] mb-2">Education</h3>
              <div className="space-y-2">
                {profile.education.map((edu, i) => (
                  <div key={i} className="border-l-2 border-[var(--color-accent-alt)] pl-3">
                    <p className="text-sm font-medium text-[var(--color-foreground)]">{edu.title}</p>
                    <p className="text-xs text-[var(--color-muted-foreground)]">{edu.institution} • {edu.year}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[var(--color-foreground)] mb-2">Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                {profile.skills.programmingLanguages.map((s, i) => (
                  <span key={i} className="px-2 py-1 text-xs bg-[var(--color-accent)]/20 text-[var(--color-accent)] rounded">{s}</span>
                ))}
                {profile.skills.frontend.frameworks.map((s, i) => (
                  <span key={i} className="px-2 py-1 text-xs bg-[var(--color-accent)]/20 text-[var(--color-accent)] rounded">{s}</span>
                ))}
                {profile.skills.frontend.styles.map((s, i) => (
                  <span key={i} className="px-2 py-1 text-xs bg-[var(--color-accent)]/20 text-[var(--color-accent)] rounded">{s}</span>
                ))}
                {profile.skills.backend.frameworks.map((s, i) => (
                  <span key={i} className="px-2 py-1 text-xs bg-[var(--color-accent)]/20 text-[var(--color-accent)] rounded">{s}</span>
                ))}
                {profile.skills.backend.databases.map((s, i) => (
                  <span key={i} className="px-2 py-1 text-xs bg-[var(--color-accent)]/20 text-[var(--color-accent)] rounded">{s}</span>
                ))}
                {profile.skills.devOps.map((s, i) => (
                  <span key={i} className="px-2 py-1 text-xs bg-[var(--color-accent)]/20 text-[var(--color-accent)] rounded">{s}</span>
                ))}
              </div>
            </div>


          </div>
        </div>

        {/* Recent Projects */}
        <div className="rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]/50 overflow-hidden flex flex-col h-fit">
          <div className="p-4 border-b border-[var(--color-border)]/50 flex justify-between items-center shrink-0">
            <h3 className="text-sm font-semibold text-[var(--color-foreground)]">Recent Projects</h3>
            <Link href="/projects" className="text-xs text-[var(--color-accent)] hover:underline">
              See More
            </Link>
          </div>
          <div className="p-2 space-y-2 overflow-y-auto custom-scrollbar">
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
    </section>
  );
};

export default AboutProjectsSection;
