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
            <Link href={"/"} className="font-semibold text-[#e3342f]">Custom Pack Boxes</Link> is a leading manufacturer and wholesale supplier of high-quality packaging products for a wide range of industries. Our extensive product line includes customized corrugated boxes, kraft boxes, mailer boxes, rigid boxes and more.
          </p>
        </div>
        {/* Quick Links */}
        <div>
          <h2 className="font-semibold text-xl mb-2">Quick Links</h2>
          <ul className="space-y-1">
            <li><Link href="/about" className="hover:underline">About Us</Link></li>
            <li><Link href="/our-recent-boxes" className="hover:underline">Our Recent Boxes</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
            <li><Link href="/sitemap.xml" className="hover:underline">Sitemap</Link></li>
            <li><Link href="/customized/apparel-boxes" className="hover:underline">Apparel Packaging</Link></li>
            <li><Link href="/terms-and-conditions" className="hover:underline">Terms & Conditions</Link></li>
            <li><Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
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
              <a className="hover:underline" href="tel:+(406)2896262">(406) 289 6262</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#e3342f]" />
              <a className="hover:underline" href="mailto:sales@custompackboxes.com">sales@custompackboxes.com</a>
            </li>
          </ul>
        </div> 
        {/* Hot Products */}
        <div>
          <h2 className="font-semibold text-xl mb-2">Hot Products</h2>
          <ul className="space-y-2">
            <li><Link className="hover:underline" href={"/custom-packaging/custom-underwear-boxes"}>Custom Underwear Boxes</Link></li>
            <li><Link className="hover:underline" href={"/custom-packaging/custom-belt-boxes"}>Custom belt Boxes</Link></li>
            <li><Link className="hover:underline" href={"/custom-packaging/custom-chocolate-boxes"}>Custom Chocolate Boxes</Link></li>
            <li><Link className="hover:underline" href={"/custom-packaging/custom-christmas-gift-boxes"}>Christmas Gift Boxes</Link></li>
            <li><Link className="hover:underline" href={"/custom-packaging/custom-skin-care-boxes"}>Custom Skin Care Boxes</Link></li>
            <li><Link className="hover:underline" href={"/custom-packaging/soap-boxes-wholesale"}>Soap Boxes Wholesale</Link></li>
          </ul>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="mx-auto px-4 mt-8 flex flex-col md:flex-row items-center justify-between border-t border-red-200 pt-4">
        <div className="text-sm text-[#222]">
          © Copyright {new Date().getFullYear()} - <Link href={"/"} className="font-semibold text-[#e3342f]">Custom Pack Boxes</Link> All rights Reserved
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
