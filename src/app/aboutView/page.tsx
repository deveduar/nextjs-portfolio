
import About from "@/components/about";
import { projects } from "@/data/projects";
import Connect from "@/components/connect";

export default function AboutView() {

    const techStack = Array.from(new Set(projects.flatMap((project) => project.technologies)));

    return (
  <div>
    <section  id="about" className="  pb-6  rounded-xl bg-gray-100 dark:bg-gray-950 px-2 md:px-12 lg:px-20 " >
    <About technologies={techStack} />
    </section>
    <section id="connect" className="flex flex-col  rounded-xl  px-2 md:px-12 lg:px-20 bg-white dark:bg-gray-950   ">
    <Connect />
    </section>
  </div>
    );
  }
  