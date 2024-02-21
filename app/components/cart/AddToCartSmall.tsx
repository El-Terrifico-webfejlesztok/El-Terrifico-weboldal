import React from 'react';
import useCartService from '@/lib/hooks/useCartStore';
import { useEffect, useState } from 'react';
import { CartItem } from '@/lib/hooks/useCartStore';
import { Product } from '@prisma/client';

// A kocsi egy productot kap és az hozzá adja a kocsihoz

const AddToCartSmall = ({ item, image, categories }: { item: Product, image: string, categories: string[] }) => {
    const { items, increase, decrease } = useCartService();
    const [existsItem, setExistsItem] = useState<CartItem>();

    // Cucc, nemtom igazából de biztos jó, (valamit csinál a komponens betöltésekor)
    useEffect(() => {
        setExistsItem(items.find((x) => x.product.id === item.id));
    }, [item, items]);


    return existsItem ? (
        <div className='flex items-center justify-center'>

            <button className='btn btn-sm btn-warning ' title='Kosárba' onClick={() => decrease(existsItem)}>
                -
            </button>
            <p className='px-2 min-w-4 w-6 text-center'>{existsItem?.quantity}</p>
            <button className='btn btn-sm  btn-warning' title='Kosárba' onClick={() => increase(existsItem)}>
                +
            </button>
        </div>
    ) :
    (<>
    </>)
};

export default AddToCartSmall;
