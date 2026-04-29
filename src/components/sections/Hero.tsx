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
      className="relative min-h-screen flex items-center overflow-hidden porto-mesh-bg noise-overlay"
      aria-label="Hero — Planos Porto Seguro Saúde"
    >
      {/* Decorative blobs */}
      <motion.div
        className="absolute top-20 right-10 w-72 h-72 rounded-full bg-white/5 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-32 left-10 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 lg:pt-32 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — text + CTA */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-white/90 text-xs font-medium mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Correspondente Autorizado Porto Seguro · Cotação 100% gratuita
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="font-porto text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 lg:mb-6"
            >
              {HEADLINE_WORDS.map((word, i) => (
                <motion.span key={i} variants={wordVariant} className="inline-block mr-3">
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {/* Mobile image card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="block lg:hidden w-full rounded-2xl overflow-hidden mb-8 mt-2 bg-white/10 backdrop-blur-sm border border-white/20 p-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-porto font-bold text-lg">Porto Seguro Saúde</p>
                  <p className="text-white/70 text-sm">Cobertura nacional · Atendimento 24h</p>
                </div>
              </div>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              custom={0.65}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-white/75 text-base sm:text-lg lg:text-xl leading-relaxed mb-6 lg:mb-10 max-w-lg"
            >
              Compare e contrate os melhores planos Porto Seguro Saúde para pessoa física,
              MEI e empresas. Nossa equipe cuida de tudo, sem custo para você.
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={0.8}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={scrollToForm}
                className="cta-pulse inline-flex items-center justify-center gap-2 bg-white text-porto-primary font-bold text-base px-8 py-4 rounded-full shadow-2xl hover:bg-porto-surface-2 transition-all duration-200 hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Quero minha Cotação
              </button>
              <a
                href="https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre planos Porto Seguro Saúde."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white/40 text-white font-semibold text-base px-8 py-4 rounded-full hover:bg-white/10 hover:border-white transition-all duration-200"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Falar no WhatsApp
              </a>
            </motion.div>

            {/* Trust pills */}
            <motion.div
              custom={1.0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-3 mt-8"
            >
              {[
                { icon: "🔒", label: "Dados protegidos (LGPD)" },
                { icon: "⚡", label: "Resposta em minutos" },
                { icon: "✓", label: "Sem custo para você" },
              ].map(({ icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 text-white/70 text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1"
                >
                  <span>{icon}</span>
                  <span>{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — visual card (desktop) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
            style={{ perspective: 1200 }}
          >
            <motion.div
              className="relative"
              whileHover={{ rotateX: 3, rotateY: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Glow backdrop */}
              <div className="absolute inset-0 bg-white/10 rounded-3xl blur-2xl scale-110" />

              {/* Main card */}
              <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl">
                {/* Porto logo area */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center">
                    <span className="text-porto-primary font-porto font-bold text-sm">PS</span>
                  </div>
                  <div>
                    <p className="text-white font-porto font-bold text-lg leading-tight">Porto Seguro</p>
                    <p className="text-white/70 text-sm">Saúde · Planos Empresariais</p>
                  </div>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { value: "500+", label: "cidades cobertas" },
                    { value: "24h", label: "atendimento urgência" },
                    { value: "98%", label: "satisfação dos clientes" },
                    { value: "100%", label: "nacional" },
                  ].map(({ value, label }) => (
                    <div key={label} className="bg-white/10 rounded-2xl p-4">
                      <p className="text-white font-porto font-bold text-2xl">{value}</p>
                      <p className="text-white/60 text-xs mt-1">{label}</p>
                    </div>
                  ))}
                </div>

                {/* CTA inside card */}
                <button
                  onClick={scrollToForm}
                  className="w-full bg-white text-porto-primary font-bold py-3 rounded-xl text-sm hover:bg-porto-accent-light transition-colors"
                >
                  Ver planos disponíveis →
                </button>
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-porto-accent-light rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-porto-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <div className="text-porto-text font-bold text-sm">Regulado ANS</div>
                  <div className="text-porto-muted text-xs">nº 326305</div>
                </div>
              </motion.div>

              {/* Floating badge top right */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="absolute -top-4 -right-4 bg-porto-primary text-white rounded-2xl shadow-xl p-3 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <div className="font-bold text-sm">Todo o Brasil</div>
                  <div className="text-white/80 text-xs">rede credenciada</div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40"
      >
        <span className="text-xs">Role para ver</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
