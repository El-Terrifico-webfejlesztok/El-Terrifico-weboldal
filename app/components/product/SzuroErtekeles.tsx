interface Props {
  cim: string;
  id: string;
  onChange: () => void;
}

import { useState } from "react";

function SzuroErtekeles({ cim, id, onChange }: Props) {
  const [rating, setRating] = useState<number>(0);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    onChange(); // Trigger onBlur event to perform validation
  };

  const handleChange = () => {
    // Call the onBlur function when the input element loses focus
    onChange();
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
      {/* Hidden input for onBlur event */}
      <input
        type="number"
        id={id}
        value={rating}
        onChange={handleChange}
        hidden
        tabIndex={-1} // Ensure the hidden input receives focus
      />
    </div>
  );
}

export default SzuroErtekeles;
