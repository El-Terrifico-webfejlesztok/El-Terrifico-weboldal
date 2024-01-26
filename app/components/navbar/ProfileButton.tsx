import React from 'react'
import Link from 'next/link'

const ProfileButton = () => {

    const pfp = "https://webstockreview.net/images/food-clipart-taco-18.png"


    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                    <img alt="Your profile picture" src={pfp} />
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