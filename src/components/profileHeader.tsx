"use client"
import React, { useEffect, useRef } from "react";
import StackIcon from "tech-stack-icons";
import Image from "next/image";

interface ProfileHeaderProps {
  name: string;
  specialty: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, specialty }) => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    let animationFrameId: number;

    if (marquee) {
      const scrollMarquee = () => {
        if (marquee.scrollLeft >= marquee.scrollWidth / 2) {
          marquee.scrollLeft = 0;
        } else {
          marquee.scrollLeft += 1;
        }
        animationFrameId = requestAnimationFrame(scrollMarquee);
      };

      animationFrameId = requestAnimationFrame(scrollMarquee);

      return () => {
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, []);

  return (
    <div className="flex flex-row gap-4">
      <div className="flex flex-row gap-4 w-full">
        <div className="flex items-center gap-4">
          <Image
            src="/images/profile.webp"
            width={80}
            height={80}
            alt="Profile Picture"
            className="rounded-full shadow-lg"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{name}</h2>
            <p className="text-gray-500 dark:text-gray-400">{specialty}</p>
          </div>
        </div>
      </div>
      <div className="rounded-full lg:rounded-s-full marquee relative overflow-hidden whitespace-nowrap w-16 h-16 sm:w-full sm:h-full" ref={marqueeRef}>
        <div className="inline-flex items-center animate-marquee">
          <StackIcon name="nextjs" className="w-16 h-16 md:w-20 md:h-20 mx-2 dark:invert" />
          <StackIcon name="reactjs" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
          <StackIcon name="typescript" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
          <StackIcon name="js" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
          <StackIcon name="css3" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
          <StackIcon name="tailwindcss" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
          <StackIcon name="sass" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
          <StackIcon name="python" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
          <StackIcon name="nodejs" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
          <StackIcon name="html5" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
          <StackIcon name="github" className="w-16 h-16 md:w-20 md:h-20 mx-2 dark:invert" />
          <StackIcon name="mysql" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
          <StackIcon name="postgresql" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
          <StackIcon name="mongodb" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
          <StackIcon name="vuejs" className="w-16 h-16 md:w-20 md:h-20 mx-2" />

          <StackIcon name="nextjs" className="w-16 h-16 md:w-20 md:h-20 mx-2 dark:invert" />
          <StackIcon name="reactjs" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
          <StackIcon name="typescript" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
          <StackIcon name="js" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
          <StackIcon name="css3" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
          <StackIcon name="tailwindcss" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
          <StackIcon name="sass" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
          <StackIcon name="python" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
          <StackIcon name="nodejs" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
          <StackIcon name="html5" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
          <StackIcon name="github" className="w-16 h-16 md:w-20 md:h-20 mx-2 dark:invert" />
          <StackIcon name="mysql" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
          <StackIcon name="postgresql" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
          <StackIcon name="mongodb" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
          <StackIcon name="vuejs" className="w-16 h-16 md:w-20 md:h-20 mx-2" />
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;