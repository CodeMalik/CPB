import Image from 'next/image';
import CustomHeading from './CustomHeading';
import Link from 'next/link';



export default function HeroSection() {
    const title = "Top-Quality Custom Packaging Boxes Delivered"
  return (
    <section className="bg-[#f6eaea] px-6 py-12 md:py-20 mt-[10rem] md:mt-32">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Left Content */}
        <div className="flex-1">
          <CustomHeading title={title} />

          <p className="mt-6 text-lg text-gray-700 max-w-96">
            Enhance Your Brand with Unique, Customizable Packaging Solutions – Free Shipping Across the USA!
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a href='#quote'>
            <button
              className='bg-red-themed text-white px-6 py-6 hover:bg-red-700 transition-colors cursor-pointer'
            >
              Get Started
            </button>
            </a>
            <a href='#quote'>
            <button
              className='border border-red-themed text-red-themed px-6 py-6 cursor-pointer hover:bg-red-100 transition-colors'
            >
              Get a Free Quote Today!
            </button>
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 w-full max-w-md md:max-w-3xl">
          <Image
            src="https://custompackboxes.com/wp-content/uploads/2024/09/second-banner-mobile.6ea44d0a-1024x683.webp" // replace with your Cloudinary image
            alt="Packaging Products"
            width={800}
            height={800}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}
