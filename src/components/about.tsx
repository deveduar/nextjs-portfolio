import React from "react";
import Image from "next/image";
import Link from "next/link";

const About: React.FC = () => {
  return (
    <>
      <section className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white pt-20 pb-[120px] mt-7 rounded-xl " data-aos="zoom-in">
        <div className="container mx-auto px-4">
          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] xl:gap-[134px] items-center">
            <div className="mx-auto">
              <Image
                src="/images/pc-1.png"
                alt="about me"
                width={500}
                height={500}
              />
            </div>
            <div className="font-bold font-Syne leading-none flex flex-wrap flex-col gap-y-2">
              <span className="text-orange-500 text-xl">About me</span>
              <h3 className="text-black dark:text-white text-4xl lg:text-5xl xl:text-[64px] tracking-[-1.5px]">
                Mark Henry
              </h3>
              <h4 className="text-black dark:text-white text-2xl mt-3 mb-4">Product Designer</h4>
              <p className="text-xl font-bold font-Syne leading-7 mb-6">
                A Product Designer & Developer and I am in the game for over 7+ years. I am proud of my
                works and ready to face the next challenge.
              </p>
              <p className="text-lg mb-6">
                That is where I come in. A lover of words, a wrangler of copy. Here to create copy that not
                only reflects who you are and what you stand for, but words that truly land with those that
                read them, calling your audience in and making them feel connected.
              </p>
              <div>
                <Image src="/assets/images/signature.svg" alt="signature" width={100} height={50} />
              </div>
            </div>
          </div> */}

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

          <div className="mt-20">
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
