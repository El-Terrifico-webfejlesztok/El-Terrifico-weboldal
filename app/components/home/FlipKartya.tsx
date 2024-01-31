"use client";

import React from "react";
import { useState } from "react";

interface props {
  video: string;
  szoveg: string;
}

const FlipKartya = ({ video, szoveg }: props) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleVideoClick = (event: React.MouseEvent) => {
    // Check if the click is on the controller (e.g., a button)
    if (event.target instanceof Element && !event.target.classList.contains("controller")) {
      // Prevent the default video behavior (play/pause)
      event.preventDefault();

      // Toggle the play state of the video
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  return (
    <div
      className={`flip-card ${isFlipped ? "clicked" : ""}`}
      onClick={flipCard}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <h1>{szoveg}</h1>
        </div>
        <div className="flip-card-back">
          <video
            id="myVideo"
            controls
            loop
            onClick={handleVideoClick}
            controlsList="nodownload nofullscreen"
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default FlipKartya;
