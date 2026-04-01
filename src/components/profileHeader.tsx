"use client"
import React from "react";
import ProfileInfo from "./profileInfo";
import TechMarquee from "./techMarquee";

interface ProfileHeaderProps {
  name: string;
  specialty: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, specialty }) => {
  return (
    <div className="flex flex-row gap-4">
      <div className="flex flex-row gap-4 w-full">
        <ProfileInfo name={name} specialty={specialty} />
      </div>
      <TechMarquee />
    </div>
  );
};

export default ProfileHeader;
