import React from 'react'
import { highlightWords } from '../constant'
import CustomElement from './CustomElement'

const LongDescription = ({longDescription}) => {
    if (longDescription.length == 0 || longDescription == null) {
        return null
    }
  return (
      <section className='bg-pink-theme py-10'>
        <div className="container">
            <div className='bg-white max-w-7xl h-[450px] mx-auto overflow-hidden scroll-auto overflow-y-auto py-12 rounded-xl px-8'>
                {longDescription.map((ld, index) => (
                    <div key={index}>
                        <h3 className='text-2xl text-text-black my-3 font-semibold'>{ld.title}</h3>
                        <CustomElement title={ld.description} highlightWords={highlightWords} as='p'/>
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default LongDescription