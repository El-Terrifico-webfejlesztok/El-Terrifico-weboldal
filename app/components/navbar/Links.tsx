'use client'
import React from 'react'
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Links = () => {
    const currentPath = usePathname();

    const links = [
        { name: 'Termékek', href: '/products' },
        { name: 'Fórum', href: '/forum' },
    ];

    const linkclass = 'px-3 transition-colors btn transition-all '

    return (

        <ul className='flex space-x-2'>
            {links.map(link => (
                <li key={link.href}>
                    <Link
                        href={link.href}
                        className={`${link.href === currentPath ? 'btn-active' : 'btn-ghost'
                            } ${linkclass} `}
                    >
                        {link.name}
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default Links