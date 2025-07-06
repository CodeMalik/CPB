// 'use client'
const CustomHeading = ({title}) => {
    const highlightWords = ["Custom", "Boxes Delivered",]

    const highlightedText = (highlight, text) => {
        const regex = new RegExp(`(${highlight.join("|")})`, "gi")
        const parts = text.split(regex)

        return parts.map((part, index) => 
           highlight.includes(part) ? (
                <span key={index} className="text-red-themed font-semibold">{part}</span>
           ) : (
                <span key={index}>{part}</span>
           )
        )
    }

  return (
    <h1 className="text-4xl md:text-6xl font-semibold leading-tight text-black">
            {highlightedText(highlightWords, title)}
          </h1>
  )
}

export default CustomHeading