import { Rating } from "@smastrom/react-rating";
import { ImageGalleryWrapper } from ".";
import { ContactForm } from ".";
import Link from "next/link";

const ProductHero = ({ heading, shortDesc, images, category, name, image }) => {
  return (
    <section>
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row w-[90%] md:w-full justify-between items-start gap-12">
        <div className="left w-full lg:w-[50%]">
          <div className="info">
            <span className="text-xs text-gray-500 mb-3 block">
              <Link className="hover:text-red-themed" href={"/"}>
                Home
              </Link>{" "}
              /{" "}
              <Link
                className="hover:text-red-themed"
                href={`/customized/${category}`}
              >
                {category}
              </Link>{" "}
              / {name}
            </span>
            <h1 className="text-xl md:text-2xl mb-1 font-semibold">
              {heading}
            </h1>
            <div className="flex items-center mb-5">
              {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`w-4 h-4 ${index < 5 ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <p className="text-xs">(4.9 / 5) (49 Reviews)</p>
            </div>
            {Array.isArray(shortDesc) ? (
              shortDesc.map((para, i) => (
                <p key={i} className="mb-4 text-xs">
                  {para}
                </p>
              ))
            ) : (
              <p className="text-sm mb-6 text-gray-700">{shortDesc}</p>
            )}
          </div>
          <ImageGalleryWrapper images={images} image={image} />
        </div>
        <div className="right w-full flex-1">
          <ContactForm content={"Customize Your Box"} isHome={false} />
        </div>
      </div>
    </section>
  );
};

export default ProductHero;
