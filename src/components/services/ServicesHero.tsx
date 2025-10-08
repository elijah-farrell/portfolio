import { AuroraText } from "@/components/ui/magic/aurora-text";

export default function ServicesHero() {
  return (
    <section className="pt-32 pb-8 flex flex-col justify-center bg-white dark:bg-neutral-950 relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3 relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-left">
          My <AuroraText colors={["#34D399", "#10B981", "#059669", "#047857", "#065F46"]}>Services</AuroraText>
        </h1>
      </div>
    </section>
  );
}

