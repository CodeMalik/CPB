import { connectDB } from "@/lib/mongoose"
import Category from "@/app/models/Category"
import Product from "@/app/models/Product"
import { CategoryHero, ContactForm, FaqSection, LongDescription, PackagingFeatures, Products, ServiceIntro, Testimonials } from "@/app/components"

const page =  async ({ params }) => {
  
  const { categorySlug } = params;
  await connectDB();
  const category = await Category.findOne({ slug: categorySlug }).lean();

    if (!category) {
    return <div className="p-6 text-red-600">Category not found.</div>;
  }
  const categoryObjectId = new mongoose.Types.ObjectId(category._id);
  const products = await Product.find({
    categoryIds: {$in: [categoryObjectId]}
  }).lean()
  return (
    <>
      <CategoryHero imageSrc={category.heroImage} name={category.name} />
      <ContactForm  isHome={false} content={category.heading} name={category.name}/>
      <Products tagline={category.tagline} heading={category.heading} shortDescription={category.shortDescription} products={products}/>
      <LongDescription longDescription={category.longDescription} />
      <PackagingFeatures />
      <ServiceIntro />
      <Testimonials />
      <FaqSection />
    </>
  )
}

export default page