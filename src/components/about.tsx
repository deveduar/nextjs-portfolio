"use client"
import React, { useEffect, useRef } from "react";
import StackIcon from "tech-stack-icons";
import Image from "next/image";
import { FaTrophy, FaCode, FaUsers } from "react-icons/fa";

interface AboutProps {
  technologies: string[];
}

const About: React.FC<AboutProps> = ({ technologies}) => {
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

      <div className=" mx-auto text-gray-900 dark:text-white " data-aos="zoom-in">
        {/* About Me Section */}
        <div className="flex flex-col sm:flex-col 
        md:flex-row-reverse bg-white  dark:bg-gray-800 rounded-3xl justify-between p-6 items-center ">
          <div className="  flex justify-center  md:mb-0 mx-0 p-0" >
            <Image
              src="/images/profile.jpeg"
              width={300}
              height={300}
              alt="Profile Picture"
              className="rounded-full  shadow-lg"
            />
          </div>
          <div className="w-full md:w-2/3 ">
          <h2 className="text-4xl font-bold mb-4">About Me</h2>
          <p className="text-lg mb-6 leading-relaxed">
            Hi, I&apos;m Eduardo, a passionate web developer with expertise in creating responsive and scalable web applications. I enjoy working with modern technologies and am always eager to learn and improve my skills.
          </p>
          <p className="text-lg leading-relaxed">
            You can contact me on{" "}
            <a className="font-bold" href="http://www.linkedin.com/in/deveduar" target="_blank">
              Linkedin
            </a>{" "}
            or see my activity on{" "}
            <a className="font-bold" href="https://github.com/deveduar" target="_blank">
              Github
            </a>
            .
          </p>
        </div>

      </div>

        {/* <h2 className="text-2xl font-bold text-black dark:text-white  mt-6">Skills</h2> */}

        {/* Skill Highlights */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-4 lg:gap-6 my-6">
          <div className="flex flex-col items-start text-left p-6 bg-white dark:bg-gray-800  text-gray-900 rounded-xl shadow-lg hover:shadow-lg  transition-all duration-300 dark:text-white  dark:hover:shadow-gray-900">
            <FaTrophy className="text-4xl mb-4 text-yellow-500 dark:text-yellow-300" />
            <h3 className="text-2xl font-bold mb-4">Problem Solving</h3>
            <p className="text-lg mb-6">
            I excel in identifying challenges and finding creative solutions through structured problem-solving techniques. Whether it&apos;s optimizing performance or building scalable systems, I always aim for the most efficient solution.  
            </p>
          </div>
          <div className="flex flex-col items-start text-left p-6 bg-white text-gray-900 rounded-xl shadow-lg hover:shadow-lg  transition-all duration-300 dark:bg-gray-800 dark:text-white  dark:hover:shadow-gray-900">
            <FaCode className="text-4xl mb-4 text-teal-500 dark:text-teal-300" />
            <h3 className="text-2xl font-bold mb-4">Development</h3>
            <p className="text-lg mb-6">
            My passion for coding drives me to build clean, maintainable, and performant code. I&apos;m proficient in modern web technologies, and I continuously learn to stay ahead of industry trends. Whether it&apos;s backend, frontend, or full-stack, I&apos;m comfortable in all.
            </p>
          </div>
          <div className="flex flex-col items-start text-left p-6 bg-white text-gray-900 rounded-xl shadow-lg hover:shadow-lg  transition-all duration-300 dark:bg-gray-800 dark:text-white   
          dark:hover:shadow-gray-900 ">
            <FaUsers className="text-4xl mb-4 text-blue-500 dark:text-blue-300" />
            <h3 className="text-2xl font-bold mb-4">Team Collaboration</h3>
            <p className="text-lg mb-6">
            I believe in the power of teamwork. I collaborate effectively with cross-functional teams to achieve project goals. Communication, empathy, and adaptability are key to creating a harmonious and productive working environment.  
            </p>
          </div>
        </div>

        {/* <h2 className="text-2xl font-bold text-black dark:text-white mb-6 ">Tech Stack</h2> */}
  
        <div className="w-full bg-white dark:bg-gray-800 pt-6 pb-3 rounded-lg my-6 px-6"> 
  <div className="flex gap-3 flex-wrap justify-between">
    {technologies.map((tech, index) => (
      <div key={index} className="flex h-8 items-center justify-between rounded-xl bg-gray-200 dark:bg-gray-700 px-4 transition-transform transform hover:scale-105 basis-[calc(50%-0.375rem)] sm:basis-auto">
        <a className="text-sm font-medium dark:text-white">{tech}</a>
      </div>
    ))}
    {/* Placeholders para mantener la distribución uniforme */}
    {[...Array(10)].map((_, index) => (
      <div key={`placeholder-${index}`} className="w-0 h-0 basis-24 opacity-0" />
    ))}
  </div>
</div>
        {/* Tech Stack Animated Section */}
        <div className="marquee relative overflow-hidden whitespace-nowrap py-6" ref={marqueeRef}>
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
              <StackIcon name="vuejs" className="w-20 h-20 mx-4" />

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
              <StackIcon name="vuejs" className="w-20 h-20 mx-4" />
            </div>
          </div>

      </div>
  );
};

export default About;
