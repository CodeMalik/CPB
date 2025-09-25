import { FaCogs, FaShippingFast, FaCube, FaBox, FaBoxes } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import { MdOutlinePerson4 } from "react-icons/md";
import { LuLayers } from "react-icons/lu";
import { X, Clock, GalleryVertical, SprayCan, FlipHorizontal, Square,
  Leaf,
  Printer,
  Gem,
  Truck,
  Palette,
  Smile,
  DollarSign } from "lucide-react"


export const navigation = [
  {
    id: "0",
    title: "Home",
    url: "/",
  },
  {
    id: "1",
    title: "Box by Industry",
    url: "#",
    submenu: [
      { title: "Apparel Boxes", url: "/customized/apparel-boxes", icon: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753542340/1_bzdh8h.png" },
      { title: "Bakery And Cake Boxes", url: "/customized/bakery-and-cake-boxes", icon: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753542340/2_m9jcd1.png" },
      { title: "Cosmetic Boxes", url: "/customized/cosmetic-boxes", icon: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753542340/3_nuwjet.png" },
      { title: "Food Boxes", url: "/customized/food-boxes", icon: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753542340/4_trjmtw.png" },
      { title: "Display Boxes", url: "/customized/display-boxes", icon: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753542340/5_oguic4.png" },
      { title: "CBD And Hemp Boxes", url: "/customized/cbd-and-hemp-boxes", icon: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753542341/6_jsptd0.png" },
      { title: "Chocolate Boxes", url: "/customized/chocolate-boxes", icon: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753542341/7_tinrky.png" },
      { title: "Mylar Bags", url: "/customized/mylar-boxes", icon: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753542342/8_pzkdvk.png" },
      { title: "Jewelry Boxes", url: "/customized/jewelry-boxes", icon: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753542342/9_fuzixn.png" },
      { title: "Soap Boxes", url: "/customized/soap-boxes", icon: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753542343/10_bb17sd.png" },
      { title: "Pizza Boxes", url: "/customized/pizza-boxes", icon: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753542343/11_odxzu3.png" },
      { title: "Health Boxes", url: "/customized/health-boxes", icon: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753542344/12_v7zxsv.png" },
      { title: "Cereal Boxes", url: "/customized/cereal-boxes", icon: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753542344/13_b8ufij.png" },
      { title: "Gift Boxes", url: "/customized/gift-boxes", icon: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753542345/14_axuqx5.png" },
      { title: "Christmas Boxes", url: "/customized/christmas-boxes", icon: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753542346/15_oewufz.png" },
      { title: "Candle Boxes", url: "/customized/candle-boxes", icon: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753542346/16_hfouij.png" },
    ],
  },
  {
    id: "2",
    title: "Box by Stock",
    url: "#",
    submenu: [
      { title: "Corrugated Boxes", url: "/customized/corrugated-boxes", icon: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753542347/17_klupji.png" },
      { title: "Card Stock Boxes", url: "/customized/card-stock-boxes", icon: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753542348/18_cacgmz.png" },
      { title: "Rigid Boxes", url: "/customized/rigid-boxes", icon: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753542349/19_eagb18.png" },
      { title: "Kraft Boxes", url: "/customized/kraft-boxes", icon: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753542349/20_kgzgpf.png" },
      { title: "Pillow Boxes", url: "/customized/pillow-boxes", icon: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753542350/21_gdgfmy.png" },
    ],
  },
  {
    id: "3",
    title: "About Us",
    url: "/about",
  },
  {
    id: "5",
    title: "Contact Us",
    url: "/contact",
  },
]


export const aboutFeatures = [
  {
    icon: Square,
    title: "Customize Size and Shape",
    description:
      "We bring your vision to life by offering complete flexibility over the size and shape of your packaging boxes. Whether you need unique dimensions or a specific structure, Custom Pack Boxes will create the perfect solution tailored to your exact specifications.",
    color: "#ff7043",
  },
  {
    icon: Leaf,
    title: "Welcome to the Team Green!",
    description:
      "We understand our commitment to sustainability. That’s why Custom Pack Boxes proudly offers premium custom boxes crafted from sustainable and eco-friendly materials, ensuring your packaging aligns with your green values.",
    color: "#ff7043",
  },
  {
    icon: Printer,
    title: "High-End Printing Quality!",
    description:
      "Experience exceptional printing results with Custom Pack Boxes. We utilize advanced digital and inkjet printing techniques to deliver vibrant, precise, and high-quality packaging that sets you apart from the competition.",
    color: "#64b5f6",
  },
  {
    icon: Gem,
    title: "Exclusive Finishing and Features",
    description:
      "The final touch that makes your packaging truly stand out! Enjoy limitless customization options, including exclusive finishes and features, to create stunning boxes that make a lasting impression.",
    color: "#4db6ac",
  },
  {
    icon: Truck,
    title: "Free & Fast Delivery",
    description:
      "Delivery fees? Not with us. Enjoy free, rapid, and reliable delivery straight to your doorstep, ensuring your custom packaging arrives on time, every time.",
    color: "#5c6bc0",
  },
  {
    icon: Palette,
    title: "Free Design Support",
    description:
      "You imagine it, and our expert design team brings it to life—professional design assistance at no extra cost to create packaging that perfectly represents your brand.",
    color: "#1976d2",
  },
  {
    icon: Smile,
    title: "Customer Satisfaction Above All!",
    description:
      "Our customers are our top priority! Our dedicated Customer Service Representatives are available 24/7 to assist you. Reach out anytime—we’re here to help!",
    color: "#bc9956",
  },
  {
    icon: DollarSign,
    title: "Lowest Prices Guaranteed!",
    description:
      "Unbeatable pricing you won’t find anywhere else! Scale your business with affordable custom packaging solutions, all while maintaining top-notch quality.",
    color: "#ffb300",
  },
];

export const clientsImages = [
  {
    id: 1,
    alt: "Logo of Acme Corporation",
    image: "https://cdn.example.com/images/acme-logo.png",
  },
  {
    id: 2,
    alt: "Logo of Beta Solutions",
    image: "https://cdn.example.com/images/beta-logo.png",
  },
  {
    id: 3,
    alt: "Logo of Gamma Industries",
    image: "https://cdn.example.com/images/gamma-logo.png",
  },
  {
    id: 4,
    alt: "Logo of Delta Enterprises",
    image: "https://cdn.example.com/images/delta-logo.png",
  },
  {
    id: 5,
    alt: "Logo of Epsilon Tech",
    image: "https://cdn.example.com/images/epsilon-logo.png",
  },
];

export const customBoxSection = {
  tagline: "Your one-stop destination for personalized packaging",
  heading: "Design Ideal Custom Boxes",
  description:
    "Your packaging is your first impression so make it unforgettable with Custom Pack Boxes. Tailored designs, bold branding, and free creative freedom in every box.",
  image:
    "https://res.cloudinary.com/dfnjpfucl/image/upload/v1751364382/service-side-img_maflfh.jpg",
  features: [
    {
      icon: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1751363945/parcel-size_l68zxq.png",
      title: "Custom Size & Style",
    },
    {
      icon: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1751363945/graphic-desig_oevxok.png",
      title: "Free Design Services",
    },
    {
      icon: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1751363945/printer_kovkg4.png",
      title: "No Die & Plate Charges",
    },
    {
      icon: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1751367105/sustainable-energy_hvmgmq.png",
      title: "Sustainability",
    },
    {
      icon: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1751363945/coin-setting_znnhfh.png",
      title: "Proactive Cost Optimization",
    },
    {
      icon: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1751363945/printing-a-picture-in-a-printer-machine_g8qau0.png",
      title: "Printed In USA",
    },
  ],
};

export const productsDetails = {
  heading: "Partner with Custom Pack Boxes for Exceptional Packaging Solutions",
  description: "At Custom Pack Boxes, we combine unmatched scalability and rock-solid reliability to deliver custom packaging solutions that grow with your business—whether you need a few boxes for a small promo or a massive run for a big launch. With flexible production, strict quality control, and a commitment to your timelines and budget, we’re your trusted partner in packaging success.",
};

export const aboutUsSection = {
  heading:
    "<span class='dm-sans font-semibold text-red-themed'>Custom Packaging</span> for Brands That Want More Than a Box Unique Designs, Premium Materials, and <span class='dm-sans font-semibold text-red-themed'>Total Brand Control</span>.",
  image:
    "https://res.cloudinary.com/dfnjpfucl/image/upload/v1751364339/Capture-1-1_dof9ln.png",
  aboutBenefits: [
    {
      title: null,
      description:
        "Custom Pack Boxes is a leader in the packaging industry, offering innovative solutions tailored to your unique needs. We specialize in custom packaging boxes and high-quality products designed to meet your exact standards. Our commitment to creativity and innovation ensures that our packaging aligns with the latest market trends, helping your brand stay ahead.",
    },
    {
      title: "Innovation",
      description:
        "At Custom Pack Boxes, we continuously push the boundaries to deliver standout packaging solutions. From discovering the latest industry trends to experimenting with new materials and designs, we ensure your packaging stays ahead of the curve.",
    },
    {
      title: "Customization",
      description:
        "At Custom Pack Boxes, we know that one size doesn’t fit all when it comes to packaging. That’s why we provide fully customizable solutions tailored to meet each client’s specific needs, ensuring a perfect fit for your brand and products.",
    },
    {
      title: "Sustainability",
      description:
        "Custom Pack Boxes is dedicated to reducing environmental impact by promoting sustainability at every stage of the packaging lifecycle. We offer eco-friendly packaging solutions that help your brand stay green without compromising quality.",
    },
    {
      title: "Brand impact",
      description:
        "Create a lasting impression with Custom Pack Boxes. We craft tailored packaging solutions that elevate your brand and leave your customers with a memorable experience.",
    },
  ],
};

export const serviceIntro = {
  heading:
    "Guaranteed Premium Quality With Every Order, Delivering Packaging That Exceeds Your Expectations Every Time.",
  description:
    "Custom Pack Boxes offers strategic packaging solutions to reduce shipping costs and minimize environmental impact. We provide multi-packaging ordering options, enabling you to create a cohesive product line with ease. Our rigorous quality checks and comprehensive monitoring ensure every packaging product meets and exceeds industry standards. Trust us for superior packaging solutions that protect your products and enhance your brand’s image.",
  features: [
    {
      title: "Managed Manufacturing",
      icon: FaCogs,
    },
    {
      title: "Sampling & Prototyping",
      icon: FaCube,
    },
    {
      title: "Cost Optimization",
      icon: MdAttachMoney,
    },
    {
      title: "End-to-End Delivery",
      icon: FaShippingFast,
    },
  ],
  projectDelivered: [
    {
      title: "500",
      description: "Active Clients",
      icon: MdOutlinePerson4,
    },
    {
      title: "3500",
      description: "Projects Completed",
      icon: FaBox,
    },
    {
      title: "5",
      description: "Glorious years",
      icon: LuLayers,
    },
    {
      title: "100",
      description: "Box Style",
      icon: FaBoxes,
    },
  ],
};

export const contactData = {
  heading: "Begin Your Packaging Journey with Custom Pack Box",
  description:
    "At Custom Pack Boxes, we are dedicated to delivering exceptional service and innovative solutions that not only meet but exceed your expectations. Our commitment is to ensure that we provide the perfect packaging solutions tailored to the unique needs of your project.",
  contactBenefits: [
    "Expert Craftsmanship",
    "Award-Winning Design",
    "Advanced Printing",
    "FSC-Certified Suppliers",
    "Wide Range of Packaging",
    "State-of-the-Art Printing",
  ],
};

export const boostSalesSection = {
  image:
    "https://res.cloudinary.com/dfnjpfucl/image/upload/v1751364337/boost_sales.b70dee34-1-704x1024_iq9xp2.webp",
  heading: "Boost Sales with Tailored Custom Packaging Options",
  paragraphs: [
    "At Custom Pack Boxes, we understand that every packaging project is unique, which is why we offer our clients the flexibility and creativity they need to bring their vision to life. Whether you’re seeking custom box packaging designs, innovative solutions, or unique branding opportunities, we’re here to make it happen.",
    "With Custom Pack Boxes, you can explore a diverse range of options and customize every aspect of your packaging to meet your specific needs. From selecting the ideal materials and finishes to integrating eye-catching designs and branding elements, the possibilities are endless. Our experienced team collaborates with you every step of the way, ensuring your packaging reflects your brand identity and resonates with your target audience.",
    "We are committed to pushing the boundaries and delivering packaging solutions that stand out. Whether you’re launching a new product, rebranding your image, or aiming to make a memorable impact, you can trust Custom Pack Boxes to help you achieve your goals with creativity and flexibility.",
    "Experience the difference with Custom Pack Boxes and unlock your packaging’s potential with our innovative solutions and creative approach. Let us elevate your brand and leave a lasting impression on your customers.",
  ],
};

export const accordionData = [
  {
    question: "What kind of custom packaging does Custom Pack Boxes offer?",
    answer:
      "Custom Pack Boxes offers a wide variety of custom packaging solutions, including Display Boxes, CBD Boxes, Food Boxes, Cosmetic Boxes, and Retail Packaging Boxes. We specialize in creating packaging that suits your brand's specific needs, ensuring high quality and distinctive designs.",
  },
  {
    question: "What kind of customizations are avalible?",
    answer:
      "Custom Pack Boxes offers a range of customization options including size, shape, color, material, and finishing. We also provide custom printing, embossing, debossing, and lamination options to ensure your packaging aligns perfectly with your brand identity.",
  },
  {
    question: "Do you provide eco-friendly packaging options?",
    answer:
      "Yes, Custom Pack Boxes is committed to sustainability and offers eco-friendly packaging solutions. Our eco-friendly options use recyclable materials that are safe for the environment without compromising on durability or quality.",
  },
  {
    question: "Does custom pack boxex ship internationally?",
    answer:
      "Currently, Custom Pack Boxes mainly caters to clients in the USA. If you are located outside the USA and interested in our services, please reach out to us, and we can discuss potential shipping options.",
  },
  {
    question: "Can I get sample before placing a large order?",
    answer:
      "Absolutely! At Custom Pack Boxes, we provide sample options so you can evaluate the quality and design of your packaging before committing to a bulk order. Contact our support team to request a sample.",
  },
  {
    question: "What printing techniques do you use?",
    answer:
      "We use advanced printing techniques such as offset, digital, and screen printing to ensure your packaging looks vibrant and professional. Our team will recommend the best method based on your design requirements.",
  },
  {
    question: "What is the minimum order quantity of custom packaging?",
    answer:
      "Our minimum order quantity varies depending on the type of packaging. Typically, the minimum order for most of our products is 100 units, but we recommend getting in touch with us for details specific to your desired packaging.",
  },
  {
    question: "How do I place an order with Custom Pack Boxes?",
    answer:
      "Placing an order is easy! Simply visit our website, select the type of packaging you need, and fill out our custom order form. Our support team is also available to assist you at every step.",
  },
  {
    question: "How long does it take to complete an order?",
    answer:
      "Turnaround times for orders depend on the complexity and volume of the packaging required. Typically, our standard turnaround time is 10-14 business days after finalizing the design. However, we also offer rush services for urgent orders.",
  },
  {
    question: "Is there a design fee for custom packaging",
    answer:
      "Custom Pack Boxes provides free design support to all our customers. We want to help bring your vision to life without the burden of extra costs, ensuring you get the packaging that suits your needs perfectly.",
  },
];

export const packagingFeatures = {
  heading:
    "Our packaging services match the quality of your products, ensuring exceptional presentation and protection that upholds your brand standards.",
};

// About page Data

export const whoWeAre = {
  heading: "Who We Are",
  description:
    "Custom Pack Boxes is a leading manufacturer of high-quality packaging boxes. With a commitment to excellence and innovation, we cater to diverse industries, providing tailored packaging solutions to meet our clients’ unique needs. Our expertise lies in delivering personalized packaging options that not only protect products but also enhance their presentation.",
  imageUrl:
    "https://res.cloudinary.com/dfnjpfucl/image/upload/v1751545007/about.717b46dc-1-scaled-1-704x1024_eodc3l.webp",
};

export const ourHistory = {
  heading: "Our History",
  description:
    "Custom Pack Boxes has a rich history that spans several decades. We have been at the forefront of the packaging industry, continually evolving and adapting to meet the changing needs of our clients. Our journey began with a small team of passionate individuals who had a vision to revolutionize the packaging industry.Through perseverance and dedication, we gradually expanded our operations, investing in state-of-the-art technology and manufacturing processes to ensure the highest quality standards. Over the years, Custom pack Boxes has grown from strength to strength, establishing a reputation for excellence and reliability.We have worked with a diverse range of clients, from small businesses to multinational corporations, across various industries, including food and beverage, cosmetics, electronics, and more.",
  imageUrl:
    "https://res.cloudinary.com/dfnjpfucl/image/upload/v1751545007/about1.acdf6a18-1-scaled-1-704x1024_kbfsdq.webp",
};

export const specificationTabs = [
  {
    heading: "Materials/Paper We Use",
    title: "Not Just Packaging. Purpose.",
    description: [
      "At Custom Pack Boxes, quality and sustainability guide every choice. We use carefully selected materials to ensure your packaging looks sharp, feels premium, and protects what matters. We prioritize sustainable sourcing, recyclable components, and low-impact printing, so your brand looks good while doing good."
    ],
    options: [
      {
        name: "Black Kraft​",
        image:
          "https://res.cloudinary.com/dfnjpfucl/image/upload/v1751364335/Black-Kraft_11zon.5ecda8b0_mdm1kn.webp",
      },
      {
        name: "Corrugated Boxes​",
        image:
          "https://res.cloudinary.com/dfnjpfucl/image/upload/v1751364343/Corrugated_11zon.a4205be8-1_xy6beg.webp",
      },
      {
        name: "Card Stock Boxes​",
        image:
          "https://res.cloudinary.com/dfnjpfucl/image/upload/v1751364355/Holographic_11zon.a181ab72-1_ylhzhu.webp",
      },
      {
        name: "Matte Lamination​",
        image:
          "https://res.cloudinary.com/dfnjpfucl/image/upload/v1751364362/Matte-Lamination_11zon.72d20a2d-1_imnzxf.webp",
      },
      {
        name: "Natural Brown Kraft​",
        image:
          "https://res.cloudinary.com/dfnjpfucl/image/upload/v1751364366/Natural-Brown-Kraft_11zon.479691fa-1_pfhgxk.webp",
      },
      {
        name: "Rigid Chipboard​",
        image:
          "https://res.cloudinary.com/dfnjpfucl/image/upload/v1751364379/Rigid-Chipboard_11zon.0364bf5c-1_fsd3iw.webp",
      },
      {
        name: "White Cardboard​",
        image:
          "https://res.cloudinary.com/dfnjpfucl/image/upload/v1751364397/White-Cardboard-SBS-C1S_11zon.a6ecba95-1_wg3ku6.webp",
      },
      {
        name: "White Kraft​",
        image:
          "https://res.cloudinary.com/dfnjpfucl/image/upload/v1751364400/White-kraft_11zon.703dab2d-1_bmdi8s.webp",
      },
    ],
  },
  {
    heading: "Printing Options",
    title: "Design in Every Detail",
    description: [
      "We offer advanced printing techniques that bring your packaging to life with clarity, color, and character. From bold visuals to subtle textures, every detail is crafted to reflect your brand's identity and elevate its presence. Because packaging isn’t just protection, it’s presentation."
    ],
    options: [
      {
        name: "Digital Printing​",
        image:
          "https://res.cloudinary.com/dfnjpfucl/image/upload/v1751364349/Digital-printing_11zon.83da0d44-1_fbmdlg.webp",
      },
      {
        name: "Offset Printing​",
        image:
          "https://res.cloudinary.com/dfnjpfucl/image/upload/v1751364368/Offset-Print_11zon.727e7ee2-1_gzgzus.webp",
      },
      {
        name: "Oil Base Ink​",
        image:
          "https://res.cloudinary.com/dfnjpfucl/image/upload/v1751364372/Oil-BASE-INK_11zon.4aba72d0-1_vdsc0j.webp",
      },
      {
        name: "Pantone​",
        image:
          "https://res.cloudinary.com/dfnjpfucl/image/upload/v1751364373/Pantone_11zon.919cec6b-1_1_p822sp.webp",
      },
      {
        name: "Pantone Metallic​",
        image:
          "https://res.cloudinary.com/dfnjpfucl/image/upload/v1751364375/Pantone_11zon.919cec6b-1_tjitpl.webp",
      },
      {
        name: "Soy Ink​",
        image:
          "https://res.cloudinary.com/dfnjpfucl/image/upload/v1751364333/3.d3b79f28-1_oxyxpc.webp",
      },
      {
        name: "UV Printing​",
        image:
          "https://res.cloudinary.com/dfnjpfucl/image/upload/v1751364393/UV-Printing_11zon.6c15a3c8-1_yiikwb.webp",
      },
      {
        name: "Water Based Ink​",
        image:
          "https://res.cloudinary.com/dfnjpfucl/image/upload/v1751364397/Water-Based-Ink_11zon.13cd6a61-1_h4x9ub.webp",
      },
    ],
  },
  {
    heading: "Coating & Laminations",
    description: [
      "Custom Pack Boxes offers a variety of coating and lamination options to enhance the look and feel of your packaging. Choose from glossy or matte finishes to add a premium touch, or opt for soft-touch lamination for a luxurious feel. We also provide UV coating for added durability and protection, and spot UV for highlighting specific design elements. These options not only elevate your packaging’s appearance but also provide added protection and durability, ensuring your products look their best from production to delivery.",
      "At Custom Pack Boxes, we are dedicated to excellence in every detail of our packaging solutions, including the inks used for printing on our cardboard boxes. We use eco-friendly, high-quality inks that deliver vibrant, long-lasting colors and crisp, clear designs. Our range includes water-based, soy-based, and UV-curable inks, each selected for their environmental benefits and exceptional performance. These inks not only produce stunning visual results but are also safer for the environment and your products. Trust Custom Pack Boxes to provide packaging that is durable, functional, visually captivating, and eco-conscious.",
    ],
    options: [
      {
        name: "Anti Scratch Lamination​",
        image:
          "https://res.cloudinary.com/dfnjpfucl/image/upload/v1751364333/Anti-Scratch-lamination_11zon.f20df890-1_jfsulg.webp",
      },
      {
        name: "Aqueous Coating​",
        image:
          "https://res.cloudinary.com/dfnjpfucl/image/upload/v1751364335/Aqueous-Coating_11zon.6dfc5ca8-1_qsu9jc.webp",
      },
      {
        name: "Gloss Lamination​",
        image:
          "https://res.cloudinary.com/dfnjpfucl/image/upload/v1751364353/Gloss-Lamination_11zon.397e9f90-1_v81jpv.webp",
      },
      {
        name: "Soft Touch Coating​",
        image:
          "https://res.cloudinary.com/dfnjpfucl/image/upload/v1751364387/Soft-Touch-Coating_11zon.ff443ff3-1_hndrun.webp",
      },
      {
        name: "Spot Gloss UV​",
        image:
          "https://res.cloudinary.com/dfnjpfucl/image/upload/v1751364388/Spot-Gloss-UV_11zon.64715c95-1_y4epxv.webp",
      },
      {
        name: "UV Coating",
        image:
          "https://res.cloudinary.com/dfnjpfucl/image/upload/v1751364391/UV-Coating_11zon.c27fbb75-1_kxpd3u.webp",
      },
      {
        name: "Varnish​",
        image:
          "https://res.cloudinary.com/dfnjpfucl/image/upload/v1751364396/Varnish_11zon.66809538-2_i85wuh.webp",
      },
    ],
  },
  {
    heading: "Special Finishing",
    description: [
      "Custom Pack Boxes offers a variety of special finishing options to give your packaging an extra edge. From eye-catching foil stamping and luxurious embossing to tactile soft-touch and protective UV coatings, our finishes add a unique touch that enhances your brand’s appeal. Elevate your packaging with custom textures and details that make your products truly stand out.",
      "At Custom Pack Boxes, we understand that the finishing touches are vital in shaping your brand’s image. That’s why we offer a wide array of finishing options for our cardboard boxes to ensure they surpass your expectations. Whether you prefer glossy or matte laminations, spot UV coatings, or soft-touch finishes, our advanced techniques provide both protective and aesthetic benefits. These finishes enhance the tactile feel and visual appeal of your packaging, helping your products stand out on the shelves. Choose Custom Pack Boxes for a finishing touch that leaves a lasting impression.",
    ],
    options: [
      {
        name: "Cold Foil/UV​",
        image:
          "https://res.cloudinary.com/dfnjpfucl/image/upload/v1751364340/Cold-Foiling_11zon.fa3ed88b-1_bavlkr.webp",
      },
      {
        name: "Combination Embossing​",
        image:
          "https://res.cloudinary.com/dfnjpfucl/image/upload/v1751364342/Combination-Embossing_11zon.02e5c5c1-1_tkkkxy.webp",
      },
      {
        name: "Debossing​",
        image:
          "https://res.cloudinary.com/dfnjpfucl/image/upload/v1751364345/Debossing_11zon.9a8da781-1_njyr6a.webp",
      },
      {
        name: "Die-Cut-Window​",
        image:
          "https://res.cloudinary.com/dfnjpfucl/image/upload/v1751364347/Die-Cut-Window_11zon.4416e427-1_pswtlb.webp",
      },
      {
        name: "Embossing​",
        image:
          "https://res.cloudinary.com/dfnjpfucl/image/upload/v1751364351/Embossing_11zon.ec698800-1_gpcszg.webp",
      },
      {
        name: "Hot Foil Gold Stamping​",
        image:
          "https://res.cloudinary.com/dfnjpfucl/image/upload/v1751364358/Hot-Foil-Gold-Stamping_11zon.5d4c4943-1_t0fjjh.webp",
      },
      {
        name: "Metallic​",
        image:
          "https://res.cloudinary.com/dfnjpfucl/image/upload/v1751364365/Metallic_11zon.ed1b16a0-1_kmoxhi.webp",
      },
      {
        name: "Silver Foiling​",
        image:
          "https://res.cloudinary.com/dfnjpfucl/image/upload/v1751364386/Sliver-Foiling_11zon.259dde85-2_zu3ke8.webp",
      },
    ],
  },
];

export const longDescription = [
  {
    title: "Custom Apparel Boxes for Every Brand",
    description:
      "At Custom Pack Boxes, we offer versatile custom apparel boxes that cater to a variety of industries, including fashion, retail, and e-commerce. These boxes are designed to suit any business, from boutique stores to large-scale clothing brands. With custom printing options, including logos and unique designs, our apparel boxes help enhance your brand identity. Whether you’re packaging shirts, accessories, or full clothing lines, our boxes are durable and stylish, offering premium protection for your products. We also ensure that each box is eco-friendly, making them the perfect solution for brands looking to be sustainable while maintaining aesthetic appeal.",
  },
  {
    title:
      "Wholesale Apparel Boxes: Affordable and Durable Packaging Solutions",
    description:
      "Wholesale orders are a cost-effective way for businesses to stock up on packaging. Our wholesale apparel boxes provide affordable pricing without compromising on quality. Designed to handle large volumes, these boxes are perfect for businesses preparing for seasonal sales, promotional events, or subscription services. By purchasing in bulk, brands can save significantly while also benefiting from free shipping on larger orders. Our bulk apparel packaging solutions are ideal for companies looking to cut costs while still presenting their products in a sleek and professional manner.",
  },
  {
    title: "Bulk Orders of Apparel Gift Boxes for Special Occasions",
    description:
      "Bulk ordering is particularly beneficial for businesses preparing for events such as Christmas apparel boxes or special promotions. Our custom apparel gift boxes are perfect for occasions like holidays, corporate gifts, or fashion brand promotions. With options for personalization, such as festive designs or branded messaging, these boxes enhance the customer’s unboxing experience. Bulk orders also offer a convenient way for businesses to prepare for high-demand periods, ensuring they have enough inventory to meet customer needs without running out of packaging.",
  },
  {
    title: "Custom Printed Apparel Boxes with Logo for Branding",
    description:
      "Your brand deserves to be seen, and our custom printed apparel boxes with logo are the perfect way to achieve that. These boxes allow you to showcase your logo and other branding elements prominently, helping to increase brand recognition with every package you send. Our printing options allow for vibrant colors and sharp imagery that leaves a lasting impression on your customers. By using custom printed boxes, you’re not only protecting your apparel but also turning your packaging into a marketing tool that extends your brand’s reach.",
  },
  {
    title: "Choosing the Right Apparel Packaging for Your Business",
    description:
      "Selecting the right apparel boxes for your business is crucial for maintaining product quality and enhancing customer experience. At Custom Pack Boxes, we offer a range of sizes and designs to cater to different types of apparel, from t-shirt boxes to underwear boxes. Each box is designed with durability and presentation in mind, ensuring that your products arrive in perfect condition. Whether you’re shipping bulk orders or delivering individual packages, we have the right solutions to meet your packaging needs.",
  },
  {
    title:
      "Explore Our Other Packaging Solutions: T-Shirt Boxes and Underwear Boxes",
    description:
      "In addition to our apparel boxes, we offer specialized packaging solutions for individual product lines, such as T-shirt boxes and Underwear boxes. These boxes are designed specifically for different apparel items, ensuring that each product has the perfect fit. This not only enhances the customer’s unboxing experience but also protects the product from damage during shipping. Explore our range of packaging options to find the perfect match for your business.",
  },
];

export const highlightWords = [
  "wholesale apparel boxes",
  "bulk apparel packaging",
  "Christmas apparel boxes",
  "apparel gift boxes",
  "custom printed apparel boxes with logo",
  "Custom Pack Boxes",
  "Underwear boxes",
  "T-shirt boxes"
]


export const productHeroData = {
  heading: "Custom UnderWear Boxes",
  tagline: "Custom Underwear Boxes for Men’s Fashion – Wholesale packaging solutions for men’s underwear, offering durable and stylish designs. Free shipping and bulk discounts available.", 
  description: "Our custom underwear boxes are ideal for packaging men’s fashion essentials. Crafted from high-quality materials, these boxes ensure protection and style, making them perfect for retail displays or subscription services. Custom Pack Boxes offers bulk pricing, free design support, and shipping, so you can create underwear packaging that reflects your brand. Whether for a subscription box or a retail setting, our underwear boxes cater to both aesthetics and functionality, giving your product the perfect packaging solution.",
  benefits: [
    {
      name: "CUSTOMIZED SIZES & STYLE",
      icon: FlipHorizontal
    },
    {
      name: "FREE DESIGN SUPPORT",
      icon: GalleryVertical
    },
    {
      name: "FREE SHIPPING",
      icon: Truck
    },
    {
      name: "NO DIE & PLATE CHARGES",
      icon: SprayCan
    },
    {
      name: "QUICK TURNAROUND TIME",
      icon: Clock
    },
    {
      name: "NO Minimum Order Quantity",
      icon: X
    },
  ]
}


export const productSpecifications = [
  {
    label: "Box Name",
    value: "Apparel Mailer Boxes",
  },
  {
    label: "Dimension (L + W + H)",
    value: "All Custom Sizes & Shapes",
    highlight: true,
  },
  {
    label: "Quantities",
    value: "No Minimum Order Required",
  },
  {
    label: "Stock",
    value:
      "10pt to 28pt (60lb to 400lb) Eco-Friendly Kraft, E-flute Corrugated, Bux Board, CardStock",
  },
  {
    label: "Printing No",
    value: "Printing, CMYK, CMYK + 1 PMS color, CMYK + 2 PMS colors",
  },
  {
    label: "Finishing",
    value:
      "Gloss Lamination, Matte Lamination, Gloss AQ, Gloss UV, Matte UV, Spot UV, Embossing, Foiling",
  },
  {
    label: "Included Options",
    value: "Die Cutting, Gluing, Scored, Perforation",
  },
  {
    label: "Addons",
    value: "Eco-Friendly, Recycled Boxes, Biodegradable",
  },
  {
    label: "Proof",
    value: "Flat View, 3D Mock-up, Physical Sampling (On request)",
  },
  {
    label: "Turnaround",
    value: "4 – 8 Business Days, RUSH",
  },
  {
    label: "Shipping",
    value: "FLAT",
  },
];


export const recentProducts = [
  { name: "Box 1", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753445019/3a0081ac-0a2e-4527-bbc7-649d75ab276c_t1fl9o.webp" },
  { name: "Box 2", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753445019/1ca4ee91-2421-4f0b-b06b-e6287b52f1d4_je0cwh.webp" },
  { name: "Box 3", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753445018/748165a4-3c02-43d3-a61b-36219b9b5783_bpaoti.webp" },
  { name: "Box 4", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753445018/8427c108-b993-40f0-8b00-dee3cccb946d_a6owhy.webp" },
  { name: "Box 5", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753445017/a10f7bdc-44be-430c-b20a-0f8a6dc411b1_l5s8dd.webp" },
  { name: "Box 6", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753445018/c966bd0f-6596-4178-a348-f8f6c483d0da_nniytz.webp" },
  { name: "Box 7", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753445018/042884f3-f20b-4b59-bebc-9c98a54dc0e0_cshaxb.webp" },
  { name: "Box 8", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753445017/d6e4445b-813b-46d3-b91a-bf287a33b4f8_rrx9py.webp" },
  { name: "Box 9", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753445013/e633fbeb-05fc-445d-a1a2-b48acf6c6f5f_tg0yew.webp" },
  { name: "Box 10", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753445012/345efb9d-948a-40f6-9e0b-f55aa443c022_s017rr.webp" },
  { name: "Box 11", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753445012/6e08ad28-4db0-471e-8f68-7e3e7d5019d0_a1znpv.webp" },
  { name: "Box 12", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753445012/37786f69-9a2f-4c1f-8b4f-d2b7e1cca345_n4xoib.webp" },
  { name: "Box 13", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753445012/4fd28760-8de2-4048-a05c-0420a2437a3a_kat5ux.webp" },
  { name: "Box 14", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753445012/85aa8245-2956-4828-ba1a-13e416968fc6_nbzybv.webp" },
  { name: "Box 15", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753445009/cac96e6e-59bb-4d0b-a2f5-f65dc8de6c45_mjlblk.webp" },
  { name: "Box 16", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753445007/d4cfc426-8929-42fb-b7c7-f41f8c0ef206_fgmcef.webp" },
  { name: "Box 17", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753445007/1a834ce4-e11e-49f0-89c0-4ab4999ede16_lcsbne.webp" },
  { name: "Box 18", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753445007/da4b870a-acc9-437c-9049-19adeeb77e91_ojf64s.webp" },
  { name: "Box 19", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753445006/82f8422f-8426-4793-9249-600cd0fc662d_hvgueo.webp" },
  { name: "Box 20", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753445005/039508ac-75b3-49a4-8df0-d6668994a590_avoqe1.webp" },
  { name: "Box 21", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753445005/48a65c92-9588-4588-a635-522933c01d17_tuav4j.webp" },
  { name: "Box 22", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753445004/7ba9e649-397b-46e2-b670-915dd005bad8_afbpio.webp" },
  { name: "Box 23", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753445002/2d9976ea-ff92-4a1b-9f20-3a60bf83a990_nscoyy.webp" },
  { name: "Box 24", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753445001/7ab655e6-2944-4051-97ab-b5eba8af7bf1_auqqzn.webp" },
  { name: "Box 25", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753445001/69a55117-b502-4d8f-baf3-7c2efd892dd1_aisypf.webp" },
  { name: "Box 26", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753445000/9508da7b-dc85-4dc8-b6f0-782f665ae399_o4mzmd.webp" },
  { name: "Box 27", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753445000/e891be2c-ed2c-4407-9e00-0803d8e5607b_wp7j0o.webp" },
  { name: "Box 28", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753444999/228ac644-fd70-480b-a3ca-1d8061611bcf_osh4ej.webp" },
  { name: "Box 29", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753444998/bd075322-f5fa-4146-926d-25700f4249b1_zyemwx.webp" },
  { name: "Box 30", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753444997/35f750cc-deb1-43eb-aa9c-d2bf90762a10_dgollv.webp" },
  { name: "Box 31", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753444997/876adfd8-7716-48e4-b850-9fba56f0559e_n9nqph.webp" },
  { name: "Box 32", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753444994/23d475c7-eff3-4d9c-a234-457ba6d2b91b_oopxsa.webp" },
  { name: "Box 33", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753444993/0ebfec46-558e-4f53-ba31-346c05d6b7b5_ucurz2.webp" },
  { name: "Box 34", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753444993/ca5f5956-e48b-4781-930d-26ab18668c42_sqs9zs.webp" },
  { name: "Box 35", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753444993/7d422214-d033-4186-b81b-1d0bb71803e3_yotqvj.webp" },
  { name: "Box 36", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753444993/824a51f3-967e-432e-948d-ec23224f1315_gjvbix.webp" },
  { name: "Box 37", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753444848/2ad929fc-2a66-4213-b2d0-b0b0b3090cd1_vnsbjt.webp" },
  { name: "Box 38", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753444810/b0f753dd-bef8-462f-8a4e-adffdbd7f176_urqqqb.webp" },
  { name: "Box 39", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753444792/dfea14cf-9b95-4f08-8cb7-30632744905a_prtabq.webp" },
  { name: "Box 40", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753444791/5fddb97b-c4d3-4c8e-9b12-8b5e1a5ff70f_frnj14.webp" },
  { name: "Box 41", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753444791/113493c8-19f7-4c66-9c33-f5a35db6a471_lsr58n.webp" },
  { name: "Box 42", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753444790/46230e5a-8ac4-4db0-982c-3cd800f3d5c6_b52pvn.webp" },
  { name: "Box 43", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753444790/46230e5a-8ac4-4db0-982c-3cd800f3d5c6_b52pvn.webp" },
  { name: "Box 44", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753444789/e19517e5-6772-4214-b973-15f7e0e30af0_czgviz.webp" },
  { name: "Box 45", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753444789/0f5912a3-3a4b-4cfb-a564-3a03c865e396_ecy8fg.webp" },
  { name: "Box 46", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753444788/b6da095e-964c-49ec-a6b0-267f6627d63f_k5pf3i.webp" },
  { name: "Box 47", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753444788/c32ffd60-2b99-422b-b9f0-053986bc656d_eijwqf.webp" },
  { name: "Box 48", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753444787/f4b7599a-9908-4ea3-8c87-5efd6b9cd986_aiztpy.webp" },
  { name: "Box 49", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753444786/cb588909-36cc-419d-bab7-f0ccaf746806_cqn6be.webp" },
  { name: "Box 50", image: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753444786/147c703b-3b19-4b4e-bc0a-d14605fd5593_w1gb8g.webp" }
];


export const brands = [
  {
    name: "image1",
    src: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753497487/md-tooling-logo.f99cfd88_f3beuj.webp"
  },
  {
    name: "image2",
    src: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753497485/asea-logo.74123784_evbxl1.webp"
  },
  {
    name: "image3",
    src: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753497485/lanes-logo.07658caf_lkruqf.webp"
  },
  {
    name: "image4",
    src: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753497485/duraflame-logo.34c7b1bb_f4vklb.webp"
  },
  {
    name: "image5",
    src: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753497485/colville-logo.29b0716f_ahok3o.webp"
  },
  {
    name: "image6",
    src: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753497485/continental-batteries-logo.c535d913_xluirx.webp"
  },
  {
    name: "image7",
    src: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753497485/zemplee-logo.14b326bb_hfqieq.webp"
  },
  {
    name: "image8",
    src: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753497485/sodilly-logo.0cd0dbdb_lpqbfw.webp"
  },
  {
    name: "image9",
    src: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753497486/mike-logo.8c0bc6d4_sfnshm.webp"
  },
  {
    name: "image10",
    src: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753497485/continental-batteries-logo.c535d913_xluirx.webp"
  },
   {
    name: "image11",
    src: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753497485/lanes-logo.07658caf_lkruqf.webp"
  },
  {
    name: "image12",
    src: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753497485/asea-logo.74123784_evbxl1.webp"
  },
]


export const termsSections = [
  {
    id: 'legal-disclaimer',
    title: 'LEGAL DISCLAIMER',
    content: `Kindly peruse these Terms and Conditions with utmost care. They oversee your entry to and utilization of this Website. Your access or usage of this Website signifies your consent to abide by these Terms and Conditions and any supplementary guidelines, limitations, or regulations that might be published concerning specific sections or amenities of this Website. All additional posted guidelines, limitations, or regulations are henceforth integrated by reference into these Terms and Conditions.

Timpackaging.com™ reserves the liberty to alter this Website and these Terms and Conditions at any juncture without prior notification. It is recommended to review these Terms of Use whenever you visit this Website.`
  },
  {
    id: 'copyright',
    title: 'COPYRIGHT',
    content: `Copyright (c) 2017 Timpackaging.com™. All rights reserved. It is strictly forbidden to replicate or republish any of the materials and software hosted on the Timpackaging.com website.`
  },
  {
    id: 'copyrights-trademarks',
    title: 'COPYRIGHTS AND TRADEMARKS',
    content: `You bear sole responsibility for your utilization of Content along with any other images, graphics, text, or other materials you integrate into your Products. You undertake not to incorporate any text, image, design, trademark, service mark, or any copyrighted work of any third party in your Products without acquiring the requisite authorizations from the proprietors. You assure that your Products refrain from infringing upon any rights of any third party, encompassing copyright, trademark, the right of publicity or privacy, and will refrain from defaming any third party. By placing an order on this Website, you assure that you possess all necessary permissions, rights, and authority to place the order and you authorize Timpackaging.com™ to produce the Products on your behalf.`
  },
  {
    id: 'customer-content',
    title: 'CUSTOMER CONTENT',
    content: `You are singularly accountable for your use of Content amalgamated with any other images, graphics, text, or other materials you incorporate into your Products. You commit not to include any text, image, design, trademark, service mark, or any copyrighted work of any third party in your Products unless you have obtained the suitable authorizations from the proprietors. You warrant that your Products avoid infringing upon any rights of any third party, encompassing copyright, trademark, the right of publicity or privacy, and will not libel or defame any third party. You assert that you possess all requisite rights or permissions necessary to incorporate third party material into your Products. By placing an order on this Website, you affirm that you have all necessary permission, right, and authority to place the order and you empower Timpackaging.com™ to produce the Products on your behalf.

Every piece of information, data, text, photographs, graphics, messages, and any other materials ('Content') is the solitary responsibility of the person who generated such Content. Consequently, you are accountable for all Content that you dispatch, upload, post, or otherwise transmit via the website. You consent to adhere to all local regulations regarding online conduct and acceptable Content. You undertake not to utilize the website to upload, post, or otherwise transmit any Content that comprises indecent, illegal material, or any content that infringes the intellectual property rights or other proprietary rights of timpackaging.com™ or any third party. Timpackaging.com™ does not oversee the Content posted by Customers and does not warrant the accuracy, integrity, or quality of the Content. Under no circumstances will Timpackaging.com™ be liable to you in any manner for any Content you may be exposed to that you may find offensive, indecent, or objectionable.

You agree that you are responsible for safeguarding your password and controlling access to your registered account. You pledge to be accountable for all orders placed or other actions taken under your registered account. When you, or someone to whom you have granted access, orders a print item using your password, you grant Timpackaging.com™ the worldwide, royalty-free, and non-exclusive license to utilize, reproduce, sublicense, modify, adapt, publish, display, and create derivative works from the Content on the website and on the printed product for the purposes of storing designs or processing print orders.

You acknowledge that Timpackaging.com™ and its designees retain the right (but not the obligation) in their sole discretion to eliminate any Content that breaches the terms of service or may otherwise be objectionable. Timpackaging.com™ may retain Content and may also divulge Content if mandated to do so by law or if such disclosure is necessary to: (a) comply with legal process; (b) enforce the terms of service; (c) respond to claims that the Content breaches the rights of third parties; or (d) safeguard the rights, property, or personal safety of Timpackaging.com™, its users, and the public.`
  },
  {
    id: 'design-files',
    title: 'DESIGN FILES',
    content: `Custompackaging.com™ will solely furnish design files at 72 DPI (low resolution). Should you desire to procure higher resolution designed files, please contact support@custompackaging.com for a quotation.`
  },
  {
    id: 'customer-submitted-artwork',
    title: 'CUSTOMER SUBMITTED ARTWORK',
    content: `All artwork or designs and images must be submitted in CMYK format and with a minimum resolution of 300 DPI. custompacking.com™ disclaims responsibility for any color alterations that arise in conversions from RGB to CMYK color modes. Additionally, Timpackaging.com™ disclaims responsibility for images printed as fuzzy, distorted, or pixilated due to customer-provided artwork.`
  },
  {
    id: 'proofing-matching',
    title: 'PROOFING & MATCHING',
    content: `All print jobs mandate customer approval of the final artwork and job specification sheet. Post order placement, final artwork proofs and a job specification sheet will be dispatched to customers via email. Customers are liable for reviewing all details stipulated in the specification sheet, including but not restricted to, delivery dates and/or production speed, and confirming that all customer requirements have been accurately noted. Timpackaging.com™ disclaims liability for any specifications and requirements beyond what is delineated in the final specification sheet. Moreover, it is incumbent upon the customer to review the final artwork proof as proofreading is the customer's responsibility. Due to the myriad ways that files are prepared, unplanned changes may occur. The final proof depicts what will be printed. Timpackaging.com™ earnestly recommends that the proof be printed out at 100% to verify actual position, spelling, and other design elements. Timpackaging.com™ will not be liable for any design or spelling issues that remain unidentified by the customer and relayed to Timpackaging.com immediately. Upon approval, the design file and job specifications will be forwarded to the production department and printed as is.

Custompackaging.com™ disclaims liability for color matching or ink density on screen proofs approved by the customers. Screen proofs prognosticate design layout, text accuracy, image proportion, and placement, but not color or density. Timpackaging.com™ will endeavor to match the gradient density of each color in duo-tone. Timpackaging.com™ disclaims liability for the final appearance of a duo-tone unless the customer requests a color match proof. Furthermore, application of lamination may impact or alter the appearance of the printed colors.

custompackaging.com™ disclaims liability for the final color appearance of laminated product/s.`
  },
  {
    id: 'materials',
    title: 'MATERIALS',
    content: `Kindly note that the paper/card stock employed for printing for our products is not food grade. Any such requirement should be promptly communicated in writing. If you have any specific food grade requirement regarding paper stock, please apprise us before placing your order.`
  },
  {
    id: 'customer-responsibility',
    title: 'CUSTOMER IS RESPONSIBLE FOR PROOF AND LAYOUT APPROVAL PRIOR TO PRINTING.',
    content: `Custom.com™ is NOT LIABLE for errors in a printed product attributable to any of the following:

- Graphics Orientation or Placement and Incorrect Font Usage
- Spelling, Grammatical, and Punctuation Errors
- Wrong Die cuts, slits, or Incorrect and Missing Folds
- Finished Product Size`
  },
  {
    id: 'color-accuracy',
    title: 'COLOR ACCURACY AND HARDCOPY PROOFS',
    content: `Timpackaging.com™ will replicate color from submitted print-ready files as closely as feasible. Nonetheless, Timpackaging cannot warrant color match and color density owing to limitations in the printing processes, diverse properties of various printing surfaces, as well as neighboring image ink requisites. The accuracy of color reproductions is assured to be within 90% of the final proof you sanctioned. Kindly note that Timpackaging can only guarantee color reproduction for your print-ready files if you opt for a hardcopy proof for an additional charge. Furthermore, please note that Timpackaging is not liable for color disparities between submitted print-ready images and the actual artwork or product they depict.`
  },
  {
    id: 'indemnity',
    title: 'INDEMNITY',
    content: `You consent to indemnify and defend Timpackaging.com™ and all parties from whom Timpackaging.com™ has licensed portions of Content, along with their directors, officers, and employees, against all claims, liability, damages, costs, and expenses, encompassing reasonable legal fees and expenses, arising out of or related to (i) your breach of these Terms and Conditions or (ii) any suit, claim, or demand arising from or relating to any text, photograph, image, graphics, or other material you incorporated into Products that was not part of the standard Site Content.`
  },
  {
    id: 'order-cancellation',
    title: 'ORDER CANCELLATION',
    content: `Timpackaging.com™ will cancel your order prior to printing/shipping. Nonetheless, if your ordered item has been shipped then it cannot be canceled. Orders may be cancelable during various production stages but cancellation charges will apply. Our Customer Service Team will apprise you of any cancellation charges.

All orders are cancelable before stage 2. Should an order be canceled in stage 1, you will incur a charge of $15 plus 5% of the total amount to cover payment processing, bank charges, and our design department fees. For orders canceled in stage 2, a minimum of 20% of the total order amount is deducted as cancellation fees to cover our design department's charges. Once an order enters stage 3, we may endeavor to cancel the order, but we cannot guarantee order cancellation. However, should the order still be in stage 3 and you wish to have it canceled; a minimum of 50% of the total order amount is deducted to cover expenses. Once an order reaches stage 4, it becomes non-cancellable.

Orders are placed online.
Orders are reworked in our design department.
Orders are sent to the press.
Orders are collected by the shipping firm and shipped.`
  },
  {
    id: 'design-orders',
    title: 'DESIGN ORDERS',
    content: `Once an order has been successfully placed, No Refunds are issued for any design services orders.`
  },
  {
    id: 'returns-refunds',
    title: 'RETURNS AND REFUNDS',
    content: `Given that all orders are unique, All Sales Are Final. If we verify that we made an error, we will re-print the order. No Refunds or Credits.`
  },
  {
    id: 're-prints',
    title: 'RE-PRINTS',
    content: `The customer must notify Timpackaging.com™ within 3 business days of order delivery of any defects, damage, or missing items discovered in the delivered products. Timpackaging.com™ will not be responsible for any claims for defects, damage, or missing items that are not filed within 3 business days of the delivery date.

In order to receive replacement products, the customer must return (at their own expense) at least 99% of the received product within 10 days of the initial order delivery date. No returns will be accepted without the prior written return authorization from Timpackaging.com™.

All charges related to expedite printing (rush printing or shipping) are NOT REFUNDABLE, including those orders that are returned for any reason. No Exceptions.`
  },
  {
    id: 'order-shipping-delivery',
    title: 'ORDER SHIPPING AND DELIVERY',
    content: `Timpackaging.com™ offers the following product options when placing an order:

In all cases, final proof approval must be received by 11:00 AM EST otherwise one business day will be added to the shipping times.

Timpackaging.com™ will always endeavor to print and ship orders promptly. Under no circumstance shall Timpackaging.com™ be liable for any consequences or damages resulting from any delay in the production, shipping, or delivery of the ordered products

All Timpackaging.com™ customers agree not to hold Timpackaging.com™ liable for delays in shipments caused by technical issues, weather conditions, shipping company delays, international customs issues, or any other circumstances beyond Timpackaging.com™'s direct control. Timpackaging.com™ shipment and delivery dates are calculated based upon estimates provided by our suppliers and recent order history.

Timpackaging.com™ will always strive to ensure that delivery schedules are met. Nevertheless, unforeseen equipment failure, malfunction, or technical problems may impede the printing or shipping processes. In the event of delays in the printing or shipping processes, rush charges or expedite fees will be refunded or waived where applicable. Orders cannot be annulled due to delays in the printing or shipping processes.

All Timpackaging.com™ customers undertake to settle all customs duties and fees on the goods that are shipped to their respective locations. It is incumbent upon the customers to make arrangements to clear customs for shipments delivered outside the United States.

Timpackaging endeavors to provide optimal quality and competitive pricing to our esteemed customers. Thus, we, at Timpackaging, are committed to furnishing top-notch quality at competitive prices. Therefore, we have production facilities across the globe, ensuring accessibility and affordability for our patrons. Our production units operate worldwide, with a notable presence in South Asia, where quality and competitive pricing are always assured, and shipping incurs no additional charges.

STANDARD (Shipping Time NOT GUARANTEED):
- Free Ground shipping within 48 contiguous states.
- Usually Ships within 10 to 14 business days after final proof approval.
- Shipping time for Standard Service is not guaranteed.

PRIORITY - Guaranteed to ship within 8 business days
- Free Ground shipping included within 48 contiguous states.
- Products will be shipped within 8 business days after final proof approval

EXPRESS - Guaranteed to ship within 6 business days
- FREE Ground shipping included within 48 contiguous states.
- Products will be shipped within 6 business day after final proof approval`
  },
  {
    id: 'holidays',
    title: 'HOLIDAYS',
    content: `Timpackaging observes the following holidays:

- New Year Day (January 1st)
- Martin Luther King Day
- President Day
- Memorial Day
- Independence Day (July 4th)
- Labor Day
- Columbus Day
- Veterans Day
- Thanksgiving Day
- Day after Thanksgiving Day
- Christmas Eve (December 24th)
- Christmas Day (December 25th)`
  },
  {
    id: 'damaged-lost-packages',
    title: 'DAMAGED AND LOST PACKAGES',
    content: `Customers are responsible for inspecting all packages for any visible signs of damage or missing items (when compared to the items listed on the enclosed packaging slips or invoices) before accepting delivery. In case of damage or missing items, customers should promptly notify Timpackaging.com™ and the delivery courier. Timpackaging.com™ will not be responsible for any damage or missing items claims that are not filed by the customer within 3 business days of order delivery. Timpackaging.com™ disclaims responsibility for 3rd party shipping errors, omissions, or damaged shipments.

Each ordered product is typically shipped with a few extra pieces that are provided free of charge. Occasionally, order shipments may contain slightly fewer pieces than ordered. Printing trade standards permit for underages or overages of up to 5%. Consequently, if the precise quantity is essential, customers are advised to order 10% over the required quantity.

Additional shipping and handling charges will be levied for packages that necessitate reshipment due to customer errors in submitting the proper shipping address.`
  },
  {
    id: 'disclaimer-warranty',
    title: 'DISCLAIMER OF WARRANTY',
    content: `The site and its content are provided 'as is' without warranty of any kind, either expressed or implied, encompassing warranties of merchantability, fitness for a particular purpose, or non-infringement. You acknowledge that operation of the site may not be uninterrupted or error-free. References and links to products or services of independent companies may appear on the site. These references and links are provided 'as is' without warranty of any kind, either expressed or implied.`
  },
  {
    id: 'limitation-liability',
    title: 'LIMITATION OF LIABILITY',
    content: `In no event shall Timpackaging.com or its licensors, suppliers, or vendors, their officers, directors, employees, or agents be liable for any special, incidental, indirect, or consequential damages of any kind, or for any damages whatsoever resulting from loss of use, data, or profits, whether or not Timpackaging.com has been advised of the possibility of damage, arising out of or in connection with the use or performance of the site or of failure to provide products or services that you order from Timpackaging.com or its affiliates, including without limitation, damages arising from mistake, omission, virus, delay, or interruption of service. In no event shall Timpackaging.com be liable or responsible for any damages or consequences arising from or related to your inappropriate or unauthorized use of this site or its content.`
  }
];



export const benefitsImages = [
  {
    name: "image1",
    src: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753702586/100-free-shipping-icon-1_zjjby6.webp"
  },
  {
    name: "image2",
    src: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753702586/customer-support-icon-1_qcjnaa.webp"
  },
  {
    name: "image3",
    src: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753702585/free-flat-3d-view-icon-1_nalimm.webp"
  },
  {
    name: "image4",
    src: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753702585/free-one-colour-printing-icon-1_kxdcru.webp"
  },
  {
    name: "image5",
    src: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753702585/free-design-support-icon-1_yxhomh.webp"
  },
  {
    name: "image6",
    src: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753702585/quick-turnaroung-time-icon-1_djfb8m.webp"
  },
  {
    name: "image7",
    src: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753702585/get-instant-quotation-icon-1_bbwvsv.webp"
  },
  {
    name: "image8",
    src: "https://res.cloudinary.com/dfnjpfucl/image/upload/v1753702585/no-die-plate-charges-icon-1_ktblzz.webp"
  },
]


export const formDetails = {
  productType: [
    "Apparel Box", 
    "Bakery Box",
    "Mailer Box",
    "Rigid Box",
    "Pizza Box",
    "Cosmetic Box",
    "Gift Box", 
    "Pillow Box", 
    "Candle Box", 
    "Soap Box", 
    "Display Box",
    "Mylar Bag", 
    "CBD", 
    "Cigarette",
    "Others"
  ],
  size : [
    "Inches", "CM",  "MM"
  ],
  color: [
    "No Printing",
    "Color 1",
    "Color 2",
    "Color 3",
    "Color 4",
  ]
}


export const privacySections = [
  {
    id: 'privacy-and-security',
    title: 'PRIVACY AND SECURITY',
    content: `At Custom Pack boxes, safeguarding our customers' privacy is paramount. We uphold strict confidentiality standards and do not trade, sell, or disclose any client information to third parties unless necessary for processing and delivering orders.`
  },
  {
    id: 'registration',
    title: 'REGISTRATION',
    content: `To access Custom Pack boxes services, users must complete a registration form, providing their name and email address. This data enables us to reach out regarding our services, irrespective of whether they've made a purchase.`
  },
  {
    id: 'order',
    title: 'ORDER',
    content: `When placing an order, users are prompted to furnish contact details (such as name, email, and shipping address) and financial particulars (like credit card information). This ensures smooth credit card authorization and order fulfillment. Should any hiccups arise during processing, we rely on this information to communicate with the user promptly.`
  },
  {
    id: 'cookies',
    title: 'COOKIES',
    content: `Utilizing persistent cookies, both My Custom Pack boxes and the Custom Pack Boxes order section employ these to uniquely identify users, link user files with orders, and facilitate the shopping experience. Please note that our site necessitates cookies for optimal functionality.`
  },
  {
    id: 'log-files',
    title: 'LOG FILES',
    content: `In line with standard website practices, we utilize log files to analyze trends, administer the site, and aggregate user movement data. However, this information remains unlinked to personally identifiable details.`
  },
  {
    id: 'communications',
    title: 'COMMUNICATIONS FROM THE SITE',
    content: `Special Offers and Updates: Occasionally, established members receive updates on products, services, and exclusive deals. However, users have the autonomy to opt out of these communications at any time.

Newsletter: Upon registration, customers are automatically subscribed to our newsletter, but we provide an opt-out option to respect user privacy preferences.

Customer Service: We maintain regular communication with users to address service requests, utilizing email and phone channels to resolve issues related to ongoing orders.`
  },
  {
    id: 'legal-disclaimer',
    title: 'LEGAL DISCLAIMER',
    content: `While committed to preserving user privacy, we may be obligated to disclose personal information as mandated by law, ensuring transparency and compliance.`
  },
  {
    id: 'third-parties',
    title: 'THIRD PARTY INTERMEDIARIES',
    content: `We engage external shipping and credit card processing companies, which handle user data exclusively for the intended purposes without retention or secondary usage.`
  },
  {
    id: 'business-transitions',
    title: 'BUSINESS TRANSITIONS',
    content: `In scenarios like mergers or acquisitions, users' personal information may be transferred as part of the assets. However, users will be duly notified of any changes affecting data usage.`
  },
  {
    id: 'choice-opt-out',
    title: 'CHOICE / OPT-OUT',
    content: `Users are provided with clear opt-out mechanisms to exclude their information from non-essential marketing communications.`
  },
  {
    id: 'links',
    title: 'LINKS',
    content: `While our site may contain links to external platforms, we advise users to review the privacy policies of these sites independently, as we hold no responsibility for their practices.`
  },
  {
    id: 'security',
    title: 'SECURITY',
    content: `Employing stringent measures, our website ensures the encryption of sensitive information both online and offline, guaranteeing the utmost protection of user data.`
  },
  {
    id: 'notification-of-changes',
    title: 'NOTIFICATION OF CHANGES',
    content: `Any alterations to our privacy policy will be promptly communicated to users via email and prominently displayed on our website, ensuring transparency and user awareness.

If any changes occur in how we handle personally identifiable information that do not affect data already stored in our system, we'll provide clear notification on our website and through email communication. Users will have the choice to opt-in or opt-out of the revised practices.

Should users opt-out of communication or deactivate their accounts, their personal information will be respected and not utilized in any new manner.

In addition, any significant modifications to our privacy practices will be prominently announced on our website to ensure users are kept informed about how their information is collected, used, and under what circumstances it may be disclosed.`
  }
];
