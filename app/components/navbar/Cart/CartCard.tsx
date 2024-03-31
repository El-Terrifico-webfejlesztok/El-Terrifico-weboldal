import React from 'react';
import { Product } from '@prisma/client';
import AddToCartSmall from '../../cart/AddToCartSmall';
import Image from 'next/image';

interface Props {
    product: Product;
    categories: string[];
    image: string;
}

const CartCard: React.FC<Props> = ({ product, categories, image }) => (
    <div className="card card-side bg-base-100 shadow-xl h-24">
        <Image width={200} height={200} 
        quality={75} 
        src={image} alt="" 
        className='object-cover h-24 w-24' />
        <div className="card-body">
            <div className='w-32'>
                <p className='font-bold text-lg leading-3 truncate  h-4'>{product.name} </p>
            </div>
            <p className='leading-3 text-xs'>{product.price} Ft</p>

            <div >
                <AddToCartSmall key={product.id} item={product} categories={categories} image={image} />
            </div>
            <div />
        </div>

    </div>
);

export default CartCard;
