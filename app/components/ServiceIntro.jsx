import { serviceIntro } from "../constant";

export default function ServiceIntro() {
  const { heading, description, features, projectDelivered } = serviceIntro;
  return (
    <section className="bg-[#f2e6e6] relative py-10 md:py-16 mb-24 lg:mb-40 md:px-16">
      <div className="container mx-auto">
        <div className="items-center justify-between mb-32 flex flex-col md:flex-row gap-10">
          {/* Left Content */}
          <div className="md:w-[50%]">
            <h2 className="text-3xl md:text-4xl font-semibold text-black mb-6">
              {heading}
            </h2>
            <p className="text-gray-700 text-base leading-relaxed">
              {description}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-center gap-12">
            {features.map((feature, index) => {
              let Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md lg:w-[18rem] p-8 flex items-center gap-3 hover:shadow-lg transition"
                >
                  <Icon className="text-red-themed text-xl" />
                  <span className="text-red-themed text-sm font-semibold">
                    {feature.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="projects relative lg:absolute  md:py-10 lg:-bottom-12 shadow-lg w-full lg:w-[80%]  lg:left-1/2 lg:-translate-x-1/2 mx-auto mt-10 bg-white">
          <div className="grid relative place-items-center grid-cols-1 md:grid-cols-4">
            {projectDelivered.map((project, index) => {
                let Icon = project.icon;
              return (
                <div key={index} className="flex flex-col md:flex-row items-center gap-4 p-4">
                  <Icon className="text-red-themed text-4xl md:text-5xl" />
                    <div className="flex flex-col items-center gap-3">
                        <h3 className="text-2xl lg:text-4xl font-semibold text-black">
                        {project.title} <span className="text-red-themed">+</span>
                        </h3>
                        <p className="text-gray-600 text-sm lg:text-xl">{project.description}</p>
                        </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
