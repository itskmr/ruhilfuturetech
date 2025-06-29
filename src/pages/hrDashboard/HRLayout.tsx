import { Link, useLocation } from 'react-router-dom';
import { Users, Briefcase, FileText, UserCircle2 } from 'lucide-react';
import React from 'react';

const navItems = [
  {
    name: 'See Enquiry',
    path: '/hr/enquiry',
    icon: <Users size={20} />,
  },
  {
    name: 'Post Job',
    path: '/hr/post-job',
    icon: <Briefcase size={20} />,
  },
  {
    name: 'See Applied Jobs',
    path: '/hr/applied-jobs',
    icon: <FileText size={20} />,
  },
];

const HRLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* HR Top Navbar */}
      <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur shadow-md border-b flex items-center justify-between px-4 md:px-8 py-2">
        <div className="flex items-center space-x-4">
          <Link to="/hr" className="flex items-center space-x-2">
            <img src="/RFT logo1.jpg" alt="RFT Logo" className="h-10 w-10 object-contain rounded-full border-2 border-blue-500 shadow" />
            <span className="font-bold text-xl text-blue-900 tracking-wide">HR Dashboard</span>
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-center space-x-2 md:space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                location.pathname === item.path
                  ? 'bg-blue-100 text-blue-700 shadow border border-blue-200'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/hr/signin" className="hover:bg-blue-50 rounded-full p-2 transition-colors" title="Sign In / Account">
            <UserCircle2 size={32} className="text-blue-700" />
          </Link>
        </div>
      </nav>
      <div className="w-full max-w-full">
        {children}
      </div>
    </div>
  );
};

export default HRLayout; 