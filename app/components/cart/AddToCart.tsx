import React from 'react';
import useCartService from '@/lib/hooks/useCartStore';
import { useEffect, useState } from 'react';
import { CartItem } from '@/lib/hooks/useCartStore';
import { Product } from '@prisma/client';

// A kocsi egy productot kap és az hozzá adja a kocsihoz

const AddToCart = ({ item, image, categories }: { item: Product, image: string, categories: string[] }) => {
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
                image: image,
                categories: categories
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
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
        </button>
    );
};

export default AddToCart;
