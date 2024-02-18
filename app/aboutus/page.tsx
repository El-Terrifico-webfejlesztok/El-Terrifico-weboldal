import React from 'react';
import Section from '../components/aboutus/section';
import TeamMemberCard from '../components/aboutus/teamCard';
import "./aboutus.css"

const AboutUs: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Rólunk</h1>
      <div className="sections p-2">
        <Section
          title="Csapatunk"
          content="Welcome to our website! We are a passionate team dedicated to delivering high-quality products/services to our customers."
        />
          <div className="flex justify-evenly">
            <TeamMemberCard
                name="John Doe"
                position="CEO"
                imageUrl="/placeholder.png"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut nisi vitae mi euismod semper."
              />
            <TeamMemberCard
              name="Jane Smith"
              position="COO"
              imageUrl="/placeholder.png"
              description="Sed dictum turpis nec nisi dignissim, vel tincidunt odio suscipit. Curabitur aliquet, nisi nec commodo fermentum."
            />
            <TeamMemberCard
              name="Alice Johnson"
              position="CTO"
              imageUrl="/placeholder.png"
              description="Mauris id magna at nunc maximus vehicula. Fusce fringilla urna at purus congue, vitae aliquet velit elementum."
            />
            <TeamMemberCard
              name="Bob Williams"
              position="CFO"
              imageUrl="/placeholder.png"
              description="Nullam sodales bibendum tellus nec aliquet. Aliquam erat volutpat."
            />
          </div>
      </div>
      <div className="sections p-2">
        <Section
          title="A Horribili Kft-ről"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut nisi vitae mi euismod semper. Mauris id magna at nunc maximus vehicula. Sed dictum turpis nec nisi dignissim, vel tincidunt odio suscipit. Curabitur aliquet, nisi nec commodo fermentum, lorem risus convallis sem, ac convallis neque leo in ligula."
        />
      </div>
      <div className="sections p-2">
        <Section
          title="Feladatunk"
          content="Fusce fringilla urna at purus congue, vitae aliquet velit elementum. Sed nec libero pulvinar, vehicula est sed, fermentum lorem. Nullam sodales bibendum tellus nec aliquet. Aliquam erat volutpat."
        />
      </div>
    </div>
  );
};

export default AboutUs;