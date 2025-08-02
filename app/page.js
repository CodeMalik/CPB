import { Hero, CustomBoxesSection, AboutUs, ServiceIntro, ContactUs, PackagingSection, FaqSection, PackagingFeatures, SpecificationTabs, Categories, Testimonials, Brands, FinalCta, MidCta } from "./components";

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
