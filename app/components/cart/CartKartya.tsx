"use client";

import { CartItem } from "@/lib/hooks/useCartStore";
import styles from "./cart.module.css";
import { useState } from "react";
import useCartService from "@/lib/hooks/useCartStore";
import AddToCartSmall from "./AddToCartSmall";

interface props {
  nev: string;
  kategoriak: string[];
  ar: number;
  image: string;
  item: CartItem;
}

function CartKartya({ nev, kategoriak, ar, image, item }: props) {
  const [isVisible, setIsVisible] = useState(true);
  const kategoria = kategoriak.join(", ");
  const { remove } = useCartService();

  const handleButtonClick = () => {
    remove(item);
  };

  return (
    <>
      {isVisible && (
        <div className={styles.kartya}>
          <div className="card lg:card-side bg-base-100 shadow-xl rounded-xl">
            <div className="card-body p-3">
              <div className="sm:flex">
                <div className="sm:w-1/6 justify-end items-end text-right">
                  <div className={styles.buttonXSmall}>
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
                <div className="sm:w-1/6 mt-3">
                  <div className={styles.kep}>
                    <img src={image} className="" alt={nev} />
                  </div>
                </div>
                <div className="sm:w-3/6 ">
                  <h1 className="sm:text-xl font-bold text-left">{nev}</h1>
                  <p className="text-left">Kategória: {kategoria}</p>
                  <p className="text-left">Ár: {ar} Ft</p>
                  <p className="text-left">Összesen: {ar * item.quantity} Ft</p>
                </div>
                <div className="sm:w-1/6 text-center justify-center items-center">
                  <div className="label items-center justify-center">
                    <span className="label-text">Darab:</span>
                  </div>
                  <AddToCartSmall
                    key={item.product.id}
                    categories={kategoriak}
                    image={image}
                    item={item.product}
                  />
                </div>
                <div className="sm:w-1/6 justify-end items-end text-right">
                  <div className={styles.buttonXBig}>
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
        </div>
      )}
    </>
  );
}
export default CartKartya;
