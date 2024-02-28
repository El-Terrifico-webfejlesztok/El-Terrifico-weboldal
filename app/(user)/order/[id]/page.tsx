'use client'

import React, { useEffect, useState } from 'react'

const page = ({ params }: { params: { id: string } }) => {
  const [orderData, setOrderData] = useState();

  useEffect(() => {
    getOrderDetails(parseInt(params.id));
  }, []);

  const getOrderDetails = async (orderId: number) => {

    try {
      const response = await fetch(`/api/order?id=${orderId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error("Sikertelen rendelési adat lekérdezés");
      }

      const responseData = await response.json();
      setOrderData(responseData)
      console.log(responseData);
    }
    catch (error) {
      console.error(error);
    }
  };

  if (!orderData)
    return (
      <>
        <div className='flex flex-grow mx-auto w-[50%] loading loading-ball'></div>
      </>
    )
  else return(
    <>
      Itt kéne megjeleníteni a megkapott adatokat, mint például: {JSON.stringify(orderData)}
    </>
  )
}

export default page