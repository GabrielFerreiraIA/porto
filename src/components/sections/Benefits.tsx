"use client";

import { motion } from "framer-motion";

const BENEFITS = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "Ampla Rede Credenciada",
    desc: "Acesso a hospitais, clínicas, laboratórios e médicos em todo o Brasil, com mais de 32 mil prestadores.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: "Gestão de Saúde",
    desc: "Programa de bem-estar e prevenção para os colaboradores da sua empresa, reduzindo custos e sinistralidade.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: "App Porto Saúde",
    desc: "Agende consultas, acesse a carteirinha digital, encontre prestadores e acompanhe autorizações pelo app.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    title: "Central 24 Horas",
    desc: "Orientação médica por telefone 24 horas por dia, 7 dias por semana, inclusive nos fins de semana e feriados.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
    title: "Assistência em Viagem",
    desc: "Cobertura de urgência e emergência durante viagens em todo o território nacional, com reembolso facilitado.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title: "Planos Flexíveis",
    desc: "Do MEI e pequenas empresas até grandes corporações, temos planos adaptados a cada tamanho e orçamento.",
  },
];

export function Benefits() {
  return (
    <section id="benefícios" className="py-20 lg:py-28 bg-porto-surface-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-porto-accent-light border border-porto-primary/20 rounded-full px-4 py-1.5 text-porto-primary text-xs font-semibold mb-4">
            Por que Porto Seguro Saúde?
          </div>
          <h2 className="font-porto text-3xl lg:text-4xl font-bold text-porto-text mb-4">
            Tudo que você precisa em um plano
          </h2>
          <p className="text-porto-muted text-lg max-w-2xl mx-auto">
            A Porto Seguro oferece um ecossistema completo de soluções, com ampla rede e
            atendimento de qualidade para sua empresa.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map(({ icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-porto-surface rounded-xl p-6 border border-porto-border hover:border-porto-primary/30 hover:shadow-lg hover:shadow-porto-primary/5 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-porto-accent-light flex items-center justify-center text-porto-primary mb-4 group-hover:bg-porto-primary group-hover:text-white transition-all duration-300">
                {icon}
              </div>
              <h3 className="font-porto font-bold text-porto-text text-lg mb-2">{title}</h3>
              <p className="text-porto-muted text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
