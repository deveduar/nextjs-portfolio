"use client";
import React, { useState, useEffect } from "react";
import Hero from "@/components/hero";
import About from "@/components/about";
import ContactForm from "@/components/contactForm";
import Link from "next/link";
import profile from '@/data/profile';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from 'next/image';
// import { readmes } from "@/data/readmes"; 
import { FaGithub } from "react-icons/fa";
import { BiLinkExternal } from "react-icons/bi";
import { useReadmes } from '@/hooks/useReadmes';
import TechTags from "@/components/techTags";

const Home: React.FC = () => {
  const { readmes, loading, error } = useReadmes();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out'
    });
  }, []);

  // Update to use readmes data
  // const techStack = Array.from(new Set(
  //   Object.values(readmes)
  //     .flatMap((readme) => readme.technologies)
  // ));

  // Get recent projects from readmes
  const recentProjects = loading ? [] : [...readmes]
    .sort((a, b) => b.id - a.id)
    .slice(-4)
    .reverse();

    if (loading) {
      return <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>;
    }
  
    if (error) {
      return <div className="flex items-center justify-center min-h-screen text-red-500">
        Error loading projects: {error}
      </div>;
    }
  

  return (
<div className="flex flex-col w-full ">
      {/* Hero Section */}
      <section className="h-2/4  
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
              <Link 
                key={project.id}
                href={`/project/${project.id}`} 
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
                  <Link href={`/project/${project.id}`} className="">
                      <h3 className="text-2xl font-bold text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors line-clamp-1">
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
                        <div className="text-xs font-medium">
                          <BiLinkExternal className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-medium">
                          Demo
                        </span>
                      </Link>
                    )}
                  </div>
                  
                 
                  <TechTags technologies={project.technologies}   colorful={true}/>

              
                  
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2 h-14">
                    {project.description}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between w-full gap-4 text-black dark:text-white pt-4">
                  <div className="flex-1 flex items-center gap-2 min-w-0">
                      {project.links
                        .filter(link => link.label.toLowerCase().includes('github'))
                        .slice(0, 2)
                        .map((link, idx) => (
                          <Link
                            key={idx}
                            href={link.href}
                            className="flex items-center gap-1 py-1 truncate hover:text-gray-800 dark:hover:text-gray-400 transition-all duration-300"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <div className="flex-shrink-0 text-xs">
                              <FaGithub className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-medium truncate">
                              {link.label}
                            </span>
                          </Link>
                        ))}
                    </div>
                    <Link
                      href={`/project/${project.id}`}
                      className="flex-shrink-0 flex items-center gap-3 py-1 sm:py-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500"
                      rel="noopener noreferrer"
                    >
                      <span className="text-sm font-medium">View Details</span>
                    </Link>
                  </div>
                </div>
              </div>

              </Link>
            ))}
          </div>
          <div className="flex justify-center mt-8 px-4">
            <Link 
              href="/projects" 
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
