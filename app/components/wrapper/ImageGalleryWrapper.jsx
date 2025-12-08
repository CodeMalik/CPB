"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { processImageForProxy } from "@/lib/image-utils";

export const ImageGalleryWrapper = ({ 
  images = [], 
  image = {}, 
  category = "", 
  slug = "",
  imageProxyUrls = [],
  galleryProxyUrls = []
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [processedImages, setProcessedImages] = useState([]);

  useEffect(() => {
    // Process images for proxy URLs
    const processImages = () => {
      const allImages = [];
      const baseUrl = window.location.origin;
      
      // Process main image
      if (image && image.url) {
        const processedMainImage = processImageForProxy(image, {
          category,
          productSlug: slug,
          imageName: 'main',
          imageIndex: 0,
          baseUrl
        });
        allImages.push(processedMainImage);
      }
      
      // Process gallery images
      if (Array.isArray(images)) {
        images.forEach((img, index) => {
          if (img && img.url) {
            const friendlyName = img.friendlyName || `image${index + 1}`;
            const processedImg = processImageForProxy(img, {
              category,
              productSlug: slug,
              imageName: friendlyName,
              imageIndex: index + 1,
              baseUrl
            });
            allImages.push(processedImg);
          }
        });
      }
      
      // If we have direct proxy URLs from props, use them
      if (imageProxyUrls.length > 0 || galleryProxyUrls.length > 0) {
        allImages.length = 0; // Clear existing
        
        // Add main images from proxy URLs
        imageProxyUrls.forEach((url, index) => {
          allImages.push({
            proxyUrl: url,
            alt: `Main product image ${index + 1}`,
            friendlyName: `main${index > 0 ? `-${index + 1}` : ''}`,
            isProxy: true
          });
        });
        
        // Add gallery images from proxy URLs
        galleryProxyUrls.forEach((url, index) => {
          allImages.push({
            proxyUrl: url,
            alt: `Gallery image ${index + 1}`,
            friendlyName: `image${index + 1}`,
            isProxy: true
          });
        });
      }
      
      setProcessedImages(allImages);
    };
    
    processImages();
  }, [images, image, category, slug, imageProxyUrls, galleryProxyUrls]);

  // Fill up to 4 slots for consistent layout
  const imageSlots = [];
  for (let i = 0; i < 4; i++) {
    if (processedImages[i]) {
      imageSlots.push(processedImages[i]);
    } else {
      imageSlots.push({ 
        isPlaceholder: true, 
        index: i,
        alt: `Image placeholder ${i + 1}`
      });
    }
  }

  // Function to handle image click in new tab
  const openImageInNewTab = (imageUrl) => {
    if (imageUrl && !imageUrl.includes('placeholder')) {
      window.open(imageUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // Function to copy image URL to clipboard
  const copyImageUrl = async (imageUrl) => {
    try {
      await navigator.clipboard.writeText(imageUrl);
      alert('Image URL copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy URL: ', err);
    }
  };

  return (
    <div className="space-y-4">
      {/* Main Large Image - Clickable for new tab */}
      <div className="w-full aspect-square relative rounded-lg overflow-hidden bg-gray-100 border border-gray-200 group cursor-pointer">
        {imageSlots[selectedImageIndex].isPlaceholder ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
            <svg className="w-16 h-16 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm">Image {selectedImageIndex + 1}</span>
          </div>
        ) : (
          <>
            <Image
              src={imageSlots[selectedImageIndex].proxyUrl || imageSlots[selectedImageIndex].url || ''}
              alt={imageSlots[selectedImageIndex].alt || `Product image ${selectedImageIndex + 1}`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={selectedImageIndex === 0}
              unoptimized={true}
              onClick={() => openImageInNewTab(imageSlots[selectedImageIndex].proxyUrl || imageSlots[selectedImageIndex].url)}
            />
            
            {/* Overlay with open in new tab button */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <button
                onClick={() => openImageInNewTab(imageSlots[selectedImageIndex].proxyUrl || imageSlots[selectedImageIndex].url)}
                className="bg-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span className="text-sm font-medium">Open in New Tab</span>
              </button>
            </div>
            
            {/* Image URL info */}
            <div className="absolute bottom-2 left-2 right-2 bg-black bg-opacity-75 text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="truncate">
                URL: {imageSlots[selectedImageIndex].proxyUrl || imageSlots[selectedImageIndex].url}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  copyImageUrl(imageSlots[selectedImageIndex].proxyUrl || imageSlots[selectedImageIndex].url);
                }}
                className="mt-1 text-blue-300 hover:text-blue-100 text-xs"
              >
                Copy URL
              </button>
            </div>
          </>
        )}
      </div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-4 gap-2">
        {imageSlots.map((img, index) => (
          <div key={index} className="relative group">
            <button
              className={`w-full aspect-square relative rounded-md overflow-hidden border-2 transition-all ${
                selectedImageIndex === index 
                  ? "border-red-500 ring-2 ring-red-500" 
                  : "border-gray-300 hover:border-gray-400"
              } ${img.isPlaceholder ? 'bg-gray-100' : 'bg-white'}`}
              onClick={() => setSelectedImageIndex(index)}
              type="button"
              title={img.isPlaceholder ? `Image ${index + 1}` : `Click to view ${img.alt}`}
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
                  src={img.proxyUrl || img.url}
                  alt={img.alt || `Product image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 25vw, 12.5vw"
                  unoptimized={true}
                />
              )}
            </button>
            
            {/* Thumbnail hover info */}
            {!img.isPlaceholder && (
              <div className="absolute -bottom-8 left-0 right-0 bg-black bg-opacity-90 text-white text-xs p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <div className="truncate text-center">
                  {img.friendlyName || `image${index + 1}`}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Image URL list for reference */}
      {/* <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
        <h4 className="text-sm font-semibold text-blue-800 mb-2">Available Image URLs:</h4>
        <div className="space-y-1">
          {processedImages.map((img, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <a
                href={img.proxyUrl || img.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 hover:underline truncate flex-1 mr-2"
                title="Open in new tab"
              >
                {img.friendlyName || `image${index + 1}`}: {img.proxyUrl || img.url}
              </a>
              <button
                onClick={() => copyImageUrl(img.proxyUrl || img.url)}
                className="text-gray-500 hover:text-gray-700 px-2 py-1 text-xs bg-white border rounded"
                title="Copy URL"
              >
                Copy
              </button>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};