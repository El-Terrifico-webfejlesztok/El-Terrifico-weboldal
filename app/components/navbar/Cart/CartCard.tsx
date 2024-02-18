import React from 'react';
import { Product } from '@prisma/client';
import AddToCartSmall from './AddToCartSmall';

interface Props {
    product: Product;
    categories: string[];
    image: string;
}

const CartCard: React.FC<Props> = ({ product, categories, image }) => (
    <div className="card card-side bg-base-100 shadow-xl h-24">
        <figure>
            <img src={image} alt="" className='object-cover h-24 w-24' />
        </figure>
        <div className="card-body">
                <h1 className='font-bold text-lg leading-3'>{product.name} </h1>
                <p className='leading-3 text-xs'>{product.price} Ft</p>

                <div >
                    <AddToCartSmall key={product.id} item={product} categories={categories} image={image} />
                </div>
                <div />
        </div>

    </div>
);

export default CartCard;
