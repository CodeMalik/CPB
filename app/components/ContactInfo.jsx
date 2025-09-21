// components/ContactCard.jsx
import { MapPin, Mail, Phone } from "lucide-react";

const contactData = [
  {
    icon: <MapPin className="text-white w-10 h-10" />,
    title: "Address",
    content: "1001 S Main St #7115, Kalispell, MT 59901, USA",
    link: null
  },
  {
    icon: <Mail className="text-white w-10 h-10" />,
    title: "Email",
    content: "support@custompackboxes.com",
    link: null
  },
  {
    icon: <Phone className="text-white w-10 h-10" />,
    title: "Contact",
    content: "(406) 289 6262",
    link: "+4062896262"
  },
];

export default function ContactSection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-semibold text-gray-800 text-center mb-12">
          Contact Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactData.map((item, index) => (
            <div
              key={index}
              className="border rounded-lg text-center p-8 flex flex-col items-center"
            >
              <div className="w-18 h-18 flex items-center justify-center rounded-full bg-red-themed mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                {item.link !== null ? (
                  <a className="text-gray-500 text-sm" href="tel:+4062896262">{item.content}</a>
                ): (
                  
                  <p className="text-gray-500 text-sm">
                {item.content}</p>
                )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
