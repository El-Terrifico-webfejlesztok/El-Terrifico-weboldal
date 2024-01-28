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
                        <img alt="Your profile picture" src={pfp} />
                    </div>
                </div>
                <ul tabIndex={0} className="gap-1 menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
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
        <button className='btn btn-large'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            <Link href="/login">Bejelentkezés</Link>
        </button>
    )



}

export default ProfileButton