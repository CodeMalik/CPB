import { ContactForm } from './';
import { Check } from 'lucide-react';
import {contactData} from '../constant';

const ContactUs = () => {
  const { heading, description, contactBenefits } = contactData;
  return (
    <section className='' id='quote'>
        <div className="container-big flex flex-col lg:flex-row justify-center items-center gap-6">
            <div className="left md:w-1/2">
                <ContactForm />
            </div>
            <div className="right md:w-1/2">
               <h2 className='text-4xl font-semibold mb-4 text-gray-800'>
                {heading}
               </h2>
               <p>{description}</p>
               <div className="benefits grid grid-cols-1 md:grid-cols-2 gap-4  mt-6">
                {contactBenefits.map((benefit, index) => (
                  <div className="benefit flex bg-gray-100 gap-5 py-5 px-2" key={index}>
                    <Check className='icon bg-red-themed text-white text-3xl font-extrabold' />
                    <span>{benefit}</span>
                  </div>
                ))}
               </div>
            </div>
        </div>
    </section>
  )
}

export default ContactUs