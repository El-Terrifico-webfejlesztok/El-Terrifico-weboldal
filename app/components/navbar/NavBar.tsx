import React from 'react';
import Link from 'next/link';
import SearchBar from './SearchBar'; // Import the SearchBar component
import ProfileButton from './ProfileButton';
import Cart from './Cart';
import LoadingBar from './LoadingBar';
import Links from './Links';

const NavBar = () => {


    return (
        <nav className='navbar bg-base-200 px-5 h-16 flex items-center shadow-md sticky top-0 z-50 gap-4'>
            <LoadingBar />
            <Link href='/' className='mr-4'>
                <img src="Sombrero.png" alt="Logo" className='max-h-10 cursor-pointer' />
            </Link>

            <Links></Links>

            <div className="ml-auto flex items-center gap-5"> {/* ml-auto jobbra rakja az komponenseket */}
                {/*<SearchBar />*/}
                <Cart />
                <ProfileButton />
            </div>
        </nav>
    );
};

export default NavBar;