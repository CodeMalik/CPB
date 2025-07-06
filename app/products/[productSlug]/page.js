import categories from "@/data/category.json";
import products from "@/data/products.json";

const page = async ({params}) => {
  console.log(categories, products, params)
  console.time("filter")
  const category = await categories.find((category) => category.slug === params.productSlug);
  console.timeEnd("filter")
  const children = await products.filter((sp) => sp.categoryId[0] === category._id);
  if (!category) {
    return <div>Product not found</div>;
  }
  return (
    <div>
        <div className="hero flex justify-center items-center">
        <img src={category.homeimage} alt={'box title'} width={400} height={300}/>
        <h1 className="text-3xl font-bold">{category.h2}</h1>
        </div>
        <div className="subProducts">
            {children.map((subProduct) => (
              <div key={subProduct._id} className="subProduct">
                <img src={subProduct.image} alt={subProduct.name} width={300} height={300}/>
                <h2 className="text-2xl font-semibold">{subProduct.name}</h2>
              </div>
            ))}
        </div>
    </div>
  )
}

export default page