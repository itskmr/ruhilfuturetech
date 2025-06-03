import { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';

const videos = [
  '/rft3.mp4',
  '/rft 1.mp4',
  '/rft2.mp4',
];

const VIDEO_DURATION = 5000; // 5 seconds per video

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % videos.length);
    }, VIDEO_DURATION);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white animate-fadeIn">
      {/* Animated video background */}
      {videos.map((src, idx) => (
        <video
          key={src}
          src={src}
          autoPlay
          loop
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ${current === idx ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent z-10"></div>
      <div className="container mx-auto px-4 md:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 animate-slideUp">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Pioneering the <span className="text-blue-300">Future</span> of Technologies
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-lg">
              Ruhil Future Technologies delivers cutting-edge solutions that transform businesses and drive innovation in a rapidly evolving digital landscape.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/insights"
                className="px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-md font-semibold transition-colors duration-300 text-center"
              >
                Insights
              </a>
              <a
                href="#contact"
                className="px-8 py-3 bg-transparent border border-white hover:bg-white hover:text-blue-900 rounded-md font-semibold transition-all duration-300 flex items-center justify-center gap-2"
              >
                Contact Us <ChevronRight size={16} />
              </a>
            </div>
          </div>
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end animate-slideUp" style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
            <div className="relative">
              {/* Decorative shapes can remain or be removed as desired */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;