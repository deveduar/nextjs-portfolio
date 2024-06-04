import React from "react";
import Image from "next/image";
import Link from "next/link";

interface HeroProps {
  title: string;
  subtitle: string;
  imageSrc: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, imageSrc }) => {
  return (
    <>
      <div className="bg-gray-900 text-white py-7 space-y-2 rounded-xl">
        <div className="container mx-auto flex flex-col md:flex-row items-center md:px-12 px-20">
          <div className="justify-center md:w-1/1">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
            <p className="text-xl md:text-2xl mb-6">{subtitle}</p>

            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-7 py-2">
              <div className="flex items-center justify-center">
                <Link
                  href="#projects"
                  className="inline-flex bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                >
                  View My Work
                </Link>
              </div>
              {/* <div className="flex justify-center space-x-4">
                <Link
                  href="https://github.com/deveduar"
                  passHref
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-transform transform hover:scale-110"
                >
                  <Image
                    src="/icons/github.svg"
                    alt="GitHub"
                    width={30}
                    height={30}
                    className="filter invert dark:invert-1"
                  />
                </Link>
                <Link
                  href="https://twitter.com/deveduar"
                  passHref
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-transform transform hover:scale-110"
                >
                  <Image
                    src="/icons/twitter.svg"
                    alt="Twitter"
                    width={30}
                    height={30}
                    className="filter invert dark:invert-1"
                  />
                </Link>
                <Link
                  href="http://www.linkedin.com/in/deveduar"
                  passHref
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-transform transform hover:scale-110"
                >
                  <Image
                    src="/icons/linkedin.svg"
                    alt="LinkedIn"
                    width={30}
                    height={30}
                    className="filter invert dark:invert-1"
                  />
                </Link>
              </div> */}
            </div>
          </div>
          <div className="hidden md:block md:w-1/2 mt-8 md:mt-0 ml-auto">
            <Image src={imageSrc} alt={title} height={500} width={500} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
