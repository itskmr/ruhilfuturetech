import React, { useState, useEffect } from 'react';
import { Briefcase, ArrowRightCircle, Zap, Star, Users, TrendingUp } from 'lucide-react';

const ApplySection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleApplyClick = () => {
    // Replace with your navigation logic
    console.log('Navigate to /apply');
    // For demo purposes, could open a new tab or trigger a callback
    window.open('/apply', '_blank');
  };

  const handleLearnMoreClick = () => {
    // Replace with your navigation logic
    console.log('Navigate to /company');
    window.open('/company', '_blank');
  };

  const stats = [
    { icon: Users, value: "500+", label: "Team Members" },
    { icon: TrendingUp, value: "98%", label: "Success Rate" },
    { icon: Star, value: "4.9", label: "Employee Rating" }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0">
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />
        
        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-10 w-48 h-48 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-2xl animate-bounce" style={{ animationDelay: '2s' }} />
      </div>

      <div className={`relative z-10 max-w-6xl mx-auto px-6 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full border border-white/10 mb-6">
            <Zap className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-white/80 text-sm font-medium">We're Hiring Amazing Talent</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            Your Dream Job
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Awaits You
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-8 leading-relaxed">
            Join a team that values innovation, growth, and making a real impact. 
            Discover opportunities that match your passion and expertise.
          </p>
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/10 hover:bg-white/10 transition-all duration-300"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
          <button
            onClick={handleApplyClick}
            className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-size-200 bg-pos-0 hover:bg-pos-100 text-white rounded-2xl font-bold text-lg shadow-2xl transition-all duration-500 transform hover:scale-105 hover:shadow-blue-500/25 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
          >
            <div className="flex items-center space-x-3">
              <Briefcase className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
              <span>Explore Open Positions</span>
              <ArrowRightCircle className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </div>
            
            {/* Shine Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700" />
          </button>

          <button
            onClick={handleLearnMoreClick}
            className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-medium hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40"
          >
            Learn About Us
          </button>
        </div>

        {/* Quick Apply Note */}
        <div className="text-center">
          <p className="text-white/50 text-sm mb-2">Quick application process</p>
          <div className="flex items-center justify-center space-x-6 text-xs text-white/40">
            <span className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
              LinkedIn Integration
            </span>
            <span className="flex items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse" />
              No Cover Letter Required
            </span>
            <span className="flex items-center">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse" />
              Instant Feedback
            </span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default ApplySection;