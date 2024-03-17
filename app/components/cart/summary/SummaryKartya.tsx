import { CartItem } from "@/lib/hooks/useCartStore";
import styles from "@/app/components/cart/cart.module.css";
import { useState } from "react";
import useCartService from "@/lib/hooks/useCartStore";
import AddToCartSmall from "@/app/components/cart/AddToCartSmall";

interface props {
  nev: string;
  kategoriak: string[];
  ar: number;
  image: string;
  item: CartItem;
}

function SummaryKartya({ nev, kategoriak, ar, image, item }: props) {
  const kategoria = kategoriak.join(", ");

  return (
    <div className="card lg:card-side bg-base-100">
      <div className="card-body p-3">
        <div className="sm:flex">
          <div className="sm:w-3/6 ">
            <h1 className="sm:text-xl font-bold text-left">{nev}</h1>
            <p className="text-left">Kategória: <i>{kategoria}</i></p>
            <p className="text-left">Ár: {ar} Ft</p>
            <p className="text-left">Összesen: <b>{ar * item.quantity}</b> Ft</p>
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
        </div>
      </div>
    </div>
  )
}

export default SummaryKartya