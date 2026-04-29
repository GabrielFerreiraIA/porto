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
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              WhatsApp
            </a>
            <button
              onClick={scrollToForm}
              className="bg-porto-primary hover:bg-porto-primary-hover text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 hover:scale-105 shadow-lg shadow-porto-primary/30"
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
                className="w-full bg-porto-primary text-white font-semibold py-3 rounded-xl mt-2"
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
