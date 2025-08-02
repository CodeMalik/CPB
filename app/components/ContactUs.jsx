import { ContactForm, HowToOrder } from './';

const ContactUs = () => {
  return (
    <section className='max-w-7xl border mb-12 border-gray-200 shadow-lg py-12 rounded-2xl mx-3  md:mx-auto' id='quote'>
        <div className="container-big grid grid-cols-1 md:grid-cols-2 items-center justify-items-center gap-20 md:gap-4">
            <div>
              <HowToOrder />
            </div>
            <div>
                <ContactForm />
            </div>
        </div>
    </section>
  )
}

export default ContactUs