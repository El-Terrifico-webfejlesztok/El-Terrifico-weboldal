"use client";

import Image from "next/image";
import React, { useState } from 'react';

interface TeamMemberCardProps {
  name: string;
  position: string;
  imageUrl: string;
  description: string;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ name, position, imageUrl, description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div style={{transition: '0.3s ease' }} className="w-40 bg-white rounded-lg shadow-md p-4 transition-all duration-3000" onClick={toggleExpand}>
      <Image height="150" src={imageUrl} alt={name} className="w-24 h-24 rounded-full mx-auto mb-4" width="150" />
      <h3 className="text-lg font-semibold mb-2">{name}</h3>
      <p className="text-sm text-gray-600 mb-2">{position}</p>
      {isExpanded && (
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white rounded-lg shadow-md p-4">
          <Image height="150" src={imageUrl} alt={name} className="w-24 h-24 rounded-full mx-auto mb-4" width="150" />
            <h3 className="text-lg font-semibold mb-2">{name}</h3>
            <p className="text-sm text-gray-600 mb-2">{position}</p>
            <p className="text-sm">{description}</p>
            <button onClick={toggleExpand} className="text-blue-500 hover:underline mt-2">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamMemberCard;