import React from "react";
import Image from "next/image";
import Link from "next/link";

const About: React.FC = () => {
  return (
    <>
      <section className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white pt-5 pb-[60px] mt-7 rounded-xl " data-aos="zoom-in">
        <div className=" mt-1 container mx-auto px-4">


          <div className="mt-1">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-8 text-center	">Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Web Development</h3>
                <p className="text-lg">Building responsive and scalable web applications using modern technologies.</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4">UI/UX Design</h3>
                <p className="text-lg">Designing user-friendly interfaces with a focus on user experience and accessibility.</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Consulting</h3>
                <p className="text-lg">Providing expert advice and solutions for your business needs.</p>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-8 text-center	">Competencies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4">JavaScript</h3>
                <p className="text-lg">Expertise in JavaScript, including ES6+ features and frameworks like React and Node.js.</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4">CSS & HTML</h3>
                <p className="text-lg">Proficient in writing clean, semantic HTML and modern CSS techniques.</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Problem-Solving</h3>
                <p className="text-lg">Strong problem-solving skills with a focus on delivering efficient solutions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
