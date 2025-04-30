// src/components/ProfileSidebar.tsx
import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

interface Props {
  username: string;
  onClose: () => void;
}

const ProfileSidebar: React.FC<Props> = ({ username, onClose }) => {
  const handleLogout = async () => {
    await signOut(auth);
    onClose(); // Close panel after logout
  };

  return (
    <div className="fixed top-0 right-0 h-full w-72 bg-white shadow-lg z-50 transform transition-transform duration-300">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold">Account</h2>
        <button onClick={onClose} className="text-gray-600 text-lg">✕</button>
      </div>

      <div className="p-4 space-y-4">
        {/* User Info */}
        <div className="bg-gray-100 p-4 rounded">
          <p className="font-medium text-gray-800">User:</p>
          <p>{username}</p>
        </div>

        {/* Account Settings */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Settings</h3>
          <ul className="space-y-2 text-sm">
            <li><button className="hover:text-green-600">Account Settings</button></li>
            <li><button className="hover:text-green-600">Theme / Preferences</button></li>
          </ul>
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
