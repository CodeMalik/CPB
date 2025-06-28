import subProducts from "@/data/subProducts.json";

const page = async ({params}) => {
  const subProduct = await subProducts.find((sp) => {
    sp.categorySlug === params.productSlug && sp.slug === params.subSlug;
  })
  if (!subProduct) {
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