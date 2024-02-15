"use client";

import React from "react";
import CartKartya from "../components/cart/CartKartya";
import KiszallitIdo from "../components/cart/KiszallitIdo";
import { useState } from "react";
import { useEffect } from "react";

const Cart = () => {
  const [osszeg, setOsszeg] = useState(1000); // Sample osszeg
  const [szallitas, setSzallitas] = useState(2000); // Initial value for szallitas

  // Calculate the value of szallitas based on osszeg
  useEffect(() => {
    if (osszeg < 4000) {
      setSzallitas(0);
    } else {
      setSzallitas(2000);
    }
  }, [osszeg]);

  // Calculate the total amount to pay
  const ennyitFizetsz = osszeg + szallitas;
  const buttonText = ennyitFizetsz < 2000 ? "Alacsony összeg" : "Fizetés";

  return (
    <div className="lg:flex">
      <div className="lg:w-3/4 w-1/1 lg:mx-10 mx-auto my-10 p-5  rounded-xl border-white border-4 bg-orange-300 ">
        <div className="sm:flex">
          <div className="w-1/2">
            <h1 className=" text-3xl font-bold text-white m-5 sm:text-left text-center">
              Kosár:
            </h1>
          </div>
          <div className="w-1/2 sm:justify-end sm:items-end sm:text-right justify-center text-center items-center mx-auto">
            <h1 className=" font-bold text-white mt-6">
              Kiszállítás várható ideje: <KiszallitIdo />
            </h1>
          </div>
        </div>
        <div>
          <CartKartya
            nev="Termek neve"
            ar={1500}
            kategoriak={["finom", "izes"]}
          />
          <CartKartya
            nev="Termek neve"
            ar={1500}
            kategoriak={["finom", "izes"]}
          />
        </div>
      </div>
      <div className="lg:w-1/4 sm:w-2/4 w-1/1 h-64 lg:mx-10 mx-auto my-10 p-2 rounded-xl border-white border-4 bg-orange-300">
        <div className="flex justify-between py-2">
          <div>
            <p>Összeg:</p>
          </div>
          <div>
            <p>{osszeg} Ft</p>
          </div>
        </div>
        <div className="flex justify-between py-2">
          <div>
            <p>Kiszállítás:</p>
          </div>
          <div>
            <p>{szallitas} Ft</p>
          </div>
        </div>
        <div className="flex justify-between py-2">
          <div>
            <p className="text-xl font-bold">Ennyit fizetsz:</p>
          </div>
          <div>
            <p className="text-xl font-bold">{ennyitFizetsz} Ft</p>
          </div>
        </div>
        <div className="text-center">
          <button className="btn btn-md sm:btn-wide lg:w-60 btn-neutral text-white mt-7">
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
