import React from 'react';
import { Product } from '@prisma/client';
import AddToCart from '../../AddToCart';

interface Props {
    product: Product;
}

const CartCard: React.FC<Props> = ({ product }) => (
    <div className="card card-side bg-base-100 shadow-xl">
        <figure><img src="https://terrifico.zapto.org/public/product_images/Enchiladas.jpg" alt="" /></figure>
        <div className="card-body">
            <h1 className="card-title  mb-2">{product.name}</h1>

            <div className=''>
                <div className='p-2'>
                    <AddToCart item={product} />
                </div>
                <div />
                <div className="text-right">
                    <h1 className="text-sm">Ár: {product.price} Ft</h1>
                    <p className="text-sm"></p>
                </div>
            </div>

        </div>
        {/**Carousel a képeknek */}

    </div>
);

export default CartCard;
