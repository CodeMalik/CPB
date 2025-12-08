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
        openGraph: {
          images: [
            {
              url: `/api/proxy-image/default-og`,
              width: 1200,
              height: 630,
              alt: 'Custom Pack Boxes',
            }
          ],
        },
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
      openGraph: {
        images: [
          {
            url: `/api/proxy-image/default-og`,
            width: 1200,
            height: 630,
            alt: 'Custom Pack Boxes',
          }
        ],
      },
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

    // Option 1: Use the static method (if properly registered)
    let product;
    try {
      product = await Product.findBySlugWithProxyUrls(productSlug);
    } catch (error) {
      console.log('Static method failed, trying alternative approach...', error);
      // Option 2: Manual approach if static method fails
      product = await Product.findOne({ slug: productSlug }).lean();
      
      if (product) {
        // Manually process the product to add proxy URLs
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const category = product.categorySlug || 'products';
        
        // Process main image
        if (product.image?.url) {
          const cloudinaryId = product.image.url.match(/MKF_CPB\/products\/([^\/.]+)/)?.[1] || 
                              product.image.public_id?.split('/').pop();
          if (cloudinaryId) {
            product.image.proxyUrl = `${baseUrl}/custom-packaging/${category}/${product.slug}/main?id=${cloudinaryId}`;
            product.image.apiProxyUrl = `${baseUrl}/api/proxy-image/${cloudinaryId}`;
            product.image.cloudinaryId = cloudinaryId;
            product.image.friendlyUrl = `${baseUrl}/custom-packaging/${category}/${product.slug}/main`;
          }
        }
        
        // Process gallery images
        if (Array.isArray(product.images)) {
          product.images = product.images.map((img, index) => {
            if (img?.url) {
              const cloudinaryId = img.url.match(/MKF_CPB\/products\/([^\/.]+)/)?.[1] || 
                                  img.public_id?.split('/').pop();
              if (cloudinaryId) {
                const friendlyName = img.title?.toLowerCase().replace(/\s+/g, '-') || `image${index + 1}`;
                return {
                  ...img,
                  proxyUrl: `${baseUrl}/custom-packaging/${category}/${product.slug}/${friendlyName}?id=${cloudinaryId}`,
                  apiProxyUrl: `${baseUrl}/api/proxy-image/${cloudinaryId}`,
                  cloudinaryId: cloudinaryId,
                  friendlyName: friendlyName,
                  friendlyUrl: `${baseUrl}/custom-packaging/${category}/${product.slug}/${friendlyName}`,
                };
              }
            }
            return img;
          });
        }
      }
    }

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
      tagline: product.tagline || '',
      slug: product.slug || '',
      // Add proxy URLs arrays
      imageProxyUrls: product.image?.proxyUrl ? [product.image.proxyUrl] : [],
      galleryProxyUrls: Array.isArray(product.images) 
        ? product.images.filter(img => img?.proxyUrl).map(img => img.proxyUrl)
        : [],
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
          slug={safeProduct.slug}
          imageProxyUrls={safeProduct.imageProxyUrls}
          galleryProxyUrls={safeProduct.galleryProxyUrls}
        />
        <LongDescription longDescription={safeProduct.longDescription} />
        <ProductSpecifications />
        <SpecificationTabs />
        <PackagingFeatures />
        <Testimonials />
        <FaqSection />
        
        {/* Debug info - remove in production */}
        <div className="mt-8 p-4 bg-gray-100 rounded">
          <h3 className="text-sm font-semibold mb-2">Debug Info:</h3>
          <p className="text-xs">Product Slug: {safeProduct.slug}</p>
          <p className="text-xs">Main Image Proxy: {safeProduct.imageProxyUrls[0] || 'None'}</p>
          <p className="text-xs">Gallery Images: {safeProduct.galleryProxyUrls.length}</p>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading product page:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Product</h1>
          <p className="text-gray-600">Sorry, there was an error loading the product page.</p>
          <p className="text-sm text-gray-500 mt-2">Error: {error.message}</p>
          <pre className="mt-4 p-4 bg-gray-100 rounded text-xs text-left">
            {error.stack}
          </pre>
        </div>
      </div>
    );
  }
}

export default page;