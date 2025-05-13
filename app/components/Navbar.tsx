'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth',
      });
    }
    setMenuOpen(false);
  };

  const handleMenuItemClick = (id: string) => {
    if (window.location.pathname !== '/') {
      router.push('/');
    } else {
      scrollToSection(id);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <h1
          className="text-xl font-bold cursor-pointer"
          onClick={() => scrollToSection("home")}
        >
          Maximilian Petersson
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          {["Home", "Experience", "Projects", "About Me", "Contact Me"].map((item) => {
            const isContact = item === "Contact Me";
            return (
              <li key={item}>
                <button
                  onClick={() => handleMenuItemClick(item.toLowerCase().replace(" ", "-"))}
                  className={`transition px-3 py-1 rounded ${
                    isContact
                      ? "bg-blue-500 text-white border border-blue-600 hover:bg-blue-600"
                      : "hover:text-blue-500"
                  }`}
                >
                  {item}
                </button>
              </li>
            );
          })}
          <li>
            <Link href="/admin" className="hover:text-blue-500 transition">
              Login
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${menuOpen ? "block" : "hidden"} bg-white shadow-md`}>
        <ul className="flex flex-col items-center space-y-4 py-4">
          {["Home", "Experience", "Projects", "About Me", "Contact Me"].map((item) => {
            const isContact = item === "Contact Me";
            return (
              <li key={item}>
                <button
                  onClick={() => handleMenuItemClick(item.toLowerCase().replace(" ", "-"))}
                  className={`block text-lg transition px-4 py-2 rounded ${
                    isContact
                      ? "bg-blue-500 text-white border border-blue-600 hover:bg-blue-600"
                      : "hover:text-blue-500"
                  }`}
                >
                  {item}
                </button>
              </li>
            );
          })}
          <li>
            <Link href="/admin" className="block text-lg hover:text-blue-500 transition">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
