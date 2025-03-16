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

const Home: React.FC = () => {

  // const techStack = Array.from(new Set(projects.flatMap((project) => project.technologies)));
  const recentProjects = projects.slice(-4).reverse();
 
  return (
    <div className="justify-center ">
        <section className="rounded-xl   flex   bg-gray-100 dark:bg-gray-950  pb-6">
         <Hero
            title="Hey, I am deveduar"
            subtitle="Full Stack Developer with over 5 years of experience in the design, development, implementation, and deployment of web applications."
            imageSrc="/images/pc-1-opa.png"
          />
      </section>

    <section id="projects" className="flex  rounded-xl    items-center justify-center bg-gray-100 dark:bg-gray-950 ">
    <ProjectListSimple 
      projects={recentProjects} 
      variant="detailed" // o "simple"
    />
    </section>


    {/* <section  id="about" className="rounded-xl bg-gray-100 dark:bg-gray-950  " >
    <About technologies={techStack} />
    </section> */}
  

    {/* <section id="connect" className="flex flex-col  rounded-xl    justify-center pt-6 items-center">
    <Connect />

    </section> */}
      {/* <ContactForm /> */}
      {/* <ProjectDetails project={projects} /> */}
  </div>
  );
};

export default Home;
