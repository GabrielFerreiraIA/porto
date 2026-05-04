"use client";

import { motion } from "framer-motion";

const PLANS = [
  {
    name: "Porto Saúde Individual",
    tag: "Pessoa Física",
    featured: false,
    price: "Consulte",
    coverage: "Nacional",
    benefits: [
      "Consultas com médicos especialistas",
      "Exames laboratoriais e de imagem",
      "Internações hospitalares",
      "Pronto-socorro 24 horas",
      "Urgência e emergência nacional",
    ],
    cta: "Solicitar Cotação",
  },
  {
    name: "Porto Saúde PME",
    tag: "2 a 99 vidas",
    featured: true,
    price: "A partir de",
    coverage: "Nacional",
    benefits: [
      "Tudo do plano individual",
      "Gestão de saúde da equipe",
      "Central empresarial exclusiva",
      "Relatório de sinistralidade",
      "Flexibilidade de coberturas",
    ],
    cta: "Ver melhor oferta",
  },
  {
    name: "Porto Saúde Empresarial",
    tag: "100+ vidas",
    featured: false,
    price: "Consulte",
    coverage: "Nacional",
    benefits: [
      "Tudo do plano PME",
      "Gerente de conta dedicado",
      "Programas de bem-estar",
      "Saúde ocupacional integrada",
      "Condições negociadas",
    ],
    cta: "Solicitar Cotação",
  },
];

export function Plans() {
  const scrollToForm = () => {
    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="planos" className="py-20 lg:py-28 bg-porto-surface">
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
            Opções para cada perfil
          </div>
          <h2 className="font-porto text-3xl lg:text-4xl font-bold text-porto-text mb-4">
            Planos Porto Seguro Saúde
          </h2>
          <p className="text-porto-muted text-lg max-w-2xl mx-auto">
            Encontre o plano ideal para você ou sua empresa. Nossa equipe garante o melhor
            preço sem nenhum custo adicional.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {PLANS.map(({ name, tag, featured, price, coverage, benefits, cta }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`plan-card relative rounded-xl p-6 lg:p-8 flex flex-col ${
                featured
                  ? "bg-porto-primary text-white border-2 border-porto-primary shadow-2xl shadow-porto-primary/25"
                  : "bg-porto-surface border border-porto-border"
              }`}
            >
              {featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-porto-primary text-xs font-bold px-4 py-1 rounded-full shadow">
                  Mais Indicado
                </div>
              )}

              {/* Tag */}
              <div
                className={`inline-flex items-center self-start px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
                  featured ? "bg-white/20 text-white" : "bg-porto-accent-light text-porto-primary"
                }`}
              >
                {tag}
              </div>

              {/* Name */}
              <h3
                className={`font-porto font-bold text-xl mb-1 ${
                  featured ? "text-white" : "text-porto-text"
                }`}
              >
                {name}
              </h3>

              {/* Price */}
              <div className="mb-6">
                <span
                  className={`text-xs ${featured ? "text-white/70" : "text-porto-muted"}`}
                >
                  {price}
                </span>
                <p
                  className={`font-porto font-bold text-2xl ${
                    featured ? "text-white" : "text-porto-primary"
                  }`}
                >
                  Cobertura {coverage}
                </p>
              </div>

              {/* Benefits */}
              <ul className="space-y-3 mb-8 flex-1">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <svg
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        featured ? "text-white" : "text-porto-primary"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span
                      className={`text-sm ${
                        featured ? "text-white/85" : "text-porto-muted"
                      }`}
                    >
                      {b}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={scrollToForm}
                className={`w-full font-bold py-3.5 rounded-lg text-sm transition-all duration-200 hover:scale-[1.02] ${
                  featured
                    ? "bg-white text-porto-primary hover:bg-porto-accent-light"
                    : "bg-porto-primary text-white hover:bg-porto-primary-hover"
                }`}
              >
                {cta} →
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-porto-muted text-sm mt-8"
        >
          Os valores variam conforme região, faixa etária e quantidade de vidas. Solicite uma cotação para receber valores exatos.
        </motion.p>
      </div>
    </section>
  );
}
