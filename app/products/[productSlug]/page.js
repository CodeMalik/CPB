import products from "@/data/products.json";
import subProducts from "@/data/subProducts.json";

const page = async ({params}) => {
  console.time("filter")
  const product = await products.find((product) => product.slug === params.productSlug);
  console.timeEnd("filter")
  const children = await subProducts.filter((sp) => sp.productId === product._id);
  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <div>
        <div className="hero flex justify-center items-center">
        <img src={product.homeimage} alt={'box title'} width={400} height={300}/>
        <h1 className="text-3xl font-bold">{product.title}</h1>
        </div>
        <div className="subProducts">
            {children.map((subProduct) => (
              <div key={subProduct._id} className="subProduct">
                <img src={subProduct.image} alt={subProduct.title} width={300} height={300}/>
                <h2 className="text-2xl font-semibold">{subProduct.title}</h2>
              </div>
            ))}
        </div>
    </div>
  )
}

export default page