// src/components/ProfileImage.tsx
import React from 'react';

interface ProfileImageProps {
  username: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ username }) => {
  const firstLetter = username.charAt(0).toUpperCase();
  const bgColor = "bg-[#6D2764]"; // Default background color
  const textColor = "text-white"; // Text color

  return (
    <div
      className={`${bgColor} ${textColor} w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg`}
    >
      {firstLetter}
    </div>
  );
};

export default ProfileImage;
