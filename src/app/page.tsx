"use client";
import React, { useState } from "react";
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

const Home: React.FC = () => {

  const techStack = Array.from(new Set(projects.flatMap((project) => project.technologies)));

  return (
    <div className="justify-center py-6">
        <section className="rounded-xl   flex items-center  justify-center  bg-gray-100 dark:bg-gray-950  pb-6">
         <Hero
            title="Hey, I am deveduar"
            subtitle="I'm a Full-Stack Developer specialized in building amazing web applications."
            imageSrc="/images/pc-1-opa.png"
          />
      </section>

    <section id="projects" className="flex  rounded-xl    items-center justify-center bg-gray-100 dark:bg-gray-950 ">
      {/* <h2 className="text-4xl font-bold text-black dark:text-white flex text-center sm:text-center lg:text-left">Projects</h2>  */}
    <ProjectList />
    </section>
    <section  id="about" className="rounded-xl bg-gray-100 dark:bg-gray-950  " >
    <About technologies={techStack} />
    </section>
  

    <section id="connect" className="flex flex-col  rounded-xl  bg-gray-100 dark:bg-gray-950  justify-center pt-6 items-center">
    <Connect />

    </section>
      {/* <ContactForm /> */}
      {/* <ProjectDetails project={projects} /> */}
  </div>
  );
};

export default Home;
