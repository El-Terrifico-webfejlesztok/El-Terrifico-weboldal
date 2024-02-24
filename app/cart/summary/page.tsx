"use client";

import CartSteps from "@/app/components/cart/CartSteps";
import useCartService from "@/lib/hooks/useCartStore";
import SummaryKartya from "@/app/components/cart/summary/SummaryKartya";
import { useSearchParams } from "next/navigation";

function CartSummary() {
  const { items, totalPrice, shippingPrice, itemsPrice } = useCartService();
  const searchParams = useSearchParams();
  const datas = searchParams.get("data");
  const lista = datas.split("_");

  return (
    <div>
      <div>
        <CartSteps currentStep={3} />
      </div>
      <div id="address" className="divider mb-3">
        Összegzés
      </div>
      <div className="lg:flex">
        <div className="lg:w-1/2 border-4 border-black border-dotted lg:mr-2 lg:my-0 my-6">
          <h1 className="text-center my-3 text-lg underline">Termékek</h1>
          {items.map((item) => (
            <SummaryKartya
              key={item.product.id}
              nev={item.product.name}
              ar={item.product.price}
              kategoriak={item.categories}
              item={item}
            />
          ))}
          <h1 className="text-center my-2 text-xl font-bold">
            Összesen: {totalPrice} Ft{" "}
          </h1>
        </div>
        <div className="lg:w-1/2 border-4 border-black border-dotted lg:ml-2 lg:my-0 my-6 h-fit p-4 pt-0">
          <h1 className="text-center my-3 text-lg underline">Szállítási adatok</h1>
          <p className="mb-2">
            <strong>Átvevő Neve:</strong> {lista[0]}
          </p>
          <p className="my-2">
            <strong>Irányítószám:</strong> {lista[1]}
          </p>
          <p className="my-2">
            <strong>Város:</strong> {lista[2]}
          </p>
          <p className="my-2">
            <strong>Szállítási cím:</strong> {lista[3]}
          </p>
        </div>
      </div>
      <div className="items-center text-center justify-center my-8">
        <button className="btn btn-wide ">Megrendelem</button>
      </div>
    </div>
  );
}
export default CartSummary;
