import React from 'react'
import { highlightWords } from '../constant'
import CustomElement from './CustomElement'

const LongDescription = ({longDescription}) => {
  function decodeHtmlEntities(str) {
  return str.replace(/\\u003C/g, "<")
            .replace(/\\u003E/g, ">")
            .replace(/\\u0026/g, "&")
            .replace(/\\u0022/g, '"')
            .replace(/\\u0027/g, "'");
}

    if (longDescription.length == 0 || longDescription == null) {
        return null
    }
  return (
    <div className=" w-full my-20 py-12 bg-pink-theme relative text-gray-900">
    {/* Diagonal Grid with Electric Orange */}
    <div
      className="absolute inset-0 z-10 pointer-events-none"
      style={{
        backgroundImage: `
          repeating-linear-gradient(45deg, rgba(255, 0, 100, 0.1) 0, rgba(255, 0, 100, 0.1) 1px, transparent 1px, transparent 20px),
        repeating-linear-gradient(-45deg, rgba(255, 0, 100, 0.1) 0, rgba(255, 0, 100, 0.1) 1px, transparent 1px, transparent 20px)
        `,
        backgroundSize: "40px 40px",
      }}
    />
        <div className="container">
  <div className="relative z-20 bg-white max-w-7xl h-[450px] mx-auto overflow-hidden overflow-y-auto py-12 rounded-xl px-8">
    {Array.isArray(longDescription) ? (
  longDescription.map((ld, index) => (
    <div key={index}>
      <h3 className="text-base md:text-2xl text-text-black my-3 font-semibold">
        {ld.title}
      </h3>
      <CustomElement
        className="text-xs md:text-base"
        title={ld.description}
        highlightWords={highlightWords}
        as="p"
      />
    </div>
  ))
) : (
  <div
  className="prose prose-sm md:prose-base"
  dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(longDescription) }}
/>
)}

  </div>
</div>
  </div>
      
  )
}

export default LongDescription