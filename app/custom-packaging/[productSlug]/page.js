import React from 'react'
import { connectDB } from "@/lib/mongoose"
import Product from "@/app/models/Product"
import { ProductHero, LongDescription, SpecificationTabs, ProductSpecifications, FaqSection, Testimonials, PackagingFeatures } from '@/app/components'
import { notFound } from 'next/navigation'

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
  try {
    const { productSlug } = params;
    const metaData = await getDynamicPageMetadata(productSlug);

    if (!metaData) {
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
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Product | Custom Pack Boxes',
      description: 'Discover custom packaging solutions.',
    };
  }
}

const page = async ({ params }) => {
  try {
    await connectDB();
    const { productSlug } = await params;

    if (!productSlug) {
      return notFound();
    }

    const product = await Product.findOne({ slug: productSlug }).lean();

    if (!product) {
      return notFound();
    }

    // Safely format the product data
    const safeProduct = {
      heading: product.heading || '',
      image: product.image || {},
      images: Array.isArray(product.images) ? product.images : [],
      shortDescription: product.shortDescription || '',
      categorySlug: product.categorySlug || '',
      name: product.name || '',
      longDescription: product.longDescription || '',
      tagline: product.tagline || ''
    };

    return (
      <div className='mt-4'>
        <ProductHero 
          heading={safeProduct.heading}
          image={safeProduct.image}
          shortDesc={safeProduct.shortDescription}
          tagline={safeProduct.tagline}
          images={safeProduct.images}
          category={safeProduct.categorySlug}
          name={safeProduct.name}
        />
        <LongDescription longDescription={safeProduct.longDescription} />
        <ProductSpecifications />
        <SpecificationTabs />
        <PackagingFeatures />
        <Testimonials />
        <FaqSection />
      </div>
    );
  } catch (error) {
    console.error('Error loading product page:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Product</h1>
          <p className="text-gray-600">Sorry, there was an error loading the product page.</p>
        </div>
      </div>
    );
  }
}

export default page;