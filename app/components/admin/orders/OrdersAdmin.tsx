"use client";

import { Order_status } from "@prisma/client";
import React, { useEffect, useState } from "react";
import OrdersViewAdmin from "./OrdersViewAdmin";

export type OrderDetail = {
  id: number;
  total_price: number;
  created_at: Date;
  status: Order_status;
  OrderItem: Array<{
    id: number;
    name: string;
    quantity: number;
    price: number;
  }>;
};

const OrdersAdmin = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [orderType, setOrderType] = useState<Order_status>("created");
  const [orders, setOrders] = useState<OrderDetail[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getAllOrders(pageNumber, orderType);
  }, [pageNumber, orderType]);

  const getAllOrders = async (page: number, type: Order_status) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/order/getall?page=${page}&type=${type}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const responseData = await response.json();
      setOrders(responseData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setPageNumber(pageNumber);
  };

  // This should handle with status chaning
  const updateOrderStatus = async (orderId: number, newStatus: string) => {
    try {
      // Make the API call to update the order status
      const response = await fetch(`/api/order/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newStatus: newStatus, orderId: orderId}),
      });
      if (!response.ok) {
        throw new Error("Failed to update order status");
      }
      // Reload orders after status update
      await getAllOrders(pageNumber, orderType);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-semibold m-6">Rendelések</h1>
      <div>
        {orders && orders.length > 0 ? (
          <>
            {orders.map((order) => (
              <OrdersViewAdmin
                key={order.id}
                order={order}
                reload={getAllOrders}
                updateOrderStatus={updateOrderStatus}
              />
            ))}
            {/* Pagination Controls */}
            <div className="flex justify-center mt-4">
              <button
                disabled={pageNumber === 1}
                onClick={() => handlePageChange(pageNumber - 1)}
                className="mr-2 px-4 py-2 bg-info text-white rounded hover:bg-warning"
              >
                Előző
              </button>
              <button
                onClick={() => handlePageChange(pageNumber + 1)}
                className="px-4 py-2 bg-info text-white rounded hover:bg-warning"
              >
                Következő
              </button>
            </div>
          </>
        ) : loading ? (
          <div className="mx-auto loading loading-dots"></div>
        ) : (
          <div className="text-center">
            <p className="truncate mb-4 font-bold">Még nincsenek rendeléseid</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersAdmin;
