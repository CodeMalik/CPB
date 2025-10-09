import Image from "next/image";
import CustomElement from "./CustomElement";
const highlightWords = ["Custom", "Boxes Delivered"];
import { benefitsImages } from "../constant"


export default function HeroSection() {
  const title = "Top-Quality Custom Packaging Boxes Delivered";
  return (
    <section className="bg-[#f6eaea] px-6 py-12 md:py-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <div className="flex-1">
          <CustomElement
            title={title}
            as="h1"
            isRed
            className="text-4xl md:text-6xl font-semibold"
            highlightWords={highlightWords}
          />

          <p className="mt-6 text-lg text-gray-700 max-w-96">
            Custom Packaging That Tells Your Brand Story — Delivered Free Across the USA!
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a href="#quote">
              <button
              className='border border-red-themed bg-red-themed px-6 py-4 cursor-pointer rounded-full text-white hover:bg-red-400 transition-colors'
            >
              Get a Free Quote Today!
            </button>
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 w-full max-w-md md:max-w-3xl">
          <Image
            src="https://res.cloudinary.com/dfnjpfucl/image/upload/v1751973245/second-banner-mobile.6ea44d0a-1024x683_meoinx.webp" // replace with your Cloudinary image
            alt="Packaging Products"
            width={800}
            height={500}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
      <div className="mt-12">
      </div>
    </section>
  );
}
