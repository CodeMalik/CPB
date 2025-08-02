import Image from 'next/image'
import React from 'react'

const MidCta = () => {
  return (
   <div className="w-full h-[300px] relative">
  <Image 
    src="https://res.cloudinary.com/dfnjpfucl/image/upload/v1754045782/Untitled_design_21_zvobfn.png"
    alt="Mid Cta representing eco friendly packaging"
    fill
    className="object-cover"
  />
</div>

  )
}

export default MidCta