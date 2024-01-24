import React from 'react'
import Link from 'next/link'

const NavBar = () => {
    const links = [
        { name: 'Termékek', href: '/' },
        { name: 'Fórum', href: '/forum' },

    ]

    return (
        <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center '>
            <Link href='/'><img src="favicon.ico" alt="" className='max-h-10' /></Link>
            <ul className='flex space-x-6'>
                {links.map(link =>
                    <li><Link
                        key={link.href}
                        className='text-zinc-500 hover:text-zinc-800 transition-colors'
                        href={link.href}>
                        {link.name}
                    </Link></li>
                )}
            </ul>
        </nav>
    )
}

export default NavBar