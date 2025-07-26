import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { specificationTabs } from "../constant";
import Image from "next/image";

const SpecificationTabs = () => {
  return (
    <section className=" py-[6rem] md:py-16">
      <div className="container-big">
        <Tabs defaultValue={specificationTabs[0].heading}>
          <TabsList className={"mx-auto w-auto bg-transparent grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-[11rem] sm:mb-[5rem] md:mb-0 gap-4 md:gap-12"}>
            {specificationTabs.map((tabs, index) => (
              <TabsTrigger
                key={index}
                value={tabs.heading}
                className={'border-r data-[state=active]:bg-red-themed hover:bg-red-themed hover:text-white transition-all duration-300 cursor-pointer md:text-lg data-[state=active]:text-white flex flex-col px-3 py-3'}
              >
                {tabs.heading}
              </TabsTrigger>
            ))}
          </TabsList>
          {specificationTabs.map((tabs, index) => (
            <TabsContent key={index} value={tabs.heading} className={"border-t-2 pt-8 md:pt-1 border-red-themed mt-10"}>
              <h2 className="text-3xl lg:text-[2.8rem] text-text-black font-semibold text-center my-4">{tabs.heading}</h2>
              {tabs.description.map((desc, descIndex) => (
                <p key={descIndex} className="text-center block mb-4">{desc}</p>

              ))}
              <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-6 mt-6">
                {tabs.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="bg-gray-100 hover:shadow-2xl transition-all duration-300">
                    <Image
                      src={option.image}
                      alt={option.name}
                      width={300}
                      height={300}
                    />
                    <h3 className="text-center py-3 text-lg font-semibold">{option.name}</h3>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default SpecificationTabs;