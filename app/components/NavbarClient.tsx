'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface NavbarClientProps {
  isOpenToWork: boolean
}

const navItems = [
  { label: 'Home', id: 'home' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'About Me', id: 'about-me' },
  { label: 'Education', id: 'education' },
  { label: 'Contact Me', id: 'contact-me', highlight: true },
  { label: 'Login', href: '/admin' },
]

const NavbarClient = ({ isOpenToWork }: NavbarClientProps) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id)
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 40,
        behavior: 'smooth',
      })
    }
    setMenuOpen(false)
  }

  const handleMenuItemClick = (item: typeof navItems[number]) => {
    if (item.href) {
      router.push(item.href)
      return
    }

    if (window.location.pathname !== '/') {
      router.push('/')
    } else {
      scrollToSection(item.id!)
    }
  }

  const baseBtn = "transition px-3 py-1 rounded"
  const highlightBtn = "bg-blue-500 text-white border border-blue-600 hover:bg-blue-600"
  const hoverBtn = "hover:text-blue-500"

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <h1
          className="text-xl font-bold cursor-pointer flex items-center gap-2"
          onClick={() => handleMenuItemClick({ label: 'Home', id: 'home' })}
        >
          Maximilian Petersson
        </h1>

        {isOpenToWork && (
          <span
            title="Open To Work"
            className="bg-green-100 text-green-800 font-medium text-sm px-2 py-1 rounded-full border border-green-300"
          >
            Open To Work
          </span>
        )}

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-1 2xl:space-x-6">
          {navItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => handleMenuItemClick(item)}
                className={`${baseBtn} ${
                  item.highlight ? highlightBtn : hoverBtn
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${menuOpen ? 'block' : 'hidden'} bg-white shadow-md`}>
        <ul className="flex flex-col items-center space-y-4 py-4">
          {navItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => handleMenuItemClick(item)}
                className={`block text-lg px-4 py-2 rounded transition ${
                  item.highlight ? highlightBtn : hoverBtn
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default NavbarClient
