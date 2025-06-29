import React from 'react';

const EmployersDashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 py-8 px-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-2">Employer Dashboard</h2>
        <p className="text-center text-gray-500 mb-6 text-sm">Welcome, HR! Here you can view user details and information.</p>
        <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-400">
          <span className="text-lg">[User details and information will appear here]</span>
        </div>
      </div>
    </div>
  );
};

export default EmployersDashboard; 