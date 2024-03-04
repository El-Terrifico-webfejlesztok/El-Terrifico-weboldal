"use client";
// Már nem kell!!!!!
import { useState } from "react";

function KartyaErtekeles() {
  const [rating, setRating] = useState<number>(0);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  return (
    <div>
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
        <p className="inline ml-2">{rating}</p>
      </div>
    </div>
  );
}
export default KartyaErtekeles;
