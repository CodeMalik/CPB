import React from 'react'
import { ContactFormWithMap, ContactInfo, FaqSection } from '../components'
import { connectDB } from "@/lib/mongoose";
import Meta from "@/app/models/Meta";

// Function to fetch metadata for a static page
async function getStaticPageMetadata(identifier) {
  try {
    await connectDB();
    const meta = await Meta.findOne({ identifier });
    if (!meta) {
      return null; // Or return default metadata
    }
    return meta;
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
