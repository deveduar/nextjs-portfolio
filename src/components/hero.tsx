"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Typewriter from 'typewriter-effect';

interface HeroProps {
  title: string;
  subtitle: string;
  imageSrc: string;
}

const LinkedInIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="25"
    fill="currentColor"
    viewBox="0 0 24 24"
    className="hover:scale-110 transition-transform duration-300"
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.25c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.25h-3v-5.6c0-1.337-.025-3.062-1.866-3.062-1.866 0-2.154 1.459-2.154 2.963v5.699h-3v-10h2.869v1.367h.041c.399-.756 1.375-1.555 2.832-1.555 3.027 0 3.588 1.994 3.588 4.586v5.602z" />
  </svg>
);

const TwitterIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="25"
    fill="currentColor"
    viewBox="0 0 24 24"
    className="hover:scale-110 transition-transform duration-300"
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-.139 9.237c.209 4.617-3.234 9.765-9.33 9.765-1.854 0-3.579-.543-5.032-1.475 1.742.205 3.48-.278 4.86-1.359-1.437-.027-2.649-.976-3.066-2.28.515.098 1.021.069 1.482-.056-1.579-.317-2.668-1.739-2.633-3.26.442.246.949.394 1.486.411-1.461-.977-1.875-2.907-1.016-4.383 1.619 1.986 4.038 3.293 6.766 3.43-.479-2.053 1.08-4.03 3.199-4.03.943 0 1.797.398 2.395 1.037.748-.147 1.451-.42 2.086-.796-.246.767-.766 1.41-1.443 1.816.664-.08 1.297-.256 1.885-.517-.439.656-.996 1.234-1.639 1.697z" />
  </svg>
);

const GitHubIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="25"
    fill="currentColor"
    viewBox="0 0 24 24"
    className="hover:scale-110 transition-transform duration-300"
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-4.466 19.59c-.405.078-.534-.171-.534-.384v-2.195c0-.747-.262-1.233-.55-1.481 1.782-.198 3.654-.875 3.654-3.947 0-.874-.312-1.588-.823-2.147.082-.202.356-1.016-.079-2.117 0 0-.671-.215-2.198.82-.64-.18-1.324-.267-2.004-.271-.68.003-1.364.091-2.003.269-1.528-1.035-2.2-.82-2.2-.82-.434 1.102-.16 1.915-.077 2.118-.512.56-.824 1.273-.824 2.147 0 3.064 1.867 3.751 3.645 3.954-.229.2-.436.552-.508 1.07-.457.204-1.614.557-2.328-.666 0 0-.423-.768-1.227-.825 0 0-.78-.01-.055.487 0 0 .525.246.889 1.17 0 0 .463 1.428 2.688.944v1.489c0 .211-.129.459-.528.385-3.18-1.057-5.472-4.056-5.472-7.59 0-4.419 3.582-8 8-8s8 3.581 8 8c0 3.533-2.289 6.531-5.466 7.59z" />
  </svg>
);

const Hero: React.FC<HeroProps> = ({ title, subtitle, imageSrc }) => {
  return (
    <div className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white py-7 space-y-2 rounded-xl">
      <div className="container mx-auto flex flex-col lg:flex-row md:px-12 px-6">
        {/* Sección de la imagen visible solo en pantallas pequeñas */}
        <div className="lg:hidden">
          <Image className="rounded-full mx-auto mb-6" src={imageSrc} alt={title} height={200} width={200} />
        </div>

        {/* Sección del texto */}
        <div className="flex flex-col items-center lg:items-start lg:w-1/2 relative lg:mr-40">
          <h3 className="text-4xl md:text-5xl font-bold mb-1 text-center lg:text-left whitespace-nowrap">
            <Typewriter
              options={{
                autoStart: true,
                loop: true,
              }}
              onInit={(typewriter) => {
                typewriter.typeString(title)
                  .callFunction(() => {
                    // console.log('String typed out!');
                  })
                  .pauseFor(2500)
                  .deleteAll()
                  .typeString("Full Stack Developer")
                  .pauseFor(1000)
                  .deleteAll()
                  .pauseFor(2500)
                  .typeString("System Administrator")
                  .pauseFor(2500)
                  .start();
              }}
            />
          </h3>
          <p className="text-xl md:text-2xl mb-6 mt-2 text-center lg:text-left">{subtitle}</p>
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-7 py-2">
            <div className="flex items-center justify-center lg:justify-start">
              <Link
                href="#projects"
                className="inline-flex dark:bg-gray-200 dark:hover:bg-gray-400 bg-gray-800 hover:bg-gray-500 dark:text-gray-900 text-white font-bold py-2 px-4 rounded-full"
              >
                View My Work
              </Link>
            </div>
            <div className="flex justify-center lg:justify-start space-x-3 mt-4 sm:mt-0">
              <Link href="http://www.linkedin.com/in/deveduar" target="_blank" className="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-900 dark:text-white hover:bg-primary transition-all duration-300">
                {LinkedInIcon}
              </Link>
              <Link href="https://twitter.com/deveduar" target="_blank" className="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-900 dark:text-white hover:bg-primary transition-all duration-300">
                {TwitterIcon}
              </Link>
              <Link href="https://github.com/deveduar" target="_blank" className="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-900 dark:text-white hover:bg-primary transition-all duration-300">
                {GitHubIcon}
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden lg:block">
          <Image className="rounded-full" src={imageSrc} alt={title} height={200} width={250} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
