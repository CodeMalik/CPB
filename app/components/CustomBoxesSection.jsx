import Image from "next/image";
import { customBoxSection } from "../constant";
import { aboutFeatures } from "../constant";

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
