"use client";
import React from "react";
import Image from "next/image";
import profile from "@/data/profile";

export default function AboutTop() {
  return (
    <section className="flex flex-col justify-between px-4 py-8 min-h-screen">
      <div className="flex-1 flex flex-col justify-center">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
            <Image
              src="/images/profile.webp"
              width={100}
              height={100}
              alt="Profile"
              className="rounded-full"
            />
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                {profile.name}
              </h1>
              <p className="text-lg md:text-xl text-blue-600 dark:text-blue-400 font-medium">
                Full Stack Developer & System Administrator
              </p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            {profile.description.map((paragraph, i) => (
              <p key={i} className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="flex items-center gap-2 text-lg mb-8">
            <span className="text-gray-500 dark:text-gray-400">📍 Spain</span>
            <span className="text-gray-500 dark:text-gray-400">•</span>
            <span className="text-blue-600 dark:text-blue-400 font-medium">Available for projects</span>
          </div>
        </div>
      </div>
    </section>
  );
}