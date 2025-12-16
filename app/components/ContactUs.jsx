import { ContactForm, HowToOrder } from './';

const ContactUs = () => {
  return (
    <section className='max-w-[1500] mt-10 border mb-12 border-gray-200 shadow-lg py-12 rounded-2xl mx-3  md:mx-auto' id='quote'>
        <div className="container-big grid grid-cols-1 md:grid-cols-2 items-center justify-items-center gap-10 md:gap-4">
            <div className='md:mr-50'>
              <HowToOrder />
            </div>
            <div className='md:mt-8 md:mr-10'>
                <ContactForm />
            </div>
        </div>
    </section>
  )
}

export default ContactUs