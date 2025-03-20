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
      <section className="
       md:h-[calc(100vh-6rem)] flex items-center justify-center" data-aos="fade-up">
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
      <section className="flex flex-col items-center justify-center" data-aos="fade-up">
        <div className="w-full max-w-7xl">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white px-4 py-6" data-aos="fade-right">
            Recent Projects
          </h2>
          <div className="flex flex-col gap-4">
            {recentProjects.map((project, index) => (
              <div 
                key={project.id} 
                className="flex  md:h-60 "
                data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
              >
               <div className="flex flex-col md:flex-row items-stretch rounded-xl shadow-lg hover:scale-[1.02] transition-all duration-300  bg-white dark:bg-gray-800 w-full ">
                {/* Imagen */}
                <div className="w-full md:w-2/5 max-h-[200px] md:max-h-[500px]  md:min-h-[200px]">
                    <Image
                      src={project.imageSrc}
                      alt={project.title}
                      width={500}
                      height={350}
                      className="w-full h-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
                    />
                </div>
                
                {/* Información */}
                <div className="w-full md:w-3/5  space-y-4 p-4">
                  <div className="flex justify-between items-center">
                  <Link href={`/projects/${project.id}`} className="">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                    </Link>
                    {project.links.find(link => link.label.toLowerCase().includes('demo') || link.label.toLowerCase().includes('live')) && (
                      <Link
                        href={project.links.find(link => link.label.toLowerCase().includes('demo') || link.label.toLowerCase().includes('live'))?.href || ''}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 flex items-center gap-1"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="text-xs scale-75 font-medium">
                          {project.links.find(link => link.label.toLowerCase().includes('demo') || link.label.toLowerCase().includes('live'))?.svg}
                        </div>
                        <span className="text-xs font-medium">
                          {project.links.find(link => link.label.toLowerCase().includes('demo') || link.label.toLowerCase().includes('live'))?.label}
                        </span>
                      </Link>
                    )}
                  </div>
                  
                 
                    <div className="flex  gap-2 overflow-x-clip">
                      {project.technologies.map((tech, index) => (
                        <div key={index} className="flex-shrink-0">
                          <span className="px-2 py-1 text-xs rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                            {tech}
                          </span>
                        </div>
                      ))}
                    </div>

              
                  
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2 h-14">
                    {project.description}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between w-full gap-4 text-black dark:text-white pt-4">
                    <div className="flex-1 flex items-center gap-1 min-w-0">
                      {project.links
                        .filter(link => !link.label.toLowerCase().includes('demo') && !link.label.toLowerCase().includes('live'))
                        .slice(0, 2)
                        .map((link, idx) => (
                          <Link
                            key={idx}
                            href={link.href}
                            className="flex items-center gap-1 py-1 truncate hover:scale-105 transition-all duration-300"
                            target="_blank"
                            rel="noopener noreferrer "
                          >
                            <div className="flex-shrink-0 text-xs scale-75">
                              {link.svg}
                            </div>
                            <span className="text-xs font-medium truncate ">
                              {link.label}
                            </span>
                          </Link>
                      ))}
                    </div>
                    <Link
                      href={`/projects/${project.id}`}
                      className="flex-shrink-0 flex items-center gap-3 py-1 sm:py-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500"
                      rel="noopener noreferrer"
                    >
                      <span className="text-sm font-medium">View Details</span>
                    </Link>
                  </div>
                </div>
              </div>

              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8 px-4">
            <Link 
              href="/projectsView" 
              className="bg-blue-200 dark:bg-blue-900 rounded-xl p-4 flex items-center justify-center font-bold hover:scale-105 transition-all duration-300 text-gray-900 dark:text-white"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      
      {/* About Section */}
      <section className="min-h-screen flex items-center justify-center " >
        <div className="w-full max-w-7xl">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white px-4 py-6" data-aos="fade-right">
            About me
          </h2>
          <About 
            technologies={techStack} 
            profile={profile}
          />
        </div>
      </section>
    

      {/* Contact Section */}
      <section className="h-[calc(100vh-8rem] flex items-center justify-center " >
        <div className="w-full max-w-7xl">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white px-4 py-6" data-aos="fade-right">
            Contact
          </h2>
          <ContactForm />
        </div>
      </section>
    </div>
  );
};


export default Home;
