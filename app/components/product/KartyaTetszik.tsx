"use client";

/*Nem kell már */

import { useState } from "react";
import styles from "./product.module.css";

function KartyaTetszik() {
  const [isLiked, setLiked] = useState(false);

  const handleLikeClick = () => {
    setLiked(!isLiked);
  };

  return (
    <button
      className={`${styles.likeButton} ${isLiked ? styles.liked : ""}`}
      onClick={handleLikeClick}
    >
      ❤ Kedvelem
    </button>
  );
}
export default KartyaTetszik;
