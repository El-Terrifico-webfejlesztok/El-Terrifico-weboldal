import React from 'react';
import { Order } from '@prisma/client';
import Link from 'next/link';
import { OrderDetail } from '../../admin/overview/Orders';
import getOrderStatusText from '@/lib/helper functions/getOrderStatusText';
import formatDate from '@/lib/helper functions/formatDate';

const OrderView: React.FC<{ order: Order | OrderDetail; reload: Function }> = ({ order, reload }) => {
  // Format the date to a readable format
  const orderDate = new Date(order.created_at);

  // Ezt cseréld ki
  const formattedDate = formatDate(orderDate)

  return (
    <div className='grid grid-cols-12 gap-4 my-1'>
      <p className='col-span-4'>
        Státusz:
        <strong> {getOrderStatusText(order.status)}</strong>
      </p>
      <p className='col-span-4'>
        Vásárlás ideje:
        <strong> {formattedDate}</strong>
      </p>
      <p className='col-span-3'>
        Teljes ár:
        <strong> {order.total_price.toString()} Ft.</strong>
      </p>

      <Link href={`/order/${order.id}`} className='btn btn-xs btn-info col-span-1'>
        Részletek
      </Link>
    </div>

  );
};

export default OrderView;
