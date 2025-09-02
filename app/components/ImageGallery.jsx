"use client";
import Image from "next/image";
import { useState } from "react";

const ImageGallery = ({ images, image }) => {
 

  // ✅ Decide what to display
  const hasGallery = images.length > 0;
  const initialImage = hasGallery ? validImages[0] : image?.url;

  const [selectedImage, setSelectedImage] = useState(initialImage);

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Main preview */}
      <div className="relative w-full h-[450px] mb-4 overflow-hidden">
        <Image
          src={selectedImage}
          alt="Selected product image"
          fill
          className="object-cover w-full h-full"
          priority
        />
      </div>

      {/* Thumbnails */}
      {hasGallery ? (
        <div className="grid w-full grid-cols-4 gap-5">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(img)}
              className={`relative w-full h-[100px] rounded opacity-70 border-2 hover:opacity-100 cursor-pointer overflow-hidden ${
                selectedImage === img
                  ? "border-red-themed opacity-100"
                  : "border-gray-300"
              }`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      ) : (
        // Fallback: just show single image
        // <div className="relative w-full h-[100px] rounded border-2 border-gray-300 overflow-hidden">
        //   <Image
        //     src={image}
        //     alt="Single thumbnail"
        //     fill
        //     className="object-cover"
        //   />
        // </div>
        null
      )}
    </div>
  );
};

export default ImageGallery;
