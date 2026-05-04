"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

const HEADLINE_WORDS = ["Plano", "de", "Saúde", "Porto", "Seguro:", "proteja", "quem", "importa."];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const wordVariant = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  }),
};

export function Hero() {
  useEffect(() => {
    const bar = document.getElementById("scroll-progress");
    if (!bar) return;
    const update = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      bar.style.width = `${Math.min(pct * 100, 100)}%`;
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const scrollToForm = () => {
    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden porto-hero-bg"
      aria-label="Hero — Planos Porto Seguro Saúde"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 lg:pt-32 lg:pb-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — text + CTA */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-1.5 text-white/90 text-xs font-medium mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Design System · Componentes e Tokens Porto Saúde
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="font-porto text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 lg:mb-6 tracking-tight"
            >
              Design System Porto Seguro Saúde
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              custom={0.65}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-white/75 text-base sm:text-lg lg:text-xl leading-relaxed mb-6 lg:mb-10 max-w-lg"
            >
              Tokens de design, componentes e padrões visuais que constroem a identidade da Porto Saúde.
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={0.8}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-3"
            >
              <button
                onClick={scrollToForm}
                className="porto-btn porto-btn--white"
              >
                Ver Componentes
              </button>
              <button
                className="porto-btn porto-btn--outline-white"
              >
                Ver Tokens
              </button>
            </motion.div>
          </div>

          {/* Right — visual card (desktop) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <img
              src="/assets/bh-saude-institucional_036a217aca6f.webp"
              alt="Médico do time PortoSaúde"
              className="w-full max-w-[480px] rounded-xl block shadow-2xl mx-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
