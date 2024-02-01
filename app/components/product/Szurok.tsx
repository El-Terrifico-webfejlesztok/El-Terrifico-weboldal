"use client";

import { useState } from "react";
import SzuroCheckbox from "./SzuroCheckbox";
import styles from "./szurok.module.css";

function Szurok() {
  const [isCollepsed, setIsCollepsed] = useState(true);

  if (isCollepsed == true) {
    return (
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
            <div className="sm:w-1/3 items-center justify-center">
              <h1 className=" text-center text-2xl text-black font-bold mb-4 mt-4">Árak</h1>
              <div className="text-center">
                <div className="label items-center justify-center">
                  <span className="label-text">Minimum ár</span>
                </div>
                <input
                  type="number"
                  placeholder="Min ár"
                  className=" input-bordered mb-8 w-28"
                  min={0}
                />
                <div className="label items-center justify-center">
                  <span className="label-text">Maximum ár</span>
                </div>
                <input
                  type="number"
                  placeholder="Max ár"
                  className=" input-bordered w-28"
                  min={2}
                />
              </div>
            </div>

            <div className="sm:w-1/3">
              <h1 className="flex justify-center text-center text-2xl text-black font-bold mb-4 mt-4">Kategóriák</h1>
              <div >
                <SzuroCheckbox cim="Burger" />
                <SzuroCheckbox cim="Taco" />
                <SzuroCheckbox cim="Pizza" />
                <SzuroCheckbox cim="Szószok" />
                <SzuroCheckbox cim="Üditőital" />
              </div>
            </div>

            <div className="md:w-1/3"></div>
          </div>
        </div>
      </>
    );
  }
}
export default Szurok;
