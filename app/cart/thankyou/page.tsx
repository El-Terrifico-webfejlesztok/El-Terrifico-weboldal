import Link from 'next/link'
import React from 'react'


const ThankYou = () => {
    return (
        <div className="min-h-[calc(100vh-64px)] hero">
            <div className="hero-content text-center">
                <img className='mx-auto hidden md:inline-block' src="/Cactus.png" alt="Ünneplő kaktusz" />

                <div className="max-w-lg">
                    <h1 className="text-6xl font-bold">Sikeres rendelés!</h1>
                    <p className="text-lg text-center font-bold text pt-2">Köszönjük hogy az El Terrifico-t választottad!</p>
                    <p className="text-lg text-center pt-4">Franco rögtön elkészíti rendelésed!</p>
                    <p className="text-lg text-center text pt-4">A profilodban meg tudod nézni a rendelésed státuszát</p>

                    <div className='pt-8 flex justify-around'>
                        <Link href='/profile' className="text-lg btn w-32 btn-info">Profil</Link>
                        <Link href='/products' className="text-lg btn w-32 btn-info">Termékek</Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ThankYou