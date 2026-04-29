"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";

const schema = z.object({
  nome: z.string().min(3, "Nome deve ter ao menos 3 caracteres"),
  whatsapp: z
    .string()
    .min(14, "Informe o DDD + número completo")
    .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, "Formato inválido"),
  perfil: z.string().min(1, "Selecione o perfil"),
  cnpj: z.string().min(1, "Selecione uma opção"),
  adultos: z.number().min(0).optional(),
  criancas: z.number().min(0).optional(),
});

type FormData = z.infer<typeof schema>;

const formatWhatsApp = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.replace(/(\d{2})/, "($1");
  if (digits.length <= 6) return digits.replace(/(\d{2})(\d{1,4})/, "($1) $2");
  if (digits.length <= 10) return digits.replace(/(\d{2})(\d{4})(\d{1,4})/, "($1) $2-$3");
  return digits.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
};

const unmaskWhatsApp = (value: string) => "+55" + value.replace(/\D/g, "");

const PERFIS = [
  { value: "pf", label: "Pessoa Física" },
  { value: "mei", label: "MEI" },
  { value: "empresario", label: "Empresário Individual" },
  { value: "pme_2_29", label: "Empresa 2–29 vidas" },
  { value: "pme_30_99", label: "Empresa 30–99 vidas" },
  { value: "empresa_100", label: "Empresa 100+ vidas" },
];

type Status = "idle" | "loading" | "success" | "error";

