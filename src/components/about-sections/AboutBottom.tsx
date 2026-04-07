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
            <h3 className="mb-3 text-lg font-semibold text-foreground md:text-xl">Skills</h3>
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
              <h3 className="mb-3 text-lg font-semibold text-foreground md:text-xl">Experience</h3>
              <div className="space-y-3">
                {profile.workExperience.map((exp, i) => (
                  <div key={i} className="border-l-2 border-accent pl-3">
                    <p className="text-base font-medium text-foreground">{exp.title}</p>
                    <p className="text-sm text-muted">{exp.company} • {exp.period}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold text-foreground md:text-xl">Education</h3>
              <div className="space-y-3 mb-5">
                {profile.education.map((edu, i) => (
                  <div key={i} className="border-l-2 border-accent-alt pl-3">
                    <p className="text-base font-medium text-foreground">{edu.title}</p>
                    <p className="text-sm text-muted">{edu.institution} • {edu.year}</p>
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
