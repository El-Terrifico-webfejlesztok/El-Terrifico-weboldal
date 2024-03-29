"use client";

import CartSteps from "@/app/components/cart/CartSteps";
import useCartService from "@/lib/hooks/useCartStore";
import SummaryKartya from "@/app/components/cart/summary/SummaryKartya";
import { redirect, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import updateToast from "@/lib/helper functions/updateToast";

export interface OrderItem {
  id: number;
  quantity: number;
}

export interface OrderData {
  shippingAddressId: number;
  orderItems: OrderItem[];
}


function CartSummary() {
  const { items, totalPrice, shippingPrice, itemsPrice, clearCart } = useCartService();
  const searchParams = useSearchParams();
  const datas = searchParams.get("data");
  const [buttonColor, setButtonColor] = useState('')
  const [loading, setLoading] = useState<boolean>(false)
  const [buttonText, setButtonText] = useState('Megrendelem')
  const router = useRouter()

  let lista: any

  // Ha nincs az URL-ben a szállítási cím akkor redirect a shipping oldalra
  if (datas) {
    lista = datas.split("_");

  }
  else {
    redirect("/cart/shipping")
  }

  const createOrder = async (orderData: OrderData) => {
    setLoading(true)
    const toastId = toast.loading("Rendelés...")

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shippingAddressId: orderData.shippingAddressId,
          orderItems: orderData.orderItems.map(item => ({
            id: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      if (response.ok) {
        updateToast(toastId, 'success', 'Sikeres rendelés!')
        await Success()
      }
      // Call the success function
      else {
        const responseData = await response.json();
        setButtonColor('btn-error')
        setButtonText(responseData)
        updateToast(toastId, 'error', responseData)
      }

    } catch (error) {
      console.error("A szerver nem érhető el", error);
    }
    finally {
      setLoading(false)
    }
  };

  const Success = async () => {
    setButtonColor('btn-success')
    setButtonText('Sikeres rendelés!')
    // Kocsi nullázása
    clearCart()
    console.log('siker')
    router.push('/cart/thankyou')
  }


  const handleOrderClick = () => {
    const orderData: OrderData = {
      shippingAddressId: parseInt(lista[4]),
      orderItems: items.map((item) => ({
        id: item.product.id,
        quantity: item.quantity,
      })),
    };
    createOrder(orderData);
  };

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
              image={item.image}
              ar={item.product.price}
              kategoriak={item.categories}
              item={item}
            />
          ))}
          <div className="divider"></div>
          <p className="text-center text-lg">
            Szállítás: {shippingPrice} Ft
          </p>
          <p className="text-center text-lg">
            Termékek: {itemsPrice} Ft
          </p>
          <p></p>
          <h1 className="text-center my-2 text-xl font-bold">
            Összesen: {totalPrice} Ft
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
        <button className={`btn btn-wide ${buttonColor}`} onClick={handleOrderClick}><p className={loading ? 'loading' : ''}>{buttonText}</p></button>
      </div>
    </div>
  );
}
export default CartSummary;
