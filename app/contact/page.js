import React from 'react'
import { ContactFormWithMap, ContactInfo, FaqSection } from '../components'

// Function to fetch metadata for a static page
async function getStaticPageMetadata(identifier) {
  try {
    // Ensure NEXT_PUBLIC_BASE_URL is set in your .env.local file
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/meta/${identifier}`, {
      // REMOVED: cache: 'no-store'
      next: { revalidate: 3600 } // Revalidate every hour
    });

    if (!res.ok) {
      if (res.status === 404) {
        console.warn(`Metadata not found for identifier: ${identifier}`);
        return null; // Or return default metadata
      }
      throw new Error(`Failed to fetch metadata: ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error(`Error fetching metadata for ${identifier}:`, error);
    return null; // Return null or default metadata on error
  }
}

// generateMetadata function for the Contact page
export async function generateMetadata() {
  const metaData = await getStaticPageMetadata('contact-us'); // Use 'contact-us' as the identifier

  if (!metaData) {
    // Default metadata if no specific entry is found in the database
    return {
      title: 'Contact Us | Custom Pack Boxes',
      description: 'Get in touch with Custom Pack Boxes for inquiries, quotes, and support.',
      keywords: 'contact, support, inquiry, custom packaging',
    };
  }

  return {
    title: metaData.metaTitle,
    description: metaData.metaDescription,
    keywords: metaData.keywords,
    alternates: {
      canonical: metaData.canonicalUrl,
    },
    openGraph: {
      images: metaData.ogImage ? [metaData.ogImage] : [],
    },
  };
}

const ContactPage = () => {
  return (
    <div className="container-big">
      <ContactInfo />
      <ContactFormWithMap />
      <FaqSection />
    </div>
  )
}

export default ContactPage