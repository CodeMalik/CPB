import Image from "next/image";
import products from "@/data/products.json";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Welcome to the Product Store
      </h1>
      <ul className="flex items-center justify-center gap-12 flex-wrap">
        {products.map((product) => (
          <li key={product._id} className="my-4">
            <Link href={`/products/${product.slug}`} className="flex flex-col items-center">
            <Image 
            src={product.homeimage}
            alt={product.title}
            width={300}
            height={250}
            className="rounded-lg"
            loading="lazy"
            />
            <h2 className="text-xl font-semibold">{product.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
