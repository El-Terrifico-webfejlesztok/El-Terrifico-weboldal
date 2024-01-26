import Image from "next/image";
import React from "react";

interface props {
  video: string;
  szoveg: string;
}

function FlipKartya({ video, szoveg }: props) {
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <h1>{szoveg}</h1>
        </div>
        <div className="flip-card-back">
          <video width="640" height="360" loop controls>
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}
export default FlipKartya;
