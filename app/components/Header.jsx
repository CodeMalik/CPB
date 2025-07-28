'use client'
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Search } from 'lucide-react'
import { TopMenu } from "./";
import {
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Link from "next/link";
import { navigation } from "@/app/constant";

export default function Header() {
  const wrapperRef = useRef()
  const [open, setOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Top red bar */}
      <TopMenu />

      {/* Bottom white bar */}
      <div className="bg-white py-4 px-2 md:pl-6 md:pr-32 shadow">
        <div className="flex items-center justify-between">
          {/* Logo + Desktop Nav */}
          <div className="flex items-center gap-6">
            <Link href="/">
              <Image src="/logo.png" alt="Logo" loading="lazy" width={160} height={60} />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-black relative">
              {navigation.map((item) => (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.submenu ? item.id : null)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {item.submenu ? (
                    <button className="group flex items-center gap-1 py-5 px-2 cursor-pointer hover:bg-red-themed hover:text-white transition-colors duration-200">
                      {item.title} <img src="/icons/down-arrow.png" width={20} className="group-hover:invert" />
                    </button>
                  ) : (
                    <Link href={item.url}>{item.title}</Link>
                  )}

                  {/* Dropdown */}
                  {item.submenu && openDropdown === item.id && (
                    <div className="absolute top-full left-0 pt-4 w-[40rem] p-4 bg-white border shadow-lg rounded grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 z-50">
                      {item.submenu.map((sub, index) => (
                        <Link key={index} href={sub.url} className="flex items-center gap-2 hover:text-red-600">
                          {sub.icon && <img src={sub.icon} alt="Navigation Icons"/>}
                          <span>{sub.title}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Desktop Right */}
          <div className="hidden lg:flex items-center gap-4" ref={wrapperRef}>
            <Link href={"/contact"}>
            <button className="border border-red-500 bg-red-themed px-4 text-white py-4 hover:bg-red-400 cursor-pointer transition">
              Get a Quote
            </button>
            </Link>
            <button onClick={() => setOpen((prev) => !prev)} className="text-gray-700 cursor-pointer hover:text-black transition">
              <Search className="w-5 h-5" />
            </button>
            
             {open && (
        <div className="bg-white border ">
          <input
              className="border px-2 w-[8rem] py-4 text-gray-700 hover:bg-gray-100 transition"
              type="text"
              placeholder="Search Here"
            />
        </div>
      )}
          </div>

          {/* Mobile Menu Icon */}
          <button
            className="lg:hidden text-2xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
  <div className="fixed top-0 left-0 h-screen w-[80%] bg-white z-50 p-6 overflow-y-auto shadow-lg transition-all duration-300">
    <div className="flex justify-between items-center mb-6">
      <Link href="/" onClick={() => setMobileMenuOpen(false)}>
        <Image src="/logo.png" alt="Logo" width={140} height={50} />
      </Link>
      <button onClick={() => setMobileMenuOpen(false)} className="text-2xl">
        <FaTimes />
      </button>
    </div>

    {/* Mobile Nav Items */}
    <div className="flex flex-col gap-4 text-sm font-medium text-black">
      {navigation.map((item) => (
        <div key={item.id}>
          {item.submenu ? (
            <div>
              <button
                className="flex items-center justify-between w-full py-2 px-2 rounded hover:bg-gray-100"
                onClick={() =>
                  setMobileDropdownOpen(mobileDropdownOpen === item.id ? null : item.id)
                }
              >
                <span>{item.title}</span>
                <img
                  src="/icons/down-arrow.png"
                  className={`w-4 transition-transform ${
                    mobileDropdownOpen === item.id ? "rotate-180" : ""
                  }`}
                />
              </button>
              {mobileDropdownOpen === item.id && (
                <div className="pl-4 mt-2 flex flex-col gap-2">
                  {item.submenu.map((sub, index) => (
                    <Link
                      key={index}
                      href={sub.url}
                      className="flex items-center gap-2 hover:text-red-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {sub.icon && (
                        <img src={sub.icon} alt={sub.title} className="w-4 h-4" />
                      )}
                      <span>{sub.title}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              href={item.url}
              className="py-2 px-2 hover:bg-gray-100 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.title}
            </Link>
          )}
        </div>
      ))}

      {/* Quote & Search Buttons */}
      <button className="mt-4 border border-red-500 text-red-600 px-4 py-2 rounded hover:bg-red-100 transition w-max">
        Get a Quote
      </button>
      <input
        className="border px-4 py-2 rounded text-gray-700 hover:bg-gray-100 transition w-full mt-2"
        type="text"
        placeholder="Search Here"
      />
    </div>
  </div>
)}

      </div>
    </div>
  );
}
