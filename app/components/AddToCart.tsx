// Server side rendering is default. Client side components have to be defined!
'use client'

import React from 'react'

const AddToCart = () => {
    return (
        <button className='btn btn-primary' onClick={() => console.log('Click!!!')}>Add to card!!!!!!</button>
    )
}

export default AddToCart 