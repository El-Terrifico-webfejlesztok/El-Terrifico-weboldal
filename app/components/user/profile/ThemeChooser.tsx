'use client'
import React from 'react'
import { useEffect } from 'react'
import { themeChange } from 'theme-change'
import { themes } from '@/tailwind.config'

const ThemeChooser = () => {
  useEffect(() => {
    themeChange(false)
  }, [])

  return (
    <div className='flex flex-col max-w-md mx-auto p-4 m-4 space-y-2'>
      {themes.map(theme => (
        <button key={theme} data-set-theme={theme} data-act-class="ACTIVECLASS" className='btn text-lg'>{theme}</button>
      ))}
    </div>
  )
}

export default ThemeChooser