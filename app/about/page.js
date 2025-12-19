import React from 'react'
import { ContactForm, FaqSection, ReuseableAbout, AboutUs } from '../components'
import { whoWeAre, ourHistory } from '../constant'
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
