import { HeroSection } from "@/components/ui/hero-section";
import { IntegracionesSection } from "@/components/ui/integraciones-section";
import { HeroScrollDemo } from "@/components/ui/hero-scroll-demo";
import { ValueProps } from "@/components/ui/value-props";
import { SistemasSection } from "@/components/ui/sistemas-section";
import { ComoFuncionaSection } from "@/components/ui/como-funciona-section";
import { PlanesSection } from "@/components/ui/planes-section";
import { TestimoniosSection } from "@/components/ui/testimonios-section";
import { NosotrosSection } from "@/components/ui/nosotros-section";
import { ContactSection } from "@/components/ui/contact-section";
import { Footer } from "@/components/ui/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <IntegracionesSection />
      <HeroScrollDemo />
      <ValueProps />
      <SistemasSection />
      <ComoFuncionaSection />
      <PlanesSection />
      <TestimoniosSection />
      <NosotrosSection />
      <ContactSection />
      {/* <Footer /> */}
    </main>
  );
}
