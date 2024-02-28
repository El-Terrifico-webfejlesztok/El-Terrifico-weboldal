import React from 'react';

interface SectionProps {
  title: string;
  par1: string;
  par2: string;
  par3: string;
}

const Section: React.FC<SectionProps> = ({ title, par1, par2, par3 }) => {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p>{par1} <br></br> {par2} <br></br> {par3}</p>
    </div>
  );
};

export default Section;