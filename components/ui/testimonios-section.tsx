import { Star } from "lucide-react";

const testimonios = [
  {
    name: "Mariana R.",
    role: "Arquitecta · CABA",
    initial: "M",
    quote:
      "Lumos transformó cómo vivo mi departamento. La iluminación adaptativa es increíble, el ambiente cambia solo sin que tenga que pensar en ello.",
    stars: 5,
  },
  {
    name: "Pablo F.",
    role: "Emprendedor · Palermo",
    initial: "P",
    quote:
      "Instalación rápida, sin ninguna obra. En menos de 24 horas tenía todo funcionando. El soporte es excelente y muy cercano.",
    stars: 5,
  },
  {
    name: "Sofía M.",
    role: "Diseñadora · Vicente López",
    initial: "S",
    quote:
      "Lo que más me sorprende es cómo aprende mis rutinas. Ya no tengo que decirle nada al sistema, simplemente sucede.",
    stars: 5,
  },
];

export function TestimoniosSection() {
  return (
    <section id="clientes" className="py-24 px-8 bg-[#0d0d12]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#fab359]">Testimonios</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
            Lo que dicen nuestros clientes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonios.map(({ name, role, initial, quote, stars }) => (
            <div key={name} className="glass-panel rounded-2xl p-8 flex flex-col gap-5">
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: stars }).map((_, i) => (
                  <Star key={i} size={13} className="text-[#fab359] fill-[#fab359]" />
                ))}
              </div>

              {/* Large quote mark */}
              <div
                className="text-6xl font-bold leading-none select-none"
                style={{ color: "rgba(197,112,75,0.2)", fontFamily: "Georgia, serif" }}
              >
                "
              </div>

              <blockquote className="text-white/65 text-sm leading-relaxed flex-1 -mt-4">
                {quote}
              </blockquote>

              <div
                className="flex items-center gap-3 pt-4"
                style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div className="w-9 h-9 rounded-full bg-[#c5704b]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#c5704b] text-xs font-bold">{initial}</span>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold leading-tight">{name}</p>
                  <p className="text-white/30 text-xs mt-0.5">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
