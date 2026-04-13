"use client";

import { Container } from "@/components/layout";

const CORE_PROPERTIES = [
  {
    title: "Super Hydrophobic Shield",
    description: "High-performance water-repellent layer that prevents droplets from clinging, keeping lenses effortlessly clear.",
  },
  {
    title: "UV & Blue Light Protection",
    description: "Blocks harmful UV rays and high-energy blue light, while allowing beneficial light to pass — promoting eye comfort and supporting natural sleep rhythms.",
  },
  {
    title: "Premium Scratch Resistance",
    description: "Reinforced multi-layer coating ensures durability and long-term clarity, even with daily use.",
  },
  {
    title: "Smudge-Resistant Surface",
    description: "Advanced oleophobic coating repels fingerprints and oil for a consistently pristine appearance.",
  },
  {
    title: "Anti-Static Technology",
    description: "Prevents dust and micro-particles from settling, keeping lenses cleaner for longer.",
  },
  {
    title: "Consistent Optical Power",
    description: "Engineered for lasting prescription accuracy with zero distortion or fluctuation.",
  },
];

const BLI_PLUS = {
  title: "BLI+™ Blue Light Filtering",
  description: "Advanced lens filtering that selectively blocks harmful blue light from digital devices and LED headlights, easing visual strain and supporting long-term eye wellness.",
};

export function TechnologySection() {
  return (
    <section
      id="technology"
      className="py-24 md:py-32 bg-[#161616]"
      aria-label="Technology"
    >
      <Container>
        <h2
          className="font-display font-light text-[#E8E8E8] tracking-tight mb-4"
          style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
        >
          Core Lens Technology
        </h2>
        <p className="mb-12 max-w-2xl text-[#999999] font-body text-[0.95rem] leading-relaxed">
          Every Elaris lens is treated with ultra-premium multi-layer coatings that enhance performance, durability, and aesthetics.
        </p>

        {/* BLI+™ highlight */}
        <div
          className="mb-8 rounded-[12px] border border-[#E8E8E8] bg-[#E8E8E8] p-8 text-[#111111]"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="inline-block rounded-[4px] bg-[#3B82F6] px-3 py-1 text-[0.7rem] font-body font-medium tracking-[0.2em]">
              BLI+™
            </span>
            <h3 className="font-body text-base font-medium">
              {BLI_PLUS.title}
            </h3>
          </div>
          <p className="text-[0.95rem] font-body text-[#333333] leading-relaxed">
            {BLI_PLUS.description}
          </p>
        </div>

        {/* Core properties grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CORE_PROPERTIES.map((item) => (
            <div
              key={item.title}
              className="border border-[#2A2A2A] bg-[#161616] p-8 transition-all duration-300 hover:border-[#333333] hover:bg-[#111111]"
              style={{ borderWidth: "0.5px" }}
            >
              <svg
                className="mb-4 h-8 w-8 text-[#E8E8E8]"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.2}
                viewBox="0 0 24 24"
                style={{ opacity: 0.7 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-body text-base font-medium text-[#E8E8E8]">
                {item.title}
              </h3>
              <p className="mt-2 text-[0.95rem] font-body text-[#999999] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
