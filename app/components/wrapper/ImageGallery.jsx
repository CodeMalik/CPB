"use client";

import { useState } from "react";
import Image from "next/image";

export const ImageGallery = ({ images, image }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  // Combine all images - main image first, then additional images
  const allImages = image ? [image, ...(images || [])] : images || [];
  
  // Take only first 4 images for the gallery
  const galleryImages = allImages.slice(0, 4);

  return (
    <div className="image-gallery">
      {/* Big Main Image */}
      <div className="main-image mb-4 rounded-lg overflow-hidden border border-gray-200">
        {galleryImages[selectedImage]?.url ? (
          <Image
            src={galleryImages[selectedImage].url}
            alt={galleryImages[selectedImage].alt || "Product image"}
            width={600}
            height={600}
            className="w-full h-auto object-cover"
          />
        ) : (
          <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No image available</span>
          </div>
        )}
      </div>

      {/* 4 Small Images Below */}
      <div className="thumbnail-grid grid grid-cols-4 gap-3">
        {galleryImages.map((img, index) => (
          <button
            key={index}
            className={`thumbnail-item rounded-md overflow-hidden border-2 transition-all duration-200 ${
              selectedImage === index 
                ? "border-blue-500 scale-105" 
                : "border-gray-300 hover:border-gray-400"
            }`}
            onClick={() => setSelectedImage(index)}
          >
            {img?.url ? (
              <Image
                src={img.url}
                alt={img.alt || `Thumbnail ${index + 1}`}
                width={120}
                height={120}
                className="w-full h-24 object-cover"
              />
            ) : (
              <div className="w-full h-24 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-xs">Image {index + 1}</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};