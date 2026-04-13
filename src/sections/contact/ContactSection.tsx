"use client";

import { Container } from "@/components/layout";
import { Glass } from "@/components/ui";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="py-24 md:py-32 bg-[#111111]"
      aria-label="Contact"
    >
      <Container className="relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className="font-display font-light text-[#E8E8E8] tracking-tight md:text-4xl"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
            }}
          >
            Contact
          </h2>
          <p className="mt-6 font-body text-[0.95rem] text-[#999999] leading-relaxed">
            Reach out for partnerships, bespoke fittings, or to learn more about Elaris precision optics.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Glass className="rounded-[12px] p-6 text-center">
            <p className="font-body text-[0.7rem] tracking-[0.4em] text-[#666666]">Headquarters</p>
            <p className="mt-2 font-body text-[#666666]">Stellarix Optics</p>
          </Glass>
          <Glass className="rounded-[12px] p-6 text-center">
            <p className="font-body text-[0.7rem] tracking-[0.4em] text-[#666666]">Email</p>
            <a
              href="mailto:hello@stellarix.com"
              className="mt-2 block font-body text-[#AAAAAA] transition-colors duration-300 hover:text-[#E8E8E8]"
            >
              hello@stellarix.com
            </a>
          </Glass>
          <Glass className="rounded-[12px] p-6 text-center sm:col-span-2 lg:col-span-1">
            <p className="font-body text-[0.7rem] tracking-[0.4em] text-[#666666]">Brand</p>
            <p className="mt-2 font-body text-[#AAAAAA]">Elaris by Stellarix</p>
          </Glass>
        </div>
      </Container>
    </section>
  );
}
