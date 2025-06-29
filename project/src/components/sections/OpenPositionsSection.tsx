import React from 'react';

const OpenPositionsSection: React.FC = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Open Positions</h2>
    <ul className="space-y-2">
      <li className="border p-4 rounded">
        <strong>Frontend Developer</strong><br />
        <span>Location: Remote | Experience: 2+ years</span>
      </li>
      <li className="border p-4 rounded">
        <strong>Backend Developer</strong><br />
        <span>Location: Bangalore | Experience: 3+ years</span>
      </li>
      {/* Add more positions as needed */}
    </ul>
  </div>
);

export default OpenPositionsSection; 