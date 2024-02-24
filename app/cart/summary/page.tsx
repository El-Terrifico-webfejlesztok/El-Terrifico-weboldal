"use client";

import CartSteps from "@/app/components/cart/CartSteps";
import useCartService from "@/lib/hooks/useCartStore";
import SummaryKartya from "@/app/components/cart/summary/SummaryKartya";

function CartSummary() {
  const { items, totalPrice, shippingPrice, itemsPrice } = useCartService();
  return (
    <div>
      <div>
        <CartSteps currentStep={3} />
      </div>
      <div id="address" className="divider">
        Összegzés
      </div>
      <div className="lg:flex">
        <div className="lg:w-1/2 border-4 border-black border-dotted lg:mr-2 lg:my-0 my-6">
          <h1 className="text-center my-3 text-lg">Termékek</h1>
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
        <div className="lg:w-1/2 border-4 border-black border-dotted lg:ml-2 lg:my-0 my-6">
          <h1 className="text-center my-3 text-lg">Szállítási adatok</h1>
          <div></div>
        </div>
      </div>
      <div className="items-center text-center justify-center my-8">
        <button className="btn btn-wide ">Megrendelem</button>
      </div>
    </div>
  );
}
export default CartSummary;
