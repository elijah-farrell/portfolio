import React, { useState } from "react";
import { SEO } from "@/components/seo/SEO";
import ServicesHero from "@/components/services/ServicesHero";
import WhatIDoCards from "@/components/services/WhatIDoCards";
import ContactCTA from "@/components/services/ContactCTA";
import ServicesModal from "@/components/services/ServicesModal";
import { TracingBeam } from "@/components/ui/aceternity/tracing-beam";

export default function Services(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <SEO
        title="Technical Services by Elijah Farrell – Web Development & Consulting"
        description="CS professional offering web development, backend services, and technical consulting. Let's build something together."
        keywords="web development, technical consulting, React, Python, backend development, CS professional"
        url="https://elijahfarrell.com/services"
      />
      
      <ServicesHero />
      
      <section id="what-i-do" className="pt-8 pb-12 bg-white dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <TracingBeam className="px-6">
            <WhatIDoCards />
          </TracingBeam>
        </div>
      </section>
      
      <ContactCTA onGetStarted={() => setIsModalOpen(true)} />
      
      <ServicesModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
