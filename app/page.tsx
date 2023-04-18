'use client'

import Image from 'next/image'
// import { Inter } from 'next/font/google'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [dark, setDark] = useState  (false)
  return (
    <main className="">
      <Button primary={true} size="md" label="dd"></Button>
      <h1>Hello</h1>
    </main>
  )
}
