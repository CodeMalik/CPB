import { Hero, CustomBoxesSection, AboutUs, ServiceIntro, ContactUs, PackagingSection, FaqSection, PackagingFeatures, SpecificationTabs, Categories, Testimonials, Brands, FinalCta, MidCta } from "./components";

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

// generateMetadata function for the Home page
export async function generateMetadata() {
  const metaData = await getStaticPageMetadata('home'); // Use 'home' as the identifier

  if (!metaData) {
    // Default metadata if no specific entry is found in the database
    return {
      title: 'Home | Custom Pack Boxes',
      description: 'Your ultimate destination for custom packaging solutions.',
      keywords: 'custom boxes, packaging, home, custom packaging solutions',
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
    <Hero />
    <CustomBoxesSection />
    <Categories />
    <AboutUs />
    <MidCta />
    <ServiceIntro />
    <Brands />
    <ContactUs />
    <PackagingSection />
    <SpecificationTabs />
    <Testimonials />
    <FaqSection />
    <FinalCta />
    </>
  );
}