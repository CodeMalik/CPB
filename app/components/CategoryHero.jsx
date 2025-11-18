// app/components/HeroSection.tsx
import Image from "next/image";
import Link from "next/link";

const CategoryHero = ({ imageSrc, name }) => {
  return (
    <section className="relative bg-white w-full aspect-[21/9] min-h-[250px] max-h-[550px] overflow-hidden flex items-center justify-center">
      {imageSrc ? (
        <Image
          src={imageSrc.url || imageSrc}
          alt={name || "Category Image"}
          fill
          priority
          className="object-cover w-full h-full max-sm:border-l-8 max-sm:border-r-8 max-sm:border-white"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, (max-width: 1280px) 100vw, (max-width: 1536px) 100vw, (max-width: 1920px) 100vw, 100vw"
          quality={85}
        />
      ) : null}

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
        <h1 className="text-3xl md:text-4xl">{name}</h1>
        <p className="mt-6 text-sm">
          <Link href={"/"}><span className="">Home</span></Link> <span className="mx-1">|</span>{" "}
          <span className="text-blue-400 underline">{name}</span>
        </p>
      </div>
    </section>
  );
};

export default CategoryHero;