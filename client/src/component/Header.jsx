import React, { useState } from 'react';
import '../App.css';

function Header({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  

  return (
    <div className="flex items-center justify-between mb-6 bg-white shadow-md p-4 rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
        />
        <div className="relative">
          <img
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt="Profile"
            className="rounded-full user-img cursor-pointer hover:shadow-lg transition-shadow duration-200"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
