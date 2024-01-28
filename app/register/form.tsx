'use client'

import React, { FormEvent, useState } from 'react'

const form = () => {
    const [button, setButton] = useState('btn btn-big')
    const [buttonText, setFeedbackText] = useState('Register')

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // formdata
        const formData = new FormData(e.currentTarget);
        console.log()
        // Send the request to the server with the data
        setButton("loading loading-dots loading-lg mx-auto");
        const response = await fetch(`/api/register`, {
            method: 'POST',
            body: JSON.stringify({
                email: formData.get('email'),
                password: formData.get('password'),
                username: formData.get('username'),
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            setButton('btn btn-big btn-success')
            setFeedbackText('Sikeres regisztráció!')
        } else {
            setButton('btn btn-big btn-error')
            const errorData = await response.json();
            console.log(errorData)
            setFeedbackText(
                (Array.isArray(errorData) && errorData.length > 0) // Check if it's an array with at least one error
                    ? errorData[0].message // Use the message from the first error
                    : errorData[0]?.message || errorData.error || 'Unknown error, please try again' // Use the first error's message or the general error message
            );
        }
        console.log(response);
    }
    // Az inputok stílusa
    const formstyle = "input input-bordered w-full max-w-s"

    return (
        <>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 mx-auto max-w-md mt-12 p-2'>
                <label className="form-control w-full max-w-s">
                    <div className="label">
                        <span className="label-text">E-mail*</span>
                    </div>
                    <input required type="email" name="email" placeholder="bestfood@terrifico.com" className={formstyle} />            </label>
                <label className="form-control w-full max-w-s">
                    <div className="label">
                        <span className="label-text">Felhasználónév*</span>
                    </div>
                    <input required type="text" name="username" placeholder="Tasty123" className={formstyle} />            </label>
                <label className="form-control w-full max-w-s">
                    <div className="label">
                        <span className="label-text">Jelszó*</span>
                    </div>
                    <input required type="password" name="password" placeholder="Super_spicy_password" className={formstyle} />            </label>
                <button type='submit' className={button}>{buttonText}</button>
                <span className='alert alert-warning max-w-lg mx-auto mt-4'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>

                Ne adj meg valós adatokat! Ez csak egy iskolai projekt. <a className='link' href="https://github.com/El-Terrifico-webfejlesztok/El-Terrifico-weboldal">El Terrifico github</a>
            </span>
            </form>
            
        </>
    )
}

export default form