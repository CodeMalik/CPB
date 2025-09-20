// app/components/Footer.tsx
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#f3eaea] text-[#222] text-[16px] pt-10 pb-4 border-t border-red-200">
      <div className="mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <Image src={"/logo.png"} width={200} height={200} alt="Website logo" className="-mt-4 mb-6"/>
          <p>
            <span className="font-semibold text-[#e3342f]">Custom Pack Boxes</span> is a leading manufacturer and wholesale supplier of high-quality packaging products for a wide range of industries. Our extensive product line includes customized corrugated boxes, kraft boxes, mailer boxes, rigid boxes and more.
          </p>
        </div>
        {/* Quick Links */}
        <div>
          <h2 className="font-semibold text-xl mb-2">Quick Links</h2>
          <ul className="space-y-1">
            <li><Link href="/about" className="hover:underline">About Us</Link></li>
            <li><a href="/our-recent-boxes" className="hover:underline">Our Recent Boxes</a></li>
            <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
            <li><Link href="/customized/apparel-boxes" className="hover:underline">Apparel Packaging</Link></li>
            <li><Link href="/terms-and-conditions" className="hover:underline">Terms & Conditions</Link></li>
          </ul>
        </div>
        {/* Contacts */}
        <div>
          <h2 className="font-semibold text-xl mb-2">Contacts</h2>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <MapPin className="w-5 h-5 mt-1 text-[#e3342f]" />
              <span>1001 S Main ST # 7115, Kalispell, MT 59901</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-[#e3342f]" />
              <span>(406) 289 6262</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#e3342f]" />
              <span>support@custompackboxes.com</span>
            </li>
          </ul>
        </div>
        {/* Hot Products */}
        <div>
          <h2 className="font-semibold text-xl mb-2">Hot Products</h2>
          <ul className="space-y-2">
            <li><Link href={"/custom-packaging/custom-underwear-boxes"}></Link>Custom Underwear Boxes</li>
            <li><Link href={"/custom-packaging/custom-belt-boxes"}></Link>Custom belt Boxes</li>
          </ul>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="mx-auto px-4 mt-8 flex flex-col md:flex-row items-center justify-between border-t border-red-200 pt-4">
        <div className="text-sm text-[#222]">
          © Copyright {new Date().getFullYear()} - <span className="font-semibold text-[#e3342f]">Custom Pack Boxes</span> All rights Reserved
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          {/* Replace these with your actual images/icons */}
          <span className="w-12 h-6 bg-gray-200 rounded flex items-center justify-center text-xs">DMCA</span>
          <span className="w-12 h-6 bg-gray-200 rounded flex items-center justify-center text-xs">Seal</span>
          <span className="w-12 h-6 bg-gray-200 rounded flex items-center justify-center text-xs">Shield</span>
        </div>
      </div>
    </footer>
  );
}
