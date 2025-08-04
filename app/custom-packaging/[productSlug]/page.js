import React from 'react'
import { connectDB } from "@/lib/mongoose"
import Product from "@/app/models/Product"
import { ProductHero, LongDescription, SpecificationTabs, ProductSpecifications, FaqSection, Testimonials, PackagingFeatures } from '@/app/components'

const page =  async ({params}) => {
  await connectDB()
  const { productSlug } = params;

  const product = await Product.findOne({slug: productSlug})

  if (!product) {
    return <p className='min-h-screen w-full flex items-center justify-center text-4xl text-red-themed'>This is the problem while rendring this page</p>
  }
  return (
    <div className='mt-4'>
    <ProductHero heading={product.heading} shortDesc={product.shortDescription} tagline={product.tagline} images={product.images} category={product.categorySlug} name={product.name} />
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