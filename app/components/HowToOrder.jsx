const steps = [
  {
    number: 1,
    text: "Tell us the dimensions of your packaging & and all other requirements.",
  },
  {
    number: 2,
    text: "We convert your ideas into design & show you a 3D mock-up before production.",
  },
  {
    number: 3,
    text: "Once you approve the mock-up, we will send this to our production facility.",
  },
  {
    number: 4,
    text: "When production is completed, QA/QC team will inspect the quality of packaging.",
  },
  {
    number: 5,
    text: "Then we will ship those to your doorstep with our free shipping service.",
  },
];

export default function HowToOrder() {
  return (
    <section className="bg-white px-4 md:px-8 md:w-130 md:ml-20">
      <h2 className="text-3xl md:text-3xl pb-8 font-semibold text-center">
        How to <span className="text-red-themed font-bold">Order</span> From Us
      </h2>

      <div className="relative max-w-6xl mx-auto text-xs">
        {/* Vertical line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-2 border-gray-300 z-0" />

        <div className="space-y-4">
          {steps.map((step, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div key={index} className="relative flex flex-col md:flex-row items-center">
                {/* LEFT side bubble */}
                {isLeft && (
                  <>
                    <div className="w-full md:w-1/2 flex justify-end md:pr-6 z-10">
                      <div className="bg-gray-100 p-5 rounded-lg shadow-md max-w-sm">
                        <p className="text-gray-800">{step.text}</p>
                      </div>
                    </div>
                    <div className="hidden text-xs md:flex  md:items-center justify-center w-7 h-7 bg-red-themed text-white rounded-full font-bold absolute left-1/2 transform -translate-x-1/2 z-20">
                      {step.number}
                    </div>
                    <div className="w-0 md:w-1/2" />
                  </>
                )}

                {/* RIGHT side bubble */}
                {!isLeft && (
                  <>
                    <div className="w-0 md:w-1/2" />
                    <div className="hidden md:flex items-center justify-center w-7 h-7 bg-red-themed text-white rounded-full font-bold absolute left-1/2 transform -translate-x-1/2 z-20">
                      {step.number}
                    </div>
                    <div className="w-full md:w-1/2 flex justify-start md:pl-6 z-10">
                      <div className="bg-gray-100 p-5 rounded-lg shadow-md max-w-sm">
                        <p className="text-gray-800">{step.text}</p>
                      </div>
                    </div>
                  </>
                )}

                {/* Mobile-only step circle + block below */}
                <div className="md:hidden block mt-4">
                  <div className="w-8 h-8 bg-black text-white rounded-full font-bold flex items-center justify-center">
                    {step.number}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Optional bottom images */}
      </div>
        {/* <div className="mt-16 flex justify-center gap-10">
          <img src="https://res.cloudinary.com/dfnjpfucl/image/upload/v1753873406/f041eecce92dabea0d1022d1e46304c1.60e2_vd5ifu.webp" alt="Box" className="w-[40rem] h-auto" />
        </div> */}
    </section>
  );
}
