import { Code, Smartphone, Globe, Database, Cloud, PieChart } from 'lucide-react';
import ServiceCard from '../ui/ServiceCard';

const services = [
  {
    icon: <PieChart size={40} className="text-blue-500" />,
    title: "AI-Powered Educational Solutions",
    description: "Innovative AI-driven platforms and tools to enhance learning experiences and outcomes.",
  },
  {
    icon: <Cloud size={40} className="text-blue-500" />,
    title: "Startup Incubation and Promotion",
    description: "Comprehensive support for startups, from ideation to market launch and growth.",
  },
  {
    icon: <Globe size={40} className="text-blue-500" />,
    title: "Educational Event Organization",
    description: "Planning and executing impactful educational events, workshops, and seminars.",
  },
  {
    icon: <Database size={40} className="text-blue-500" />,
    title: "University and Institutional Collaboration",
    description: "Building strong partnerships with universities and institutions for mutual growth.",
  },
  {
    icon: <Code size={40} className="text-blue-500" />,
    title: "Technology & Innovation Consulting",
    description: "Expert advice and strategies to drive technological innovation and transformation.",
  },
  {
    icon: <Smartphone size={40} className="text-blue-500" />,
    title: "Community & Ecosystem Building",
    description: "Fostering vibrant communities and ecosystems for sustainable development.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-gray-50 pt-32 animate-fadeIn">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slideUp">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg">
            We provide cutting-edge technology solutions to help your business thrive in the digital era.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div className="animate-slideUp" style={{animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: 'both'}} key={index}>
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