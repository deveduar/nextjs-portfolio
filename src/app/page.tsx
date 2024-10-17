"use client";
import React, { useState } from "react";
import Card from "@/components/card";
import Hero from "@/components/hero";
import About from "@/components/about";
import Link from "next/link";
import ProjectDetails from "@/components/projectDetails";
import { projects } from "@/data/projects";
// SVG variables


const Home: React.FC = () => {

  return (
    <section className="container mx-auto py-6 ">
      <Hero
        title="Hey, I am deveduar"
        subtitle="I'm a Full-Stack Developer specialized in building amazing web applications."
        imageSrc="/images/pc-1-opa.png"
      />
      <div id="projects" className="  py-4 space-y-2 rounded-xl px-3 md:px-2 lg:px-4">
        <h1 className="text-2xl font-bold text-black dark:text-white mb-4 ml-4">Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-1 justify-items-center sm:px-2 md:px-4 lg:px-4">
        {projects.map((project) => (
            <Card
              id={project.id}
              key={project.id}
              title={project.title}
              description={project.description}
              imageSrc={project.imageSrc}
              detailedDescription={project.detailedDescription}
              links={project.links}
          
            />
          ))}
        </div>
      </div>
      {/* <ProjectDetails project={projects} /> */}
      <About />
    </section>
  );
};

export default Home;
