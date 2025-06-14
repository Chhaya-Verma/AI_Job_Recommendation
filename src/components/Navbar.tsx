// src/components/Navbar.tsx
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import ProfileImage from "./Profile";
import ProfileSidebar from "./ProfileSidebar";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [photoURL, setPhotoURL] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.displayName || "Guest");
        setPhotoURL(user.photoURL);
      } else {
        setUsername("Guest");
        setPhotoURL(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <>
      <nav className="bg-[#6D2764] shadow-md relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-white">
                ѕкιℓℓмαт¢ня
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-8 items-center">
              <Link
                to="/home"
                className="text-white hover:text-[#4A1845] font-medium"
              >
                Home
              </Link>
              <Link
                to="/find-jobs"
                className="text-white hover:text-[#4A1845] font-medium"
              >
                Find Jobs
              </Link>
              <Link
                to="/saved-jobs"
                className="text-white hover:text-[#4A1845] font-medium"
              >
                Saved Jobs
              </Link>

              {/* Profile Image */}
              <div className="ml-4 cursor-pointer" onClick={toggleSidebar}>
                <ProfileImage username={username} photoURL={photoURL} />
              </div>
            </div>

            {/* Mobile Nav */}
            <div className="md:hidden flex items-center space-x-3">
              {/* Profile image to the LEFT of hamburger on mobile */}
              <div className="cursor-pointer" onClick={toggleSidebar}>
                <ProfileImage username={username} photoURL={photoURL} />
              </div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-200 hover:text-[#4A1845] focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-md">
            <div className="flex flex-col space-y-2 py-4 px-6">
              <Link
                to="/home"
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-[#4A1845] font-bold"
              >
                Home
              </Link>
              <Link
                to="/find-jobs"
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-[#4A1845] font-bold"
              >
                Find Jobs
              </Link>
              <Link
                to="/saved-jobs"
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-[#4A1845] font-bold"
              >
                Saved Jobs
              </Link>
            </div>
          </div>
        )}
      </nav>

      {showSidebar && (
        <ProfileSidebar
          username={username}
          photoURL={photoURL}
          onClose={toggleSidebar}
          onPhotoChange={setPhotoURL}
        />
      )}
    </>
  );
}

export default Navbar;
