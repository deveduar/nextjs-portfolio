"use client";
import React from "react";
import TechTags from "@/components/techTags";
import profile from "@/data/profile";

export default function AboutBottom() {
  return (
    <section className="flex flex-col justify-between px-4 py-8 min-h-[calc(100vh-56px)]">
      <div className="flex-1 flex flex-col justify-center w-full">
        <div className="max-w-2xl mx-auto w-full overflow-auto">
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
              <div className="space-y-3 mb-5">
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
}