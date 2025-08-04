import React from "react";
import { RecentBoxes } from "../components";

const page = () => {
  return (
    <section className="mt-12">
        <div className="container">
      <div className="info text-center mb-12">
        <h1 className="text-4xl font-semibold ">Our Recent Boxes</h1>
        <p>
          Want a design or your brand logo on the package box? Then Tim
          Packaging is here to perk up your box with the sharp artwork. We come
          up with a wide spectrum of custom boxes and printing designs to give
          you the best fit. Discover your favorite style and design of the box
          to get what you want. We make sure to create an elegant and colorful
          box with the touch of our special spark. Whether you want a gift box
          or a number of packages for your shop, we are up to serving you. Let’s
          join together and save your items from weather and other harm!
        </p>
      </div>
      <div className="border-t pt-6 mb-16 border-red-themed">
        <RecentBoxes />
      </div>
      </div>
    </section>
  );
};

export default page;
