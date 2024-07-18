"use client"
import React, { useEffect, useRef } from "react";
import StackIcon from "tech-stack-icons";
import Image from "next/image";

const About: React.FC = () => {
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

  return (
    <section  id="about" className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white pt-10 pb-10 mt-10 rounded-xl" data-aos="zoom-in">
      <div className="container mx-auto px-8">
        {/* About Me Section */}
        <div className="flex flex-col md:flex-row items-center mb-16">
          <div className="w-full md:w-1/3 flex justify-center mb-10 md:mb-0">
            <Image
              src="/images/profile.jpeg"
              width={100}
              height={100}
              alt="Profile Picture"
              className="rounded-full w-48 h-48 md:w-60 md:h-60 shadow-lg"
            />
          </div>
          <div className="w-full md:w-2/3 md:pl-10">
            <h2 className="text-4xl font-bold mb-4">About Me</h2>
            <p className="text-lg mb-6">
              Hi, I'm Eduardo, a passionate web developer with expertise in creating responsive and scalable web applications. I enjoy working with modern technologies and am always eager to learn and improve my skills.
            </p>
            <p>
            You can contact me on{" "}
            <a className="font-bold" href="http://www.linkedin.com/in/deveduar" target="_blank">
              Linkedin{" "}
            </a>
            or see my activity{" "}
            <a className="font-bold" href="https://github.com/deveduar" target="_blank">
              Github
            </a>
            .
          </p>
          </div>
        </div>

        {/* Tech Stack Section */}
        {/* <h2 className="text-3xl font-bold text-black dark:text-white mb-8 text-center">Tech Stack</h2> */}
        <div className="marquee relative overflow-hidden whitespace-nowrap" ref={marqueeRef}>
          <div className="inline-flex items-center animate-marquee">
            <StackIcon name="nextjs" className="w-20 h-20 mx-4 dark:invert" />
            <StackIcon name="reactjs" className="w-20 h-20 mx-4 " />
            <StackIcon name="typescript" className="w-20 h-20 mx-4" />
            <StackIcon name="js" className="w-20 h-20 mx-4" />
            <StackIcon name="css3" className="w-20 h-20 mx-4" />
            <StackIcon name="tailwindcss" className="w-20 h-20 mx-4" />
            <StackIcon name="sass" className="w-20 h-20 mx-4" />
            <StackIcon name="python" className="w-20 h-20 mx-4" />
            <StackIcon name="nodejs" className="w-20 h-20 mx-4" />
            <StackIcon name="html5" className="w-20 h-20 mx-4" />
            <StackIcon name="github" className="w-20 h-20 mx-4 dark:invert" />
            <StackIcon name="mysql" className="w-20 h-20 mx-4" />
            <StackIcon name="postgresql" className="w-20 h-20 mx-4" />
            <StackIcon name="mongodb" className="w-20 h-20 mx-4" />
            {/* Duplicated icons for continuous effect */}
            <StackIcon name="nextjs" className="w-20 h-20 mx-4 dark:invert" />
            <StackIcon name="reactjs" className="w-20 h-20 mx-4" />
            <StackIcon name="typescript" className="w-20 h-20 mx-4" />
            <StackIcon name="js" className="w-20 h-20 mx-4" />
            <StackIcon name="css3" className="w-20 h-20 mx-4" />
            <StackIcon name="tailwindcss" className="w-20 h-20 mx-4" />
            <StackIcon name="sass" className="w-20 h-20 mx-4" />
            <StackIcon name="python" className="w-20 h-20 mx-4" />
            <StackIcon name="nodejs" className="w-20 h-20 mx-4" />
            <StackIcon name="html5" className="w-20 h-20 mx-4" />
            <StackIcon name="github" className="w-20 h-20 mx-4 dark:invert" />
            <StackIcon name="mysql" className="w-20 h-20 mx-4" />
            <StackIcon name="postgresql" className="w-20 h-20 mx-4" />
            <StackIcon name="mongodb" className="w-20 h-20 mx-4" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
