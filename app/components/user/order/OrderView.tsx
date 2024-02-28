import React from 'react';
import { Order } from '@prisma/client';
import Link from 'next/link';

const OrderView: React.FC<{ order: Order; reload: Function }> = ({ order, reload }) => {
  // Format the date to a readable format
  const orderDate = new Date(order.created_at);
  const currentDate = new Date();

  const formattedDate =
    orderDate.getFullYear() === currentDate.getFullYear()
      ? orderDate.toLocaleString('hu-HU', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })
      : orderDate.toLocaleString('hu-HU', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        });

  return (
    <div className='flex space-x-4 my-1 justify-between'>
      <p>
        Vásárlás ideje: 
        <strong> {formattedDate}</strong>
      </p>
      <p>
        Teljes ár: 
        <strong> {order.total_price.toString()} Ft.</strong>
      </p>
      <Link href={`/order/${order.id}`} className='btn btn-xs btn-info'>
        Részletek
      </Link>
    </div>
  );
};

export default OrderView;
