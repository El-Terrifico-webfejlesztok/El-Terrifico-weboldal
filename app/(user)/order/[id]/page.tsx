"use client";

import React, { useEffect, useState } from "react";

interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: string;
}

interface OrderData {
  orderId: number;
  totalPrice: string;
  createdAt: string;
  OrderItems: OrderItem[];
}

const UserOrder = ({ params }: { params: { id: string } }) => {
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  useEffect(() => {
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

    getOrderDetails(parseInt(params.id));
  }, [params.id]);

  const formatCreatedAt = (createdAt: string) => {
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
          <h1 className="text-3xl font-semibold mb-4">Rendelésed részletei</h1>
          <div className="bg-base-300 rounded-lg shadow-lg p-6">
            <p className="font-semibold">
              Rendelési azonosító: {orderData.orderId}
            </p>
            <p className="font-semibold">
              Teljes ár: {orderData.totalPrice} Ft
            </p>
            <p className="font-semibold">
              Vásárlás ideje: {formatCreatedAt(orderData.createdAt)}
            </p>
            <p className="font-semibold mt-4">Rendelt termékek:</p>
            <ul>
              {orderData.OrderItems.map((item, index) => (
                <li
                  key={item.id}
                  className={`mt-2 flex flex-col sm:flex-row p-3  ${
                    isEven(index) ? "bg-base-100 rounded-md" : ""
                  }`}
                >
                  <div className="sm:w-1/4 mb-2 sm:my-0">
                    <span className="font-semibold">Név: </span>
                    {item.name}
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
