// app/components/HeroSection.tsx
import Image from "next/image";
import Link from "next/link";

const CategoryHero = ({imageSrc, name}) => {
  return (
  <section className="relative bg-gray-100 w-full aspect-[21/9] min-h-[250px] max-h-[500px] overflow-hidden">
      {imageSrc ? (
        <Image
          src={imageSrc.url || imageSrc}
          alt={name || "Category Image"}
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          quality={85}
        />
) : null}

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
        <h1 className="text-3xl md:text-4xl">{name}</h1>
        <p className="mt-6 text-sm ">
         <Link href={"/"}> <span className="">Home</span></Link> <span className="mx-1">|</span>{" "}
          <span className="text-blue-400 underline">{name}</span>
        </p>
      </div>
    </section>
  );
};

export default CategoryHero;
