import React from 'react'
import { connectDB } from "@/lib/mongoose"
import Product from "@/app/models/Product"
import { ProductHero, LongDescription, SpecificationTabs, ProductSpecifications, FaqSection, Testimonials, PackagingFeatures } from '@/app/components'

async function getDynamicPageMetadata(identifier) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/meta/${identifier}`, {
      cache: 'no-store'
    });

    if (!res.ok) {
      if (res.status === 404) {
        console.warn(`Metadata not found for identifier: ${identifier}`);
        return null;
      }
      throw new Error(`Failed to fetch metadata: ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error(`Error fetching metadata for ${identifier}:`, error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { productSlug } = params;
  const metaData = await getDynamicPageMetadata(productSlug);

  if (!metaData) {
    // Default metadata if no specific entry is found in the database
    return {
      title: `${productSlug.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} | Custom Pack Boxes`,
      description: `Discover custom packaging solutions for ${productSlug.replace(/-/g, ' ')}.`,
      keywords: `${productSlug.replace(/-/g, ', ')}, custom packaging, boxes`,
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

const page = async ({ params }) => {
  await connectDB()
  const { productSlug } = params;

  const product = await Product.findOne({ slug: productSlug })

  if (!product) {
    return <p className='min-h-screen w-full flex items-center justify-center text-4xl text-red-themed'>This is the problem while rendring this page</p>
  }
  return (
    <div className='mt-4'>
      <ProductHero heading={product.heading} image={product.image} shortDesc={product.shortDescription} tagline={product.tagline} images={product.images} category={product.categorySlug} name={product.name} />
      <LongDescription longDescription={product.longDescription} />
      <ProductSpecifications />
      <SpecificationTabs />
      <PackagingFeatures />
      <Testimonials />
      <FaqSection />
    </div>
  )
}

export default page
