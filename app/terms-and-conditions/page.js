import { CategoryHero } from '../components';
import { termsSections } from '../constant';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8">
        <CategoryHero name={"Terms and Conditions"} imageSrc={""}/>

      <div className="container mx-auto shadow-md rounded-lg overflow-hidden">
        

        <div className="p-6">
          <div className="space-y-10">
            {termsSections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-20">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{section.title}</h2>
                <div className="prose prose-sm sm:prose-xl  max-w-none text-gray-600">
                  {section.content.split('\n').map((paragraph, i) => (
                    <p key={i} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}