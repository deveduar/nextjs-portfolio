"use client";
import React from "react";
import Hero from "@/components/hero";
import profile from '@/data/profile';

const Home: React.FC = () => {

  return (
    <div className="flex flex-col w-full py-4">
      <Hero
        name={profile.name}
        specialty={profile.specialty}
        description={profile.description}
        socialLinks={profile.socialLinks}
      />
    </div>
  );
};

export default Home;