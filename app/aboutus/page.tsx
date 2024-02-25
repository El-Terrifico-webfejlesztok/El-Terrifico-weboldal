import React from 'react';
import Section from '../components/aboutus/section';
import TeamMemberCard from '../components/aboutus/teamCard';
import "./aboutus.css"

const AboutUs: React.FC = () => {
  return (
    <div className="rolunk mx-auto px-4 py-8">
      <h1 className="sections p-2 text-3xl font-bold mb-4">Rólunk</h1>
      <div className="sections p-2">
        <Section
          title="Csapatunk"
          content="Csipetke csapatka vagyunk, négyen összesen."
        />
          <div className="flex flex-col justify-evenly sm:flex-row">
            <div className="flex-1 m-2 hover:m-1">
              <TeamMemberCard
                  name="Fülöp"
                  name2="Krisztián"
                  position="Backend fejlesztő"
                  imageUrl="/Krisz.png"
                  description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut nisi vitae mi euismod semper."
                />
            </div>
            <div className="flex-1 m-2 hover:m-1">
              <TeamMemberCard
                name="Tóth"
                name2="Barnabás"
                position="Frontend fejlesztő"
                imageUrl="/Toth_Barni.jpg"
                description="Sed dictum turpis nec nisi dignissim, vel tincidunt odio suscipit. Curabitur aliquet, nisi nec commodo fermentum."
              />
            </div>
            <div className="flex-1 m-2 hover:m-1">
              <TeamMemberCard
                name="Nagy"
                name2="Barnabás"
                position="Frontend fejlesztő"
                imageUrl="/Nagy_Barni.jpg"
                description="Mauris id magna at nunc maximus vehicula. Fusce fringilla urna at purus congue, vitae aliquet velit elementum."
              />
            </div>
            <div className="flex-1 m-2 hover:m-1">
              <TeamMemberCard
                name="Molnár"
                name2="Zalán"
                position="Frontend fejlesztő"
                imageUrl="/placeholder.png"
                description="Nullam sodales bibendum tellus nec aliquet. Aliquam erat volutpat."
              />
            </div>
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