export function LeadForm() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<Status>("idle");
  const [direction, setDirection] = useState(1);
  const [isPerfilOpen, setIsPerfilOpen] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { adultos: 0, criancas: 0 },
  });

  const watchCnpj = watch("cnpj");
  const watchPerfil = watch("perfil");
  const watchAdultos = watch("adultos");
  const watchCriancas = watch("criancas");

  async function goToStep2() {
    const valid = await trigger(["nome", "whatsapp"]);
    if (!valid) return;
    setDirection(1);
    setStep(2);
  }

  function goBack() {
    setDirection(-1);
    setStep(1);
  }

  async function onSubmit(data: FormData) {
    setStatus("loading");
    try {
      const payload = {
        ...data,
        whatsapp: unmaskWhatsApp(data.whatsapp),
        beneficiarios: `${data.adultos || 0} adultos, ${data.criancas || 0} crianças`,
        plano_de_saude: "porto-seguro-saude",
        origem: "site-porto-elih",
        timestamp: new Date().toISOString(),
      };

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Falha no envio");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.35, ease: "easeOut" as const } },
    exit: (dir: number) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
      transition: { duration: 0.25, ease: "easeIn" as const },
    }),
  };

  return (
    <section
      id="formulario"
      className="py-20 lg:py-28 bg-porto-surface relative overflow-hidden"
      aria-label="Formulário de cotação Porto Seguro Saúde"
    >
      {/* BG decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-porto-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-porto-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-porto-primary text-white mb-4 mx-auto">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-1.5 text-green-700 text-xs font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Atendimento 100% gratuito
          </div>
          <h2 className="font-porto text-3xl lg:text-4xl font-bold text-porto-text mb-3">
            Receba sua cotação grátis
          </h2>
          <p className="text-porto-primary font-bold text-lg mb-2">
            Porto Seguro Saúde com o melhor atendimento
          </p>
          <p className="text-porto-muted">
            Preencha o formulário e nossa equipe entra em contato em até 24 horas via WhatsApp.
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-3xl border border-porto-border shadow-xl shadow-porto-primary/8 overflow-hidden">
          {/* Progress bar */}
          {status !== "success" && (
            <div className="h-1.5 bg-porto-border">
              <motion.div
                className="h-full bg-gradient-to-r from-porto-primary to-blue-400"
                animate={{ width: step === 1 ? "50%" : "100%" }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          )}

          <div className="p-8 sm:p-10">
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-porto text-2xl font-bold text-porto-text mb-2">
                  Solicitação enviada! 🎉
                </h3>
                <p className="text-porto-muted mb-6">
                  Nossa equipe entrará em contato em breve via WhatsApp com as melhores opções de Porto Seguro Saúde.
                </p>
                <a
                  href="https://wa.me/5511999999999?text=Olá! Acabei de preencher o formulário no site da Elih Seguros para Porto Seguro Saúde."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Falar no WhatsApp agora
                </a>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Step indicators */}
                <div className="flex items-center justify-between mb-8">
                  {[
                    { n: 1, label: "Seus dados" },
                    { n: 2, label: "Seu perfil" },
                  ].map(({ n, label }) => (
                    <div key={n} className="flex items-center gap-2">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                          step >= n
                            ? "bg-porto-primary text-white"
                            : "bg-porto-border text-porto-muted"
                        }`}
                      >
                        {step > n ? (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : n}
                      </div>
                      <span className={`text-sm font-medium ${step >= n ? "text-porto-text" : "text-porto-muted"}`}>
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="relative overflow-hidden" style={{ minHeight: "300px" }}>
                  <AnimatePresence initial={false} custom={direction} mode="wait">
                    {step === 1 ? (
                      <motion.div
                        key="step1"
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="space-y-5"
                      >
                        {/* Nome */}
                        <div>
                          <label className="block text-sm font-semibold text-porto-text mb-1.5">
                            Nome completo *
                          </label>
                          <input
                            {...register("nome")}
                            type="text"
                            placeholder="Seu nome completo"
                            className={`w-full px-4 py-3 rounded-xl border text-porto-text text-sm outline-none transition-all placeholder:text-porto-muted/60 ${
                              errors.nome
                                ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200"
                                : "border-porto-border focus:border-porto-primary focus:ring-2 focus:ring-porto-primary/20"
                            }`}
                          />
                          {errors.nome && (
                            <p className="text-red-500 text-xs mt-1">{errors.nome.message}</p>
                          )}
                        </div>

                        {/* WhatsApp */}
                        <div>
                          <label className="block text-sm font-semibold text-porto-text mb-1.5">
                            WhatsApp (DDD + número) *
                          </label>
                          <input
                            {...register("whatsapp", {
                              onChange: (e) => {
                                const formatted = formatWhatsApp(e.target.value);
                                setValue("whatsapp", formatted);
                              },
                            })}
                            type="tel"
                            placeholder="(11) 91234-5678"
                            className={`w-full px-4 py-3 rounded-xl border text-porto-text text-sm outline-none transition-all placeholder:text-porto-muted/60 ${
                              errors.whatsapp
                                ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200"
                                : "border-porto-border focus:border-porto-primary focus:ring-2 focus:ring-porto-primary/20"
                            }`}
                          />
                          {errors.whatsapp && (
                            <p className="text-red-500 text-xs mt-1">{errors.whatsapp.message}</p>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={goToStep2}
                          className="w-full bg-porto-primary hover:bg-porto-primary-hover text-white font-bold py-4 rounded-xl transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2 mt-2"
                        >
                          Continuar
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="step2"
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="space-y-5"
                      >
                        {/* Perfil dropdown */}
                        <div className="relative z-10">
                          <label className="block text-sm font-semibold text-porto-text mb-1.5">
                            Perfil para cotação *
                          </label>
                          <div
                            className={`w-full px-4 py-3 rounded-xl border text-porto-text text-sm cursor-pointer transition-all bg-white flex justify-between items-center ${
                              errors.perfil
                                ? "border-red-400 bg-red-50"
                                : "border-porto-border hover:border-porto-primary/50"
                            }`}
                            onClick={() => setIsPerfilOpen(!isPerfilOpen)}
                            tabIndex={0}
                            onBlur={() => setTimeout(() => setIsPerfilOpen(false), 200)}
                          >
                            <span>{PERFIS.find((p) => p.value === watchPerfil)?.label || "Selecione..."}</span>
                            <svg className={`w-4 h-4 text-porto-muted transition-transform ${isPerfilOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                          <AnimatePresence>
                            {isPerfilOpen && (
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute left-0 right-0 z-20 w-full mt-2 bg-white border border-porto-border rounded-xl shadow-lg py-2"
                              >
                                {PERFIS.map((p) => (
                                  <div
                                    key={p.value}
                                    className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                                      watchPerfil === p.value
                                        ? "bg-porto-accent-light text-porto-primary font-medium"
                                        : "text-porto-text hover:bg-porto-surface-2"
                                    }`}
                                    onClick={() => {
                                      setValue("perfil", p.value, { shouldValidate: true });
                                      setIsPerfilOpen(false);
                                    }}
                                  >
                                    {p.label}
                                  </div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                          {errors.perfil && (
                            <p className="text-red-500 text-xs mt-1">{errors.perfil.message}</p>
                          )}
                        </div>

                        {/* CNPJ */}
                        <div>
                          <label className="block text-sm font-semibold text-porto-text mb-1.5">
                            Possui CNPJ? *
                          </label>
                          <div className="flex gap-3">
                            {["Sim", "Não"].map((opt) => (
                              <label
                                key={opt}
                                className="flex-1 flex items-center justify-center gap-2 border rounded-xl py-3 cursor-pointer transition-all has-[:checked]:border-porto-primary has-[:checked]:bg-porto-accent-light border-porto-border hover:border-porto-primary/50"
                              >
                                <input
                                  {...register("cnpj")}
                                  type="radio"
                                  value={opt}
                                  className="accent-porto-primary"
                                />
                                <span className="text-sm font-medium text-porto-text">{opt}</span>
                              </label>
                            ))}
                          </div>
                          {errors.cnpj && (
                            <p className="text-red-500 text-xs mt-1">{errors.cnpj.message}</p>
                          )}
                        </div>

                        {/* Vidas */}
                        {watchCnpj && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="space-y-3 overflow-hidden"
                          >
                            <label className="block text-sm font-semibold text-porto-text mb-1.5 mt-2">
                              Quantas vidas no total?
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                              {/* Adultos */}
                              <div className="bg-porto-surface-2 p-4 rounded-xl border border-porto-border flex flex-col items-center">
                                <span className="text-sm text-porto-text font-medium mb-3">Adultos</span>
                                <div className="flex items-center gap-2">
                                  <button type="button" onClick={() => setValue("adultos", Math.max(0, (watchAdultos || 0) - 10))} className="w-8 h-8 rounded-full bg-white border border-porto-border flex items-center justify-center text-porto-text hover:bg-porto-accent-light hover:text-porto-primary transition-colors font-medium text-xs">-10</button>
                                  <button type="button" onClick={() => setValue("adultos", Math.max(0, (watchAdultos || 0) - 1))} className="w-9 h-9 rounded-full bg-white border border-porto-border flex items-center justify-center text-porto-text hover:bg-porto-accent-light hover:text-porto-primary transition-colors font-medium text-lg pb-0.5">-</button>
                                  <span className="w-8 text-center font-bold text-porto-text text-xl">{watchAdultos || 0}</span>
                                  <button type="button" onClick={() => setValue("adultos", (watchAdultos || 0) + 1)} className="w-9 h-9 rounded-full bg-white border border-porto-border flex items-center justify-center text-porto-text hover:bg-porto-accent-light hover:text-porto-primary transition-colors font-medium text-lg pb-0.5">+</button>
                                  <button type="button" onClick={() => setValue("adultos", (watchAdultos || 0) + 10)} className="w-8 h-8 rounded-full bg-white border border-porto-border flex items-center justify-center text-porto-text hover:bg-porto-accent-light hover:text-porto-primary transition-colors font-medium text-xs">+10</button>
                                </div>
                              </div>
                              {/* Crianças */}
                              <div className="bg-porto-surface-2 p-4 rounded-xl border border-porto-border flex flex-col items-center">
                                <span className="text-sm text-porto-text font-medium mb-3">Crianças (0-18)</span>
                                <div className="flex items-center gap-2">
                                  <button type="button" onClick={() => setValue("criancas", Math.max(0, (watchCriancas || 0) - 10))} className="w-8 h-8 rounded-full bg-white border border-porto-border flex items-center justify-center text-porto-text hover:bg-porto-accent-light hover:text-porto-primary transition-colors font-medium text-xs">-10</button>
                                  <button type="button" onClick={() => setValue("criancas", Math.max(0, (watchCriancas || 0) - 1))} className="w-9 h-9 rounded-full bg-white border border-porto-border flex items-center justify-center text-porto-text hover:bg-porto-accent-light hover:text-porto-primary transition-colors font-medium text-lg pb-0.5">-</button>
                                  <span className="w-8 text-center font-bold text-porto-text text-xl">{watchCriancas || 0}</span>
                                  <button type="button" onClick={() => setValue("criancas", (watchCriancas || 0) + 1)} className="w-9 h-9 rounded-full bg-white border border-porto-border flex items-center justify-center text-porto-text hover:bg-porto-accent-light hover:text-porto-primary transition-colors font-medium text-lg pb-0.5">+</button>
                                  <button type="button" onClick={() => setValue("criancas", (watchCriancas || 0) + 10)} className="w-8 h-8 rounded-full bg-white border border-porto-border flex items-center justify-center text-porto-text hover:bg-porto-accent-light hover:text-porto-primary transition-colors font-medium text-xs">+10</button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* LGPD */}
                        <p className="text-porto-muted text-xs leading-relaxed">
                          Seus dados são protegidos pela{" "}
                          <strong className="font-semibold">LGPD</strong> e usados apenas para enviar sua
                          cotação. Nunca vendemos informações a terceiros.
                        </p>

                        {status === "error" && (
                          <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-sm">
                            Ocorreu um erro. Tente novamente ou fale pelo WhatsApp.
                          </div>
                        )}

                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={goBack}
                            className="flex-none px-5 py-4 rounded-xl border border-porto-border text-porto-text font-medium text-sm hover:bg-porto-surface-2 transition-colors"
                          >
                            Voltar
                          </button>
                          <button
                            type="submit"
                            disabled={status === "loading"}
                            className="flex-1 bg-porto-primary hover:bg-porto-primary-hover text-white font-bold py-4 rounded-xl transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                          >
                            {status === "loading" ? (
                              <>
                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Enviando...
                              </>
                            ) : (
                              <>
                                Receber minha cotação grátis
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </>
                            )}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom trust */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-porto-muted text-xs">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Conexão segura SSL
          </span>
          <span>·</span>
          <span>Dados protegidos (LGPD)</span>
          <span>·</span>
          <span>Cotação 100% gratuita</span>
        </div>
      </div>
    </section>
  );
}
