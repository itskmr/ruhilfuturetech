import { Link, useLocation } from 'react-router-dom';
import { Users, Briefcase, FileText, ChevronRight } from 'lucide-react';

const HRDashboard = () => {
  const location = useLocation();

  const navItems = [
    {
      name: 'See Enquiry',
      path: '/hr/enquiry',
      icon: <Users size={20} />,
      description: 'View all candidate enquiries and applications'
    },
    {
      name: 'Post Job',
      path: '/hr/post-job',
      icon: <Briefcase size={20} />,
      description: 'Create and publish new job opportunities'
    },
    {
      name: 'See posted Jobs',
      path: '/hr/applied-jobs',
      icon: <FileText size={20} />,
      description: 'Review applications for posted positions'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HR Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              HR Management <span className="text-blue-300">Dashboard</span>
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Streamline your recruitment process with our comprehensive HR tools. 
              Manage candidate enquiries, post job opportunities, and track applications all in one place.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {navItems.map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40 group"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-lg mb-4 mx-auto group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                  <p className="text-blue-100 text-sm">{item.description}</p>
                  <div className="flex items-center justify-center mt-4 text-blue-300 group-hover:text-white transition-colors">
                    <span className="text-sm font-medium">Get Started</span>
                    <ChevronRight size={16} className="ml-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">150+</div>
              <div className="text-gray-600">Total Enquiries</div>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <div className="text-3xl font-bold text-green-600 mb-2">25</div>
              <div className="text-gray-600">Active Jobs</div>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <div className="text-3xl font-bold text-purple-600 mb-2">89</div>
              <div className="text-gray-600">Applications</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HRDashboard; 