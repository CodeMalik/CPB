import { Hero, CustomBoxesSection, AboutUs, ServiceIntro, ContactUs, PackagingSection, BoostSalesSection, FaqSection, PackagingFeatures, WhyChooseUs,  Products, SpecificationTabs, Categories, Testimonials, Brands } from "./components";

export default function Home() {
  return (
    <>
    <Hero />
    <Brands />
    <CustomBoxesSection />
    <AboutUs />
    <Categories />
    <WhyChooseUs />
    <PackagingFeatures />
    <ServiceIntro />
    <ContactUs />
    <PackagingSection />
    <BoostSalesSection />
    <SpecificationTabs />
    <Testimonials />
    <FaqSection />
    </>
  );
}
