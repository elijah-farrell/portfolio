import { AuroraTextEffect } from "@/components/ui/lightswind/aurora-text-effect";

export default function ServicesHero() {
  return (
    <section className="pt-32 pb-8 flex flex-col justify-center bg-background relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3 relative z-10">
        <div className="flex items-baseline gap-4">
          <AuroraTextEffect
            text="My Services"
            textClassName="text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
            fontSize="clamp(2.25rem, 5vw, 4.5rem)"
            colors={{
              first: "bg-emerald-300",
              second: "bg-emerald-400",
              third: "bg-emerald-500",
              fourth: "bg-emerald-600",
            }}
            blurAmount="blur-2xl"
          />
        </div>
      </div>
    </section>
  );
}

