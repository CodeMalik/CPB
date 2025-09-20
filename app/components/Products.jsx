import Link from "next/link";
import Image from "next/image";

const Products = ({heading, tagline, shortDescription, products}) => {

  if (products.lenght == 0 || products.lenght < 1) {
    return null
  }
  return (
    <section className="py-10">
      <div className="container-big">
        <div className="text-center">
          <h2 className="text-3xl my-4 md:text-4xl lg:text-5xl font-semibold">
            {heading}
          </h2>
          <p className="tagline text-red-themed font-semibold mb-8 text-lg">
            {tagline}
          </p>
          <p className="description text-lg">
            {shortDescription}
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 mt-8">
          {products.map((product, index) => (
            <Link href={`/custom-packaging/${product.slug}`} key={index}>
            <div
              className="bg-gray-100 hover:shadow-2xl transition-all duration-300"
            >
              <Image
                src={product.image?.url || product.image}
                alt={product.name}
                width={300}
                height={300}
              />
              <h3 className="text-center py-3 text-lg font-semibold">
                {product.name}
              </h3>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
