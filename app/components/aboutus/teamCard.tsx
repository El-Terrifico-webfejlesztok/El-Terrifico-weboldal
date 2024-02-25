"use client";

import Image from "next/legacy/image";
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
    <div className="flex-auto f w-full bg-base-100 rounded-lg shadow-md p-4">
      <Image height={350} width={350} src={imageUrl} alt={name} className="w-24 h-24 rounded-lg mx-auto mb-4" />
      <h3 className="text-lg font-semibold">{name}</h3>
      <h3 className="text-lg font-semibold mb-2">{name2}</h3>
      <p className="text-sm text-gray-600 mb-2">{position}</p>
      <button onClick={toggleExpand} className="text-green-500 hover:underline mt-2">
        Több...
      </button>
      {isExpanded && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="h grid grid-cols-2 m-36 bg-base-100  rounded-lg shadow-md py-7 px-12">
          <div>
            <Image src={imageUrl} alt={name} layout="intrinsic" width={400} height={400} className="m-4 rounded-lg img" />
          </div>
            <div className="m-4">
              <h3 className="text-lg font-semibold mb-2">{name} {name2}</h3>
              <p className="text-sm text-gray-600 mb-2">{position}</p>
              <p className="text-sm">{description}</p>
            </div>
            <div className="">
              <button onClick={toggleExpand} className="mt-5 text-green-500 hover:underline">
                Vissza
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamMemberCard;