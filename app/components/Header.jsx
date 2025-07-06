'use client'
import Image from "next/image";
import { useState } from "react";
import { TopMenu } from "./";
import {
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Link from "next/link";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Top red bar */}
      <TopMenu />

      {/* Bottom white bar */}
      <div className="bg-white py-4 px-2  md:pl-6 p md:pr-32 shadow">
        <div className="flex items-center justify-between">
          {/* Logo + Desktop Nav */}
          <div className="flex items-center gap-6">
            <Link href={'/'}>
            <Image src="/logo.png" alt="Logo" loading="lazy" width={160} height={220} />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-black">
              <Link href="/">Home</Link>
              <a href="#">Box By Industry ▼</a>
              <a href="#">Box By Stock ▼</a>
              <Link href="/about">About Us</Link>
              <Link href="contact" className=" text-black px-3 py-1 rounded">Contact Us</Link>
            </nav>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <button className="border border-red-500 text-red-600 px-4 py-4  hover:bg-red-100 transition">
              Get a Quote
            </button>
            <input className="border px-2 w-[8rem]  py-4  text-gray-700 hover:bg-gray-100 transition" type="text" placeholder="Search Here" />
          </div>

          {/* Mobile menu icon */}
          <button
            className="lg:hidden text-2xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mt-4 flex flex-col gap-4 text-sm font-medium text-black lg:hidden">
            <a href="#">Home</a>
            <a href="#">Box By Industry ▼</a>
            <a href="#">Box By Stock ▼</a>
            <a href="#">About Us</a>
            <a href="#" className="bg-red-100 text-black px-3 py-1 rounded w-max">Contact Us</a>
            <button className="border border-red-500 text-red-600 px-4 py-2 rounded hover:bg-red-100 transition w-max">
              Get a Quote
            </button>
            <button className="border px-4 py-2 rounded text-gray-700 hover:bg-gray-100 transition w-max">
              Search Here
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
