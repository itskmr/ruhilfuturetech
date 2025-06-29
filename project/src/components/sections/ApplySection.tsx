import React from 'react';
import { useNavigate } from 'react-router-dom';

const ApplySection: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h2 className="text-2xl font-semibold mb-4">Apply for Jobs</h2>
      <button
        onClick={() => navigate('/apply')}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
      >
        Go to Job Board
      </button>
    </div>
  );
};

export default ApplySection; 