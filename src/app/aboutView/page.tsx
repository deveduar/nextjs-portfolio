
import About from "@/components/about";
import { projects } from "@/data/projects";


export default function AboutView() {

    const techStack = Array.from(new Set(projects.flatMap((project) => project.technologies)));

    return (
        <div>
        <About technologies={techStack} />
   
       </div>
    );
  }
  