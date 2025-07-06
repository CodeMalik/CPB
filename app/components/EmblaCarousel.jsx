"use client";
import { Gift, Headset, PackageOpen, FastForward, Check, DollarSign } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';

 const features = [
     {
    icon: Headset,
    title: '24/7 Customer Support',
    description: 'Experience peace of mind with our 24/7 customer support, ready to assist you anytime, ensuring your queries are addressed promptly.',
  },
  {
    icon: FastForward,
    title: 'Fast Turnaround',
    description: 'Meet your deadlines with confidence. Our efficient processes and dedicated team ensure quick turnaround times without compromising on quality.',
  },
  {
    icon: DollarSign,
    title: 'Quality With Affordability',
    description: 'Achieve great value without compromising quality. Our competitively priced products offer premium experiences at budget-friendly rates.',
  },
  {
    icon: PackageOpen,
    title: 'Customized Boxes',
    description: 'Elevate your brand identity with our customized boxes, designed to perfectly align with your unique specifications and aesthetic preferences.',
  },
  {
    icon: Check,
    title: 'Quality Assurance',
    description: 'Ensure the safety and integrity of your products with our top-tier, durable packaging solutions, designed to meet diverse industry standards.',
  },
  {
    icon: Gift,
    title: 'Style And Size Diversity',
    description: 'Crafted to cater to diverse needs, our boxes offer style and size versatility for all your packaging needs with addition of three dimensional boxes.',
  },
  ]

export default function EmblaCarousel() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, draggable: false, dragFree: true },
    [AutoScroll({ speed: 0.5, stopOnMouseEnter: true, stopOnInteraction: false, playOnInit: true, startDelay: 0 })]
  );

  return (
    <div className="overflow-hidden w-full" ref={emblaRef}>
      <div className="flex">
        {features.map((feature, idx) => {
            let Icon = feature.icon;
          return (
          <div key={idx} className="flex-none w-[25rem] mx-4 bg-white border border-red-themed rounded-lg shadow p-6 flex flex-col items-start">
            <div className='flex items-center gap-3'>
             <span className='w-20 h-20 flex items-center justify-center bg-red-themed rounded-full mb-2'>
            <Icon className="w-12 h-12 text-white" />
                </span>   
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            </div>
            <p className="text-gray-700">{feature.description}</p>
          </div>
)})}
      </div>
    </div>
  );
}
