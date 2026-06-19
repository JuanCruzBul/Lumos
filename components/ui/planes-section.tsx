"use client";

import { Check } from "lucide-react";

const planes = [
  {
    name: "Kit Inicial",
    desc: "Para empezar a disfrutar tu hogar inteligente.",
    features: [
      "Hasta 8 switches o luces inteligentes",
      "Control por app móvil",
      "Integración con Alexa o Google Home",
      "2 automatizaciones básicas",
      "Soporte por WhatsApp",
    ],
    highlight: false,
    cta: "Empezar",
    badge: null,
    mensaje:
      "Hola, me interesa el Kit Inicial. Me gustaría recibir más información sobre cómo comenzar.",
  },
  {
    name: "Kit Completo",
    desc: "La experiencia Lumos completa en tu hogar.",
    features: [
      "Iluminación + Seguridad + Automatización",
      "Home Assistant configurado",
      "Cerraduras y cámaras Wi-Fi incluidas",
      "Automatizaciones ilimitadas a medida",
      "Soporte prioritario",
    ],
    highlight: true,
    cta: "Elegir Kit Completo",
    badge: "Más popular",
    mensaje:
      "Hola, me interesa el Kit Completo. Me gustaría saber más sobre la experiencia Lumos completa.",
  },
  {
    name: "A Medida",
    desc: "Proyecto personalizado para tu hogar.",
    features: [
      "Todo lo del Kit Completo",
      "Cortinas y persianas motorizadas",
      "Integración de dispositivos existentes",
      "Diseño de sistema personalizado",
      "Técnico dedicado asignado",
    ],
    highlight: false,
    cta: "Hablar con el equipo",
    badge: null,
    mensaje:
      "Hola, me interesa un proyecto a medida para mi hogar. ¿Podrían contactarme para coordinar una consulta personalizada?",
  },
];

export function PlanesSection() {
  function handleCta(mensaje: string) {
    window.dispatchEvent(new CustomEvent("lumos:plan-selected", { detail: { mensaje } }));
    const el = document.getElementById("contacto");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section id="planes" className="min-h-screen flex flex-col justify-center py-24 px-8 bg-[#fdf8f4]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#c5704b]">Planes</span>
          <h2 className="text-4xl md:text-5xl font-bold text-black mt-3 mb-4">
            Elegí tu kit Lumos
          </h2>
          <p className="text-black/65 text-[15px] max-w-sm mx-auto">
            Planes flexibles, sin ataduras. Solo tu hogar inteligente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {planes.map(({ name, desc, features, highlight, cta, badge, mensaje }) => (
            <div
              key={name}
              className={`rounded-2xl flex flex-col gap-6 relative glass-panel ${
                highlight ? "p-10 md:-my-4" : "p-8"
              }`}
              style={
                highlight
                  ? {
                      background: "linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(253,248,244,0.98) 100%)",
                      border: "1.5px solid rgba(197,112,75,0.35)",
                      boxShadow: "0 24px 60px rgba(197,112,75,0.18), 0 4px 20px rgba(197,112,75,0.10)",
                    }
                  : {
                      boxShadow: "0 8px 32px rgba(197,112,75,0.09), 0 2px 8px rgba(0,0,0,0.04)",
                    }
              }
            >
              {badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full whitespace-nowrap"
                  style={{ background: "linear-gradient(135deg, #c5704b 0%, #fab257 100%)" }}
                >
                  {badge}
                </div>
              )}

              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-[#c5704b]">
                  {name}
                </span>
                <p className="text-sm mt-3 text-black/60">{desc}</p>
              </div>

              <div className="h-px bg-black/[0.07]" />

              <ul className="space-y-3 flex-1">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check size={14} className="mt-0.5 flex-shrink-0 text-[#c5704b]" />
                    <span className="text-sm text-black/75">{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleCta(mensaje)}
                className="w-full py-3.5 rounded-lg font-bold text-xs uppercase tracking-widest transition-all duration-200 active:scale-[0.99] text-white"
                style={{
                  background: highlight
                    ? "linear-gradient(135deg, #c5704b 0%, #fab257 100%)"
                    : "rgba(197,112,75,0.12)",
                  color: highlight ? "white" : "#c5704b",
                  boxShadow: highlight ? "0 4px 20px rgba(197,112,75,0.3)" : "none",
                }}
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
