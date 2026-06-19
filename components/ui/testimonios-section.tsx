import { Star } from "lucide-react";

const testimonios = [
  {
    name: "Mariana R.",
    role: "Propietaria · Villa Carlos Paz",
    initial: "M",
    quote:
      "Lumos transformó por completo cómo vivo mi casa. Las luces se adaptan solas a cada momento del día y puedo controlar todo desde el celular. Increíble.",
    stars: 5,
  },
  {
    name: "Pablo F.",
    role: "Emprendedor · Nueva Córdoba",
    initial: "P",
    quote:
      "La instalación fue rápida y sin obras. Todo quedó funcionando perfecto. El equipo estuvo presente en cada paso y el soporte es excelente.",
    stars: 5,
  },
  {
    name: "Sofía M.",
    role: "Arquitecta · Córdoba Capital",
    initial: "S",
    quote:
      "Lo que más me sorprende es la simplicidad. Mis clientes preguntan cómo funciona y la respuesta es siempre la misma: simplemente funciona.",
    stars: 5,
  },
];

export function TestimoniosSection() {
  return (
    <section id="clientes" className="min-h-screen flex flex-col justify-center py-16 md:py-24 px-4 sm:px-8 bg-[#fefefe]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#c5704b]">Testimonios</span>
          <h2 className="text-3xl md:text-5xl font-bold text-black mt-3">
            Lo que dicen nuestros clientes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonios.map(({ name, role, initial, quote, stars }) => (
            <div key={name} className="glass-panel rounded-2xl p-8 flex flex-col gap-5">
              <div className="flex gap-1">
                {Array.from({ length: stars }).map((_, i) => (
                  <Star key={i} size={13} className="text-[#fab257] fill-[#fab257]" />
                ))}
              </div>

              <div
                className="text-6xl font-bold leading-none select-none"
                style={{ color: "rgba(197,112,75,0.18)", fontFamily: "Georgia, serif" }}
              >
                &ldquo;
              </div>

              <blockquote className="text-black/75 text-[15px] leading-relaxed flex-1 -mt-4">
                {quote}
              </blockquote>

              <div
                className="flex items-center gap-3 pt-4"
                style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}
              >
                <div className="w-9 h-9 rounded-full bg-[#c5704b]/12 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#c5704b] text-xs font-bold">{initial}</span>
                </div>
                <div>
                  <p className="text-black text-sm font-semibold leading-tight">{name}</p>
                  <p className="text-black/58 text-xs mt-0.5">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
