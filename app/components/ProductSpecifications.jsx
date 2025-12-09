import { productSpecifications } from "../constant";

const ProductSpecifications = () => {
  return (
    <section className="py-10">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Product Specification</h2>

        <div className="flex flex-col gap-4 overflow-hidden">
          {productSpecifications.map((item, idx) => (
            <div
              key={idx}
              className={`px-4 py-3 bg-gray-100 text-sm md:text-base hover:bg-red-themed hover:text-white transition-all duration-300 font-semibold`}
            >
              <span className="">{item.label} :</span> {item.value}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSpecifications;
