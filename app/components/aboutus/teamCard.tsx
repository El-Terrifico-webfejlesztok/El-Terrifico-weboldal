"use client";

import Image from "next/image";
import React, { useState } from 'react';
import "./card.css"

interface TeamMemberCardProps {
  name: string;
  name2: string;
  position: string;
  imageUrl: string;
  description: string;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ name, name2, position, imageUrl, description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex-auto f w-full bg-base-100 rounded-lg shadow-md p-4" onClick={toggleExpand}>
      <Image height="150" width="150" src={imageUrl} alt={name} className="w-24 h-24 rounded-full mx-auto mb-4" />
      <h3 className="text-lg font-semibold">{name}</h3>
      <h3 className="text-lg font-semibold mb-2">{name2}</h3>
      <p className="text-sm text-gray-600 mb-2">{position}</p>
      {isExpanded && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-base-100 h rounded-lg shadow-md p-4">
          <Image height="150" src={imageUrl} alt={name} className="w-24 h-24 mx-auto mb-4" width="150" />
            <h3 className="text-lg font-semibold mb-2">{name} {name2}</h3>
            <p className="text-sm text-gray-600 mb-2">{position}</p>
            <p className="text-sm">{description}</p>
            <button onClick={toggleExpand} className="text-green-500 hover:underline mt-2">
              Vissza
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamMemberCard;