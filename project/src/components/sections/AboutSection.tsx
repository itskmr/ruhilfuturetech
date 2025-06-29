import { Brain, Rocket, Award, Headphones } from 'lucide-react';

const AboutSection = () => {
  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden animate-fadeIn transition-colors duration-300"
    >
      {/* Subtle animated background */}
      <div className="absolute inset-0 bg-pattern animate-bg-slide opacity-20" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1 animate-slideUpAndScale">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 animate-pulse">
              About Ruhil Future Technologies
            </h2>
            <div className="w-20 h-1 bg-blue-500 dark:bg-blue-400 mb-6 transition-all duration-500 hover:w-32"></div>
            <p className="text-gray-700 dark:text-gray-300 mb-5 leading-relaxed animate-fadeIn delay-200">
              Established on March 19, 2024, Ruhil Future Technologies is your catalyst for digital transformation. We empower businesses with cutting-edge solutions that drive efficiency, spark innovation, and fuel sustainable growth.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed animate-fadeIn delay-300">
              Our team blends technical brilliance with creative vision, crafting solutions that tackle real-world challenges and exceed expectations. <span className="font-semibold italic">Together, we shape the future.</span>
            </p>

            {/* Mission & Vision */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
              <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-slideUpAndRotate" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center">
                  <Rocket size={24} className="mr-2 animate-bounce-slow" /> Our Mission
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  To empower businesses with innovative tech that drives sustainable progress and lasting impact.
                </p>
              </div>
              <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-slideUpAndRotate" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
                <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center">
                  <Brain size={24} className="mr-2 animate-pulse" /> Our Vision
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  To lead globally in transformative technology, shaping the future of industries and communities.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8 animate-fadeIn delay-400">
              <a
                href="#contact"
                className="inline-block bg-blue-600 dark:bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
              >
                Discover Our Journey
              </a>
            </div>
          </div>

          {/* Image Section */}
          <div className="order-1 lg:order-2 relative z-10 animate-slideUpAndScale" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            <div className="relative rounded-full overflow-hidden shadow-2xl bg-white dark:bg-gray-800 border-4 border-blue-500 dark:border-blue-400 w-72 h-72 mx-auto transition-all duration-500 hover:scale-110 hover:shadow-3xl group">
              <img
                src="/RFT logo1.jpg"
                alt="Ruhil Future Technology Logo"
                className="w-full h-full object-contain rounded-full transition-transform duration-700 group-hover:rotate-12"
              />
              {/* Particle-like decorative elements */}
              <div className="absolute inset-0 animate-pulse opacity-0 group-hover:opacity-20">
                <div className="absolute w-4 h-4 bg-blue-400 dark:bg-blue-300 rounded-full top-4 left-4 animate-particle"></div>
                <div className="absolute w-4 h-4 bg-blue-300 dark:bg-blue-400 rounded-full bottom-4 right-4 animate-particle delay-200"></div>
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-full border-8 border-blue-100 dark:border-gray-700 z-0 animate-spin-slow"></div>
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-blue-500 dark:bg-blue-400 rounded-lg opacity-10 transform rotate-45 animate-pulse"></div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-24">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-slideUpAndScale" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
            <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-4">
              Why Choose Us
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-base animate-fadeIn delay-200">
              Technical brilliance. Creative solutions. Unmatched results. Here's why we're the trusted choice:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Expertise", text: "A skilled team with deep industry knowledge and cutting-edge tech fluency.", icon: <Brain size={32} className="text-blue-500 dark:text-blue-400 animate-pulse" /> },
              { title: "Innovation", text: "Forward-thinking solutions designed for agility and future-readiness.", icon: <Rocket size={32} className="text-blue-500 dark:text-blue-400 animate-bounce-slow" /> },
              { title: "Quality", text: "Robust, reliable systems crafted with precision and excellence.", icon: <Award size={32} className="text-blue-500 dark:text-blue-400 animate-pulse" /> },
              { title: "Support", text: "Dedicated support to ensure seamless performance and growth.", icon: <Headphones size={32} className="text-blue-500 dark:text-blue-400 animate-spin-slow" /> },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md dark:shadow-gray-900/50 border-t-4 border-blue-500 dark:border-blue-400 text-center transition-all duration-300 hover:shadow-xl hover:scale-105 animate-slideUpAndRotate"
                style={{ animationDelay: `${0.6 + i * 0.15}s`, animationFillMode: 'both' }}
              >
                <div className="mb-4">{item.icon}</div>
                <h4 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2">{item.title}</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Wave Divider */}
        <div className="mt-12 h-16 bg-wave bg-bottom bg-no-repeat bg-cover animate-wave"></div>
      </div>
    </section>
  );
};

export default AboutSection;