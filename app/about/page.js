import React from 'react'
import { ContactForm, FaqSection, ReuseableAbout, AboutUs } from '../components'
import { whoWeAre, ourHistory } from '../constant'

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