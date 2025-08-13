import React from 'react'
import { ContactForm, FaqSection, ReuseableAbout, AboutUs } from '../components'
import { whoWeAre, ourHistory } from '../constant'

// Function to fetch metadata for a static page
async function getStaticPageMetadata(identifier) {
  try {
    // Ensure NEXT_PUBLIC_BASE_URL is set in your .env.local file
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/meta/${identifier}`, {
      cache: 'no-store' // Or 'force-cache' if you want to cache metadata
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

// generateMetadata function for the About page
export async function generateMetadata() {
  const metaData = await getStaticPageMetadata('about-us'); // Use 'about-us' as the identifier

  if (!metaData) {
    // Default metadata if no specific entry is found in the database
    return {
      title: 'About Us | Custom Pack Boxes',
      description: 'Learn more about Custom Pack Boxes, our mission, and our history.',
      keywords: 'about us, company, mission, history, custom packaging',
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

const AboutPage = () => {
  return (
    <>
      <AboutUs />
      <ReuseableAbout title={whoWeAre.heading} description={whoWeAre.description} imageSrc={whoWeAre.imageUrl} buttonLink={"/contact"}/>
      <ContactForm />
      <ReuseableAbout title={ourHistory.heading} description={ourHistory.description} imageSrc={ourHistory.imageUrl} buttonLink={"/contact"}/>
      <FaqSection />
    </>
  )
}

export default AboutPage
