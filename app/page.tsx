import { HeroSection } from "@/components/ui/hero-section";
import { IntegracionesSection } from "@/components/ui/integraciones-section";
import { HeroScrollDemo } from "@/components/ui/hero-scroll-demo";
import { SistemasSection } from "@/components/ui/sistemas-section";
import { ComoFuncionaSection } from "@/components/ui/como-funciona-section";
import { PlanesSection } from "@/components/ui/planes-section";
import { TestimoniosSection } from "@/components/ui/testimonios-section";
import { NosotrosSection } from "@/components/ui/nosotros-section";
import { ContactSection } from "@/components/ui/contact-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <IntegracionesSection />
      <HeroScrollDemo />
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
