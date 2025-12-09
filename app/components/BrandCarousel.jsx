"use client";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

const BrandCarousel = ({ brands }) => {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, draggable: false, dragFree: true },
    [
      AutoScroll({
        speed: 1,
        stopOnMouseEnter: false,
        stopOnInteraction: false,
        playOnInit: true,
        startDelay: 0,
      }),
    ]
  );

  return (
    <div ref={emblaRef} className="overflow-hidden w-full">
      <div className="flex embla__container gap-12">
        {brands.map((brand, index) => (
          <div
            key={index}
            className="embla__slide shrink-0 flex items-center justify-center"
            style={{ flex: "0 0 auto", width: "130px" }}
          >
            <Image src={brand.src} alt={brand.name}  width={200} height={80} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandCarousel;
