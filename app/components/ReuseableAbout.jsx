// components/AboutSection.jsx
import Image from "next/image";
import Link from "next/link";

const ReuseableAbout = ({ title, description, imageSrc, buttonLink }) => {
  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="container mx-auto flex flex-col lg:flex-row gap-12 justify-between items-center">
        {/* Left Content */}
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-gray-700 mb-6">{description}</p>
          <Link
            href={buttonLink}
            className="inline-block border border-red-600 text-black px-6 py-2 hover:bg-red-600 hover:text-white transition-all"
          >
            {"Get a Quote"}
          </Link>
        </div>

        {/* Right Image with red corner frame */}
        <div className="relative w-full max-w-sm mx-auto md:mx-0">
          <div className="absolute -top-6 -left-6 w-full h-full border-6 border-red-themed z-0"></div>
          <div className="relative z-10">
            <Image
              src={imageSrc}
              alt={title}
              width={300}
              height={400}
              className="w-full h-[480px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReuseableAbout
