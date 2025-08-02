import React from 'react'
import { ContactFormWithMap, ContactInfo, FaqSection } from '../components'

const ContactPage = () => {
  return (
        <div className="container-big">
            <ContactInfo />
            <ContactFormWithMap />
            <FaqSection />
        </div>
  )
}

export default ContactPage