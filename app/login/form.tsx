'use client'

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FormEvent } from 'react'

const Form = () => {
    const router = useRouter();
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const response = await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: false,
        })

        // Sikeres bejelentkezésnél átirányít a főoldalra
        if (!response?.error) {
            router.push("/");
            router.refresh();
        }
    }

    const formstyle = "input input-bordered w-full max-w-s";
    const button = "btn btn-large";
    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 mx-auto max-w-md mt-12 p-2'>
            <label className="form-control w-full max-w-s">
                <div className="label">
                    <span className="label-text">E-mail*</span>
                </div>
                <input required type="email" name="email" placeholder="bestfood@terrifico.com" className={formstyle} />            </label>
            <label className="form-control w-full max-w-s">
                <div className="label">
                    <span className="label-text">Jelszó*</span>
                </div>
                <input required type="password" name="password" placeholder="Super_spicy_password" className={formstyle} />            </label>
            <button type='submit' className={button}>Bejelentkezés</button>
            <p>Nincs fiókod? <Link href="/register" className='link hover:text-gray-600'>Regisztrálj!</Link></p>
        </form>
    )
}


export default Form