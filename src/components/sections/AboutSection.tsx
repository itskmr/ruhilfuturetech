const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white pt-32 animate-fadeIn">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1 animate-slideUp">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              About Ruhil Future Technologies
            </h2>
            <div className="w-20 h-1 bg-blue-500 mb-6"></div>
            <p className="text-gray-700 mb-5 leading-relaxed">
              Founded in 2013, Ruhil Future Technologies is a pioneer in delivering innovative digital solutions. We help businesses elevate their operations through transformative technologies that enhance efficiency and fuel sustainable growth.
            </p>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Our dedicated professionals bring a unique mix of technical expertise and creative insight, enabling us to build solutions that solve real-world challenges and surpass expectations.
            </p>

            {/* Mission & Vision */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-xl shadow-sm hover:shadow-md transition animate-slideUp" style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">Our Mission</h3>
                <p className="text-gray-700 text-sm">
                  To empower businesses with innovative technology that fosters sustainable progress and long-term value.
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl shadow-sm hover:shadow-md transition animate-slideUp" style={{animationDelay: '0.3s', animationFillMode: 'both'}}>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">Our Vision</h3>
                <p className="text-gray-700 text-sm">
                  To be a global leader in transformative tech that shapes the future of industries and communities.
                </p>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="order-1 lg:order-2 relative z-10 animate-slideUp" style={{animationDelay: '0.4s', animationFillMode: 'both'}}>
            <div className="rounded-full overflow-hidden shadow-xl flex items-center justify-center bg-white border-4 border-blue-500 w-64 h-64 mx-auto">
              <img 
                src="/logo1.jpg" 
                alt="Ruhil Future Technology Logo" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -left-6 w-44 h-44 rounded-full border-8 border-blue-100 z-0"></div>
            <div className="absolute -top-6 -right-6 w-28 h-28 bg-blue-500 rounded-lg opacity-10"></div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-24">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-slideUp" style={{animationDelay: '0.5s', animationFillMode: 'both'}}>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h3>
            <p className="text-gray-600 text-base">
              Technical mastery. Creative problem-solving. Proven results. Here's why our clients trust us:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Expertise", text: "Skilled team with deep industry experience and modern tech fluency." },
              { title: "Innovation", text: "Always forward-thinking with future-ready, agile solutions." },
              { title: "Quality", text: "Reliable, robust systems built with precision and care." },
              { title: "Support", text: "Dedicated assistance to ensure continuous performance and growth." },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-500 text-center hover:shadow-lg transition animate-slideUp"
                style={{animationDelay: `${0.6 + i * 0.1}s`, animationFillMode: 'both'}}
              >
                <h4 className="text-lg font-semibold mb-2 text-blue-700">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
