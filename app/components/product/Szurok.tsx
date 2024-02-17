"use client";

import { useState } from "react";
import SzuroCheckbox from "./SzuroCheckbox";
import styles from "./product.module.css";
import SzuroAr from "./SzuroAr";
import SzuroErtekeles from "./SzuroErtekeles";

interface props {
  kategoriak: string[];
}

function Szurok({ kategoriak }: props) {
  const [isCollepsed, setIsCollepsed] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorMessageRating, setErrorMessageRating] = useState<string>("");

  const handleMinPriceChange = () => {
    const minPriceInput = document.getElementById(
      "minPrice"
    ) as HTMLInputElement;
    const maxPriceInput = document.getElementById(
      "maxPrice"
    ) as HTMLInputElement;
    const minPrice = parseInt(minPriceInput.value, 10);
    const maxPrice = parseInt(maxPriceInput.value, 10);
    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
      if (minPrice > maxPrice) {
        setErrorMessage("Minimum ár nem lehet nagyobb mint a maximum ár!");
        minPriceInput.value = "";
        maxPriceInput.value = "";
      } else {
        setErrorMessage("");
      }
    } else {
      setErrorMessage("");
    }
  };

  const handleMaxPriceChange = () => {
    const minPriceInput = document.getElementById(
      "minPrice"
    ) as HTMLInputElement;
    const maxPriceInput = document.getElementById(
      "maxPrice"
    ) as HTMLInputElement;
    const minPrice = parseInt(minPriceInput.value, 10);
    const maxPrice = parseInt(maxPriceInput.value, 10);
    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
      if (maxPrice < minPrice) {
        setErrorMessage("Maximum ár nem lehet kisebb mint a minimum ár!");
        minPriceInput.value = "";
        maxPriceInput.value = "";
      } else {
        setErrorMessage("");
      }
    } else {
      setErrorMessage("");
    }
  };

  const handleMinRatingChange = () => {
    const minRatingInput = document.getElementById(
      "minRating"
    ) as HTMLInputElement;
    const maxRatingInput = document.getElementById(
      "maxRating"
    ) as HTMLInputElement;
    const minRating = parseInt(minRatingInput.value, 10);
    const maxRating = parseInt(maxRatingInput.value, 10);
    if (!isNaN(minRating) && !isNaN(maxRating)) {
      if (minRating > maxRating) {
        setErrorMessageRating(
          "Minimum értékelés nem lehet nagyobb mint a maximum értékelés!"
        );
        minRatingInput.value = "";
        maxRatingInput.value = "";
      } else {
        setErrorMessageRating("");
      }
    } else {
      setErrorMessageRating("");
    }
  };

  const handleMaxRatingChange = () => {
    const minRatingInput = document.getElementById(
      "minRating"
    ) as HTMLInputElement;
    const maxRatingInput = document.getElementById(
      "maxRating"
    ) as HTMLInputElement;
    const minRating = parseInt(minRatingInput.value, 10);
    const maxRating = parseInt(maxRatingInput.value, 10);
    if (!isNaN(minRating) && !isNaN(maxRating)) {
      if (maxRating < minRating) {
        setErrorMessageRating(
          "Maximum értékelés nem lehet kisebb mint a minimum értékelés!"
        );
        minRatingInput.value = "";
        maxRatingInput.value = "";
      } else {
        setErrorMessageRating("");
      }
    } else {
      setErrorMessageRating("");
    }
  };

  if (isCollepsed == true) {
    return (
      <>
        <div className="flex items-center justify-center mt-3">
          <a
            className="link link-info mb-16 text-green-700"
            onClick={() => {
              setIsCollepsed(!isCollepsed);
            }}
          >
            <h1 className="btn">Részletes keresés</h1>
          </a>
        </div>
      </>
    );
  }
  if (isCollepsed == false) {
    return (
      <>
        <div className="flex items-center justify-center mt-3">
          <a
            className="link link-info text-green-700"
            onClick={() => {
              setIsCollepsed(!isCollepsed);
            }}
          >
            <h1 className="btn btn-success">Részletes keresés</h1>
          </a>
        </div>
        <div className={styles.szurodoboz}>
          <div className="sm:flex bg-orange-300">
            <div className="sm:w-1/3 items-center justify-center pb-3">
              <h1 className=" text-center text-1xl text-black font-bold mb-4 pt-4">
                Árak
              </h1>
              {errorMessage && (
                <div role="alert" className="alert alert-error">
                  <span className=" text-white justify-center text-center">
                    {errorMessage}
                  </span>
                </div>
              )}
              <div className="text-center">
                <SzuroAr
                  id="minPrice"
                  name="minPrice"
                  cim="Minimum ár (HUF):"
                  minertek={0}
                  placeh="0"
                  onChange={handleMinPriceChange}
                />
                <SzuroAr
                  id="maxPrice"
                  name="maxPrice"
                  cim="Maximum ár (HUF):"
                  minertek={500}
                  placeh="500"
                  onChange={handleMaxPriceChange}
                />
              </div>
            </div>

            <div className="sm:w-1/3 sm:border-x-4 sm:border-y-0 border-y-4 border-x-0 pb-3">
              <h1 className="flex justify-center text-center text-1xl text-black font-bold mb-4 mt-4">
                Kategóriák
              </h1>
              <div className=" h-52 overflow-x-auto whitespace-no-wrap">
                  {kategoriak.map((category, index) => (
                    <SzuroCheckbox key={index} name="category" cim={category} />
                  ))}
              </div>
            </div>

            <div className="sm:w-1/3 items-center justify-center pb-3">
              <h1 className="flex justify-center text-center text-1xl text-black font-bold mb-4 mt-4">
                Értékelés
              </h1>
              {errorMessageRating && (
                <div role="alert" className="alert alert-error">
                  <span className="text-white justify-center text-center">
                    {errorMessageRating}
                  </span>
                </div>
              )}
              <div className="text-center">
                <SzuroErtekeles
                  id="minRating"
                  cim="Minimum értékelés"
                  onChange={handleMinRatingChange}
                />
                <SzuroErtekeles
                  id="maxRating"
                  cim="Maximum értékelés"
                  onChange={handleMaxRatingChange}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Szurok;
