import React from "react";

const FinalCta = ({ midCta = false }) => {
  return (
    <div className="w-full bg-[#fef9f8] relative">
      {/* Warm Soft Coral & Cream */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(circle at 20% 80%, rgba(255, 160, 146, 0.25) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 244, 228, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(255, 160, 146, 0.15) 0%, transparent 50%)`,
          pointerEvents: "none",
        }}
      />
      <section className="">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6 z-20">
          <div className="mx-auto max-w-screen-lg text-center">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900">
              Design Your <span className="text-red-themed">Packaging</span>{" "}
              Without Spending a Dime
            </h2>
            <p className="mb-6 font-light text-gray-600 md:text-lg">
              We’ll turn your ideas into a professional custom box design for
              free. See it. Love it. Then decide if you want to move forward.
            </p>
<a href="#quote" className="cursor-pointer">
            <button
              className="
  group inline-flex items-center gap-2 cursor-pointer px-6 py-3 my-6 text-lg font-semibold rounded-full 
  text-white bg-red-themed border border-red-themed 
  hover:bg-transparent hover:text-red-themed hover:border-red-themed
  transition-all duration-300 ease-in-out
  shadow-md hover:shadow-lg
"
            >
              <span className="relative">
                Request Custom Box
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-themed transition-all group-hover:w-full"></span>
              </span>
              <svg
                className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-12"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FinalCta;
