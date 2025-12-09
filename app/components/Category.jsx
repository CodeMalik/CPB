import Image from "next/image";
import Link from "next/link";
const fetchUrl =  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

const Category = async () => {
    const res = await fetch(`${fetchUrl}/api/category`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <div>Error fetching categories</div>;
  }
  const categories = await res.json();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {categories.map((category) => (
        <Link href={`customized/${category.slug}`} key={category._id} >
        <div className="rounded-2xl group m-2 border-2 shadow-md shadow-red-themed/45 border-gray-400 px-4 py-3">
        <div className="image  relative">
          <Image
            src={category.homeImage?.url  || category.homeImage }
            alt={category.name}
            className="w-full h-auto object-cover mb-2 rounded-xl transition-transform duration-200"
            width={300}
            height={300}
          />
          <div className="absolute inset-0 group-hover:bg-black/50 rounded-xl group-hover:opacity-100 transition-all duration-300 opacity-0 flex items-center justify-center">
          <span className="text-white text-xl bg-red-themed p-3 rounded-3xl">Get Started</span>
          </div>
        </div>
          <h2 className="text-lg text-center font-semibold">{category.name}</h2>
        </div>
        </Link>
      ))}
    </div>
  )
}

export default Category