'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavBar = () => {
    // Jelenlegi útvonal lekérdezése
    const currentPath = usePathname();
 
    // Itt lehet megadni a navbar linkeket
    const links = [
        // name: Amit kiír, href: Ahova vezet
        { name: 'Termékek', href: '/products' },
        { name: 'Fórum', href: '/forum' },
    ]

    return (
        <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center '>
            <Link href='/'><img src="favicon.ico" alt="" className='max-h-10' /></Link>
            <ul className='flex space-x-6'>
                {links.map(link =>

                    <li><Link
                        key={link.href}
                        className=

                            // Hogyha a jelenlegi oldal egyenlő azzal amire a menüpont mutat, akkor sötétebb a szöveg
                            {`${link.href === currentPath ? 'text-zinc-900' : 'text-zinc-500'}

                            // További stílusok
                            hover:text-zinc-800 transition-colors`}
                           
                        href={link.href}>
                        {link.name}
                        </Link></li>
                )}
            </ul>
        </nav>
    )
}

export default NavBar