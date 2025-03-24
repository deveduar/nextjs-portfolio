"use client";
import React, {useEffect} from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useState, useRef, TouchEvent, MouseEvent } from 'react';
import { TbGripHorizontal } from "react-icons/tb";
import { FaGithub } from "react-icons/fa";
import { BiLinkExternal } from "react-icons/bi";

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
  }[];
  variant?: 'detailed' | 'simple';
  onNext?: () => void;
  onPrev?: () => void;
}

const ProjectListSimple: React.FC<ProjectListSimpleProps> = ({ projects, variant = 'detailed', onNext, onPrev }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

   const [autoPlay, setAutoPlay] = useState(true);
   const [slideDirection, setSlideDirection] = useState<'right' | 'left' | null>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (autoPlay) {
      intervalId = setInterval(() => {
        setIsTransitioning(true);
        setSlideDirection('right');
        setCurrentIndex((prev) => (prev + 1) % projects.length);
      }, 9000); // Cambia de card cada 3 segundos
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
    
    // Aplicar el desplazamiento
    cardRef.current.style.transform = `translateX(${offset}%)`;
    
    setTouchEnd(currentTouch);
  };

  const handleTouchEnd = () => {
    if (!isDragging || !cardRef.current) return;

    setIsDragging(false);
    setIsTransitioning(true);

    const diff = touchStart - touchEnd;
    let threshold = 50;

    // Aplicar un umbral del 100% si el usuario intenta mover el primer o último elemento en la dirección no permitida
    if (
      (currentIndex === 0 && diff < 0) || // Primer elemento, movimiento a la derecha
      (currentIndex === projects.length - 1 && diff > 0) // Último elemento, movimiento a la izquierda
    ) {
      threshold = cardRef.current.offsetWidth;
    }

    // Si el movimiento fue suficientemente grande, actualizar el índice
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Movimiento hacia la izquierda
        setCurrentIndex((prev) => Math.min(prev + 1, projects.length - 1));
      } else {
        // Movimiento hacia la derecha
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    }

    // Restaurar a la posición original
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
  
    // // Bloquear movimiento del primer elemento hacia la derecha
    // if (currentIndex === 0 && diff < 0) {
    //   offset = -(currentIndex * 103); // Restaurar al primer elemento si se mueve mucho hacia la derecha
    // }
  
    // // Bloquear movimiento del último elemento hacia la izquierda
    // if (currentIndex === projects.length - 1 && diff > 0) {
    //   offset = -(currentIndex * 103); // Restaurar al último elemento si se mueve mucho hacia la izquierda
    // }
  
    // Aplicar el desplazamiento
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
    let threshold = 50; // Umbral mínimo normal para movimientos permitidos
  
    // Aplicar un umbral del 100% si el usuario intenta mover el primer o último elemento en la dirección no permitida
    if (
      (currentIndex === 0 && diff < 0) || // Primer elemento, movimiento a la derecha
      (currentIndex === projects.length - 1 && diff > 0) // Último elemento, movimiento a la izquierda
    ) {
      threshold = cardRef.current ? cardRef.current.offsetWidth : 100; // Usar el 100% del ancho
    }
  
    // Si el movimiento fue suficientemente grande, actualizar el índice
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Movimiento hacia la izquierda
        setCurrentIndex((prev) => Math.min(prev + 1, projects.length - 1)); // No permitir ir más allá del último elemento
      } else {
        // Movimiento hacia la derecha
        setCurrentIndex((prev) => Math.max(prev - 1, 0)); // No permitir ir más allá del primer elemento
      }
    } 
  
    // Restaurar a la posición original si el movimiento no fue suficiente o si fue en una dirección bloqueada
    if (cardRef.current) {
      cardRef.current.style.transition = "transform 300ms ease-in-out";
      cardRef.current.style.transform = `translateX(-${currentIndex * 103}%)`;
    }
  };
  
  
  
  
  
  
  // Efecto para reiniciar la posición cuando se alcanza el límite
  // useEffect(() => {
  //   if (!cardRef.current) return;
  
  //   if (currentIndex >= projects.length) {
  //     setTimeout(() => {
  //       setIsTransitioning(false);
  //       setCurrentIndex(0);
  //     }, 300);
  //   } else if (currentIndex < 0) {
  //     setTimeout(() => {
  //       setIsTransitioning(false);
  //       setCurrentIndex(projects.length - 1);
  //     }, 300);
  //   }
  // }, [currentIndex]);

  if (variant === 'simple') {
    return (
      <div className="overflow-hidden rounded-xl   h-full">
       <div 
          className="flex items-stretch w-full h-full"
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
              className="flex-shrink-0 w-full relative group overflow-hidden rounded-xl 
             "
            >
              <div className="relative w-full h-full">
                <Image
                  src={project.imageSrc}
                  alt={project.title}
                  fill
                  className="object-cover  "
                  //  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />

              </div>
              <div className="absolute inset-0    
              
              group-hover:bg-opacity-80 
              dark:group-hover:bg-opacity-60 
              transition-all duration-300
              
              bg-white 
              bg-opacity-80
               dark:bg-gray-800 
               dark:bg-opacity-60 
              ">
                {/*   bg-gradient-to-b 
              bg-white 
              bg-opacity-90
               dark:bg-gray-800 dark:from-black/70 dark:to-black/90
               dark:bg-opacity-30  */}
                  <div className="p-2 md:px-3 opacity-1 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center h-full">
                    <div className='space-y-2 flex flex-col justify-center '>
                      <Link href={`/projects/${project.id}`}>
                        <h3 className="font-semibold text-xs md:text-lg text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors line-clamp-1">
                          {project.title}
                        </h3>
                      </Link>
                      <p className="text-gray-800 dark:text-gray-200 text-xs md:text-md line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span 
                            key={tech}
                            className="px-1 py-0.5 text-xs md:text-md rounded bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-white dark:backdrop-blur-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const currentProject = projects[currentIndex];

  return (
    <div className="relative w-full overflow-hidden rounded-xl">

<div 
        className="flex items-center w-full text-black dark:text-white"
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
      {/* Último elemento duplicado al principio */}
      {/* <div
          key={`${projects[projects.length - 1].id}-clone`}
          className="flex-shrink-0 w-full p-6 bg-white dark:bg-gray-800 rounded-xl"
        >
          <div className="flex flex-col w-full">
            <div className="flex-1">
              <div>
                <Link 
                  href={`/projects/${projects[projects.length - 1].id}`}
                  className="inline-block hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {projects[projects.length - 1].title}
                  </h4>
                </Link>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex gap-2">
                    {projects[projects.length - 1].technologies.slice(0, 3).map((tech) => (
                      <span 
                        key={tech}
                        className="px-2 py-1 text-xs rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {projects[projects.length - 1].description}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-row gap-3 text-black dark:text-white">
                  {projects[projects.length - 1].links.map((link, idx) => (
                    <Link
                      key={idx}
                      href={link.href}
                      className="rounded-xl items-center gap-3 flex flex-row py-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className={`text-sm ${link.label.toLowerCase().includes('demo') || link.label.toLowerCase().includes('live') ? 'text-blue-600 dark:text-blue-400' : ''}`}>
                        {link.svg}
                      </div>
                      <span className="text-sm font-medium dark:text-white whitespace-nowrap">{link.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div> */}
      {projects.map((project) => (
        <div
          key={project.id}
          className="flex-shrink-0 w-full  bg-white dark:bg-gray-800 rounded-xl relative group"
        >
              {/* <div className="absolute left-1/2 -translate-x-1/2 top-2 text-gray-400 dark:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
              <TbGripHorizontal className="w-5 h-5" />
            </div> */}
             {/* Imagen del proyecto */}
             <div className="w-full h-28  rounded-t-lg overflow-hidden">
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

     
          <h4 className="text-xl font-semibold text-gray-900 dark:text-white ">
            {project.title}
          </h4>
            {/* Live Demo Link */}
            {project.links.find(link => link.label.toLowerCase().includes('demo') || link.label.toLowerCase().includes('live')) && (
            <Link
              href={project.links.find(link => link.label.toLowerCase().includes('demo') || link.label.toLowerCase().includes('live'))?.href || ''}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 flex items-center gap-1"
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
                            className="px-2 py-1 text-xs rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 line-clamp-1  lg:h-auto">
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
                      href={`/projects/${project.id}`}
                      className="rounded-xl items-center gap-3 flex flex-row py-1 sm:py-2 text-blue-600 dark:text-blue-400"
                      rel="noopener noreferrer"
                    >
                      <span className="text-sm font-medium whitespace-nowrap">View Details</span>
                    </Link>
                  </div>
                </div>
              </div>
          
          </div>
        ))}
              {/* Primer elemento duplicado al final */}
              {/* <div
          key={`${projects[0].id}-clone`}
          className="flex-shrink-0 w-full p-6 bg-white dark:bg-gray-800 rounded-xl"
        >
          <div className="flex flex-col w-full">
            <div className="flex-1">
              <div>
                <Link 
                  href={`/projects/${projects[0].id}`}
                  className="inline-block hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {projects[0].title}
                  </h4>
                </Link>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex gap-2">
                    {projects[0].technologies.slice(0, 3).map((tech) => (
                      <span 
                        key={tech}
                        className="px-2 py-1 text-xs rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {projects[0].description}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-row gap-3 text-black dark:text-white">
                  {projects[0].links.map((link, idx) => (
                    <Link
                      key={idx}
                      href={link.href}
                      className="rounded-xl items-center gap-3 flex flex-row py-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className={`text-sm ${link.label.toLowerCase().includes('demo') || link.label.toLowerCase().includes('live') ? 'text-blue-600 dark:text-blue-400' : ''}`}>
                        {link.svg}
                      </div>
                      <span className="text-sm font-medium dark:text-white whitespace-nowrap">{link.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ProjectListSimple;