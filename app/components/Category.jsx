import Image from "next/image";
import Link from "next/link";

const Category = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/category`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <div>Error fetching categories</div>;
  }
  const categories = await res.json();
  console.log(categories)
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {categories.map((category) => (
        <Link href={`customized/${category.slug}`} key={category._id} >
        <div className="rounded-lg m-2 ">
          <Image
            src={category.homeImage}
            alt={category.name}
            className="w-full h-auto object-cover mb-2 rounded transition-transform duration-200 hover:scale-105"
            width={300}
            height={300}
          />
          <h2 className="text-lg text-center font-semibold">{category.name}</h2>
        </div>
        </Link>
      ))}
    </div>
  )
}

export default Category