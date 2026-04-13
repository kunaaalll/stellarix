import dynamic from "next/dynamic";
import { Header, Footer, Loader, PageTransition, OpticalSectionLazy } from "@/components/layout";
import { HeroSection } from "@/sections/hero";
import { CollectionsLensSection } from "@/sections/products";

const sectionLoading = () => (
  <section className="min-h-[50vh] bg-[#111111]" aria-hidden />
);

const TechnologySection = dynamic(
  () => import("@/sections/technology").then((m) => ({ default: m.TechnologySection })),
  { ssr: true, loading: sectionLoading }
);

const AboutSection = dynamic(
  () => import("@/sections/about").then((m) => ({ default: m.AboutSection })),
  { ssr: true, loading: sectionLoading }
);

const ContactSection = dynamic(
  () => import("@/sections/contact").then((m) => ({ default: m.ContactSection })),
  { ssr: true, loading: sectionLoading }
);

export default function Home() {
  return (
    <>
      <Loader />
      <Header />
      <PageTransition>
        <HeroSection />
        <AboutSection />
        <OpticalSectionLazy />
        <CollectionsLensSection />
        <TechnologySection />
        <ContactSection />
      </PageTransition>
      <Footer />
    </>
  );
}
