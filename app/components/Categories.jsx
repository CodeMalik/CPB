import React from 'react'
import { productsDetails } from '../constant'
import { Category } from '.'

const Categories = () => {
  return (
    <section className='bg-pink-theme py-12 px-4 sm:px-6 lg:px-8'>
        <div className="">
            <h2 className="h2 text-3xl mb-4 md:text-[2.7rem] text-center font-semibold">{productsDetails.heading}</h2>
            {productsDetails.description.map((para, index) => (
                <p key={index} className="text-[15px] text-[#444] mb-4">
                    {para}
                </p>
            ))}
            <div className="product-containers">
                <Category />
            </div>
        </div>
    </section>
  )
}

export default Categories