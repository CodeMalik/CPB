import { EmblaCarousel } from ".";
import { packagingFeatures, features } from "../constant";

export default function PackagingFeatures() {
  const { heading } = packagingFeatures;
  return (
    <section className="py-12">
    <div className="container my-12">
      <h2 className="h2 text-2xl md:text-4xl text-center font-semibold">{heading}</h2>
    </div>
    <div className="py-12">
    <EmblaCarousel/>
    </div>
    </section>
  );
}
