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


const Home: React.FC = () => {

  const techStack = Array.from(new Set(projects.flatMap((project) => project.technologies)));

  return (
    <section className="">
      <Hero
        title="Hey, I am deveduar"
        subtitle="I'm a Full-Stack Developer specialized in building amazing web applications."
        imageSrc="/images/pc-1-opa.png"
      />
    <div id="projects" className="flex flex-col  rounded-xl sm:items-center lg:items-start md:items-start  ">
      {/* <h2 className="text-4xl font-bold text-black dark:text-white flex text-center sm:text-center lg:text-left">Projects</h2>  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10 w-full ">
        {projects.slice().reverse().map((project) => (
          <Card
            id={project.id}
            key={project.id}
            title={project.title}
            description={project.description}
            imageSrc={project.imageSrc}
            detailedDescription={project.detailedDescription}
            links={project.links}
            technologies={project.technologies}
          />
        ))}
      </div>
    </div>
    <div>
     <About technologies={techStack} />

    </div>
      {/* <ContactForm /> */}
      {/* <ProjectDetails project={projects} /> */}
    </section>
  );
};

export default Home;
