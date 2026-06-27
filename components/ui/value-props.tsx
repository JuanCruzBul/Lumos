"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const IconPhone = ({ color }: { color: string }) => (
  <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
    <rect x="10" y="3" width="20" height="34" rx="4" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
    <line x1="10" y1="9" x2="30" y2="9" stroke={color} strokeWidth="2"/>
    <line x1="10" y1="31" x2="30" y2="31" stroke={color} strokeWidth="2"/>
    <circle cx="20" cy="35" r="1.5" fill={color}/>
    <rect x="14" y="13" width="5" height="5" rx="1.5" stroke={color} strokeWidth="1.5"/>
    <rect x="21" y="13" width="5" height="5" rx="1.5" stroke={color} strokeWidth="1.5"/>
    <rect x="14" y="20" width="5" height="5" rx="1.5" stroke={color} strokeWidth="1.5"/>
    <rect x="21" y="20" width="5" height="5" rx="1.5" stroke={color} strokeWidth="1.5"/>
  </svg>
);

const IconShield = ({ color }: { color: string }) => (
  <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
    <path d="M20 4L6 10v10c0 8 6 14.5 14 16 8-1.5 14-8 14-16V10L20 4z" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
    <polyline points="14,20 18,24 27,15" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconBrain = ({ color }: { color: string }) => (
  <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
    <path d="M8 18L20 7l12 11" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 18v13h16V18" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
    <circle cx="17" cy="24" r="2" stroke={color} strokeWidth="1.5"/>
    <circle cx="23" cy="24" r="2" stroke={color} strokeWidth="1.5"/>
    <line x1="19" y1="24" x2="21" y2="24" stroke={color} strokeWidth="1.5"/>
    <line x1="17" y1="22" x2="17" y2="20" stroke={color} strokeWidth="1.5"/>
    <line x1="23" y1="22" x2="23" y2="20" stroke={color} strokeWidth="1.5"/>
  </svg>
);

const IconNetwork = ({ color }: { color: string }) => (
  <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
    <rect x="12" y="22" width="16" height="6" rx="2" stroke={color} strokeWidth="2"/>
    <rect x="12" y="29" width="16" height="6" rx="2" stroke={color} strokeWidth="2"/>
    <circle cx="26" cy="25" r="1" fill={color}/>
    <circle cx="26" cy="32" r="1" fill={color}/>
    <path d="M20 18 Q20 14 20 12" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M15 16 Q17.5 12 20 12 Q22.5 12 25 16" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none"/>
    <path d="M11 13 Q15.5 7 20 7 Q24.5 7 29 13" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none"/>
    <circle cx="20" cy="18" r="1.5" fill={color}/>
  </svg>
);

const IconEnergy = ({ color }: { color: string }) => (
  <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
    <path d="M23 5L13 22h9l-5 13L27 18h-9L23 5z" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
  </svg>
);

const IconInstall = ({ color }: { color: string }) => (
  <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
    <path d="M8 24h24" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M11 24v-2a9 9 0 0 1 18 0v2" stroke={color} strokeWidth="2"/>
    <path d="M8 24v3a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2v-3" stroke={color} strokeWidth="2"/>
    <line x1="20" y1="10" x2="20" y2="14" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <polyline points="16,32 18.5,34.5 24,29" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const features = [
  {
    Icon: IconPhone,
    title: "Control total desde el celular",
    body: "Luces, temperatura, cerraduras y cámaras — todo en un solo toque, desde donde estés.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
  },
  {
    Icon: IconShield,
    title: "Seguridad que trabaja sola",
    body: "Detección de movimiento, alertas al instante y registro automático de cada acceso a tu hogar.",
    image: "https://images.unsplash.com/photo-1557858310-9052820906f7?w=800&q=80",
  },
  {
    Icon: IconBrain,
    title: "Automatizaciones que aprenden",
    body: "Rutinas que se adaptan a tu vida. El hogar responde a tus hábitos sin que tengas que hacer nada.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80",
  },
  {
    Icon: IconNetwork,
    title: "Red local y privada",
    body: "Servidor instalado en tu casa. Tus datos nunca salen de tu red. Sin nube, sin terceros.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
  },
  {
    Icon: IconEnergy,
    title: "Eficiencia energética real",
    body: "Monitoreo de consumo en vivo y apagado automático en zonas vacías. Ahorro verificable.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
  },
  {
    Icon: IconInstall,
    title: "Nosotros instalamos todo",
    body: "Sin tecnicismos. Nuestro equipo se encarga de principio a fin — vos solo disfrutás el resultado.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
  },
];

function FeatureRow({
  Icon,
  title,
  body,
  image,
  reverse,
  index,
  isLast,
}: {
  Icon: React.ElementType;
  title: string;
  body: string;
  image: string;
  reverse: boolean;
  index: number;
  isLast: boolean;
}) {
  const { ref, inView } = useInView(0.12);

  return (
    <div ref={ref}>
      <div
        className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} gap-6 md:gap-10 items-center py-8`}
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(20px)",
          transition: `opacity 0.55s ease, transform 0.55s ease`,
        }}
      >
        {/* Foto */}
        <div
          className="w-full md:w-[42%] shrink-0 rounded-xl overflow-hidden aspect-[3/2] relative"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05)" }}
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 42vw"
            loading="lazy"
          />
        </div>

        {/* Texto */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              style={{
                background: "linear-gradient(145deg, rgba(197,112,75,0.14) 0%, rgba(197,112,75,0.06) 100%)",
              }}
            >
              <Icon color="#c5704b" />
            </div>
            <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#c5704b]">
              0{index + 1}
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-black leading-tight mb-2">{title}</h3>
          <p className="text-sm text-black/70 leading-relaxed">{body}</p>
        </div>
      </div>
      {!isLast && <div className="h-px bg-black/[0.06]" />}
    </div>
  );
}

export function ValueProps({ hideHeader }: { hideHeader?: boolean } = {}) {
  const { ref, inView } = useInView(0.05);

  return (
    <section className="py-16 sm:py-24 bg-[#fefefe]">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">

        {/* Header */}
        {!hideHeader && (
        <div
          ref={ref}
          className="mb-14"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
        >
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#c5704b] mb-3">
            Por qué Lumos
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black leading-tight max-w-lg">
            Todo lo que necesitás para un hogar{" "}
            <span className="italic font-normal text-[#c5704b]">verdaderamente inteligente.</span>
          </h2>
        </div>
        )}

        {/* Filas alternadas */}
        <div className="border border-black/[0.06] rounded-2xl overflow-hidden px-6 sm:px-8">
          {features.map(({ Icon, title, body, image }, i) => (
            <FeatureRow
              key={title}
              Icon={Icon}
              title={title}
              body={body}
              image={image}
              reverse={i % 2 !== 0}
              index={i}
              isLast={i === features.length - 1}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
