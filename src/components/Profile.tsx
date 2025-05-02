// // src/components/ProfileImage.tsx
// import React from 'react';

// interface ProfileImageProps {
//   username: string;
//   photoURL?: string | null;
// }

// const ProfileImage: React.FC<ProfileImageProps> = ({ username }) => {
//   const firstLetter = username.charAt(0).toUpperCase();
//   const bgColor = "bg-[#6D2764]"; // Default background color
//   const textColor = "text-white"; // Text color

//   return photoURL ? (
//     <img
//       src={photoURL}
//       alt="Profile"
//       className="w-12 h-12 rounded-full object-cover"
//     />
//   ) : (
//     <div className="bg-[#6D2764] text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
//       {firstLetter}
//     </div>
//   );
// };


// export default ProfileImage;




// src/components/ProfileImage.tsx
import React from 'react';

interface ProfileImageProps {
  username: string;
  photoURL?: string | null;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ username, photoURL }) => {
  const firstLetter = username.charAt(0).toUpperCase();

  return photoURL ? (
    <img
      src={photoURL}
      alt="Profile"
      className="w-12 h-12 rounded-full object-cover"
    />
  ) : (
    <div className="bg-white text-[#6D2764] w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
      {firstLetter}
    </div>
  );
};

export default ProfileImage;
