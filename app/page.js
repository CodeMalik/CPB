import {
  Hero,
  CustomBoxesSection,
  AboutUs,
  ServiceIntro,
  ContactUs,
  PackagingSection,
  FaqSection,
  SpecificationTabs,
  Categories,
  Testimonials,
  Brands,
  FinalCta,
  MidCta,
  
} from "./components";

import VisitorsTracker from "./components/VisitorsTracker";
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

// generateMetadata function for the Home page
export async function generateMetadata() {
  const metaData = await getStaticPageMetadata("home"); // Use 'home' as the identifier

  if (!metaData) {
    // Default metadata if no specific entry is found in the database
    return {
      title: "Custom Pack Boxes | Premium Packaging Solutions",
      description: "Your ultimate destination for custom packaging solutions.",
      keywords: "custom boxes, packaging, home, custom packaging solutions",
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

export default function Home() {
  return (
    <>
    <VisitorsTracker />
      <Hero />
       <ContactUs />
      <CustomBoxesSection />
      <Categories />
      <AboutUs />
      <MidCta />
      <ServiceIntro />
      <Brands />
      <PackagingSection />
      <SpecificationTabs />
      <Testimonials />
      <FaqSection />
      <FinalCta />
    </>
  );
}
