'use client'
import React from 'react'
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Links = () => {
    const currentPath = usePathname();

    const links = [
        { name: 'Áttekintés', href: '/admin'},
        { name: 'Rendelések', href: '/admin/orders' },
        { name: 'Termékfeltöltés', href: '/admin/upload' },
    ];

    const linkclass = ''

    return (
        <>
            {links.map(link => (
                <li key={link.href} className='my-px'>
                    <Link
                        href={link.href}
                        className={`${link.href === currentPath ? 'active' : ''
                            } ${linkclass} `}
                    >
                        {link.name}
                    </Link>
                </li>
            ))}
        </>
    )
}

export default Links