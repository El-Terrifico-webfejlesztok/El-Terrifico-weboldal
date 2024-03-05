import React from 'react'

const NotFound = () => {
    return (
        <div className="hero min-h-[calc(100vh-64px)] bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">404</h1>
                    <p className="text-center pt-6">Eltévedtél Amigo! </p>
                    <p className='text-center text- py-3 text-sm'>Erre még a kartell sem jár...</p>
                    <a href="/" className="btn btn-primary">Vissza a főoldalra</a>
                </div>
            </div>
        </div>
    )
}

export default NotFound