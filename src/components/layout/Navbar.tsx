import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

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

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      window.location.href = '/#contact';
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const linkClass =
    "text-gray-700 hover:text-blue-600 transition-all duration-200 uppercase transform hover:-translate-y-1 hover:scale-105";
  const buttonClass =
    "px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-200 font-bold uppercase transform hover:-translate-y-1 hover:scale-105";

  return (
    <nav className="flex items-center justify-center space-x-6 md:space-x-10 font-semibold text-base tracking-wide">
      <a
        href="/"
        onClick={handleHomeClick}
        className={linkClass}
      >
        Home
      </a>
      <a
        href="/#services"
        onClick={e => handleNavClick(e, 'services')}
        className={linkClass}
      >
        Services
      </a>
      <a
        href="/#about"
        onClick={e => handleNavClick(e, 'about')}
        className={linkClass}
      >
        About
      </a>
      <a
        href="/#what-we-do"
        onClick={e => handleNavClick(e, 'what-we-do')}
        className={linkClass}
      >
        What We Do
      </a>
      <Link
        to="/insights"
        className={linkClass}
      >
        Insights
      </Link>
      <button
        onClick={handleContactClick}
        className={buttonClass}
      >
        Contact Us
      </button>
    </nav>
  );
};

export default Navbar;