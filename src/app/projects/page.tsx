"use client";

import ProjectList from "@/components/projectList";
import ProjectListSimple from '@/components/projectListSimple';
import { useEffect } from 'react';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
import Breadcrumb from '@/components/breadcrumb';

export default function ProjectsView() {

  // useEffect(() => {
  //   AOS.init({
  //     duration: 1000,
  //     once: true,
  //     easing: 'ease-out'
  //   });
  // }, []);

  return (
    <section 
      id="projects" 
      className="flex flex-col rounded-xl "
      
    >
          {/* <h2 className="text-3xl font-bold text-gray-900 dark:text-white px-4 py-6" data-aos="fade-right">
        Projects
    </h2> */}
     <Breadcrumb  />
      <ProjectList />
    </section>
  );
}