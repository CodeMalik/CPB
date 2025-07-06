import products from "@/data/products.json";

const page = async ({params}) => {
  const product = await products.find((sp) => {
    sp.categorySlug === params.productSlug && sp.slug === params.subSlug;
  })
  if (!product) {
    return <p>Sub Product not found</p>
  }
  return (
    <div>
      <h1>{subProduct.title}</h1>
      <p>{subProduct.description}</p>
    </div>
  )
}

export default page