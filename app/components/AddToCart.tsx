import React from 'react';
import useCartService from '@/lib/hooks/useCartStore';
import { useEffect, useState } from 'react';
import { CartItem } from '@/lib/hooks/useCartStore';
import { Product } from '@prisma/client';

// A kocsi egy productot kap és az hozzá adja a kocsihoz

const AddToCart = ({ item }: { item: Product }) => {
    const { items, increase, decrease } = useCartService();
    const [existsItem, setExistsItem] = useState<CartItem | undefined>();

    // Cucc, nemtom igazából de biztos jó, (valamit csinál a komponens betöltésekor)
    useEffect(() => {
        setExistsItem(items.find((x) => x.product.id === item.id));
    }, [item, items]);

    const addToCartHandler = () => {
        if (!existsItem) {
            // If the item doesn't exist, create a CartItem and pass it to increase
            const cartItem: CartItem = {
                product: item,
                quantity: 1,
            };
            increase(cartItem);
        }
    };

    return existsItem ? (
        <div className='flex items-center justify-center'>

            <button className='btn btn-warning ' title='Kosárba' onClick={() => decrease(existsItem)}>
                -
            </button>
            <p className='px-2 min-w-4 w-6 text-center'>{existsItem?.quantity}</p>
            <button className='btn  btn-warning' title='Kosárba' onClick={() => increase(existsItem)}>
                +
            </button>
        </div>
    ) : (
        <button className='btn btn-warning ' title='Kosárba' onClick={addToCartHandler}>
            <img src='/ShoppingCart.png' alt='ShoppingCart' className='w-6 h-6' />
        </button>
    );
};

export default AddToCart;
