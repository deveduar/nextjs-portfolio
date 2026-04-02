"use client";
import React, { useRef } from "react";
import HeroSection from "@/components/HeroSection";
import AboutProjectsSection from "@/components/AboutProjectsSection";
import profile from '@/data/profile';

const Home: React.FC = () => {
  const firstSectionRef = useRef<HTMLDivElement>(null);
  const secondSectionRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col w-full">
      <div ref={firstSectionRef}>
        <HeroSection
          socialLinks={profile.socialLinks}
          nextSectionRef={secondSectionRef}
        />
      </div>
      <div ref={secondSectionRef}>
        <AboutProjectsSection firstSectionRef={firstSectionRef} />
      </div>
    </div>
  );
};

export default Home;
