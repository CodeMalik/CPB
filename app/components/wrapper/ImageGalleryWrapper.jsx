"use client";

import { useState } from "react";
import Image from "next/image";

export const ImageGalleryWrapper = ({ images = [], image = {} }) => {
  console.log("Main Image:", image); // Debug log
  console.log("Additional Images:", images); // Debug log

  // Create array with main image first, then additional images
  const allRealImages = [];
  
  // Add main image if it exists and has URL
  if (image && image.url) {
    allRealImages.push(image);
  }
  
  // Add additional images that have URLs
  if (Array.isArray(images)) {
    images.forEach(img => {
      if (img && img.url) {
        allRealImages.push(img);
      }
    });
  }

  console.log("All Real Images:", allRealImages); // Debug log

  // Create exactly 4 slots
  const imageSlots = [];
  for (let i = 0; i < 4; i++) {
    if (allRealImages[i]) {
      imageSlots.push(allRealImages[i]);
    } else {
      imageSlots.push({ isPlaceholder: true, index: i });
    }
  }

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main Large Image */}
      <div className="w-full aspect-square relative rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
        {imageSlots[selectedImageIndex].isPlaceholder ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
            <svg className="w-16 h-16 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm">Image {selectedImageIndex + 1}</span>
          </div>
        ) : (
          <Image
            src={imageSlots[selectedImageIndex].url}
            alt={imageSlots[selectedImageIndex].alt || `Product image ${selectedImageIndex + 1}`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={selectedImageIndex === 0}
          />
        )}
      </div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-4 gap-2">
        {imageSlots.map((img, index) => (
          <button
            key={index}
            className={`aspect-square relative rounded-md overflow-hidden border-2 transition-all ${
              selectedImageIndex === index 
                ? "border-red-500 ring-2 ring-red-500" 
                : "border-gray-300 hover:border-gray-400"
            } ${img.isPlaceholder ? 'bg-gray-100' : 'bg-white'}`}
            onClick={() => setSelectedImageIndex(index)}
            type="button"
          >
            {img.isPlaceholder ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="text-xs mt-1">{index + 1}</span>
              </div>
            ) : (
              <Image
                src={img.url}
                alt={img.alt || `Product image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 25vw, 12.5vw"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};