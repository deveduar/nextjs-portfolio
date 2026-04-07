"use client";
import React, {useEffect} from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { FaGithub, FaArrowRight } from "react-icons/fa";
import { BiLinkExternal } from "react-icons/bi";
import { TbGripHorizontal } from "react-icons/tb";
import { useState, useRef, TouchEvent, MouseEvent } from 'react';
import ProjectReadmeContent from './projectReadmeContent';
import { slugify } from '@/lib/slug';

interface ProjectListSimpleProps {
  projects: {
    id: number;
    repoId: string;
    title: string;
    description: string;
    imageSrc: string;
    technologies: string[];
    links: {
      href: string;
      label: string;
    }[];
    readmeContent?: {
      [key: string]: any;
    };
  }[];
  variant?: 'detailed' | 'simple';
  compact?: boolean;
  onNext?: () => void;
  onPrev?: () => void;
}

const ProjectListSimple: React.FC<ProjectListSimpleProps> = ({ projects, variant = 'detailed', compact = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (autoPlay) {
      intervalId = setInterval(() => {
        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev + 1) % projects.length);
      }, 9000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [autoPlay, projects.length]);


  const handleTouchStart = (e: TouchEvent) => {
    setAutoPlay(false);
    e.preventDefault();
    setIsDragging(true);
    setIsTransitioning(false);
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    if (!isDragging || !cardRef.current) return;

    const currentTouch = e.targetTouches[0].clientX;
    const diff = touchStart - currentTouch;
    const maxDrag = cardRef.current.offsetWidth;
    const limitedDiff = Math.max(Math.min(diff, maxDrag), -maxDrag);

    let offset = -(currentIndex * 103) - (limitedDiff / cardRef.current.offsetWidth * 100);
    
    cardRef.current.style.transform = `translateX(${offset}%)`;
    
    setTouchEnd(currentTouch);
  };

  const handleTouchEnd = () => {
    if (!isDragging || !cardRef.current) return;

    setIsDragging(false);
    setIsTransitioning(true);

    const diff = touchStart - touchEnd;
    let threshold = 50;

    if (
      (currentIndex === 0 && diff < 0) ||
      (currentIndex === projects.length - 1 && diff > 0)
    ) {
      threshold = cardRef.current.offsetWidth;
    }

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        setCurrentIndex((prev) => Math.min(prev + 1, projects.length - 1));
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    }

    cardRef.current.style.transition = "transform 300ms ease-in-out";
    cardRef.current.style.transform = `translateX(-${currentIndex * 103}%)`;
  };

  const [isTransitioning, setIsTransitioning] = useState(true);

  const handleMouseDown = (e: MouseEvent) => {
    setAutoPlay(false);
    e.preventDefault();
    setIsDragging(true);
    setIsTransitioning(false);
    setTouchStart(e.clientX);
    setTouchEnd(e.clientX);
  };
  
  const handleMouseMove = (e: MouseEvent) => {
    setAutoPlay(false);

    e.preventDefault();
    if (!isDragging || !cardRef.current) return;
  
    const diff = touchStart - e.clientX;
    const maxDrag = cardRef.current.offsetWidth;
    const limitedDiff = Math.max(Math.min(diff, maxDrag), -maxDrag);
  
    let offset = -(currentIndex * 103) - (limitedDiff / cardRef.current.offsetWidth * 100);
  
    cardRef.current.style.transform = `translateX(${offset}%)`;
  
    setTouchEnd(e.clientX);
  };
  
  const handleMouseUp = (e: MouseEvent) => {
    setAutoPlay(true);

    e.preventDefault();
    if (!isDragging) return;
  
    setIsDragging(false);
    setIsTransitioning(true);
  
    const diff = touchStart - touchEnd;
    let threshold = 50;
  
    if (
      (currentIndex === 0 && diff < 0) ||
      (currentIndex === projects.length - 1 && diff > 0)
    ) {
      threshold = cardRef.current ? cardRef.current.offsetWidth : 100;
    }
  
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        setCurrentIndex((prev) => Math.min(prev + 1, projects.length - 1));
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    } 
  
    if (cardRef.current) {
      cardRef.current.style.transition = "transform 300ms ease-in-out";
      cardRef.current.style.transform = `translateX(-${currentIndex * 103}%)`;
    }
  };

  if (variant === 'simple') {
    return (
      <div className="overflow-hidden rounded-xl h-full w-full">
        <div 
          className="flex items-stretch w-full h-full"
          ref={cardRef}
          style={{ 
            userSelect: 'none',
            transform: `translateX(-${currentIndex * 103}%)`,
            transition: isTransitioning ? 'transform 300ms ease-in-out' : 'none',
            gap: '3%'
          }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex-shrink-0 w-full relative group overflow-hidden rounded-xl bg-transparent flex flex-col"
              style={{ height: '100%' }}
            >
              <div 
                className="relative w-full h-28 shrink-0 rounded-lg overflow-hidden cursor-grab active:cursor-grabbing select-none group"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <Image
                  src={project.imageSrc}
                  alt={project.title}
                  fill
                  className="object-cover pointer-events-none"
                  priority
                />
                <div className="absolute inset-0 bg-[var(--color-foreground)]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-[var(--color-foreground)]/50 rounded-full p-2">
                    <TbGripHorizontal className="w-5 h-5 text-[var(--color-background)]" />
                  </div>
                </div>
              </div>
              
              <div className="shrink-0 rounded-lg border border-[var(--color-border)]/70 bg-[var(--color-surface)]/90 p-2 backdrop-blur-sm">
                <div className="flex items-center justify-between gap-2">
                  <Link href={`/project/${slugify(project.title)}`} className="flex-1 min-w-0">
                    <h3 className="line-clamp-1 text-sm font-semibold text-[var(--color-foreground)] transition-colors hover:text-[var(--color-accent)]">
                      {project.title}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-1 shrink-0">
                    {project.links.map((link, idx) => (
                      <Link
                        key={idx}
                        href={link.href}
                        className="p-1 text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label.toLowerCase().includes('demo') || link.label.toLowerCase().includes('live') ? (
                          <BiLinkExternal className="w-4 h-4" />
                        ) : (
                          <FaGithub className="w-4 h-4" />
                        )}
                      </Link>
                    ))}
                    <Link
                      href={`/project/${slugify(project.title)}`}
                      className="p-1 text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)]"
                    >
                      <FaArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span 
                      key={tech}
                      className="rounded bg-[var(--color-surface-alt)] px-1.5 py-0.5 text-xs text-[var(--color-muted-foreground)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
               
              <div className="flex-1 overflow-y-auto custom-scrollbar p-2 bg-transparent">
                <p className="mb-2 text-xs text-[var(--color-muted-foreground)]">{project.description}</p>
                {project.readmeContent && (
                  <ProjectReadmeContent readmeContent={project.readmeContent} size={compact ? 'sm' : 'md'} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="relative w-full overflow-hidden rounded-xl">

      <div 
        className="flex w-full items-center text-[var(--color-foreground)]"
        ref={cardRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ 
          userSelect: 'none',
          transform: `translateX(-${currentIndex * 103}%)`,
          transition: isTransitioning ? 'transform 300ms ease-in-out' : 'none',
          gap: '3%'
        }}
      >
        {projects.map((project) => (
          <div
            key={project.id}
            className="group relative w-full flex-shrink-0 rounded-xl border border-[var(--color-border)]/70 bg-[var(--color-surface)]"
          >
            <div className="w-full h-28 rounded-t-lg overflow-hidden">
                <Image
                  src={project.imageSrc}
                  alt={`${project.title} preview`}
                  width={800}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
          <div className="flex flex-col w-full p-4">
            <div className="flex-1">
              <div className='flex flex-row justify-between mb-2'>
                <h4 className="text-xl font-semibold text-[var(--color-foreground)]">
                  {project.title}
                </h4>
                {project.links.find(link => link.label.toLowerCase().includes('demo') || link.label.toLowerCase().includes('live')) && (
                <Link
                  href={project.links.find(link => link.label.toLowerCase().includes('demo') || link.label.toLowerCase().includes('live'))?.href || ''}
                  className="flex items-center gap-1 text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BiLinkExternal className="w-4 h-4" />
                  <span className="text-xs font-medium">
                    {project.links.find(link => link.label.toLowerCase().includes('demo') || link.label.toLowerCase().includes('live'))?.label}
                  </span>
                </Link>
              )}
             </div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span 
                      key={tech}
                      className="rounded-md bg-[var(--color-surface-alt)] px-2 py-1 text-xs text-[var(--color-muted-foreground)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <p className="mb-2 line-clamp-1 text-sm text-[var(--color-muted-foreground)] lg:h-auto">
                {project.description}
              </p>

              <div className="flex items-center justify-between w-full sm:w-auto">
                <div className="flex flex-wrap gap-1">
                  {project.links
                  .filter(link => !link.label.toLowerCase().includes('demo') && !link.label.toLowerCase().includes('live'))
                  .slice(0, 1)
                  .map((link, idx) => (
                    <Link
                      key={idx}
                      href={link.href}
                      className="rounded-xl items-center gap-1 flex flex-row py-1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub className="w-4 h-4" />
                      <span className="text-xs font-medium whitespace-nowrap">{link.label}</span>
                    </Link>
                  ))}
                </div>
                <Link
                  href={`/project/${slugify(project.title)}`}
                  className="flex flex-row items-center gap-3 rounded-xl py-1 text-[var(--color-accent)] sm:py-2"
                  rel="noopener noreferrer"
                >
                  <span className="text-sm font-medium whitespace-nowrap">View Details</span>
                </Link>
              </div>
            </div>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectListSimple;