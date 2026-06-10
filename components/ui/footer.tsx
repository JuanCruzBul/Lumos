import Link from "next/link";
import Image from "next/image";

const footerLinks: Record<string, string[]> = {
  Sistemas: ["Iluminación", "Clima", "Seguridad", "Hub Central"],
  Empresa: ["Nosotros", "Blog", "Empleos", "Prensa"],
  Legal: ["Privacidad", "Términos", "Cookies"],
};

export function Footer() {
  return (
    <footer className="w-full bg-[#000000]" style={{ borderTop: "1px solid rgba(197,112,75,0.15)" }}>
      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <Image src="/logo.svg" alt="Lumos" width={44} height={44} className="flex-shrink-0" />
              <span className="text-2xl font-bold text-[#fab257]">Lumos</span>
            </div>
            <p className="text-white/30 text-xs leading-relaxed mt-3 max-w-[180px]">
              Domótica inteligente para hogares que respiran con vos.
            </p>
            <div className="flex gap-4 mt-6">
              {["IG", "LI", "WA"].map((s) => (
                <Link
                  key={s}
                  href="#"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white/30 hover:text-white/70 transition-colors"
                  style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-5">
                {section}
              </h4>
              <ul className="space-y-3">
                {links.map((l) => (
                  <li key={l}>
                    <Link
                      href="#"
                      className="text-white/30 text-sm hover:text-white/65 transition-colors"
                    >
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-6xl mx-auto px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-white/20 text-xs">
            © 2025 Lumos Home Automation. Todos los derechos reservados.
          </p>
          <p className="text-white/15 text-xs">Buenos Aires, Argentina</p>
        </div>
      </div>
    </footer>
  );
}
