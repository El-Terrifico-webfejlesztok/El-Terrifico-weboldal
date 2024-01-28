import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

/* Átírtam az Image src-t, adtam neki height, width, csak mert nem akart ezek miatt menni az oldal- Barni */

const ProfileButton = () => {

    const pfp = "https://webstockreview.net/images/food-clipart-taco-18.png"
    

    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                    <Image alt="Your profile picture" src="/Sef.jpg" width={20} height={20} />
                </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                    <Link className="justify-between" href="/profile">
                        Profile
                        <span className="badge">New</span>
                    </Link>
                </li>
                <li><Link href='/profile/settings'>Settings</Link></li>
                <li><Link href='/logout'>Logout</Link></li>
            </ul>
        </div>
    )
}

export default ProfileButton