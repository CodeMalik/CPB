"use client";
import Image from "next/image";
import { useState } from "react";

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0] || "");
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative w-full h-[450px] mb-4 overflow-hidden">
        <Image
          src={selectedImage}
          alt="Selected product image"
          fill
          className="object-cover w-full h-full"
          priority
        />
      </div>

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
    </div>
  );
};

export default ImageGallery;
