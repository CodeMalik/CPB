import { Hero, CustomBoxesSection, AboutUs, ServiceIntro, ContactUs, PackagingSection, FaqSection, PackagingFeatures, SpecificationTabs, Categories, Testimonials, Brands } from "./components";

export default function Home() {
  return (
    <>
    <Hero />
    <CustomBoxesSection />
    <Categories />
    <AboutUs />
    <PackagingFeatures />
    <ServiceIntro />
    <ContactUs />
    <PackagingSection />
    <Brands />
    <SpecificationTabs />
    <Testimonials />
    <FaqSection />
    </>
  );
}
