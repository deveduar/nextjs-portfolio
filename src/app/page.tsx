"use client";
import React from "react";
import Hero from "@/components/hero";
import profile from '@/data/profile';

const Home: React.FC = () => {

  return (
    <div className="flex flex-col w-full">
      <section className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
        <div className="w-full">
          <Hero
            name={profile.name}
            specialty={profile.specialty}
            description={profile.description}
            socialLinks={profile.socialLinks}
          />
        </div>
      </section>
    </div>
  );
};

export default Home;