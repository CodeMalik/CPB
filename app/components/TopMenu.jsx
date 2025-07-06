import React from 'react'
import { FaPhoneAlt, FaEnvelope, FaFacebookF, FaInstagram, FaLinkedinIn, FaPinterestP, FaYoutube, FaTiktok } from 'react-icons/fa'
const TopMenu = () => {
  return (
    <div className="bg-[#FF0101] text-white text-sm md:ml:20 pl-28 pr-12 py-4.5 flex justify-between items-center">
        <div className="flex flex-wrap items-center gap-4 text-sm sm:text-lg">
          <span className="flex items-center gap-1"><FaPhoneAlt /> (406) 3380-235</span>
          <span className="flex items-center gap-1"><FaEnvelope /> sales@custompackboxes.com</span>
        </div>
        <div className="hidden sm:flex gap-5 text-lg">
          <FaFacebookF className="cursor-pointer" />
          <FaInstagram className="cursor-pointer" />
          <FaLinkedinIn className="cursor-pointer" />
          <FaPinterestP className="cursor-pointer" />
          <FaYoutube className="cursor-pointer" />
          <FaTiktok className="cursor-pointer" />
        </div>
      </div>
  )
}

export default TopMenu