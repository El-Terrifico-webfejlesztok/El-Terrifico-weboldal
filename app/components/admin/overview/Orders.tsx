'use client'
import { Order_status } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import OrderView from '../../user/order/OrderView';

export type OrderDetail = {
    id: number;
    total_price: number;
    created_at: Date; // Consider using Date type if you parse this string into a Date object
    status: Order_status; 
    OrderItem: Array<{
        id: number;
        name: string;
        quantity: number;
        price: number;
    }>;
};


const Orders = () => {
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [orderType, setOrderType] = useState<Order_status>('created')
    const [orders, setOrders] = useState<OrderDetail[] | null>(null)
    const [loading, setLoading] = useState<boolean>(false)


    useEffect(() => {
        getAllOrders(pageNumber, orderType)
    }, [pageNumber, orderType]);


    const getAllOrders = async (page: number, type: Order_status) => {
        setLoading(true)
        try {
            const response = await fetch(`/api/order/getall?page=${page}&type=${type}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error("Sikertelen a rendelések lekérdezése");
            }
            const responseData = await response.json();
            console.log(responseData);
            setOrders(responseData)
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false)
        }
    };

    return (
        <div> <br/><br/>/components/admin/overview/Orders <br/>
            {JSON.stringify(orders)}
            <div>
                {orders && orders.length > 0 ? (
                    orders.map((order) => (
                        <OrderView key={order.id} order={order} reload={getAllOrders}/>
                    ))
                ) : (
                    loading ? <div className='mx-auto loading loading-dots'></div> :
                        <>
                            <p className='text-center truncate mb-4 font-bold'>Még nincsenek rendeléseid</p>

                            <div className='text-center'>
                            </div>
                        </>
                )}
            </div>
        </div>
    )
}

export default Orders