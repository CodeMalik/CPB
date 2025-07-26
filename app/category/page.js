import React from 'react'
import { CategoryHero, ContactForm, LongDescription, PackagingFeatures, Products, ServiceIntro } from '../components'

const page = () => {
  return (
    <div className="mt-[10rem]">
      <CategoryHero />
      <Products />
      <ContactForm />
      <LongDescription />
      <PackagingFeatures />
      <ServiceIntro />
    </div>
  )
}

export default page