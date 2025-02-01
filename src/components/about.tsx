"use client"
import React, { useEffect, useRef } from "react";
import StackIcon from "tech-stack-icons";
import Image from "next/image";
import { FaTrophy, FaCode, FaUsers } from "react-icons/fa";
import Link from "next/link";

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
    <section  id="about" className=" text-gray-900 dark:text-white  pb-10  rounded-xl " data-aos="zoom-in">
      <div className="container mx-auto">
        {/* About Me Section */}
        <div className="flex flex-col sm:flex-row-reverse items-center mb-4">
          <div className="w-full md:w-1/3 flex justify-center mb-10 md:mb-0">
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
          <p className="text-lg mb-6">
            Hi, I&apos;m Eduardo, a passionate web developer with expertise in creating responsive and scalable web applications. I enjoy working with modern technologies and am always eager to learn and improve my skills.
          </p>
          <p>
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

        <h2 className="text-2xl font-bold text-black dark:text-white mb-8 ">Skills</h2>

        {/* Skill Highlights */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-4 lg:gap-6 mb-10">
          <div className="flex flex-col items-start text-left p-6 bg-white text-gray-900 rounded-xl shadow-lg hover:shadow-xl  transition-all duration-300 dark:bg-gray-800 dark:text-white  dark:hover:shadow-gray-900">
            <FaTrophy className="text-4xl mb-4 text-yellow-500 dark:text-yellow-300" />
            <h3 className="text-2xl font-bold mb-4">Problem Solving</h3>
            <p className="text-lg mb-6">
            I excel in identifying challenges and finding creative solutions through structured problem-solving techniques. Whether it&apos;s optimizing performance or building scalable systems, I always aim for the most efficient solution.  
            </p>
          </div>
          <div className="flex flex-col items-start text-left p-6 bg-white text-gray-900 rounded-xl shadow-lg hover:shadow-xl  transition-all duration-300 dark:bg-gray-800 dark:text-white  dark:hover:shadow-gray-900">
            <FaCode className="text-4xl mb-4 text-teal-500 dark:text-teal-300" />
            <h3 className="text-2xl font-bold mb-4">Development</h3>
            <p className="text-lg mb-6">
            My passion for coding drives me to build clean, maintainable, and performant code. I&apos;m proficient in modern web technologies, and I continuously learn to stay ahead of industry trends. Whether it&apos;s backend, frontend, or full-stack, I&apos;m comfortable in all.
            </p>
          </div>
          <div className="flex flex-col items-start text-left p-6 bg-white text-gray-900 rounded-xl shadow-lg hover:shadow-2xl  transition-all duration-300 dark:bg-gray-800 dark:text-white   
          dark:hover:shadow-gray-900 ">
            <FaUsers className="text-4xl mb-4 text-blue-500 dark:text-blue-300" />
            <h3 className="text-2xl font-bold mb-4">Team Collaboration</h3>
            <p className="text-lg mb-6">
            I believe in the power of teamwork. I collaborate effectively with cross-functional teams to achieve project goals. Communication, empathy, and adaptability are key to creating a harmonious and productive working environment.  
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-black dark:text-white mb-8 ">Tech Stack</h2>


        {/* Tech Stack Animated Section */}
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
        {/* Skills tags */}
        <div className="flex gap-3 flex-wrap mt-10">
          {technologies.map((tech, index) => (
            <div key={index} className="flex h-8 items-center justify-center rounded-xl bg-gray-700 px-4 transition-transform transform hover:scale-105">
              <a className="text-sm font-medium text-white">{tech}</a>
            </div>
          ))}
        </div>
        {/* Detailed Skill Section */}
        <div className="mt-20 flex flex-col items-center justify-center">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">Why Choose Me?</h3>
          <p className="text-lg max-w-5xl mb-8 text-left">
            I'm a versatile developer who can handle a wide range of challenges, from architecting complex systems to ensuring smooth user experiences. I take pride in writing code that is both functional and elegant, ensuring that the end product is not only effective but also easy to maintain.
          </p>
          <p className="text-lg max-w-5xl mb-8 text-left">
            Beyond my technical abilities, I'm a lifelong learner who thrives in a fast-paced, ever-changing environment. I’m passionate about continuous improvement, both as a developer and as a team member. I am driven to contribute to meaningful projects that make a positive impact.
          </p>
          <div className="flex justify-center mt-6">
            <Link href="/contactView" className="px-6 py-3 bg-yellow-500 text-gray-900 rounded-lg font-semibold hover:bg-yellow-600 transition-all duration-300 dark:bg-yellow-400 dark:text-gray-900 dark:hover:bg-yellow-500">
              Let’s Connect
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
