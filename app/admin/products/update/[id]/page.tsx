'use client'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import ProductUpdater, { ProductData } from '@/app/components/admin/products/update/ProductUpdater';

const UpdaterPage = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<null | ProductData>()
  const productId = parseInt(params.id)

  useEffect(() => {
    getProductDetails(productId);
  }, []);

  const getProductDetails = async (productId: number) => {
    // const toastId = toast.loading('message')
    try {
      const response = await fetch(`/api/product?id=${productId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const responseData = await response.json();
      if (!response.ok) {
        //updateToast(toastId, 'success', 'Sikeres posztlekérés')
        toast.error(responseData)
        return
      }
      setProduct(responseData)
      //updateToast(toastId, 'success', 'Sikeres posztlekérés')
    } catch (error) {
      toast.error(`A szerver nem érhető el: (${error})`)
    }
  };

  const reload = async () => {
    getProductDetails(productId)
  }

  if (product) {
    return (
      <ProductUpdater product={product} reload={reload} />
    )
  }
  else {
    return (
      <>
        <div className="flex flex-grow mx-auto w-[50%] loading loading-ball">
          yes
        </div>
      </>
    )
  }
}

export default UpdaterPage