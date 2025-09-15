import React from 'react'
import { FaPhoneAlt, FaEnvelope, FaFacebookF, FaInstagram, FaLinkedinIn, FaPinterestP, FaYoutube, FaTiktok } from 'react-icons/fa'
const TopMenu = () => {
  return (
    <div className="bg-[#FF0101] text-white  md:ml:20 pl-28 pr-12 py-3.5 text-sm flex justify-between items-center">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <span className="flex items-center gap-1"><FaPhoneAlt />(406) 289 6262</span>
          <span className="flex items-center gap-1"><FaEnvelope /> sales@custompackboxes.com</span>
        </div>
        <div className="hidden sm:flex gap-5 text-lg">
          <a href='https://www.facebook.com/custompackboxes.us/' target='_blank'><FaFacebookF className="cursor-pointer" /></a>
          <a href='https://www.instagram.com/accounts/login/?next=%2Fcustompackboxes.us%2F&source=omni_redirect' target='_blank'><FaInstagram className="cursor-pointer" /></a>
          <a href='https://www.linkedin.com/company/custompackboxes/' target='_blank'><FaLinkedinIn className="cursor-pointer" /></a>
          <a href='https://www.pinterest.com/custompackboxes/' target='_blank'><FaPinterestP className="cursor-pointer" /></a>
          <a href='https://www.youtube.com/@CustomPackBoxes' target='_blank'><FaYoutube className="cursor-pointer" /></a>
          <a href='https://www.tiktok.com/@custompackboxes' target='_blank'><FaTiktok className="cursor-pointer" /></a>
        </div>
      </div>
  )
}

export default TopMenu