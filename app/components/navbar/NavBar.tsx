import React from 'react';
import Link from 'next/link';
import ProfileButton from './ProfileButton';
import Cart from './Cart/Cart';
import LoadingBar from './LoadingBar';
import Links from './Links';
import { useRouter } from 'next/router';
import DropdownButton from './DropdownButton';

const NavBar = () => {

    return (
        <nav className='navbar justify-evenly bg-base-200 px-5 h-16 flex items-center shadow-md sticky top-0 z-50 gap-4'>
            <LoadingBar />

            {/* Navbar eleje (bal oldala) */}
            <div className='navbar-start'>

                {/* Dropdown menu a kicsi képernyőkre */}

                <DropdownButton />

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