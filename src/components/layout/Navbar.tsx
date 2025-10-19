import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';
import { SearchIcon, MoonIcon, SunIcon, BellIcon, UserIcon, LogOutIcon } from 'lucide-react';
const Navbar: React.FC = () => {
  const {
    user,
    isAuthenticated,
    logout
  } = useAuth();
  const {
    theme,
    toggleTheme
  } = useTheme();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return <motion.nav className="bg-gray-900 text-white h-14 px-4 flex items-center justify-between border-b border-gray-800" initial={{
    opacity: 0,
    y: -20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.3
  }}>
      <div className="flex items-center space-x-8">
        <Link to="/" className="flex items-center">
          <motion.div whileHover={{
          scale: 1.05
        }} className="text-xl font-bold text-orange-500">
            LeetClone
          </motion.div>
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link to="/problems" className="text-gray-300 hover:text-white transition-colors">
            Problems
          </Link>
          <Link to="/explore" className="text-gray-300 hover:text-white transition-colors">
            Explore
          </Link>
          <Link to="/contest" className="text-gray-300 hover:text-white transition-colors">
            Contest
          </Link>
          <Link to="/discuss" className="text-gray-300 hover:text-white transition-colors">
            Discuss
          </Link>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative hidden md:block">
          <input type="text" placeholder="Search" className="bg-gray-800 rounded-md py-1 px-3 pl-8 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 w-48" />
          <SearchIcon className="absolute left-2 top-1.5 h-4 w-4 text-gray-400" />
        </div>
        <motion.button whileHover={{
        scale: 1.1
      }} whileTap={{
        scale: 0.95
      }} onClick={toggleTheme} className="p-1 rounded-full hover:bg-gray-800">
          {theme === 'dark' ? <SunIcon className="h-5 w-5 text-gray-300" /> : <MoonIcon className="h-5 w-5 text-gray-300" />}
        </motion.button>
        {isAuthenticated ? <>
            <motion.button whileHover={{
          scale: 1.1
        }} whileTap={{
          scale: 0.95
        }} className="p-1 rounded-full hover:bg-gray-800 relative">
              <BellIcon className="h-5 w-5 text-gray-300" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-orange-500 rounded-full"></span>
            </motion.button>
            <div className="relative" ref={dropdownRef}>
              <motion.div whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center cursor-pointer overflow-hidden">
                {user?.avatar ? <img src={user.avatar} alt={user.username} className="h-full w-full object-cover" /> : <UserIcon className="h-5 w-5 text-gray-300" />}
              </motion.div>
              {isDropdownOpen && <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-10">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700" onClick={() => setIsDropdownOpen(false)}>
                    Profile
                  </Link>
                  <Link to="/settings" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700" onClick={() => setIsDropdownOpen(false)}>
                    Settings
                  </Link>
                  <button onClick={() => {
              handleLogout();
              setIsDropdownOpen(false);
            }} className="w-full text-left block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                    <div className="flex items-center">
                      <LogOutIcon className="h-4 w-4 mr-2" />
                      Logout
                    </div>
                  </button>
                </div>}
            </div>
          </> : <div className="flex items-center space-x-2">
            <Link to="/login">
              <motion.button whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} className="text-sm px-3 py-1 rounded-md text-gray-300 hover:bg-gray-800">
                Sign In
              </motion.button>
            </Link>
            <Link to="/signup">
              <motion.button whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} className="text-sm px-3 py-1 bg-orange-500 rounded-md text-white hover:bg-orange-600">
                Sign Up
              </motion.button>
            </Link>
          </div>}
      </div>
    </motion.nav>;
};
export default Navbar;