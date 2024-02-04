"use client";

import { useState } from "react";
import SzuroCheckbox from "./SzuroCheckbox";
import styles from "./product.module.css";
import SzuroAr from "./SzuroAr";
import SzuroErtekeles from "./SzuroErtekeles";

function Szurok() {
  const [isCollepsed, setIsCollepsed] = useState(true);

  if (isCollepsed == true) {
    return (
      <>
        <div className="flex items-center justify-center mt-7">
          <a
            className="link link-accent mb-16"
            onClick={() => {
              setIsCollepsed(!isCollepsed);
            }}
          >
            <h1>Részletes keresés</h1>
          </a>
        </div>
      </>
    );
  }
  if (isCollepsed == false) {
    return (
      <>
        <div className="flex items-center justify-center mt-7">
          <a
            className="link link-accent"
            onClick={() => {
              setIsCollepsed(!isCollepsed);
            }}
          >
            <h1>Részletes keresés</h1>
          </a>
        </div>
        <div className={styles.szurodoboz}>
          <div className="sm:flex">
            <div className="sm:w-1/4 items-center justify-center pb-3">
              <h1 className=" text-center text-1xl text-black font-bold mb-4 mt-4">
                Árak
              </h1>
              <div className="text-center">
                <SzuroAr cim="Minimum ár (HUF):" minertek={0} placeh="0" />
                <SzuroAr cim="Maximum ár (HUF):" minertek={2} placeh="2" />
              </div>
            </div>

            <div className="sm:w-1/4 sm:border-x-4 sm:border-y-0 border-y-4 border-x-0 pb-3">
              <h1 className="flex justify-center text-center text-1xl text-black font-bold mb-4 mt-4">
                Kategóriák
              </h1>
              <div>
                <SzuroCheckbox cim="Burger" />
                <SzuroCheckbox cim="Taco" />
                <SzuroCheckbox cim="Pizza" />
                <SzuroCheckbox cim="Szószok" />
                <SzuroCheckbox cim="Üditőital" />
              </div>
            </div>

            <div className="sm:w-1/4 items-center justify-center sm:border-r-4 sm:border-b-0 border-b-4 border-r-0 pb-3">
              <h1 className="flex justify-center text-center text-1xl text-black font-bold mb-4 mt-4">
                Értékelés
              </h1>
              <div className="text-center">
                <SzuroErtekeles cim="Minimum értékelés" />
                <SzuroErtekeles cim="Maximum értékelés" />
              </div>
            </div>
            <div className="sm:w-1/4 items-center justify-center pb-3">
              <h1 className="flex justify-center text-center text-1xl text-black font-bold mb-4 mt-4">
                Kedvenceim
              </h1>
              <div>
                <SzuroCheckbox cim="Kedvelt" />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Szurok;
