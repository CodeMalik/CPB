import Image from "next/image";
import { aboutUsSection } from "../constant";
import Link from "next/link";
import { CustomHtml } from ".";

const AboutUs = () => {
  return (
    <section>
      <div className="container ">
        <CustomHtml
          as="h2"
          html={aboutUsSection.heading}
          className="text-4xl text-center max-w-[70rem] mt-8 mx-auto"
        />
        <div className="flex justify-between flex-col lg:flex-row items-center gap-6 mt-8">
          <div className="left lg:w-[50%]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aboutUsSection.aboutBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className={`${index === 0 ? "md:col-span-2" : "md:col-span-1"
                    }`}
                >
                  <h4 className="text-red-themed mb-3 text-lg font-bold">
                    {benefit.title && benefit.title}
                  </h4>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
            <a href="#quote" className="cursor-pointer">
              <button
                className="
  group inline-flex items-center gap-2 cursor-pointer px-6 py-3 my-6 text-lg font-semibold rounded-full 
  text-white bg-red-themed border border-red-themed 
  hover:bg-transparent hover:text-red-themed hover:border-red-themed
  transition-all duration-300 ease-in-out
  shadow-md hover:shadow-lg
"
              >
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </a>
          </div>
          <div className="right flex-1">
            <Image
              src={aboutUsSection.image}
              alt="About Us Image"
              width={800}
              height={800}
              className="rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
