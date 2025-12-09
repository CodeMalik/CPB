import { benefitsImages } from "../constant"
import Image from "next/image"
const Benefits = () => {
  return (
    <section className="mt-12">
    <div className="container flex flex-wrap items-center justify-center gap-12 ">
        {benefitsImages.map((image, index) => (
            <Image key={index} src={image.src} alt={image.name} width={120} height={120}/>
        ))}
    </div>
    </section>
  )
}

export default Benefits