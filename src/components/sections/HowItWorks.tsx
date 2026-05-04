"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    step: "01",
    title: "Preencha o formulário",
    desc: "Informe seus dados e o perfil desejado (individual, PME ou empresarial). Leva menos de 2 minutos.",
  },
  {
    step: "02",
    title: "Receba as opções",
    desc: "Nossa equipe analisa as melhores coberturas e envia propostas personalizadas diretamente no seu WhatsApp.",
  },
  {
    step: "03",
    title: "Escolha e contrate",
    desc: "Compare as opções com nossa ajuda especializada e assine digitalmente. Sem burocracia e sem custo.",
  },
];

export function HowItWorks() {
  const scrollToForm = () => {
    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="como-funciona" className="py-20 lg:py-28 bg-porto-surface-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-porto-accent-light border border-porto-primary/20 rounded-full px-4 py-1.5 text-porto-primary text-xs font-semibold mb-4">
              Simples e rápido
            </div>
            <h2 className="font-porto text-3xl lg:text-4xl font-bold text-porto-text mb-4">
              Como funciona nosso atendimento
            </h2>
            <p className="text-porto-muted text-lg mb-8">
              Intermediamos sua contratação com a Porto Seguro sem nenhum custo adicional.
              Você tem acesso ao mesmo plano, com suporte especializado do início ao fim.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: "< 24h", label: "tempo de resposta" },
                { value: "100%", label: "gratuito para você" },
                { value: "5★", label: "atendimento" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="font-porto font-bold text-2xl text-porto-primary">{value}</p>
                  <p className="text-porto-muted text-xs mt-1">{label}</p>
                </div>
              ))}
            </div>

            <button
              onClick={scrollToForm}
              className="mt-8 inline-flex items-center gap-2 bg-porto-primary hover:bg-porto-primary-hover text-white font-bold px-8 py-4 rounded-lg transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-porto-primary/30"
            >
              Começar agora
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </motion.div>

          {/* Right — steps */}
          <div className="space-y-6">
            {STEPS.map(({ step, title, desc }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="flex gap-5"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-porto-primary flex items-center justify-center">
                  <span className="font-porto font-bold text-white text-sm">{step}</span>
                </div>
                <div className="pt-1">
                  <h3 className="font-porto font-bold text-porto-text text-lg mb-1">{title}</h3>
                  <p className="text-porto-muted text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
