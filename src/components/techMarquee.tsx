"use client"
import React, { useEffect, useRef } from "react";
import StackIcon from "tech-stack-icons";

const TechMarquee: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    let animationFrameId: number;

    if (marquee) {
      const scrollMarquee = () => {
        if (marquee.scrollLeft >= marquee.scrollWidth / 2) {
          marquee.scrollLeft = 0;
        } else {
          marquee.scrollLeft += 1;
        }
        animationFrameId = requestAnimationFrame(scrollMarquee);
      };

      animationFrameId = requestAnimationFrame(scrollMarquee);

      return () => {
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, []);

  const techs = [
    "nextjs", "reactjs", "typescript", "js", "css3", "tailwindcss", "sass", 
    "python", "nodejs", "html5", "github", "mysql", "postgresql", "mongodb", "vuejs"
  ];

  return (
    <div className="marquee relative overflow-hidden whitespace-nowrap min-h-[80px]" ref={marqueeRef}>
      <div className="inline-flex items-center animate-marquee">
        {techs.map((tech, index) => (
          <StackIcon key={index} name={tech} className="w-16 h-16 md:w-20 md:h-20 mx-2 dark:invert" />
        ))}
        {techs.map((tech, index) => (
          <StackIcon key={`dup-${index}`} name={tech} className="w-16 h-16 md:w-20 md:h-20 mx-2 dark:invert" />
        ))}
      </div>
    </div>
  );
};

export default TechMarquee;
