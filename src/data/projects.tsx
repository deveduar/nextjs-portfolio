import { GitHubIcon } from "./icons";
import { DemoIcon } from "./icons";

export const projects = [
    {
      id: 1,
      title: "Deveduar Blog",
      description: "Responsive blog created with Next.js and React.js",
      imageSrc: "https://i.ibb.co/xzG58fw/lum3n-RBu-Q2-PK-L8-unsplash.jpg",
      detailedDescription: "My Personal blog for reading markdown posts from the file system with tags and date system",
      technologies: ["Next.js", "React.js", "Tailwind", "Markdown"],
      links: [
        { href: "https://github.com/deveduar/nextjs-blog", label: "GitHub", svg: GitHubIcon },
        { href: "https://nextjs-blog-xi-indol.vercel.app/", label: "Demo", svg: DemoIcon },
      ],
      gallery: [
        "https://i.ibb.co/s10RNQM/blog-5.png",
        "https://i.ibb.co/s10RNQM/blog-5.png0",
        "https://i.ibb.co/JzLWDP8/blog-7.png",
      ],
      features: [
        "Implemented a custom markdown parser.",
        "Responsive design with Tailwind CSS.",
        "Static site generation with Next.js.",
      ],
    },
    {
      id: 2,
      title: "VisualEvoke Ecomerce",
      description: "Ecomerce site made with next.js and node.js",
      imageSrc: "https://i.ibb.co/YZDFk2K/clark-street-mercantile-qn-Kh-ZJPKFD8-unsplash-min.jpg",
      detailedDescription: "Developed with next js (Frontend) and Medusa js (backend) with Api drop shipping integration",
      technologies: ["Next.js", "React", "drop shipping", "Medusa.js"],
      links: [
        { href: "https://github.com/deveduar", label: "GitHub", svg: GitHubIcon },
      ],
      gallery: [
        "https://placehold.co/600x400",
        "https://placehold.co/600x400",
        "https://placehold.co/600x400",
      ],
      features: [
        "Backend and frontend connection",
        "StoreFront",
      ],
    },
    {
      id: 3,
      title: "Todo app",
      description: "Simple todo app with dates and reminders",
      imageSrc: "https://i.ibb.co/BncDyCR/kier-in-sight-archives-a53b-WJk1sz0-unsplash-min.jpg",
      detailedDescription: "Developed with Next.js and Supabase .",
      technologies: [
        "Next.js", 
        "React.js", 
        "Tailwind", 
        "Node.js", 
        "Shacdn UI",
        "PostgreSQL",
        "Supabase"
      ],
      links: [
        { href: "https://github.com/deveduar/todo-app", label: "GitHub", svg: GitHubIcon },
      ],
      gallery: [
        "https://i.ibb.co/6mSmsYX/todo-1-min.png",
        "https://i.ibb.co/GvfxcTg/todo-2-min.png",
        "https://i.ibb.co/X4pqfDh/todo-4-min.png",
      ],
      features: [
        "Dates and reminders.",
        "Responsive design with Shacdn UI.",
        "Static site generation with Next.js.",
      ],
    },
    {
      id: 4,
      title: "Inventory System",
      description: "Inventory management for dropshipping store created with angular.",
      imageSrc: "https://i.ibb.co/d0Ntdkj/priscilla-du-preez-dlx-LGIy-2-VU-unsplash-min.jpg",
      detailedDescription: "Developed with TypeScript, Angular, Node.js",
      technologies: ["Angular", "NodeJS", "Typescript", "SASS"],
      links: [
        { href: "https://github.com/deveduar/angular-SGI-front", label: "GitHub", svg: GitHubIcon },
      ],
      gallery: [
        "https://i.ibb.co/JcrtNTN/localhost-4200-inventory-8-min.png",
        "https://i.ibb.co/Q6dRMjn/localhost-4200-inventory-3-min.png",
        "https://i.ibb.co/L0zVPCL/localhost-4200-inventory-5-min.png",
      ],
      features: [
        "Backend connection with Printfull API.",
        "Responsive design with Sass.",
        "Static site generation with Angular.",
      ],
    },
  ];