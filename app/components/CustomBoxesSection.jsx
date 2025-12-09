import Image from "next/image";
import { customBoxSection } from "../constant";
import { aboutFeatures } from "../constant";

export default function CustomBoxesSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div>
            <div className="mb-12 md:mb-20 ">
            <h4 className="text-red-themed font-semibold text-xl mb-2">
              {customBoxSection.tagline}
            </h4>
            <div>
            <h2 className="text-4xl md:text-[2.8rem] font-semibold text-gray-900 mb-4">
              {customBoxSection.heading}
            </h2>
            <p className="text-gray-700">Craft custom boxes that reflect your brand's style, protect your products, and leave a lasting impression. From size and shape to finishes and inserts — design the perfect packaging that speaks volumes before it's even opened.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
      {aboutFeatures.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <div key={index} className="flex items-start gap-4">
            <span className="rounded-lg p-2" style={{ backgroundColor: feature.color }}>
              <Icon className="w-7 h-7 text-white" />
            </span>
            <div>
              <h3 className="font-semibold text-lg text-[#222] mb-1">
                {feature.title}
              </h3>
            </div>
          </div>
        );
      })}
      

      </div>
      <a href="#quote">
      <button className="
  group inline-flex items-center cursor-pointer gap-2 px-6 py-3 my-6 text-lg font-semibold rounded-full 
  text-white bg-red-themed border border-red-themed 
  hover:bg-transparent hover:text-red-themed hover:border-red-themed
  transition-all duration-300 ease-in-out
  shadow-md hover:shadow-lg
">
  <span className="relative">
    Request Custom Box
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-themed transition-all group-hover:w-full"></span>
  </span>
  <svg
    className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-12"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
</button>
</a>
    </div>

          <div className="flex-1 max-w-lg mx-auto">
            <Image
              src={customBoxSection.image}
              alt="Custom Box Example"
              className="rounded-xl shadow-lg w-[600px] max-h-[500px] object-cover"
              width={500}
              height={300}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
