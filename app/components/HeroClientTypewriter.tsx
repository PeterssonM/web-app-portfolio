'use client'

import { useTypewriter } from 'react-simple-typewriter'

export default function HeroClientTypewriter() {
  const [text] = useTypewriter({
    words: [
      'Computer Engineer',
      'Software Engineer',
      'Full-Stack Developer'
    ],
    loop: true,
    delaySpeed: 2000,
  })

  return (
    <h2 className="text-xl md:text-2xl text-blue-600 mt-4 pb-10 h-6 text-center relative">
      A Junior {text}
      <span className="cursor">|</span>
    </h2>
  ) 
}