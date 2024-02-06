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

  return (

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
  )
}

export default Links