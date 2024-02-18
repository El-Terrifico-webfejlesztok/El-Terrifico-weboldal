"use client";

import React from "react";
import CartKartya from "../components/cart/CartKartya";
import KiszallitIdo from "../components/cart/KiszallitIdo";
import { useState } from "react";
import { useEffect } from "react";
import useCartService from "@/lib/hooks/useCartStore";

const Cart = () => {
  const { items, totalPrice, shippingPrice, itemsPrice } = useCartService()
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
  const buttonText = totalPrice < 2000 ? "Alacsony összeg" : "Fizetés";

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
          {items.map((item) => <CartKartya key={item.product.id} nev={item.product.name} ar={item.product.price} kategoriak={item.categories} image={item.image} />)}
        </div>
      </div>
      <div className="lg:w-1/4 sm:w-2/4 w-1/1 h-64 lg:mx-10 mx-auto my-10 p-2 rounded-xl border-white border-4 bg-orange-300">
        <div className="flex justify-between py-2">
          <div>
            <p>Összeg:</p>
          </div>
          <div>
            <p>{itemsPrice} Ft</p>
          </div>
        </div>
        <div className="flex justify-between py-2">
          <div>
            <p>Kiszállítás:</p>
          </div>
          <div>
          <span >{shippingPrice ? `${shippingPrice} Ft.` : 'ingyenes'} </span>
          </div>
        </div>
        <div className="flex justify-between py-2">
          <div>
            <p className="text-xl font-bold">Ennyit fizetsz:</p>
          </div>
          <div>
            <p className="text-xl font-bold">{totalPrice} Ft</p>
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
