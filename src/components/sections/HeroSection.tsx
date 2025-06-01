import { ChevronRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="home" className="pt-28 pb-20 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white animate-fadeIn">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 animate-slideUp">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Pioneering the <span className="text-blue-300">Future</span> of Technology
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-lg">
              Ruhil Future Technology delivers cutting-edge solutions that transform businesses and drive innovation in a rapidly evolving digital landscape.
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
              <div className="w-full md:w-[500px] h-[300px] md:h-[400px] overflow-hidden rounded-lg shadow-2xl">
                <img 
                  src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Digital Technology" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-blue-400 rounded-lg rotate-12 opacity-20 animate-pulse"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-indigo-500 rounded-full opacity-20 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;