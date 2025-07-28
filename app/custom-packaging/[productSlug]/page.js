import React from 'react'
import { connectDB } from "@/lib/mongoose"
import Product from "@/app/models/Product"
import { ProductHero, ContactForm, LongDescription, SpecificationTabs, ProductSpecifications, FaqSection, Testimonials, PackagingFeatures } from '@/app/components'
// import { longDescription } from '@/app/constant'

const page =  async ({params}) => {
  const { productSlug } = params;

  const product = await Product.findOne({slug: productSlug})
  await connectDB()
  return (
    <div className='mt-48'>
    <ProductHero heading={product.heading} shortDesc={product.shortDescription} tagline={product.tagline} images={product.images}/>
    <ContactForm />
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