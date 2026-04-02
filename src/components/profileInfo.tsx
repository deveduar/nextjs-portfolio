"use client"
import React from "react";
import Image from "next/image";

interface ProfileInfoProps {
  name: string;
  specialty: string;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ name, specialty }) => {
  return (
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
  );
};

export default ProfileInfo;
