'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SearchBar from './SearchBar'; // Import the SearchBar component
import ProfileButton from './ProfileButton';
import Cart from './Cart';
import LoadingBar from './LoadingBar';

const NavBar = () => {
    const currentPath = usePathname();

    const links = [
        { name: 'Products', href: '/products' },
        { name: 'Forum', href: '/forum' },
    ];

    return (
        <nav className='navbar bg-lime-100 border-b px-5 h-16 flex items-center shadow-md sticky top-0 z-50 gap-4'>
            <LoadingBar />
            <Link href='/' className='mr-4'>
                <img src="Sombrero.png" alt="Logo" className='max-h-10 cursor-pointer' />
            </Link>

            <ul className='flex space-x-6'>
                {links.map(link => (
                    <li key={link.href}>
                        <Link
                            href={link.href}
                            className={`${link.href === currentPath ? 'text-zinc-900' : 'text-zinc-500'
                                } hover:text-zinc-800 transition-colors`}
                        >
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="ml-auto flex items-center gap-5"> {/* ml-auto jobbra rakja az komponenseket */}
                <SearchBar />
                <Cart />
                <ProfileButton />
            </div>
        </nav>
    );
};

export default NavBar;
