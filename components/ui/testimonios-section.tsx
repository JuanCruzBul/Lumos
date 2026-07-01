import { LUMOS_PRIMARY_RGB } from "@/lib/utils";

const testimonios = [
  {
    name: "Mariana R.",
    role: "Propietaria · Villa Carlos Paz",
    initial: "M",
    quote:
      "Lumos transformó por completo cómo vivo mi casa. Las luces se adaptan solas a cada momento del día y puedo controlar todo desde el celular. Increíble.",
    stars: 4.5,
  },
  {
    name: "Pablo F.",
    role: "Emprendedor · Nueva Córdoba",
    initial: "P",
    quote:
      "La instalación fue rápida y sin obras. Todo quedó funcionando perfecto. El equipo estuvo presente en cada paso y el soporte es excelente.",
    stars: 4.2,
  },
  {
    name: "Sofía M.",
    role: "Arquitecta · Córdoba Capital",
    initial: "S",
    quote:
      "Lo que más me sorprende es la simplicidad. Mis clientes preguntan cómo funciona y la respuesta es siempre la misma: simplemente funciona.",
    stars: 4.7,
  },
];

function StarRating({ rating, name }: { rating: number; name: string }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }, (_, i) => {
        const fill = Math.min(1, Math.max(0, rating - i));
        const clipId = `clip-${name.replace(/\s/g, "")}-${i}`;
        return (
          <svg key={i} width="13" height="13" viewBox="0 0 24 24">
            <defs>
              <clipPath id={clipId}>
                <rect x="0" y="0" width={`${fill * 100}%`} height="100%" />
              </clipPath>
            </defs>
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill="rgba(250,178,87,0.2)"
            />
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill="#fab257"
              clipPath={`url(#${clipId})`}
            />
          </svg>
        );
      })}
    </div>
  );
}

export function TestimoniosSection() {
  return (
    <section id="clientes" className="min-h-screen flex flex-col justify-center py-16 md:py-24 px-4 sm:px-8 bg-[#fefefe]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-lumos-primary">Testimonios</span>
          <h2 className="text-3xl md:text-5xl font-bold text-black mt-3">
            Lo que dicen nuestros clientes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonios.map(({ name, role, initial, quote, stars }) => (
            <div key={name} className="glass-panel rounded-2xl p-8 flex flex-col gap-5">
                  <StarRating rating={stars} name={name} />

              <div
                className="text-6xl font-bold leading-none select-none"
                style={{ color: `rgba(${LUMOS_PRIMARY_RGB},0.18)`, fontFamily: "Georgia, serif" }}
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
                <div className="w-9 h-9 rounded-full bg-lumos-primary/12 flex items-center justify-center flex-shrink-0">
                  <span className="text-lumos-primary text-xs font-bold">{initial}</span>
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
