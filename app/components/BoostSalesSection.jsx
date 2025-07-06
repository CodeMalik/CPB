import Image from "next/image";
import { boostSalesSection } from "../constant";

export default function BoostSalesSection() {
    const {heading, image, paragraphs } = boostSalesSection
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center gap-10">
        
        <div className="relative w-full flex items-center justify-center lg:block md:w-1/2 max-w-lg">
          <div className="absolute top-[-20px] left-[3rem] md:left-[-30px] w-[300px] h-[450px] border-4 border-red-themed z-0"></div>
          <Image
            src={image}
            width={350}
            height={400}
            className="relative z-10 w-[300px] h-auto object-contain shadow-md"
            priority
          />
        </div>

        {/* Text Content */}
        <div className="w-full md:flex-1">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-gray-900">
            {heading}
          </h2>
          {paragraphs.map((para, index) => (
          <p key={index} className="text-gray-700 mb-4 text-[15px]">
            {para}
          </p>
          ))}
          <button className="border border-black px-5 py-2 text-sm hover:bg-black hover:text-white transition">
            Get a Quote
          </button>
        </div>
      </div>
    </section>
  );
}
