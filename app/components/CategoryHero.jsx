// app/components/HeroSection.tsx
import Image from "next/image";
import Link from "next/link";

const CategoryHero = ({ imageSrc, name }) => {
  return (
    <section className="relative bg-white w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[550px] overflow-hidden flex items-center justify-center">
      {imageSrc ? (
        <Image
          src={imageSrc.url || imageSrc}
          alt={name || "Category Image"}
          fill
          priority
          className="object-cover lg:object-[center_top] w-full h-full max-sm:border-l-8 max-sm:border-r-8 max-sm:border-white"
          sizes="100vw"
          quality={90}
        />
      ) : null}

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl">{name}</h1>
        <p className="mt-6 text-sm md:text-base lg:text-lg">
          <Link href={"/"}><span className="">Home</span></Link> <span className="mx-1">|</span>{" "}
          <span className="text-blue-400 underline">{name}</span>
        </p>
      </div>
    </section>
  );
};

export default CategoryHero;