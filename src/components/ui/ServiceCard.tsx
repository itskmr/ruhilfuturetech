import { ReactNode } from 'react';

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const ServiceCard = ({ icon, title, description }: ServiceCardProps) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border-b-4 border-blue-500 group hover:-translate-y-2 transition-transform">
      <div className="mb-6">{icon}</div>
      <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default ServiceCard;