'use client'
import React from 'react'
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Links = () => {
    const currentPath = usePathname();

    const links = [
        { name: 'Termékek', href: '/products' },
        { name: 'Fórum', href: '/forum' },
        { name: 'Rólunk', href: '/aboutus' },
        { name: 'Útmutató', href: '/tutorial' },
    ];

    const linkclass = ''

    return (
        <>
            {links.map(link => (
                <li key={link.href}>
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