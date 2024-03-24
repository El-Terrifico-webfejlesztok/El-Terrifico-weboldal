"use client";

import { Order_status } from "@prisma/client";
import React, { useEffect, useState } from "react";
import OrdersViewAdmin from "./OrdersViewAdmin";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import updateToast from "@/lib/helper functions/updateToast";

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
  const router = useRouter()
  const URLsearchParams = useSearchParams();

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [count, setCount] = useState<number>(10);
  const [orderType, setOrderType] = useState<Order_status | undefined>();
  const [pages, setPages] = useState<number | undefined>()
  const [orders, setOrders] = useState<OrderDetail[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const setPath = (page?: number, type?: string, count?: number) => {
    const currentParams = new URLSearchParams();
    page ? currentParams.set("page", page.toString()) : null;
    type ? currentParams.set("type", type) : null;
    count ? currentParams.set("count", count.toString()) : null;

    // Build new URL with updated parameters
    const newUrl = `/admin/orders?${currentParams.toString()}`;

    // Use router.push to update the URL
    router.push(newUrl, { scroll: false });
  };

  useEffect(() => {
    getAllOrders(URLsearchParams)
  }, [URLsearchParams])

  useEffect(() => {
    setPath(pageNumber, orderType, count)
  }, [pageNumber, orderType, count])

  const getAllOrders = async (searchParams: ReadonlyURLSearchParams) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/order/getall?${searchParams.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        toast.warning(responseData)
        return
      }
      setPages(responseData.pages)
      setOrders(responseData.orderDetails);
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
    const toastId = toast.loading("Státusz megváltoztatása...")
    try {
      // Make the API call to update the order status
      const response = await fetch(`/api/order/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newStatus: newStatus, orderId: orderId }),
      });

      const responseData: string = await response.json();
      if (!response.ok) {
        updateToast(toastId, 'error', responseData)
      }
      updateToast(toastId, 'info', 'Rendelés státusza megváltoztatva', 1000)
      // Reload orders after status update
      // await getAllOrders(URLsearchParams);
    } catch (error) {
      updateToast(toastId, 'error', 'A szerver nem érhető el')
      console.error(error);
    }
  };

  const changeCount = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCount(parseInt(event.target.value))
    setPageNumber(1)
  }

  const changeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === "all") {
      setOrderType(undefined)
    }
    else {
      setOrderType(event.target.value as Order_status)
    }
    setPageNumber(1)
  }

  return (
    <div>
      <h1 className="text-4xl font-semibold m-6">Rendelések</h1>
      <div>
        {orders && orders.length > 0 ? (
          <>
            {/* Pagination Controls */}
            <div className="flex flex-col items-center md:flex-row justify-center space-y-2 md:space-y-0 md:space-x-4  md:mt-4 ">

              <select
                name="ordersPerPage"
                value={orderType}
                className="select select-bordered max-w-xs"
                onChange={(event) => changeType(event)}>
                <option value="all">Összes</option>
                <option value="created">Megrendelve</option>
                <option value="preparing">Elkészítés</option>
                <option value="shipping">Szállítás</option>
                <option value="completed">Kiszállítva</option>
                <option value="canceled">Lemondva</option>

              </select>

              <div className="join">
                <button
                  disabled={pageNumber <= 1}
                  className="join-item btn"
                  onClick={() => handlePageChange(pageNumber - 1)}
                >«</button>
                <button className="join-item no-animation btn">{pageNumber}/{pages} oldal</button>
                <button
                  disabled={pageNumber >= (pages || 0)}
                  className="join-item btn"
                  onClick={() => handlePageChange(pageNumber + 1)}
                >»</button>
              </div>
              {/** */}
              <select
                name="ordersPerPage"
                value={count}
                className="select select-bordered max-w-xs"
                onChange={(event) => changeCount(event)}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>

            </div>
            {orders.map((order) => (
              <OrdersViewAdmin
                key={order.id}
                order={order}
                reload={getAllOrders}
                updateOrderStatus={updateOrderStatus}
              />
            ))}


            {/**
            <div className="flex justify-center mt-4">
              <button
                disabled={pageNumber === 1}
                onClick={() => handlePageChange(pageNumber - 1)}
                className="mr-2 px-4 py-2 bg-info text-white rounded hover:bg-warning"
              >
                Előző
              </button>
              <button
                className="px-4 py-2 bg-info text-white rounded hover:bg-warning"
              >
                Következő
              </button>
            </div>
             */}
          </>
        ) : loading ? (
          <div className="flex flex-grow mx-auto w-[50%] loading loading-ball"></div>
        ) : (
          <p className="text-center mb-4 font-bold">Nem található ilyen rendelés</p>
        )}
      </div>
    </div>
  );
};

export default OrdersAdmin;
