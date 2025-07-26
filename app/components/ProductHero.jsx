import dynamic from "next/dynamic";
import { productHeroData } from "../constant";
import { ImageGalleryWrapper } from ".";

const ProductHero = ({ heading, tagline, shortDesc, images }) => {
  return (
    <section>
      <div className="container-big flex justify-between items-start gap-10 md:gap-16">
        <div className="left w-full lg:w-[40%]">
          <ImageGalleryWrapper images={images}/>
        </div>
        <div className="right w-full flex-1">
          <div className="info">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
              {heading}
            </h1>
            <h3 className="text-xl text-red-themed my-6 ">{tagline}</h3>
            {Array.isArray(shortDesc) ? (
              shortDesc.map((para, i) => (
                <p key={i} className="text-lg mb-4">
                  {para}
                </p>
              ))
            ) : (
              <p className="text-lg">{shortDesc}</p>
            )}
          </div>
          <div className="grid mt-10 grid-cols-1 w-[75%] mx-auto md:grid-cols-2 gap-6">
            {productHeroData.benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-100 flex items-center gap-4 py-5 justify-center text-center"
                >
                  <Icon className="w-5 h-5 text-red-themed" />
                  <span className="text-red-themed font-semibold">
                    {benefit.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductHero;
