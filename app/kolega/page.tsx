import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Kolegák",
    description: "Az El Terrifico társcsapatjai"
  };

const page = () => {
    return (
        <>
            <div className='grid grid-cols-2 mx-auto min-h-fit'>
                <div className='flex justify-center items-center shadow-inner lg:col-span-1 lg:h-[calc(50vh-32px)] p-2 col-span-2'>
                    <a href='https://halozatconfig.sytes.net/Army_Webshop/army-project/dist/index.html' target='_blank' className="flex-col justify-center items-center bg-base-100" >
                        <div className='w-96 h-56 p-5 mx-auto mb-8 flex justify-center'>
                            <img className='object-contain' src="/kolegak/army_logo.png" alt="Album" />
                        </div>
                        <div className="">
                            <h1 className='text-center text-2xl font-bold leading-5'>Army Webshop</h1>
                            <p className='text-center text-sm'><i>🐘🐘 I ❤️ PHP 🐘🐘</i></p>
                            <p className='text-center mt-4'>A legjobb billenyűzetkereskedés e vidéken</p>
                        </div>
                    </a>
                </div>

                <div className='flex justify-center items-center shadow-inner lg:col-span-1 lg:h-[calc(50vh-32px)] p-2 col-span-2'>
                    <a href='https://darido.pythonanywhere.com/' target='_blank' className="flex-col justify-center items-center bg-base-100" >
                        <div className='w-96 h-56 p-5 mx-auto mb-8 flex justify-center'>
                            <img className='object-contain' src="/kolegak/darido.png" alt="Album" />
                        </div>
                        <div className="">
                            <h1 className='text-center text-2xl font-bold leading-5'>Dáridó</h1>
                            <p className='text-center text-sm'><i>The digital store</i></p>
                            <p className='text-center mt-4'>A magyar Elit kedvenc áruháza</p>
                        </div>
                    </a>
                </div>

                <div className='flex justify-center items-center shadow-inner lg:col-span-1 lg:h-[calc(50vh-32px)] p-2 col-span-2'>
                    <a href='https://rosszfogas.pythonanywhere.com/' target='_blank' className="flex-col justify-center items-center bg-base-100" >
                        <div className='w-96 h-56 p-5 mx-auto mb-8 flex justify-center'>
                            <img className='object-contain' src="/kolegak/rosszfogas.png" alt="Album" />
                        </div>
                        <div className="">
                            <h1 className='text-center text-2xl font-bold leading-5'>Rosszfogás</h1>
                            <p className='text-center text-sm'><i>Csak óvatosan!</i></p>
                            <p className='text-center mt-4'>Minden is eladó, akármi is kapható</p>
                        </div>
                    </a>
                </div>

                <div className='flex justify-center items-center shadow-inner lg:col-span-1 lg:h-[calc(50vh-32px)] p-2 col-span-2'>
                    <a href='https://terrifico.zapto.org/' target='_blank' className="flex-col justify-center items-center bg-base-100" >
                        <div className='w-96 h-56 p-5 mx-auto mb-8 flex justify-center'>
                            <img className='object-contain' src="/kolegak/terrifico.png" alt="Album" />
                        </div>
                        <div className="">
                            <h1 className='text-center text-2xl font-bold leading-5'>El Terrifico</h1>
                            <p className='text-center text-sm'><i>Sergio Franco</i></p>
                            <p className='text-center mt-4'>Mintha már láttam volna valahol</p>
                        </div>
                    </a>
                </div>




            </div>
        </>
    )
}

export default page