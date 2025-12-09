import React from 'react';
import { benefitsImages } from "../constant";
import Image from "next/image";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    rating: 4,
    comment: "The boxes arrived quickly and were exactly what I needed to protect my valuable items during shipping. Love their customer support and prices.",
    date: "2025-07-15",
    image: "/jhon.webp" 
  },
  {
    id: 2,
    name: "Jane Smith",
    rating: 5,
    comment: "We have been working with Custom Pack Boxes for a few years now and are always impressed with the quality of boxes we receive.",
    date: "2025-07-10",
    image: "/jane.webp"
  },
  {
    id: 3,
    name: "Alex Johnson",
    rating: 4,
    comment: "I was so impressed with the custom boxes I bought from Custom Pack Boxes! They were exactly what I was looking for, and the quality was amazing.",
    date: "2025-07-08",
    image: "/alex.webp"
  }
];

const Testimonials = () => {
  return (
    <section className="py-12 text-center">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-2">What Our Clients Say</h2>
        <p className=" mb-8">Discover What Our Customers Have to Say About Our Packaging Solutions</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white/80 rounded-lg p-6 shadow-md hover:shadow-2xl">
              <div className="flex justify-center mb-4 hover:shadow-2xl transition-all duration-200">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`w-6 h-6 ${index < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4">{review.comment}</p>
              <div className="flex items-center justify-between">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <p className="text-gray-900 font-semibold">{review.name}</p>
              </div>
            </div>
          ))}
        </div>
        
      </div>
       <div className="mt-12">
      <div className="container flex flex-wrap items-center justify-center gap-12 ">
              {benefitsImages.map((image, index) => (
                  <Image key={index} src={image.src} alt={image.name} width={120} height={120}/>
              ))}
          </div>
      </div>
    
    </section>
  );
};

export default Testimonials;
