// app/custom-packaging/[...slug]/page.js
import { notFound } from 'next/navigation';
import { redirect } from 'next/navigation';

export default async function FriendlyImagePage({ params }) {
  const { slug } = await params;
  
  // This route handles friendly URLs like /custom-packaging/category/product/imageName
  // We'll redirect to the API with the proper ID
  
  try {
    // Extract information from the URL
    const pathSegments = Array.isArray(slug) ? slug : [slug];
    
    if (pathSegments.length < 3) {
      return notFound();
    }
    
    const category = pathSegments[0];
    const productSlug = pathSegments[1];
    const imageName = pathSegments[2];
    
    // In a real implementation, you would look up the product in your database
    // to find the actual Cloudinary ID for this image
    
    // For now, we'll redirect to a simple API endpoint
    // or show a page explaining the image is not available
    
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">Image Not Found</h1>
          <p className="mb-4">
            The image for {productSlug} ({imageName}) could not be found.
          </p>
          <p className="text-sm text-gray-600">
            This is a friendly URL. The actual image might need to be loaded through the product page.
          </p>
        </div>
      </div>
    );
    
  } catch (error) {
    console.error('Error in friendly image page:', error);
    return notFound();
  }
}

export async function generateMetadata({ params }) {
  return {
    title: 'Image - Custom Pack Boxes',
    robots: 'noindex, nofollow',
  };
}