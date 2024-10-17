import { GitHubIcon } from "./icons";
import { DemoIcon } from "./icons";

export const projects = [
    {
      id: 1,
      title: "Deveduar Blog",
      description: "Responsive blog created with Next.js and React.js",
      imageSrc: "/images/blog-1.png",
      detailedDescription: "My Personal blog for reading markdown posts from the file system with tags and date system",
      technologies: ["Next.js", "React", "Tailwind", "Markdown"],
      links: [
        { href: "https://github.com/deveduar/nextjs-blog", label: "GitHub", svg: GitHubIcon },
        { href: "https://nextjs-blog-xi-indol.vercel.app/", label: "Demo", svg: DemoIcon },
      ],
      gallery: [
        "https://placehold.co/600x400",
        "https://placehold.co/600x400",
        "https://placehold.co/600x400",
      ],
    },
    {
      id: 2,
      title: "VisualEvoke Shop",
      description: "Ecomerce site made with next.js and node.js",
      imageSrc: "/images/ecomerce-1.png",
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
    },
    {
      id: 3,
      title: "Todo app",
      description: "Simple todo app with dates and reminders",
      imageSrc: "/images/todoapp-1.png",
      detailedDescription: "Developed with Next.js, Node.js, Tailwind, Shacdn UI, Supabase, PostgreSQL, authentication.",
      technologies: ["Next.js", "React", "Tailwind", "Node.js"],
      links: [
        { href: "https://github.com/deveduar/todo-app", label: "GitHub", svg: GitHubIcon },
      ],
      gallery: [
        "https://placehold.co/600x400",
        "https://placehold.co/600x400",
        "https://placehold.co/600x400",
      ],
    },
    {
      id: 4,
      title: "Inventory System",
      description: "Inventory management for dropshipping store",
      imageSrc: "/images/pc-1.png",
      detailedDescription: "Developed with TypeScript, Angular, Node.js",
      technologies: ["Angular", "NodeJS", "Typescript", "SASS"],
      links: [
        { href: "https://github.com/deveduar/angular-SGI-front", label: "GitHub", svg: GitHubIcon },
      ],
      gallery: [
        "https://placehold.co/600x400",
        "https://placehold.co/600x400",
        "https://placehold.co/600x400",
      ],
    },
  ];