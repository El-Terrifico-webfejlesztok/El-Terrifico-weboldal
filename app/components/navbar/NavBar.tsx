import React from 'react';
import Link from 'next/link';
import SearchBar from './SearchBar'; // Import the SearchBar component
import ProfileButton from './ProfileButton';
import Cart from './Cart/Cart';
import LoadingBar from './LoadingBar';
import Links from './Links';

const NavBar = () => {


    return (
        <nav className='navbar justify-evenly bg-base-200 px-5 h-16 flex items-center shadow-md sticky top-0 z-50 gap-4'>
            <LoadingBar />

            {/* Navbar eleje (bal oldala) */}
            <div className='navbar-start'>

                {/* Dropdown menu a kicsi képernyőkre */}
                <div className="dropdown mr-3">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>

                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 gap-1">
                        <Links></Links>
                    </ul>
                </div>

                {/* Terrifico logo */}
                <Link href='/' className='mr-4 '>
                    <img src="/Sombrero.png" alt="Logo" className='max-h-10 cursor-pointer hover:scale-110 hover:brightness-150 active:scale-95 transition-all' />
                </Link>
            </div>
            {/* navbar-center középre rakja az komponenseket, csak nagy képernyőn látszanak */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-2 [&>*]:font-semibold">
                    <Links></Links>
                </ul>
            </div>

            <div className="navbar-end flex items-center gap-5"> {/* navbar-end jobbra rakja az komponenseket */}
                {/*<SearchBar />*/}
                <Cart />
                <ProfileButton />
            </div>
        </nav>
    );
};

export default NavBar;