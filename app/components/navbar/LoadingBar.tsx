'use client'

import React from 'react'
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'

const LoadingBar = () => {
    const location = usePathname();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 200); // You can adjust the duration as needed

    }, [location]);

    return (
        <>
            <div className={` ${isLoading ?
                'h-1 w-full bg-red-700 fixed top-0 left-0 z-50 opacity-100 animate-loading-animation duration-200 ease-in-out'
                :
                'h-1 w-full bg-red-700 fixed top-0 left-0 z-50 opacity-0 transition-opacity duration-200 ease-in-out'
                }`} />
        </>
    );
};

export default LoadingBar;