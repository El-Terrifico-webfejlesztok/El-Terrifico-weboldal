"use client";

import getOrderStatusText from "@/lib/helper functions/getOrderStatusText";
import updateToast from "@/lib/helper functions/updateToast";
import { Order_status } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: string;
  product_id: number;
}

interface ShippingAddress {
  id: number;
  recipient_name: string | null;
  street_address: string;
  city: string | null;
  postal_code: string;
}
interface OrderData {
  orderId: number;
  totalPrice: string;
  createdAt: Date;
  updatedAt: Date;
  status: Order_status;
  OrderItems: OrderItem[];
  ShippingAddress: ShippingAddress;
}

const UserOrder = ({ params }: { params: { id: string } }) => {
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  useEffect(() => {
    getOrderDetails(parseInt(params.id));
  }, [params.id]);

  const getOrderDetails = async (orderId: number) => {
    try {
      const response = await fetch(`/api/order?id=${orderId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch order data");
      }

      const responseData = await response.json();
      setOrderData(responseData);
      console.log(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  const formatCreatedAt = (createdAt: Date) => {
    const date = new Date(createdAt);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Adding leading zero if needed
    const day = ("0" + date.getDate()).slice(-2); // Adding leading zero if needed
    const hours = ("0" + date.getHours()).slice(-2); // Adding leading zero if needed
    const minutes = ("0" + date.getMinutes()).slice(-2); // Adding leading zero if needed
    return `${year}/${month}/${day}, ${hours}:${minutes}`;
  };

  const isEven = (num: number) => {
    return num % 2 === 0;
  };

  const cancelOrder = async () => {
    const toastId = toast.loading("Rendelés lemondása...")
    try {
      const response = await fetch('/api/order/cancel', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: params.id
        }),
      });
      const responseData = await response.json();
      if (!response.ok) {
        updateToast(toastId, 'error', responseData)
        return
      }
      updateToast(toastId, 'success', 'A rendelés sikeresen lemondva')
      // Frissítés az új adatokkal
      getOrderDetails(parseInt(params.id))
    } catch (error) {
      console.error("A szerver nem érhető el", error);
    }
  };


  if (!orderData) {
    return (
      <>
        <div className="flex flex-grow mx-auto w-[50%] loading loading-ball"></div>
      </>
    );
  } else {
    return (
      <>
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-semibold mb-4">Rendelés részletei</h1>
          <div className="bg-base-300 rounded-lg shadow-lg p-6">
            <div className="sm:flex justify-between">
              <div>
                <p className="font-semibold text-lg">
                  Állapot: {getOrderStatusText(orderData.status)}
                </p>
                <p className="font-semibold text-lg">
                  Vásárlás ideje: {formatCreatedAt(orderData.createdAt)}
                </p>
                {orderData.createdAt !== orderData.updatedAt ? <p className="font-semibold">
                  Utolsó frissítés: {formatCreatedAt(orderData.updatedAt)}
                </p> : null}
                <p className="font-semibold">
                  Rendelési azonosító: {orderData.orderId}
                </p>
                <p className="font-semibold">
                  Teljes ár: {orderData.totalPrice} Ft
                </p>
                {/** Ha a rendelés csak létre van hozva akkor még le lehet mondani */}
                {orderData.status === 'created' ?
                  <button className="mt-4 btn btn-sm btn-warning">Rendelés lemondása</button>
                  :
                  /** Ha a rendelés le lett mondva akkor... */
                  orderData.status === 'canceled' ?
                    'A rendelés le lett mondva'
                    :
                    /** Minden más esetben */
                    'A rendelés már nem mondható le'
                }
              </div>
              <div className="text-right mt-4">
                <p>Szállítási cím:</p>
                <p>{orderData.ShippingAddress.recipient_name}</p>
                <p>{orderData.ShippingAddress.postal_code}, {orderData.ShippingAddress.city}</p>
                <p>{orderData.ShippingAddress.street_address}</p>
              </div>
            </div>
            {/** Termékek listázása */}
            <p className="font-semibold mt-4">Rendelt termékek:</p>
            <ul>
              {orderData.OrderItems.map((item, index) => (
                <li
                  key={item.id}
                  className={`mt-2 flex flex-col sm:flex-row p-3  ${isEven(index) ? "bg-base-100 rounded-md" : ""
                    }`}
                >
                  <div className="sm:w-1/4 mb-2 sm:my-0">
                    <span className="font-semibold">Név: </span>
                    <Link href={`/products?id=${item.product_id}`} className="link hover:glass">{item.name}</Link>
                  </div>
                  <div className="sm:w-1/4 mb-2 sm:my-0">
                    <span className="font-semibold">Mennyiség: </span>
                    {item.quantity} db
                  </div>
                  <div className="sm:w-1/4 mb-2 sm:my-0">
                    <span className="font-semibold">Darabár: </span>
                    {parseInt(item.price) / item.quantity} Ft
                  </div>
                  <div className="sm:w-1/4 mb-2 sm:my-0">
                    <span className="font-semibold">Összár: </span>
                    {parseInt(item.price)} Ft
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    );
  }
};

export default UserOrder;
