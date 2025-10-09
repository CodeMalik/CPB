import Image from "next/image";

export default function PackagingSection() {
  return (
    <section className="bg-[#e8f3ff] py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto text-center">
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-3xl">
            <Image
              src="https://res.cloudinary.com/dfnjpfucl/image/upload/v1754048417/home-banner_tahtkc.jpg"
              alt="Custom Packaging Boxes"
              width={1200}
              height={500}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
        <h2 className="text-xl sm:text-2xl md:text-4xl font-semibold text-center">
          A <span className="text-red-themed font-bold">Remarkable</span> Packaging Solution <br />
          By <span className="text-red-themed font-bold">Custom Pack Boxes</span>
        </h2>
      </div>
      
    </section>
  );
}
