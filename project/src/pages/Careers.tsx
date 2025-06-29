import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LifeAtRFTSection from '../components/sections/LifeAtRFTSection';
import EmployeeTestimonialsSection from '../components/sections/EmployeeTestimonialsSection';
import OpenPositionsSection from '../components/sections/OpenPositionsSection';
import ApplySection from '../components/sections/ApplySection';

const sections = [
  { label: 'Life at RFT', component: <LifeAtRFTSection /> },
  { label: 'What Our Employees Say', component: <EmployeeTestimonialsSection /> },
  { label: 'Open Positions', component: <OpenPositionsSection /> },
  { label: 'Apply', component: <ApplySection /> },
];

const Careers: React.FC = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-extrabold mb-4 text-center text-blue-700">
        Join the RFT Family
      </h1>
      <p className="text-center text-gray-600 mb-10 text-lg max-w-3xl mx-auto">
        At RFT, we believe in building not just careers, but a culture of growth, innovation, and belonging.
        Explore how you can become part of our team and help shape the future.
      </p>

      <div className="relative mb-8 max-w-md mx-auto">
        <div className="relative">
          <button
            className="w-full px-5 py-3 bg-blue-600 text-white rounded-lg font-medium
              hover:bg-blue-700 transition-colors duration-300 flex justify-between items-center
              shadow-md"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>{sections[activeSection].label}</span>
            <svg
              className={`w-5 h-5 transform transition-transform duration-200 ${
                isDropdownOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-10"
            >
              {sections.map((section, idx) => (
                <button
                  key={section.label}
                  className={`w-full px-5 py-3 text-left text-gray-800 hover:bg-blue-50
                    hover:text-blue-600 transition-colors duration-200
                    ${activeSection === idx ? 'bg-blue-50 text-blue-600 font-medium' : ''}`}
                  onClick={() => {
                    setActiveSection(idx);
                    setIsDropdownOpen(false);
                  }}
                >
                  {section.label}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      <div className="relative bg-gradient-to-br from-white via-blue-50 to-white rounded-xl shadow-xl p-6 min-h-[300px] transition-all duration-300">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {sections[activeSection].component}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Careers;