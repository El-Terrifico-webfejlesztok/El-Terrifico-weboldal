'use client'

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import useCartService from '@/lib/hooks/useCartStore';
import CartCard from './CartCard';

const Cart: React.FC = () => {
    const { items, totalPrice, shippingPrice, itemsPrice } = useCartService();
    const dropdownRef = useRef<HTMLDetailsElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                dropdownRef.current.removeAttribute("open");
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <details ref={dropdownRef} className="dropdown dropdown-end">
            <summary tabIndex={0} className="btn btn-ghost btn-box">
                <div className="indicator">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>

                    {items.length !== 0 && (
                        <span className="badge badge-sm indicator-item badge-accent transition-colors">
                            {items.reduce((a, c) => a + c.quantity, 0)}
                        </span>
                    )}

                </div>
            </summary>

            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-72 bg-base-100 shadow max-h-[calc(100vh-68px)] overflow-y-auto">
                <div className="card-body">
                    {items.length !== 0 && (
                        <>
                            <div className='max-h-[60vh] overflow-y-auto'>
                                {items.map((item) => <CartCard key={item.product.id} product={item.product} categories={item.categories} image={item.image} />)}
                            </div>
                            <span className="font-bold text-lg">
                                {items.reduce((a, c) => a + c.quantity, 0)} Termék
                            </span>
                            <span className="pt-1 border-t-2 border-base-300 leading-3 text-xs text-info">Szállítás: {shippingPrice ? `${shippingPrice} Ft.` : 'ingyenes'} </span>
                            <span className="leading-3 text-xs text-info">Termékek: {itemsPrice} Ft.</span>
                            <span className="text-info pt-1 border-t-2 border-base-300">Összesen: {totalPrice} Ft.</span>
                            <div className="card-actions">
                                <Link href="/cart" className="bg-orange-400 text-white btn btn-primary btn-block">Rendelés</Link>
                            </div>
                        </>
                    )}
                    {items.length === 0 && (
                        <>
                            <h1 className='text-center font-bold text-lg'>A kosarad üres</h1>
                            <div className="card-actions">
                                <Link href="/products" className="bg-primary  btn btn-primary btn-block">Termékek</Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </details>
    );
};

export default Cart;
