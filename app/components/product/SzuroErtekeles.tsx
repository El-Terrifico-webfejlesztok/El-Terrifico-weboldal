"use client";

interface props {
  cim: string;
}

import { useState } from "react";

function SzuroErtekeles({ cim }: props) {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  return (
    <div className="my-10">
      <p className="text-center">
        {cim}: {rating}
      </p>
      <div>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => handleRatingChange(star)}
            style={{
              cursor: "pointer",
              color: star <= rating ? "gold" : "gray",
            }}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
}
export default SzuroErtekeles;
