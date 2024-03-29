import React from 'react';
import { Order } from '@prisma/client';
import Link from 'next/link';
import { OrderDetail } from '../../admin/overview/Orders';
import getOrderStatusText from '@/lib/helper functions/getOrderStatusText';
import formatDate from '@/lib/helper functions/formatDate';
import { useRouter } from 'next/navigation'



const OrderView: React.FC<{ order: Order | OrderDetail; reload: Function }> = ({ order, reload }) => {
  // Format the date to a readable format
  const orderDate = new Date(order.created_at);
  const router = useRouter()
  const formattedDate = formatDate(orderDate)

  // Handle row click logic, e.g., navigate to the order details page

  const handleRowClick = () => {
    router.push(`/order/${order.id}`)
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
          <td><strong> {getOrderStatusText(order.status)}</strong></td>
          <td className='truncate'>{formattedDate}</td>
          <td className='truncate'><strong>{order.total_price.toString()}</strong> Ft.</td>
        </tr>
      </>

      {/* 
        <div className='grid grid-cols-12 gap-4 my-1'>
        <p className='sm:col-span-4 col-span-6'>
          <span className='whitespace-nowrap'>Státusz:</span>
          <strong> {getOrderStatusText(order.status)}</strong>
        </p>
        <p className='sm:col-span-4 col-span-6'>
          <span className="whitespace-normal">Vásárlás ideje:</span>
          <strong className='whitespace-nowrap'> {formattedDate}</strong>
        </p>
        <p className='sm:col-span-3 col-span-4'>
          Teljes ár:
          <strong> {order.total_price.toString()} Ft.</strong>
        </p>

        <Link href={`/order/${order.id}`} className='btn btn-xs btn-info sm:col-span-1'>
          Részletek
        </Link>
      </div>
      */}
    </>

  );
};

export default OrderView;
