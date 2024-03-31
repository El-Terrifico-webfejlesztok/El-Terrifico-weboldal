import React, { useState } from "react";
import { Order, Order_status } from "@prisma/client";
import Link from "next/link";
import { OrderDetail } from '../../admin/overview/Orders';
import getOrderStatusText from '@/lib/helper functions/getOrderStatusText';
import formatDate from '@/lib/helper functions/formatDate';
import { useRouter } from 'next/navigation'

interface OrdersViewAdminProps {
  order: Order | OrderDetail;
  reload: Function;
  updateOrderStatus: (orderId: number, newStatus: Order_status) => void;
}

const OrdersViewAdmin: React.FC<OrdersViewAdminProps> = ({ order, reload, updateOrderStatus }) => {
  // Format the date to a readable format
  const orderDate = new Date(order.created_at);
  const router = useRouter()
  const formattedDate = formatDate(orderDate)


  // State to store the selected option value
  const [selectedStatus, setSelectedStatus] = useState<Order["status"]>(order.status);

  // Handle row click logic, e.g., navigate to the order details page

  const handleRowClick = (event: any) => {
    const nonClickableTags = ['tr', 'td', 'th'];
    if (!nonClickableTags.includes(event.target.tagName.toLowerCase())) {      // If the clicked element is not the table row, do not handle the row click
      return;
    }
    router.push(`/order/${order.id}`)
  };

  // Function to handle change in the select element
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.stopPropagation();
    const newStatus = event.target.value as Order["status"];
    setSelectedStatus(newStatus);
    updateOrderStatus(order.id, newStatus);
    reload()? reload() : null
  };

  return (
    <>
      <>
        <tr onClick={handleRowClick}
          className={
            `cursor-pointer hover rounded-lg active:brightness-75 w-full h-16 md:h-auto text-lg 
            ${order.status === 'completed' ? 'text-success opacity-75' : ''} 
            ${order.status === 'canceled' ? 'text-error opacity-50' : ''}`
          }>
          <th className='underline'>{order.id}</th>
          <td className="z-10">
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
          </td>
          <td className='truncate'>{formattedDate}</td>
          <td className='truncate'><strong>{order.total_price.toString()}</strong> Ft.</td>
        </tr>
      </>
      {/*
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
     */}
    </>
  );
};

export default OrdersViewAdmin;
