import React from 'react'
import { recentProducts } from '../constant'
import Image from 'next/image'
const RecentBoxes = () => {
  return (
    <section>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {recentProducts.map((product, index) => (
            <div key={index} className='cursor-pointer'>
                <Image src={product.image} alt={product.name} width={300} height={300} className='rounded-md hover:scale-105 transition-all duration-200' />
                <h3 className='text-xl font-semibold text-center my-3'>{product.name}</h3>
            </div>
        ))}
      </div>
    </section>
  )
}

export default RecentBoxes