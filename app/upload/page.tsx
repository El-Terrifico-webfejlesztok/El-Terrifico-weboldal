'use client'
import React from 'react'
import {useSession, getSession} from "next-auth/react"



const UploadPage = () => {
    const {data: session, status} = useSession()
    console.log(session, status)

  return (
    <>testing</>
  )
}

export default UploadPage