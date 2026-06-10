import { Check } from "lucide-react";

const planes = [
  {
    name: "Esencial",
    price: "199",
    desc: "Para empezar tu hogar inteligente.",
    features: [
      "Iluminación inteligente (10 luces)",
      "Control por app móvil",
      "3 escenas programables",
      "Soporte por email",
    ],
    highlight: false,
    cta: "Empezar",
    badge: null,
  },
  {
    name: "Integral",
    price: "399",
    desc: "La experiencia Lumos completa.",
    features: [
      "Iluminación + Clima + Seguridad",
      "Control por voz (Alexa / Google)",
      "Automatizaciones ilimitadas",
      "Soporte 24/7 prioritario",
      "Dashboard premium",
    ],
    highlight: true,
    cta: "Elegir Integral",
    badge: "Más popular",
  },
  {
    name: "Elite",
    price: null,
    desc: "Solución premium a medida.",
    features: [
      "Todo lo del plan Integral",
      "Diseño arquitectónico personalizado",
      "Audio ambiente multiroom",
      "Integración con alarma existente",
      "Técnico dedicado",
    ],
    highlight: false,
    cta: "Hablar con un experto",
    badge: null,
  },
];

export function PlanesSection() {
  return (
    <section id="planes" className="py-24 px-8 bg-[#fdf8f4]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#c5704b]">Planes</span>
          <h2 className="text-4xl md:text-5xl font-bold text-black mt-3 mb-4">
            Elegí tu nivel Lumos
          </h2>
          <p className="text-black/45 text-sm max-w-sm mx-auto">
            Sin permanencia. Sin letra chica. Solo tu hogar inteligente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {planes.map(({ name, price, desc, features, highlight, cta, badge }) => (
            <div
              key={name}
              className={`rounded-2xl p-8 flex flex-col gap-6 relative ${
                highlight ? "bg-[#000000]" : "glass-panel"
              }`}
              style={
                highlight
                  ? { boxShadow: "0 32px 64px rgba(0,0,0,0.22)" }
                  : undefined
              }
            >
              {badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#c5704b] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full whitespace-nowrap">
                  {badge}
                </div>
              )}

              <div>
                <span
                  className={`text-xs uppercase tracking-widest font-semibold ${
                    highlight ? "text-[#fab257]" : "text-[#c5704b]"
                  }`}
                >
                  {name}
                </span>
                <div className="flex items-end gap-1 mt-2 mb-1">
                  {price ? (
                    <>
                      <span className={`text-4xl font-bold ${highlight ? "text-white" : "text-black"}`}>
                        ${price}
                      </span>
                      <span className={`text-sm mb-1.5 ${highlight ? "text-white/40" : "text-black/35"}`}>
                        /mes
                      </span>
                    </>
                  ) : (
                    <span className={`text-3xl font-bold ${highlight ? "text-white" : "text-black"}`}>
                      A medida
                    </span>
                  )}
                </div>
                <p className={`text-sm ${highlight ? "text-white/45" : "text-black/45"}`}>{desc}</p>
              </div>

              <div className={`h-px ${highlight ? "bg-white/10" : "bg-black/[0.08]"}`} />

              <ul className="space-y-3 flex-1">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check
                      size={14}
                      className={`mt-0.5 flex-shrink-0 ${highlight ? "text-[#fab257]" : "text-[#c5704b]"}`}
                    />
                    <span className={`text-sm ${highlight ? "text-white/60" : "text-black/55"}`}>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3.5 rounded-lg font-bold text-xs uppercase tracking-widest transition-all duration-200 active:scale-[0.99] ${
                  highlight
                    ? "bg-[#c5704b] text-white hover:bg-[#b5613c]"
                    : "text-black hover:bg-black/[0.06]"
                }`}
                style={!highlight ? { border: "1.5px solid rgba(0,0,0,0.18)" } : undefined}
              >
                {cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
