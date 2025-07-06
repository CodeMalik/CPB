// components/CustomBoxesSection.jsx

import Image from "next/image";
import { customBoxSection } from "../constant";

export default function CustomBoxesSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="flex justify-between flex-col md:flex-row items-center mb-10 space-x-8">
          <div>
            <h4 className="text-red-themed font-semibold text-xl mb-2">
              {customBoxSection.tagline}
            </h4>
            <h2 className="text-4xl md:text-[2.8rem] font-semibold text-gray-900 mb-4">
              {customBoxSection.heading}
            </h2>
          </div>
          <div>
            <p className="text-gray-700 mb-6 max-w-[39rem]">
              {customBoxSection.description}
            </p>
          </div>
        </div>
        {/* Feature Grid */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 w-full lg:w-[65%] gap-5">
            {customBoxSection.features.map((item, idx) => (
              <div
                key={idx}
                className="bg-pink-theme rounded-md p-5 flex flex-col items-start gap-4 space-x-4 hover:shadow-lg transition"
              >
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-17 h-17 object-contain"
                />
                <h4 className="font-semibold text-xl text-gray-900 w-[90%]">{item.title}</h4>
              </div>
            ))}
          </div>

          <div className="flex-1 max-w-lg mx-auto">
            <Image
              src={customBoxSection.image}
              alt="Custom Box Example"
              className="rounded-xl shadow-lg w-[500px] max-h-[350px] object-fill"
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
