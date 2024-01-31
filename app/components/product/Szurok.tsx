"use client";

import { useState } from "react";
import SzuroCheckbox from "./SzuroCheckbox";
import styles from "./szurok.module.css";

function Szurok() {
  const [isCollepsed, setIsCollepsed] = useState(true);

  if (isCollepsed == true) {
    return (
      <div className="sm:flex items-center justify-center mt-7">
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
        <div className="sm:flex items-center justify-center mt-7">
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
          <div>
            <SzuroCheckbox cim="Burger" />
            <SzuroCheckbox cim="Taco" />
            <SzuroCheckbox cim="Pizza" />
            <SzuroCheckbox cim="Szószok" />
            <SzuroCheckbox cim="Üditőital" />
          </div>

          <div>
            <div className="form-control items-start justify-start">
              <div className="label">
                <span className="label-text">Minimum ár</span>
              </div>
              <input
                type="number"
                placeholder="0"
                className="input input-bordered"
                min={0}
              />
            </div>
            <div className="form-control items-start justify-start">
              <div className="label">
                <span className="label-text">Maximum ár</span>
              </div>
              <input
                type="number"
                placeholder="2000"
                className="input input-bordered"
                min={2}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Szurok;
