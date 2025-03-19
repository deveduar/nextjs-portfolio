"use client";
import React, { useState, useEffect } from "react";
import Card from "@/components/card";
import Hero from "@/components/hero";
import About from "@/components/about";
import ContactForm from "@/components/contactForm";
import Link from "next/link";
import ProjectDetails from "@/components/projectDetails";
import { projects } from "@/data/projects";
// SVG variables
import Connect from "@/components/connect";
import ProjectList
 from "@/components/projectList";
import ProjectListSimple from '@/components/projectListSimple';
import profile from '@/data/profile';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from 'next/image';

const Home: React.FC = () => {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out'
    });
  }, []);

  const techStack = Array.from(new Set(projects.flatMap((project) => project.technologies)));
  const recentProjects = projects.slice(-4).reverse();
 
  return (
<div className="flex flex-col w-full ">
      {/* Hero Section */}
      <section className="h-screen md:h-[calc(100vh-6rem)] flex items-center justify-center" data-aos="fade-up">
        <div className="w-full">
          <Hero
            name={profile.name}
            specialty={profile.specialty}
            description={profile.description}
            socialLinks={profile.socialLinks}
          />
        </div>
      </section>

      {/* Recent Projects Section */}
      <section className="flex flex-col items-center justify-center " data-aos="fade-up">
        <div className="w-full max-w-7xl">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white px-4 py-6" data-aos="fade-right">
            Recent Projects
          </h2>
          <div className="flex flex-col gap-4 ">
            {recentProjects.map((project, index) => (
              <div 
                key={project.id} 
                className="flex flex-col md:flex-row gap-4 items-center bg-gray-50 dark:bg-gray-900 p-6 rounded-xl shadow-lg"
                data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
              >
                {/* Imagen */}
                <div className="w-full md:w-1/2">
                  <div className="relative aspect-video overflow-hidden rounded-xl">
                    <Image
                      src={project.imageSrc}
                      alt={project.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
                
                {/* Información */}
                <div className="w-full md:w-1/2 space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span 
                        key={idx} 
                        className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex gap-4 pt-4">
                    {project.links.map((link, idx) => (
                      <Link
                        key={idx}
                        href={link.href}
                        className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.svg}
                        <span className="text-sm font-medium">{link.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      {/* About Section */}
      <section className="min-h-screen flex items-center justify-center py-20" data-aos="fade-up">
        <div className="w-full max-w-7xl">
          <About 
            technologies={techStack} 
            profile={profile}
          />
        </div>
      </section>
    

      {/* Contact Section */}
      <section className="h-[calc(100vh-8rem] flex items-center justify-center py-6" data-aos="fade-up">
        <div className="w-full max-w-7xl">
          <ContactForm />
        </div>
      </section>
    </div>
  );
};


export default Home;
