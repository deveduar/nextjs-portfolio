import { GitHubIcon } from "./icons";
import { DemoIcon } from "./icons";

export const projects = [
    {
      id: 1,
      title: "Deveduar Blog",
      description: "Responsive blog created with Next.js and React.js",
      imageSrc: "https://i.postimg.cc/43sRYWBk/color-banner-icon.jpg",
      detailedDescription: "My Personal blog for reading markdown posts from the file system with tags and date system",
      technologies: ["Next.js", "React.js", "Tailwind", "Markdown"],
      links: [
        { href: "https://github.com/deveduar/nextjs-blog", label: "GitHub", svg: GitHubIcon },
        { href: "https://nextjs-blog-xi-indol.vercel.app/", label: "Demo", svg: DemoIcon },
      ],
      gallery: [
        "https://i.postimg.cc/2Sqg775z/blog-1-images-proyectos-4.png",
        "https://i.postimg.cc/Vk3pG0SX/blog-1-images-proyectos-3.png",
        "https://i.postimg.cc/c4kV3b09/blog-1-images-proyectos.png",
      ],
      features: [
        "Implemented a custom markdown parser.",
        "Responsive design with Tailwind",
        "Static site generation with Next.js.",
      ],
    },
    {
      id: 2,
      title: "Ecomerce",
      description: "Ecomerce site made with next.js and node.js",
      imageSrc: "https://i.postimg.cc/YSRN7SvK/color-banner-icon-10.jpg",
      detailedDescription: "Developed with next js (Frontend) and Medusa js (backend) with Api drop shipping integration",
      technologies: ["Next.js", "React", "drop shipping", "Medusa.js"],
      links: [
        { href: "https://github.com/deveduar/medusa-store-backend", label: "GitHub Backend", svg: GitHubIcon },
        { href: "https://github.com/deveduar/medusa-store-frontend", label: "GitHub Frontend", svg: GitHubIcon },
      ],
      gallery: [
        
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
      imageSrc: "https://i.postimg.cc/t40jjq6g/color-banner-icon3.jpg",
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
        "https://i.postimg.cc/kXSHpFSw/todo-1-min.png",
        "https://i.postimg.cc/DfHD6YS8/todo-4-min.png",
        "https://i.postimg.cc/ZYG7pBQN/todo-notes-7-min.png",
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
      imageSrc: "https://i.postimg.cc/8zhVk2dm/color-banner-icon4.jpg",
      detailedDescription: "Developed with TypeScript, Angular, Node.js",
      technologies: ["Angular", "NodeJS", "Typescript", "SASS", "Express"],
      links: [
        { href: "https://github.com/deveduar/angular-SGI-front", label: "GitHub Frontend", svg: GitHubIcon },
        { href: "https://github.com/deveduar/inventory-backend.git", label: "GitHub Backend", svg: GitHubIcon },
      ],
      gallery: [
        "https://i.postimg.cc/1zXXHTq8/localhost-4200-inventory-2-min.png",
        "https://i.postimg.cc/QdXHBVNk/localhost-4200-inventory-6-min.png",
        "https://i.postimg.cc/5ydtf2kz/localhost-4200-inventory-7-min.png",
      ],
      features: [
        "Backend connection with Printfull API.",
        "Responsive design with Sass.",
        "Static site generation with Angular.",
      ],
    },
    {
      id: 5,
      title: "Python Tools",
      description: "A collection of Python scripts for various file and media conversions.",
      imageSrc: "https://i.postimg.cc/pTcw1RxR/color-banner-icon6.jpg",
      detailedDescription: "Scripts developed to automate and simplify common tasks such as file conversions and media extraction.",
      technologies: ["Python", "Scripting", "Automation"],
      links: [
        { href: "https://github.com/deveduar/omnivore-to-raindrop", label: "Omnivore to Raindrop", svg: GitHubIcon },
        { href: "https://github.com/deveduar/pdf-to-cbr.git", label: "PDF to CBR Converter", svg: GitHubIcon },
        { href: "https://github.com/deveduar/you-mp3-python", label: "YouTube to MP3 Converter", svg: GitHubIcon }
      ],
      gallery: [
        
      ],
      features: [
        "Convert PDFs to CBR format for digital reading.",
        "Extract audio from YouTube videos to MP3 format.",
        "Convert JSON files or format data for easier handling."
      ]
    },
    {
      id: 6,
      title: "Services Booking App",
      description: "A Vue 3 and Vuetify application for browsing and booking services.",
      imageSrc: "https://i.postimg.cc/C1KyNd3c/color-banner-icon5.jpg",
      detailedDescription: "A modern service booking application built with Vue 3 and Vuetify, featuring dynamic filtering, sorting, and interactive UI elements. Users can browse services, filter by category, sort by price or duration, and proceed with booking seamlessly.",
      technologies: ["Vue 3", "TypeScript", "Vuetify", "Composition API"],
      links: [
        { href: "https://github.com/deveduar/booking-app", label: "GitHub Repository", svg: GitHubIcon }
      ],
      gallery: [
        // "https://i.postimg.cc/Y2FH0CmX/service-booking-1.jpg",
        // "https://i.postimg.cc/NFkBybf0/service-booking-2.jpg",
        // "https://i.postimg.cc/qv6pT9Vp/service-booking-3.jpg"
      ],
      features: [
        "Dynamically filter and sort services.",
        "Interactive UI with Vuetify components.",
        "Easily extendable with additional service categories.",
        "Efficient state management using Vue Composition API."
      ]
    },
    {
      id: 7,
      title: "Merakikrea Cerámica",
      description: "A landing page inspired by Google Business Profile to showcase store information and facilitate easy contact.",
      // imageSrc: "https://i.postimg.cc/1XLLsBfd/color-banner-icon8.jpg",
      imageSrc: "https://i.postimg.cc/jqJdfFtB/iphone-meraki-mockup.webp",
      detailedDescription: "An optimized landing page built with Next.js and Tailwind CSS, presenting key information about Merakikrea Cerámica. It includes location details, social media links, opening hours, direct WhatsApp contact, and an Instagram feed.",
      technologies: ["Next.js", "TypeScript", "Tailwind", "ShadCN UI", "Framer Motion"],
      links: [
        { href: "https://github.com/deveduar/merakikrea-landing", label: "GitHub Repository", svg: GitHubIcon },
        { href: "https://meraki-krea-ceramica-six.vercel.app", label: "Live Demo", svg: DemoIcon }
      ],
      gallery: [
        "https://i.postimg.cc/5032x1kZ/pc-meraki-mockup.webp",
        "https://i.postimg.cc/jqJdfFtB/iphone-meraki-mockup.webp",
        "https://i.postimg.cc/tRncx9yj/cera-2-images-proyectos.jpg",
        "https://i.postimg.cc/jqJdfFtB/iphone-meraki-mockup.webp"
      ],
      features: [
        "Responsive and accessible design.",
        "Light/Dark mode with Tailwind CSS.",
        "Integration with Google Maps and WhatsApp.",
        "SEO optimized for better visibility.",
        "Google reviews and social media section.",
        "Floating WhatsApp button for quick contact."
      ],
    }
  ];