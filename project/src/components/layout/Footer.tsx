import { Mail, Phone, MapPin, Linkedin, Instagram, ArrowUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-blue-950 text-white pt-6 pb-4 relative overflow-hidden">
      {/* Subtle background animation */}
      <div className="absolute inset-0 bg-pattern animate-bg-slide opacity-20" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Company Info */}
          <div className="animate-slideUpAndRotate" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            <h3 className="text-lg font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 animate-pulse">
              Ruhil Future Technologies
            </h3>
            <p className="text-gray-300 mb-3 leading-relaxed text-sm">
              Igniting innovation with cutting-edge solutions for a smarter, sustainable tomorrow.
            </p>
            <div className="flex space-x-4">
              {[
                {
                  href: 'https://www.linkedin.com/company/ruhilfuturetechnologies/posts/?feedView=all',
                  label: 'LinkedIn',
                  icon: <Linkedin size={20} className="animate-pulse" />,
                },
                {
                  href: 'https://www.instagram.com/ruhil.future.technologies?igsh=MXJuNzRtaHc3cDZ1OQ==',
                  label: 'Instagram',
                  icon: <Instagram size={20} className="animate-bounce-slow" />,
                },
              ].map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 rounded-full flex items-center justify-center transition-all duration-300 hover:text-white hover:bg-blue-500 hover:scale-110 hover:shadow-lg w-10 h-10"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-slideUpAndRotate" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            <h3 className="text-lg font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
              Quick Links
            </h3>
            <ul className="space-y-1 text-sm">
              {[
                { href: '#home', label: 'Home' },
                { href: '#about', label: 'About Us' },
                { href: '#services', label: 'Services' },
                { href: '#what-we-do', label: 'What We Do' },
                { href: '#contact', label: 'Contact' },
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 relative group hover:text-blue-400 transition-colors"
                    aria-label={link.label}
                  >
                    {link.label}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="animate-slideUpAndRotate" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            <h3 className="text-lg font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
              Our Services
            </h3>
            <ul className="space-y-1 text-sm">
              {[
                { href: '#services', label: 'AI-Powered Educational Solutions' },
                { href: '#services', label: 'Startup Incubation' },
                { href: '#services', label: 'Event Organization' },
                { href: '#services', label: 'Tech Consulting' },
                { href: '#services', label: 'Community Building' },
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 relative group hover:text-blue-400 transition-colors"
                    aria-label={link.label}
                  >
                    {link.label}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="animate-slideUpAndRotate" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            <h3 className="text-lg font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
              Contact Us
            </h3>
            <div className="space-y-2 text-sm">
              {[
                {
                  icon: <MapPin size={20} className="text-blue-400 animate-pulse" />,
                  content: '1280-A/29 Model Town, Opposite Power House, Rohtak, Pin code - 124001',
                },
                {
                  icon: <Phone size={20} className="text-blue-400 animate-bounce-slow" />,
                  content: '+91 70821 01534',
                },
                {
                  icon: <Mail size={20} className="text-blue-400 animate-spin-slow" />,
                  content: 'info@rftsystems.com',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start transform transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="mr-3 mt-1">{item.icon}</div>
                  <p className="text-gray-300">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-blue-900/50 pt-4 animate-fadeIn" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-xs mb-2 md:mb-0">
              © {currentYear} Ruhil Future Technologies. All Rights Reserved.
            </p>
            <div className="flex space-x-4 text-xs">
              {[
                { href: '#privacy', label: 'Privacy Policy' },
                { href: '#terms', label: 'Terms of Service' },
              ].map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-300 text-xs relative group hover:text-blue-400 transition-colors"
                  aria-label={link.label}
                >
                  {link.label}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Wave Divider (Top) */}
        <div className="absolute top-0 left-0 w-full h-10 bg-wave bg-top bg-no-repeat bg-cover animate-wave transform rotate-180"></div>
      </div>
    </footer>
  );
};

export default Footer;