import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { accordionData } from "../constant";

export default function FAQSection() {

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1500] mx-auto">
        <h2 className="text-5xl font-semibold tracking-tight text-center mb-8">
          Frequently Asked Questions
        </h2>

        <Accordion
          type="single"
          collapsible
          className="max-w-[1500] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 items-start"
        >
          {accordionData.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-2  border-red-themed data-[state=open]:border-none [&:last-child]:border-b-2"
            >
              <AccordionTrigger className="text-left cursor-pointer hover:no-underline px-6 py-4 data-[state=open]:bg-red-themed data-[state=open]:text-white rounded-none">
                <span className="text-sm font-medium">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 bg-gray-100 mt-3 py-4 text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
