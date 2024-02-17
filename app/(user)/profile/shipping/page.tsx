'use client'

import Link from 'next/link';
import React, { FormEvent, useState } from 'react'

const Form = () => {
    const [button, setButton] = useState('btn btn-big')
    const [buttonText, setFeedbackText] = useState('Bejelentkezés')

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setButton("loading loading-dots loading-lg mx-auto");
        
        const formData = new FormData(e.currentTarget);

        const response = await fetch


    }

    const formstyle = "input input-bordered w-full max-w-s";
    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 mx-auto max-w-md mt-12 p-2'>
            <label className="form-control w-full max-w-s">
                <div className="label">
                    <span className="label-text">E-mail*</span>
                </div>
                <input required type="email" name="email" placeholder="bestfood@terrifico.com" className={formstyle} />
            </label>
            <label className="form-control w-full max-w-s">
                <div className="label">
                    <span className="label-text">Jelszó*</span>
                </div>
                <input required type="password" name="password" placeholder="Super_spicy_password" className={formstyle} />
            </label>

            <button type='submit' className={button}>{buttonText}</button>

            <p>Nincs fiókod? <Link href="/register" className='link hover:text-gray-600'>Regisztrálj!</Link></p>
        </form>
    )
}


export default Form