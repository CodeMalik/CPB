import {
  Square,
  Leaf,
  Printer,
  Gem,
  Truck,
  Palette,
  Smile,
  DollarSign
} from "lucide-react";

export default function WhyChooseUs() {
  return (
    <section className="bg-[#f9f9ec] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-2 text-[#111]">Why Choose Us</h2>
        <p className="text-lg text-[#222] mb-8">
          Custom Pack Boxes is your trusted partner for premium packaging solutions. Here’s why businesses across the USA choose us:
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="flex items-start gap-4">
            <span className="bg-[#ff7043] rounded-lg p-2">
              <Square className="w-7 h-7 text-white" />
            </span>
            <div>
              <h3 className="font-semibold text-lg text-[#222] mb-1">Customize Size and Shape</h3>
              <p className="text-[#444] text-sm">
                We bring your vision to life by offering complete flexibility over the size and shape of your packaging boxes. Whether you need unique dimensions or a specific structure, Custom Pack Boxes will create the perfect solution tailored to your exact specifications.
              </p>
            </div>
          </div>
          {/* Card 2 */}
          <div className="flex items-start gap-4">
            <span className="bg-[#ff7043] rounded-lg p-2">
              <Leaf className="w-7 h-7 text-white" />
            </span>
            <div>
              <h3 className="font-semibold text-lg text-[#222] mb-1">Welcome to the Team Green!</h3>
              <p className="text-[#444] text-sm">
                We understand our commitment to sustainability. That’s why Custom Pack Boxes proudly offers premium custom boxes crafted from sustainable and eco-friendly materials, ensuring your packaging aligns with your green values.
              </p>
            </div>
          </div>
          {/* Card 3 */}
          <div className="flex items-start gap-4">
            <span className="bg-[#64b5f6] rounded-lg p-2">
              <Printer className="w-7 h-7 text-white" />
            </span>
            <div>
              <h3 className="font-semibold text-lg text-[#222] mb-1">High-End Printing Quality!</h3>
              <p className="text-[#444] text-sm">
                Experience exceptional printing results with Custom Pack Boxes. We utilize advanced digital and inkjet printing techniques to deliver vibrant, precise, and high-quality packaging that sets you apart from the competition.
              </p>
            </div>
          </div>
          {/* Card 4 */}
          <div className="flex items-start gap-4">
            <span className="bg-[#4db6ac] rounded-lg p-2">
              <Gem className="w-7 h-7 text-white" />
            </span>
            <div>
              <h3 className="font-semibold text-lg text-[#222] mb-1">Exclusive Finishing and Features</h3>
              <p className="text-[#444] text-sm">
                The final touch that makes your packaging truly stand out! Enjoy limitless customization options, including exclusive finishes and features, to create stunning boxes that make a lasting impression.
              </p>
            </div>
          </div>
          {/* Card 5 */}
          <div className="flex items-start gap-4">
            <span className="bg-[#5c6bc0] rounded-lg p-2">
              <Truck className="w-7 h-7 text-white" />
            </span>
            <div>
              <h3 className="font-semibold text-lg text-[#222] mb-1">Free & Fast Delivery</h3>
              <p className="text-[#444] text-sm">
                Delivery fees? Not with us. Enjoy free, rapid, and reliable delivery straight to your doorstep, ensuring your custom packaging arrives on time, every time.
              </p>
            </div>
          </div>
          {/* Card 6 */}
          <div className="flex items-start gap-4">
            <span className="bg-[#1976d2] rounded-lg p-2">
              <Palette className="w-7 h-7 text-white" />
            </span>
            <div>
              <h3 className="font-semibold text-lg text-[#222] mb-1">Free Design Support</h3>
              <p className="text-[#444] text-sm">
                You imagine it, and our expert design team brings it to life—professional design assistance at no extra cost to create packaging that perfectly represents your brand.
              </p>
            </div>
          </div>
          {/* Card 7 */}
          <div className="flex items-start gap-4">
            <span className="bg-[#bc9956] rounded-lg p-2">
              <Smile className="w-7 h-7 text-white" />
            </span>
            <div>
              <h3 className="font-semibold text-lg text-[#222] mb-1">Customer Satisfaction Above All!</h3>
              <p className="text-[#444] text-sm">
                Our customers are our top priority! Our dedicated Customer Service Representatives are available 24/7 to assist you. Reach out anytime—we’re here to help!
              </p>
            </div>
          </div>
          {/* Card 8 */}
          <div className="flex items-start gap-4">
            <span className="bg-[#ffb300] rounded-lg p-2">
              <DollarSign className="w-7 h-7 text-white" />
            </span>
            <div>
              <h3 className="font-semibold text-lg text-[#222] mb-1">Lowest Prices Guaranteed!</h3>
              <p className="text-[#444] text-sm">
                Unbeatable pricing you won’t find anywhere else! Scale your business with affordable custom packaging solutions, all while maintaining top-notch quality.
              </p>
            </div>
          </div>
        </div>
        {/* Right Side Images (optional, as in screenshot) */}
        <div className="mt-12 flex flex-wrap gap-4 justify-end">
          {/* Replace src with your actual images */}
          <img src="/images/box1.jpg" alt="Box Sample 1" className="w-36 h-28 object-cover rounded shadow-md" />
          <img src="/images/box2.jpg" alt="Box Sample 2" className="w-36 h-28 object-cover rounded shadow-md" />
          <img src="/images/box3.jpg" alt="Box Sample 3" className="w-36 h-28 object-cover rounded shadow-md" />
          <img src="/images/box4.jpg" alt="Box Sample 4" className="w-36 h-28 object-cover rounded shadow-md" />
        </div>
      </div>
    </section>
  );
}
