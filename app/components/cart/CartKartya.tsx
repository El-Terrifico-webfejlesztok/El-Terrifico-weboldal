"use client";

import { CartItem } from "@/lib/hooks/useCartStore";
import styles from "./cart.module.css";
import { useState } from "react";

interface props {
  nev: string;
  kategoriak: string[];
  ar: number;
  image: string
  item: CartItem
}

function CartKartya({ nev, kategoriak, ar, image }: props) {
  const [isVisible, setIsVisible] = useState(true);
  const kategoria = kategoriak.join(", ");

  const handleButtonClick = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div className={styles.kartya}>
          <div className="card lg:card-side bg-base-100 shadow-xl">
            <div className="card-body p-3">
              <div className="sm:flex">
                <div className="sm:w-1/6">
                  <div className={styles.kep}>
                    <img
                      src={image}
                      height={100}
                      width={100}
                      alt="kep"
                    />
                  </div>
                </div>
                <div className="sm:w-3/6 ">
                  <h1 className="sm:text-xl font-bold text-left">{nev}</h1>
                  <p className="text-left">Kategória: {kategoria}</p>
                  <p className="text-left">Ár: {ar} Ft</p>
                </div>
                <div className="sm:w-1/6 text-center justify-center items-center">
                  <div className="label items-center justify-center">
                    <span className="label-text">Darab:</span>
                  </div>
                  <input
                    type="number"
                    placeholder="1"
                    min={1}
                    className=" w-12 h-6 text-center rounded-md"
                  />
                </div>
                <div className="sm:w-1/6 justify-end items-end text-right">
                  <button
                    className="btn btn-sm btn-error btn-circle btn-outline my-auto"
                    onClick={handleButtonClick}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default CartKartya;
