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
      <div role="alert" className="alert alert-info">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span>Hivatalosan csak a retro, luxury és black témákat támogatjuk. Más témában felmerülő hibát valószínűleg nem javítunk</span>
      </div>
    </div>
  )
}

export default ThemeChooser