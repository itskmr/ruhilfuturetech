import React from 'react';

const EmployeeTestimonialsSection: React.FC = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">What Our Employees Say</h2>
    <div className="space-y-4">
      <blockquote className="border-l-4 pl-4 italic text-gray-700">“RFT has given me the opportunity to grow and learn every day.”<br /><span className="block mt-2 font-bold">- Priya, Software Engineer</span></blockquote>
      <blockquote className="border-l-4 pl-4 italic text-gray-700">“The team culture here is amazing and supportive!”<br /><span className="block mt-2 font-bold">- Amit, Product Manager</span></blockquote>
    </div>
  </div>
);

export default EmployeeTestimonialsSection; 