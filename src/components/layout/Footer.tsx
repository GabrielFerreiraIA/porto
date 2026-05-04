export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-porto-primary flex items-center justify-center font-bold text-sm">
                PS
              </div>
              <span className="font-porto font-bold text-lg">Porto Saúde+</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Sua corretora especializada em planos Porto Seguro Saúde. Atendimento 100% gratuito,
              sem burocracia.
            </p>
            <p className="text-white/40 text-xs">
              Elih Seguros — SUSEP em processo de registro
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-porto font-semibold text-sm uppercase tracking-wider text-white/50 mb-4">
              Planos
            </h3>
            <ul className="space-y-2 text-sm text-white/70">
              {[
                "Porto Saúde Individual",
                "Porto Saúde Família",
                "Porto Saúde PME",
                "Porto Saúde Empresarial",
                "Porto Saúde Dental",
              ].map((item) => (
                <li key={item}>
                  <a href="#planos" className="hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-porto font-semibold text-sm uppercase tracking-wider text-white/50 mb-4">
              Contato
            </h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-porto-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                elihseguros@gmail.com
              </li>
              <li className="flex items-center gap-2">
                <span className="icon-porto-ic-whatsapp1 text-[#25D366] flex-shrink-0 text-lg"></span>
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  (11) 99999-9999
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Elih Seguros. Todos os direitos reservados.</p>
          <p className="text-center">
            Porto Seguro — Seguro Saúde S/A · CNPJ 04.540.010/0001-70 · ANS nº 326305
          </p>
        </div>
      </div>
    </footer>
  );
}
