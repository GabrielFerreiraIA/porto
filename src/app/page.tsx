import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { TrustBadges } from "@/components/sections/TrustBadges";
import { Benefits } from "@/components/sections/Benefits";
import { Plans } from "@/components/sections/Plans";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { LeadForm } from "@/components/sections/LeadForm";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBadges />
        <Benefits />
        <Plans />
        <HowItWorks />
        <LeadForm />
      </main>
      <Footer />

      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/5511999999999?text=Olá! Vi o site da Elih Seguros e gostaria de saber mais sobre planos Porto Seguro Saúde."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-fab"
        aria-label="Falar no WhatsApp"
      >
        <span className="icon-porto-ic-whatsapp text-3xl text-white"></span>
      </a>
    </>
  );
}
