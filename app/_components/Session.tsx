"use client"


import { useSession } from 'next-auth/react'
import React from 'react'

const Session = () => {

    const data = useSession();
    console.log(data)

  return (
    <div>
      
    </div>
  )
}

export default Session

