"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToForm = () => {
    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-porto-border"
          : "bg-transparent"
      }`}
    >
      {/* Scroll progress bar */}
      <div id="scroll-progress" style={{ width: "0%" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <a href="/" aria-label="Elih Seguros — Porto Seguro Saúde" className="flex items-center gap-2">
              <div className={`flex items-center gap-2 transition-all duration-300`}>
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center font-porto font-bold text-sm transition-all duration-300 ${
                    scrolled ? "bg-porto-primary text-white" : "bg-white text-porto-primary"
                  }`}
                >
                  PS
                </div>
                <span
                  className={`font-porto font-bold text-base transition-all duration-300 ${
                    scrolled ? "text-porto-text" : "text-white"
                  }`}
                >
                  Porto Saúde
                </span>
              </div>
            </a>
            <div
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all duration-300 ${
                scrolled
                  ? "bg-porto-accent-light border-porto-primary/20 text-porto-primary"
                  : "bg-white/10 border-white/20 text-white"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Elih Seguros · Correspondente Autorizado
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {["Planos", "Benefícios", "Como Funciona"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className={`text-sm font-medium transition-colors ${
                  scrolled
                    ? "text-porto-text hover:text-porto-primary"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre planos Porto Seguro Saúde."
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden sm:flex items-center gap-2 text-sm font-medium transition-colors ${
                scrolled ? "text-porto-text hover:text-porto-primary" : "text-white/80 hover:text-white"
              }`}
            >
              <span className="icon-porto-ic-whatsapp text-lg"></span>
              WhatsApp
            </a>
            <button
              onClick={scrollToForm}
              className="bg-porto-primary hover:bg-porto-primary-hover text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-porto-primary/30"
            >
              Quero Cotação
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`lg:hidden p-2 rounded-md ${scrolled ? "text-porto-text" : "text-white"}`}
              aria-label="Menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-porto-border overflow-hidden"
          >
            <nav className="px-4 py-4 flex flex-col gap-4">
              {["Planos", "Benefícios", "Como Funciona"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-porto-text font-medium hover:text-porto-primary py-2 border-b border-porto-border last:border-0"
                >
                  {item}
                </a>
              ))}
              <button
                onClick={scrollToForm}
                className="w-full bg-porto-primary text-white font-semibold py-3 rounded-lg mt-2"
              >
                Quero Cotação Gratuita
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
