import { Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, LogOut, User } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import { useAuth } from '../AuthContext';

const Navbar = () => {
  const location = useLocation();
  const [mainDropdownOpen, setMainDropdownOpen] = useState(false);
  const [subDropdown, setSubDropdown] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isLoggedIn, user, logout } = useAuth();

  // Get first character of user's name for avatar
  const getUserInitial = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  // Handle clicking outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMainDropdownOpen(false);
        setSubDropdown(null);
      }
    };

    // Handle ESC key press
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMainDropdownOpen(false);
        setSubDropdown(null);
      }
    };

    if (mainDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [mainDropdownOpen]);

  const handleNavClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      window.location.href = '/#' + sectionId;
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      window.location.href = '/';
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSignInClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = '/signin';
  };

  const handleNewUserClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = '/signup';
  };

  const linkClass =
    'text-gray-800 dark:text-gray-200 font-medium text-sm uppercase tracking-wide relative rounded-full px-4 py-2 transition-all duration-200 ease-in-out hover:text-indigo-700 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-600 after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-indigo-600 dark:after:bg-indigo-400 after:transition-all after:duration-300 hover:after:w-1/2';

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm dark:shadow-gray-800/20 sticky top-0 z-50 w-full transition-colors duration-300">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 w-full">
          {/* Left: Logo and Nav */}
          <div className="flex items-center flex-shrink-0">
            <img src="/public/RFT logo.png" alt="Logo" className="h-16 w-16 rounded-full border-4 border-blue-400 dark:border-blue-500 mr-8" />
            <div className="hidden lg:flex items-center space-x-4">
              <a href="/" onClick={handleHomeClick} className={linkClass}>Home</a>
              <a href="/#services" onClick={(e) => handleNavClick(e, 'services')} className={linkClass}>Services</a>
              <a href="/#about" onClick={(e) => handleNavClick(e, 'about')} className={linkClass}>About</a>
              <a href="/#what-we-do" onClick={(e) => handleNavClick(e, 'what-we-do')} className={linkClass}>What We Do</a>
              {/* Learn More Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => {
                    setMainDropdownOpen(!mainDropdownOpen);
                    setSubDropdown(null);
                  }}
                  className={linkClass}
                >
                  Learn More
                </button>
                <AnimatePresence>
                  {mainDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-0 mt-3 bg-white dark:bg-gray-800 rounded-xl shadow-2xl dark:shadow-gray-900/50 w-[600px] z-50 p-0 border border-gray-100 dark:border-gray-700 flex transition-colors duration-300"
                    >
                      {/* Left panel: categories */}
                      <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 py-4 flex flex-col bg-gray-50 dark:bg-gray-900 rounded-l-xl">
                        <button onClick={() => setSubDropdown('careers')} className={`text-left px-6 py-2 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-none transition-colors ${subDropdown === 'careers' ? 'bg-white dark:bg-gray-800 border-l-4 border-indigo-500 text-indigo-700 dark:text-indigo-400' : ''}`}>Careers</button>
                        <button onClick={() => setSubDropdown('learn')} className={`text-left px-6 py-2 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-none transition-colors ${subDropdown === 'learn' ? 'bg-white dark:bg-gray-800 border-l-4 border-indigo-500 text-indigo-700 dark:text-indigo-400' : ''}`}>Learn</button>
                      </div>
                      {/* Right panel: links for selected category */}
                      <div className="w-2/3 py-4 px-6">
                        {subDropdown === 'careers' && (
                          <ul className="grid grid-cols-1 gap-2">
                            <li><Link to="/life-at-rft" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium text-gray-700 dark:text-gray-300">Life at RFT</Link></li>
                            <li><Link to="/employee-says" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium text-gray-700 dark:text-gray-300">What Our Employees Say</Link></li>
                            <li><Link to="/apply" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium text-gray-700 dark:text-gray-300">Apply</Link></li>
                          </ul>
                        )}
                        {subDropdown === 'learn' && (
                          <ul className="grid grid-cols-1 gap-2">
                            <li><Link to="/mdu" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium text-gray-700 dark:text-gray-300">MDU</Link></li>
                            <li><Link to="/crd" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium text-gray-700 dark:text-gray-300">CRD</Link></li>
                          </ul>
                        )}
                        {subDropdown === null && (
                          <div className="text-gray-500 dark:text-gray-400 text-sm">Select a category to see more options.</div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <a href="/#contact" onClick={(e) => handleNavClick(e, 'contact')} className={linkClass}>Contact Us</a>
            </div>
          </div>
          {/* Spacer for gap */}
          <div className="flex-1" />
          {/* Right: Login/Register/For Employer's and Theme Toggle */}
          <div className="hidden lg:flex items-center space-x-4">
            {isLoggedIn ? (
              // Logged in state - show user avatar, name and logout
              <>
                {/* User Avatar with First Character */}
                <div className="flex items-center space-x-3 px-3 py-2 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 rounded-full relative">
                  {/* Online Status Indicator */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {getUserInitial(user?.name || 'User')}
                  </div>
                  <span className="text-sm font-medium text-green-700 dark:text-green-300">
                    {user?.name || 'User'}
                  </span>
                </div>
                <button 
                  onClick={logout}
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full hover:from-red-600 hover:to-red-700 font-semibold text-sm shadow-md transition-all duration-200 flex items-center gap-2"
                  title="Logout"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              // Not logged in state - show login/register buttons
              <>
                <button onClick={handleSignInClick} className="px-4 py-2 border border-blue-200 dark:border-blue-600 bg-gradient-to-b from-blue-200 to-blue-400 dark:from-blue-600 dark:to-blue-800 text-blue-900 dark:text-blue-100 rounded-full hover:from-blue-300 hover:to-blue-500 dark:hover:from-blue-700 dark:hover:to-blue-900 font-semibold text-sm shadow-lg transition-colors duration-200">Login</button>
                <button onClick={handleNewUserClick} className="px-4 py-2 bg-gradient-to-b from-red-500 to-red-700 text-white rounded-full hover:from-red-600 hover:to-red-800 font-semibold text-sm shadow-md transition-colors duration-200">Register</button>
                <span className="h-6 w-px bg-gray-400 dark:bg-gray-600 mx-2 rounded-full" />
                <Link to="/employers-login" className="px-4 py-2 border border-blue-200 dark:border-blue-600 bg-gradient-to-b from-blue-200 to-blue-400 dark:from-blue-600 dark:to-blue-800 text-blue-900 dark:text-blue-100 rounded-full hover:from-blue-300 hover:to-blue-500 dark:hover:from-blue-700 dark:hover:to-blue-900 font-semibold text-sm shadow-lg transition-colors duration-200 flex items-center gap-2">For Employer's</Link>
              </>
            )}
            <button
              onClick={toggleTheme}
              className="ml-2 p-2 rounded-full bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors duration-200 flex items-center justify-center"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? (
                <Sun size={20} className="text-yellow-500" />
              ) : (
                <Moon size={20} className="text-blue-700 dark:text-blue-300" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;