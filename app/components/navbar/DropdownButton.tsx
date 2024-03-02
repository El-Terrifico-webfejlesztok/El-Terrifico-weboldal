'use client'
import React from 'react'
import Links from './Links'
import SidebarButton from '../admin/SidebarButton';
import { usePathname } from 'next/navigation';

const DropdownButton = () => {
    const pathname = usePathname()
    const isUnderAdminPath = pathname.startsWith('/admin')

    if (!isUnderAdminPath) {
        return (
            <div className="dropdown mr-3">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </div>

                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 gap-1">
                    <Links></Links>
                </ul>
            </div>
        )
    }
    // Ha az admin oldalon vagyunk a navbarban más lesz az összenyomott
    else {
        return (
            <div className='mr-3'>
                < SidebarButton />
            </div>
        )
    }

}

export default DropdownButton