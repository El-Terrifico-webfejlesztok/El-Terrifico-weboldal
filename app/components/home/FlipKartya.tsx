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
          <video id="myVideo" controls loop>
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default FlipKartya;
