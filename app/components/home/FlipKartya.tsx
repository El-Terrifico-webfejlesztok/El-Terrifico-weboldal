"use client";

import React from "react";
import { useState, useRef } from "react";

interface props {
  video: string;
  szoveg: string;
}

const FlipKartya = ({ video, szoveg }: props) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (videoRef.current) {
      if (!isFlipped) {
        videoRef.current
          .play()
          ?.catch((error) => console.error("Video play error:", error));
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <div>
      <div className={`flip-card ${isFlipped ? "clicked" : ""}`}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <div className="content-wrapper">
              <h1 className="mb-8">{szoveg}</h1>
              <button className="btn bg-base-300" onClick={handleFlip}>
                Fordítsd meg
              </button>
            </div>
          </div>
          <div className="flip-card-back">
            <div className="content-wrapper bg-warning-content rounded-3xl border-8 border-warning">
              <video
              preload="none"
                id="myVideo"
                controls
                loop
                controlsList="nodownload nofullscreen"
                ref={videoRef}
                className="rounded-t-2xl"
              >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <button
                className="btn btn-sm bg-base-300 m-3"
                onClick={handleFlip}
              >
                Vissza
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipKartya;
