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
      className={`fixed top-0 left-0 right-0 z-50 bg-white py-4`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="h-16 w-16 flex items-center justify-center rounded-full overflow-hidden bg-white shadow-md">
              <img 
                src="/RFT logo1.jpg" 
                alt="Ruhil Future Technology Logo" 
                className="h-16 w-16 object-contain rounded-full border-4 border-blue-500 shadow-lg"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <Navbar />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-600 hover:text-blue-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg py-4 px-2 absolute top-16 left-4 right-4">
            <nav className="flex flex-col space-y-4">
              <a
                href="#home"
                className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#services"
                className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </a>
              <a
                href="#about"
                className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#team"
                className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Team
              </a>
              <a
                href="#what-we-do"
                className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                What We Do
              </a>
              <a
                href="#contact"
                className="px-4 py-2 text-blue-600 font-medium bg-blue-50 hover:bg-blue-100 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;