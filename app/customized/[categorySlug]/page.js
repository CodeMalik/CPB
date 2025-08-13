import { connectDB } from "@/lib/mongoose"
import Category from "@/app/models/Category"
import Product from "@/app/models/Product"
import { CategoryHero, ContactForm, FaqSection, LongDescription, PackagingFeatures, Products, ServiceIntro, Testimonials } from "@/app/components"
import mongoose from "mongoose";

// Function to fetch metadata for a dynamic page
async function getDynamicPageMetadata(identifier) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/meta/${identifier}`, {
      cache: 'no-store' // Or 'force-cache' if you want to cache metadata
    });

    if (!res.ok) {
      if (res.status === 404) {
        console.warn(`Metadata not found for identifier: ${identifier}`);
        return null; // Or return default metadata
      }
      throw new Error(`Failed to fetch metadata: ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error(`Error fetching metadata for ${identifier}:`, error);
    return null; // Return null or default metadata on error
  }
}

// generateMetadata function for dynamic category pages
export async function generateMetadata({ params }) {
  const { categorySlug } = params;
  const metaData = await getDynamicPageMetadata(categorySlug);

  if (!metaData) {
    // Default metadata if no specific entry is found in the database
    return {
      title: `${categorySlug.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} | Custom Pack Boxes`,
      description: `Explore custom packaging solutions for ${categorySlug.replace(/-/g, ' ')}.`,
      keywords: `${categorySlug.replace(/-/g, ', ')}, custom packaging, boxes`,
    };
  }

  return {
    title: metaData.metaTitle,
    description: metaData.metaDescription,
    keywords: metaData.keywords,
    alternates: {
      canonical: metaData.canonicalUrl,
    },
    openGraph: {
      images: metaData.ogImage ? [metaData.ogImage] : [],
    },
  };
}

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
