import Image from "next/image";
import { customBoxSection } from "../constant";
import { aboutFeatures } from "../constant";

export default function CustomBoxesSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-[1500px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          
          {/* Left Column - UNCHANGED */}
          <div>
            {/* Header Section */}
            <div className="mb-12 md:mb-20">
              <h4 className="text-red-themed font-semibold text-xl mb-4">
                {customBoxSection.tagline}
              </h4>
              
              <div>
                <h2 className="text-4xl md:text-[2.8rem] font-semibold text-gray-900 mb-6">
                  {customBoxSection.heading}
                </h2>
                <p className="text-gray-700">
                  Craft custom boxes that reflect your brand's style, protect your products, and leave a lasting impression. From size and shape to finishes and inserts — design the perfect packaging that speaks volumes before it's even opened.
                </p>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {aboutFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <span 
                      className="rounded-lg p-2" 
                      style={{ backgroundColor: feature.color }}
                    >
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

            {/* CTA Button */}
            <a href="#quote">
              <button className="
                group inline-flex items-center cursor-pointer gap-2 px-6 py-3 my-6 text-lg font-semibold rounded-full 
                text-white bg-red-themed border border-red-themed 
                hover:bg-transparent hover:text-red-themed hover:border-red-themed
                transition-all duration-300 ease-in-out
                shadow-md hover:shadow-lg md:mt-10
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

          {/* Right Column - INCREASED IMAGE SIZE ONLY */}
          <div className="flex-1 max-w-[800px] mx-auto md:ml-70 md:mt-25
          ">
            <div className="relative group">
              {/* Gradient border container */}
              <div className="rounded-2xl overflow-hidden p-1.5 bg-gradient-to-br from-red-themed/20 via-pink-500/20 to-purple-500/20">
                {/* Inner white border and shadow */}
                <div className="rounded-xl overflow-hidden border-4 border-white shadow-2xl">
                  <Image
                    src={customBoxSection.image}
                    alt="Custom Box Example"
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                    width={900}
                    height={700}
                    priority
                  />
                </div>
              </div>
              
              {/* Decorative corners */}
              <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-red-themed/70 rounded-tl-xl"></div>
              <div className="absolute -top-3 -right-3 w-10 h-10 border-t-2 border-r-2 border-pink-500/70 rounded-tr-xl"></div>
              <div className="absolute -bottom-3 -left-3 w-10 h-10 border-b-2 border-l-2 border-purple-500/70 rounded-bl-xl"></div>
              <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-blue-500/70 rounded-br-xl"></div>

            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}