import React, { useState } from "react";
import { Order, Order_status } from "@prisma/client";
import Link from "next/link";
import { OrderDetail } from "../../admin/overview/Orders";
import getOrderStatusText from "@/lib/helper functions/getOrderStatusText";

interface OrdersViewAdminProps {
  order: Order | OrderDetail;
  reload: Function;
  updateOrderStatus: (orderId: number, newStatus: Order_status) => void;
}

const OrdersViewAdmin: React.FC<OrdersViewAdminProps> = ({ order, reload, updateOrderStatus }) => {
  // Format the date to a readable format
  const orderDate = new Date(order.created_at);
  const currentDate = new Date();

  const formattedDate =
    orderDate.getFullYear() === currentDate.getFullYear()
      ? orderDate.toLocaleString("hu-HU", {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        })
      : orderDate.toLocaleString("hu-HU", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        });

  // State to store the selected option value
  const [selectedStatus, setSelectedStatus] = useState<Order["status"]>(order.status);

  // Function to handle change in the select element
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value as Order["status"];
    setSelectedStatus(newStatus);
    updateOrderStatus(order.id, newStatus);
  };

  return (
    <div className="grid grid-cols-12 gap-4 my-3 items-center justify-center mx-4">
      <div className="col-span-12 md:col-span-4">
        <p>
          Státusz:
          <select className="select w-full md:w-1/2" value={selectedStatus} onChange={handleStatusChange}>
            <option value="" disabled>
              -- Válasszon státuszt --
            </option>
            {(["created", "preparing", "shipping", "completed", "canceled"] as Order_status[]).map(status => (
              <option key={status} value={status}>
                {getOrderStatusText(status)}
              </option>
            ))}
          </select>
        </p>
      </div>
      <div className="col-span-12 md:col-span-4">
        <p>Vásárlás ideje: <strong>{formattedDate}</strong></p>
      </div>
      <div className="col-span-12 md:col-span-3">
        <p>Teljes ár: <strong>{order.total_price.toString()} Ft.</strong></p>
      </div>
      <div className="col-span-12 md:col-span-1">
        <Link href={`/order/${order.id}`} className="btn btn-xs btn-info">
          Részletek
        </Link>
      </div>
    </div>
  );
};

export default OrdersViewAdmin;
