import React from 'react'
import { ContactFormWithMap, ContactInfo, FaqSection } from '../components'

const ContactPage = () => {
  return (
    <section className='mt-32'>
        <div className="container-big">
            <ContactInfo />
            <ContactFormWithMap />
            <FaqSection />
        </div>
    </section>
  )
}

export default ContactPage