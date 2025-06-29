import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Navbar from './Navbar';

interface HeaderProps {
  isScrolled: boolean;
}

const Header = ({ isScrolled }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 py-0 transition-colors duration-300`}
    >
      {/* Desktop Navigation - Full width */}
      <div className="hidden md:block w-full">
        <Navbar />
      </div>
      {/* Mobile Menu Button */}
      <div className="md:hidden flex justify-end px-4">
        <button
          onClick={toggleMenu}
          className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none transition-colors duration-200"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/50 py-4 px-2 absolute top-16 left-4 right-4 transition-colors duration-300">
          <nav className="flex flex-col space-y-4">
            <a
              href="#home"
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="#services"
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </a>
            <a
              href="#about"
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#team"
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Team
            </a>
            <a
              href="#what-we-do"
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              What We Do
            </a>
            <a
              href="#contact"
              className="px-4 py-2 text-blue-600 dark:text-blue-400 font-medium bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;