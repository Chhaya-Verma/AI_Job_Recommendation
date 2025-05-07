// src/components/ProfileSidebar.tsx
import React, { useRef, useState } from "react";
import { auth } from "../firebase";
import { signOut, updateProfile } from "firebase/auth";
import { uploadProfileImage } from "../utils/uploadProfileImage";

interface Props {
  username: string;
  photoURL: string | null;
  onClose: () => void;
  onPhotoChange: (newURL: string) => void;
}

const ProfileSidebar: React.FC<Props> = ({ username, photoURL, onClose, onPhotoChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    onClose();
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !auth.currentUser) return;

    setIsUploading(true);
    try {
      const downloadURL = await uploadProfileImage(file, auth.currentUser.uid);

      await updateProfile(auth.currentUser, {
        photoURL: downloadURL,
      });

      onPhotoChange(downloadURL);
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed top-4 right-4 w-72 bg-white shadow-xl z-50 rounded-lg transition-transform duration-300 max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold">Account</h2>
        <button onClick={onClose} className="text-gray-600 text-lg">✕</button>
      </div>

      <div className="p-4 space-y-4">
        {/* Profile Image */}
        <div className="flex justify-center">
          <div className="relative cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            {photoURL ? (
              <img src={photoURL} alt="Profile" className="w-24 h-24 rounded-full object-cover border" />
            ) : (
              <div className="bg-[#6D2764] text-white w-24 h-24 rounded-full flex items-center justify-center font-bold text-2xl">
                {username.charAt(0).toUpperCase()}
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
            />
            {isUploading && <p className="text-center text-sm text-gray-500">Uploading...</p>}
          </div>
        </div>

        {/* Username */}
        <div className="bg-gray-100 p-4 rounded text-center">
          <p className="font-medium text-gray-800">User:</p>
          <p>{username}</p>
        </div>

      
        

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileSidebar;
