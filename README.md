# My Portfolio

A **Bento-style portfolio** developed with **Next.js 14**, **TypeScript**, and **Tailwind CSS** to showcase my projects, skills, and experience. Featuring **smooth snap scrolling** and **theme customization** with Dracula and Catppuccin color palettes.

## Features

- **Modern UI/UX** - Bento-grid layout with smooth snap scrolling navigation
- **Snap Scrolling** - Custom hook for section snapping with mouse wheel and touch support
- **Project showcase** - Integrated with GitHub to fetch project details from READMEs
- **Optimized performance** - Uses `next/image` for fast loading
- **Static site** - SEO and performance with Next.js app router
- **Theme System** - Dracula & Catppuccin themes with customizable accent colors
- **Fully Responsive** - Works on all devices
- **Deployed on Vercel** - Fast and reliable hosting

## Theme System

### Base Themes
- **Catppuccin Mocha** (default) - Dark theme with warm muted colors
- **Catppuccin Macchiato** - Dark theme with softer tones
- **Catppuccin Frappe** - Dark theme with balanced contrast
- **Catppuccin Latte** - Light theme companion to Mocha
- **Dracula** - Classic dark theme
- **Alucard** - Light theme companion to Dracula

### Accent Color Schemes (Mocha)
Pick your accent color from 14 options: Rosewater, Flamingo, Pink, Mauve, Red, Maroon, Peach, Yellow, Green, Teal, Sky, Sapphire, Blue, Lavender

### Accent Color Schemes (Dracula)
Pick your accent color: Red, Green, Yellow, Pink, Cyan

All themes support light/dark mode with system preference detection.

## Tech Stack

- **Next.js 14** - App router & server components
- **TypeScript** - Strongly typed codebase
- **Tailwind CSS** - Utility-first styling with CSS variables
- **Custom Hooks** - Scroll snapping, theme management
- **GitHub Integration** - Fetch project details dynamically
- **Vercel** - Deployment and hosting

## Getting Started

### Clone the repository
```bash
git clone https://github.com/deveduar/nextjs-portfolio.git
cd nextjs-portfolio
```

### Install dependencies
```bash
npm install
```

### Run the development server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** to view in the browser.

## Live Demo

**Check it out live:** [deveduar-portfolio.vercel.app](https://deveduar-portfolio.vercel.app/)

## Recent Improvements

- **Theme System** - Implemented full theming with CSS variables and ThemeContext
- **Dracula & Catppuccin** - Added base palettes for both dark and light modes
- **Accent Colors** - 14 Mocha + 5 Dracula accent color options
- **Scroll Snap** - Custom hook replacing AOS for section navigation
- **Project Cards** - Improved layout with hover image reveal animation
- **Table View** - Added borders between columns for better separation

## Future Improvements

- Add project demo videos/screenshots
- Implement blog section for technical articles
- Improve accessibility and mobile gestures

## Contact

If you have any questions or feedback, feel free to reach out!

## License

This project is MIT licensed. Feel free to use and modify it!