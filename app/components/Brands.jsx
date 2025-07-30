import React from "react";
import { brands } from "../constant";
import { BrandCarousel } from ".";

const Brands = () => {
  return (
    <section className="py-12">
      <h1 className="heading mb-8 text-2xl text-center">
        Trusted  <span className="text-red-themed font-semibold">500+</span>{" "}
        Custom Packaging Partner
      </h1>
      <div>
        <BrandCarousel brands={brands}/>
      </div>
    </section>
  );
};

export default Brands;
