'use client'

import React from 'react'
import Link from 'next/link'
import useCartService from '@/lib/hooks/useCartStore';
import { useState, useEffect } from 'react';
import CartCard from './CartCard';

const Cart = () => {
    const { items, totalPrice, shippingPrice, itemsPrice } = useCartService()

    // valami, mostmár tényleg nem tudom mi ez (valami typescript panaszkodás megakadályozása)
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])



    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-box ">
                <div className="indicator">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>

                    {mounted && items.length !== 0 && (
                        <span className="badge badge-sm indicator-item badge-accent transition-colors">
                            {/** A kosár elemeinek száma */}
                            {items.reduce((a, c) => a + c.quantity, 0)}
                        </span>
                    )}

                </div>
            </div>
            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-72 bg-base-100 shadow">
                <div className="card-body">
                    {mounted && items.length !== 0 && (
                        <>
                            {items.map((item) => <CartCard product={item.product}/>)}
                            {/** A kosár elemeinek száma */}
                            <span className="font-bold text-lg">
                                {items.reduce((a, c) => a + c.quantity, 0)} Termék
                            </span>
                            
                             <span className="pt-1 border-t-2 border-base-300 leading-3 text-xs text-info ">Szállítás: {shippingPrice ? shippingPrice : <p>ingyenes</p>} Ft.</span> 
                            <span className="leading-3 text-xs text-info ">Termékek: {itemsPrice} Ft.</span>

                            <span className="text-info pt-1 border-t-2 border-base-300 ">Összesen: {totalPrice} Ft.</span>
                        </>
                    )}

                    <div className="card-actions">
                        <Link href="/cart" className="bg-orange-400 text-white btn btn-primary btn-block">Rendelés</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart