import { Code, Smartphone, Globe, Database, Cloud, PieChart } from 'lucide-react';
import ServiceCard from '../ui/ServiceCard';

const services = [
  {
    icon: <PieChart size={40} className="text-blue-500 dark:text-blue-400 animate-pulse" />,
    title: "AI-Powered Educational Solutions",
    description: "Innovative AI-driven platforms and tools to enhance learning experiences and outcomes.",
  },
  {
    icon: <Cloud size={40} className="text-blue-500 dark:text-blue-400 animate-pulse" />,
    title: "Startup Incubation and Promotion",
    description: "Comprehensive support for startups, from ideation to market launch and growth.",
  },
  {
    icon: <Globe size={40} className="text-blue-500 dark:text-blue-400 animate-spin-slow" />,
    title: "Educational Event Organization",
    description: "Planning and executing impactful educational events, workshops, and seminars.",
  },
  {
    icon: <Database size={40} className="text-blue-500 dark:text-blue-400 animate-pulse" />,
    title: "University and Institutional Collaboration",
    description: "Building strong partnerships with universities and institutions for mutual growth.",
  },
  {
    icon: <Code size={40} className="text-blue-500 dark:text-blue-400 animate-bounce-slow" />,
    title: "Technology & Innovation Consulting",
    description: "Expert advice and strategies to drive technological innovation and transformation.",
  },
  {
    icon: <Smartphone size={40} className="text-blue-500 dark:text-blue-400 animate-pulse" />,
    title: "Community & Ecosystem Building",
    description: "Fostering vibrant communities and ecosystems for sustainable development.",
  },
];

const ServicesSection = () => {
  return (
    <section
      id="services"
      className="py-20 bg-gradient-to-b from-gray-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden animate-fadeIn transition-colors duration-300"
    >
      {/* Subtle background animation */}
      <div className="absolute inset-0 bg-pattern animate-bg-slide" />
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slideUp">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-pulse text-gray-800 dark:text-gray-200">
            Our Services
          </h2>
          <div className="w-20 h-1 bg-blue-500 dark:bg-blue-400 mx-auto mb-6 transform transition-all duration-500 hover:w-32"></div>
          <p className="text-gray-600 dark:text-gray-400 text-lg animate-fadeIn delay-200">
            We provide cutting-edge technology solutions to help your business thrive in the digital era.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              className="h-full flex animate-slideUpAndScale"
              style={{
                animationDelay: `${0.2 + index * 0.15}s`,
                animationFillMode: 'both',
              }}
              key={index}
            >
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;