"use client";

import { Container } from "@/components/layout";

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-24 md:py-32 bg-[#111111]"
      aria-label="About"
    >
      <Container>
        <p className="text-[0.7rem] font-body tracking-[0.4em] text-[#666666]">
          The Brand
        </p>
        <h2
          className="mt-2 font-display font-light text-[#E8E8E8] tracking-tight md:text-4xl"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
          }}
        >
          The embodiment of <span className="italic text-[#AAAAAA]">refined vision</span>
        </h2>
        <p
          className="mt-6 max-w-2xl text-[#999999] font-body text-[0.95rem]"
          style={{ lineHeight: 1.9 }}
        >
          Elaris is a culmination of over 60 years of optical mastery and cutting-edge Japanese innovation. Every lens is a fusion of clarity, craftsmanship, and advanced multi-layer coatings, delivering unmatched precision and elegance. Designed for the discerning eye, Elaris redefines luxury in everyday vision.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="border border-[#2A2A2A] bg-[#161616] p-6" style={{ borderWidth: "0.5px" }}>
            <p className="font-body text-[0.7rem] tracking-[0.3em] text-[#666666]">Unwavering Quality</p>
            <p className="mt-2 text-[0.9rem] font-body text-[#AAAAAA] leading-relaxed">
              Each lens is manufactured to meet the highest global benchmarks in optical quality and safety.
            </p>
          </div>
          <div className="border border-[#2A2A2A] bg-[#161616] p-6" style={{ borderWidth: "0.5px" }}>
            <p className="font-body text-[0.7rem] tracking-[0.3em] text-[#666666]">Certified Precision</p>
            <p className="mt-2 text-[0.9rem] font-body text-[#AAAAAA] leading-relaxed">
              Rigorously tested for optical accuracy, coating durability, and lens transparency.
            </p>
          </div>
          <div className="border border-[#2A2A2A] bg-[#161616] p-6" style={{ borderWidth: "0.5px" }}>
            <p className="font-body text-[0.7rem] tracking-[0.3em] text-[#666666]">Future-Ready</p>
            <p className="mt-2 text-[0.9rem] font-body text-[#AAAAAA] leading-relaxed">
              Built for today&apos;s fast-paced world — sleek, high-performing, and uncompromising in quality.
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-[#2A2A2A] pt-12" style={{ borderTopWidth: "1px" }}>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <p className="font-display text-2xl font-light text-[#E8E8E8]" style={{ fontFamily: "var(--font-display)" }}>
                60+
              </p>
              <p className="mt-1 text-[0.7rem] font-body tracking-[0.4em] text-[#666666]">Years of Mastery</p>
            </div>
            <div>
              <p className="font-display text-2xl font-light text-[#E8E8E8]" style={{ fontFamily: "var(--font-display)" }}>
                3
              </p>
              <p className="mt-1 text-[0.7rem] font-body tracking-[0.4em] text-[#666666]">Lens Series</p>
            </div>
            <div>
              <p className="font-display text-2xl font-light text-[#E8E8E8]" style={{ fontFamily: "var(--font-display)" }}>
                99%
              </p>
              <p className="mt-1 text-[0.7rem] font-body tracking-[0.4em] text-[#666666]">Light Transmission</p>
            </div>
            <div>
              <p className="font-display text-2xl font-light text-[#E8E8E8]" style={{ fontFamily: "var(--font-display)" }}>
                1
              </p>
              <p className="mt-1 text-[0.7rem] font-body tracking-[0.4em] text-[#666666]">Standard</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
