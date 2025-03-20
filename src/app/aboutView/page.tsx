
import About from "@/components/about";
import { projects } from "@/data/projects";
import Connect from "@/components/connect";
import profile from '@/data/profile';

export default function AboutView() {

    const techStack = Array.from(new Set(projects.flatMap((project) => project.technologies)));

    return (
  <div className="">
    <section  id="about" className="  pb-6  rounded-xl bg-gray-100 dark:bg-gray-950" >
    <h2 className="text-3xl font-bold text-gray-900 dark:text-white px-4 py-6" data-aos="fade-right">
        About me
    </h2>
    <About 
    technologies={techStack} 
    profile={profile}
  />
    </section>
    <section id="connect" className="flex flex-col rounded-xl    ">
    <Connect />
    </section>
  </div>
    );
  }
  