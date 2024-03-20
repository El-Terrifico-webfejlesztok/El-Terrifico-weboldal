'use client'
import React, { useEffect } from 'react'
import { themeChange } from 'theme-change'

const ThemeProvider = () => {
    useEffect(() => {
        themeChange(false)
    }, [])

    return null
}

export default ThemeProvider