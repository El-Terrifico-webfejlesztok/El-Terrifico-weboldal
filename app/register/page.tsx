'use client'

import React, { FormEvent, useState } from 'react'

const RegisterPage = () => {
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
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 mx-auto max-w-md mt-12 p-2'>
            <label className="form-control w-full max-w-s">
                <div className="label">
                    <span className="label-text">E-mail*</span>
                </div>
                <input required type="email" name="email" placeholder="bestfood@terrifico.com" className={formstyle} />            </label>
            <label className="form-control w-full max-w-s">
                <div className="label">
                    <span className="label-text">Username*</span>
                </div>
                <input required type="text" name="username" placeholder="Tasty123" className={formstyle} />            </label>
            <label className="form-control w-full max-w-s">
                <div className="label">
                    <span className="label-text">Password*</span>
                </div>
                <input required type="password" name="password" placeholder="Super_spicy_password" className={formstyle} />            </label>
            <button type='submit' className={button}>{buttonText}</button>
        </form>
    )
}

export default RegisterPage