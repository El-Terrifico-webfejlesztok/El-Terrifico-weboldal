'use client'
import React from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'

const ProfileButton = () => {

    const pfp = "https://webstockreview.net/images/food-clipart-taco-18.png"

    const { data: session, status } = useSession()

    if (status === "authenticated") {
        return (
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img alt="🌮" src={pfp} />
                    </div>
                </div>
                <ul tabIndex={0} className="gap-1 menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li className='text-center font-semibold border-b border-b-transparent border-b-slate-800 pb-2'>Heló, {session.user?.name}!</li>
                    <li>
                        <Link className="justify-between" href="/products">
                            Ajánlataink
                            <span className="badge badge-success">Új</span>
                        </Link>
                    </li>
                    <li><Link href='/profile/settings'>Beállítások</Link></li>
                    <li><span onClick={() => { signOut() }}>Kijelentkezés</span></li>
                </ul>
            </div>
        )
    }

    return (
        <Link href="/login" className='btn btn-large'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
        </Link>
    )



}

export default ProfileButton