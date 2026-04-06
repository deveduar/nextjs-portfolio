"use client"
import React from "react";
import Image from "next/image";
import profile from "@/data/profile";
import TechTags from "@/components/techTags";

const AboutSection: React.FC = () => {
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

          <div className="mb-8">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-300 mb-3">Skills</h3>
            <TechTags
              technologies={[
                ...profile.skills.programmingLanguages,
                ...profile.skills.frontend.frameworks,
                ...profile.skills.frontend.styles,
                ...profile.skills.backend.frameworks,
                ...profile.skills.backend.databases,
                ...profile.skills.devOps
              ]}
              limit={20}
              colorful={true}
              overlayStyle={false}
              className="flex-wrap gap-2 text-sm"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-300 mb-3">Experience</h3>
              <div className="space-y-3">
                {profile.workExperience.map((exp, i) => (
                  <div key={i} className="border-l-2 border-blue-500 dark:border-blue-400 pl-3">
                    <p className="text-base font-medium text-gray-900 dark:text-gray-200">{exp.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{exp.company} • {exp.period}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-300 mb-3">Education</h3>
              <div className="space-y-3">
                {profile.education.map((edu, i) => (
                  <div key={i} className="border-l-2 border-purple-500 dark:border-purple-400 pl-3">
                    <p className="text-base font-medium text-gray-900 dark:text-gray-200">{edu.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{edu.institution} • {edu.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;