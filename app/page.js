import { Hero, CustomBoxesSection, AboutUs, ServiceIntro, ContactUs, PackagingSection, BoostSalesSection, FaqSection, PackagingFeatures, WhyChooseUs,  Products } from "./components";

export default function Home() {
  return (
    <>
    <Hero />
    <CustomBoxesSection />
    <AboutUs />
    <Products />
    <WhyChooseUs />
    <PackagingFeatures />
    <ServiceIntro />
    <ContactUs />
    <PackagingSection />
    <BoostSalesSection />
    <FaqSection />
    </>
  );
}
