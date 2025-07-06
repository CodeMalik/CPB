import Image from "next/image";
import { aboutUsSection } from "../constant";
import Link from "next/link";

const AboutUs = () => {
  return (
    <section>
      <div className="container ">
        <h2 className="text-2xl md:text-3xl text-center font-semibold">
          {aboutUsSection.heading}
        </h2>
        <div className="flex justify-between flex-col lg:flex-row items-center gap-6 mt-8">
          <div className="left lg:w-[50%]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aboutUsSection.aboutBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className={`${
                    index === 0 ? "md:col-span-2" : "md:col-span-1"
                  }`}
                >
                    <h4 className="text-red-themed mb-3 font-bold">{benefit.title && benefit.title}</h4>
                    <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
              <Link href="/about">
              <button className="px-4 text-lg my-6 py-2 border cursor-pointer">About Us</button>
              </Link>
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
