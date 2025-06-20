import React, { useState } from 'react';

const UniversityInputTest: React.FC = () => {
  const [university, setUniversity] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log('Test input change:', value);
    setUniversity(value);
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-md mx-auto mt-8">
      <h3 className="text-xl font-bold mb-4">University Input Test</h3>
      <div className="mb-4">
        <label className="block text-sm font-bold text-gray-700 mb-2">
          University/College *
        </label>
        <input
          type="text"
          name="university"
          value={university}
          onChange={handleChange}
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Type your university name with spaces"
        />
      </div>
      <div className="text-sm text-gray-600">
        <p><strong>Current value:</strong> "{university}"</p>
        <p><strong>Length:</strong> {university.length}</p>
        <p><strong>Has spaces:</strong> {university.includes(' ') ? 'Yes' : 'No'}</p>
      </div>
      <div className="mt-4 text-xs text-gray-500">
        Try typing: "Indian Institute of Technology"
      </div>
    </div>
  );
};

export default UniversityInputTest;