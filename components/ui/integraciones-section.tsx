"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const AlexaIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
    <path fill="#00CAFF" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12c1.787 0 3.458-.392 4.966-1.088a.96.96 0 0 0-.832-1.735A9.994 9.994 0 0 1 12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10a9.98 9.98 0 0 1-1.885 5.853.96.96 0 1 0 1.565 1.116A11.977 11.977 0 0 0 24 12C24 5.373 18.627 0 12 0zm-.15 3.833c-3 0-5.417 2.417-5.417 5.417s2.417 5.417 5.417 5.417c1.014 0 1.96-.28 2.75-.762v.845a.417.417 0 0 0 .833 0V9.183c-.155-2.863-2.5-5.35-3.583-5.35z"/>
  </svg>
);

const GoogleHomeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.8 12.204c0-.698-.063-1.37-.18-2.018H12v3.815h5.506a4.706 4.706 0 0 1-2.04 3.086v2.566h3.305C20.703 17.873 21.8 15.249 21.8 12.204z" fill="#4285F4"/>
    <path d="M12 22c2.766 0 5.087-.917 6.772-2.48l-3.305-2.566c-.916.614-2.087.975-3.467.975-2.666 0-4.924-1.8-5.731-4.22H2.877v2.644A10 10 0 0 0 12 22z" fill="#34A853"/>
    <path d="M6.269 13.709A6.02 6.02 0 0 1 5.952 12c0-.596.102-1.175.317-1.709V7.647H2.877A10 10 0 0 0 2 12c0 1.614.387 3.14 1.067 4.5l3.202-2.791z" fill="#FBBC05"/>
    <path d="M12 5.581c1.505 0 2.855.518 3.917 1.533l2.939-2.938A9.94 9.94 0 0 0 12 2 10 10 0 0 0 2.877 7.647l3.392 2.644C7.076 7.873 9.334 5.581 12 5.581z" fill="#EA4335"/>
  </svg>
);

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

const points = [
  {
    num: "01",
    title: "Control total por voz y celular",
    body: "Encendé luces, regulá la temperatura o cerrá puertas con un comando de voz o desde la app — desde cualquier lugar del mundo.",
  },
  {
    num: "02",
    title: "Automatizaciones que trabajan por vos",
    body: "Escenas que se activan solas: llegás a casa y ya está todo listo. La luz, el clima, la música — sin tocar nada.",
  },
  {
    num: "03",
    title: "Integración con Alexa y Google Home",
    body: "Conectamos tu hogar con los asistentes de IA más potentes del mercado, para que la inteligencia del sistema esté siempre a tu disposición.",
  },
];

export function IntegracionesSection() {
  const { ref: sectionRef, inView } = useInView(0.1);

  return (
    <section
      ref={sectionRef}
      id="sistema"
      className="relative overflow-hidden bg-[#fdf8f4] py-24 lg:py-32"
    >
      {/* Ambient background glow */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top right, rgba(250,178,87,0.10) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at bottom left, rgba(197,112,75,0.07) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">

          {/* LEFT — text */}
          <div>
            {/* Label */}
            <p
              className="text-xs font-bold tracking-[0.25em] uppercase mb-8 transition-all duration-700"
              style={{
                color: "#c5704b",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(16px)",
                transitionDelay: "0ms",
              }}
            >
              Nuestro sistema
            </p>

            <h2
              className="text-4xl md:text-5xl font-bold text-black leading-[1.1] mb-6 transition-all duration-700"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(24px)",
                transitionDelay: "80ms",
              }}
            >
              Tu hogar, convertido en{" "}
              <span className="italic font-normal" style={{ color: "#c5704b" }}>
                un sistema que te entiende.
              </span>
            </h2>

            <p
              className="text-[15px] leading-relaxed mb-10 max-w-md transition-all duration-700"
              style={{
                color: "rgba(0,0,0,0.70)",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transitionDelay: "160ms",
              }}
            >
              Lumos integra los asistentes de IA más avanzados con automatizaciones
              diseñadas para tu rutina. El resultado es un hogar que anticipa,
              responde y aprende — instalado por nuestro equipo en un solo día.
            </p>

            {/* Integration badges */}
            <div
              className="flex items-center gap-5 mb-12 transition-all duration-700"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(18px)",
                transitionDelay: "240ms",
              }}
            >
              {[
                { icon: <AlexaIcon />, label: "Amazon Alexa" },
                { icon: <GoogleHomeIcon />, label: "Google Home" },
              ].map(({ icon, label }, i) => (
                <div key={label}>
                  <div
                    className="flex items-center gap-2 px-4 py-2 rounded-full transition-colors duration-200 cursor-default"
                    style={{
                      background: "rgba(197,112,75,0.07)",
                      border: "1px solid rgba(197,112,75,0.18)",
                      color: "rgba(0,0,0,0.5)",
                    }}
                  >
                    <span style={{ color: "#c5704b" }}>{icon}</span>
                    <span className="text-xs font-semibold tracking-wider uppercase">{label}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Numbered points */}
            <div className="space-y-9">
              {points.map((item, i) => (
                <div
                  key={item.num}
                  className="flex gap-6 transition-all duration-700"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateX(0)" : "translateX(-20px)",
                    transitionDelay: `${320 + i * 100}ms`,
                  }}
                >
                  <span
                    className="text-xs font-bold tabular-nums pt-0.5 shrink-0 leading-none"
                    style={{ color: "rgba(197,112,75,0.80)", letterSpacing: "0.05em" }}
                  >
                    {item.num}
                  </span>
                  <div>
                    <p className="text-[15px] font-bold text-black mb-1.5">{item.title}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(0,0,0,0.65)" }}>
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — image */}
          <div
            className="relative transition-all duration-1000"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0) scale(1)" : "translateX(32px) scale(0.97)",
              transitionDelay: "200ms",
            }}
          >
            {/* Glow behind image */}
            <div
              className="absolute -inset-8 rounded-3xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(250,178,87,0.15) 0%, transparent 68%)",
              }}
            />

            {/* Image frame */}
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                boxShadow:
                  "0 40px 100px rgba(0,0,0,0.10), 0 0 0 1px rgba(197,112,75,0.08)",
              }}
            >
              <Image
                src="/smart-home-dashboard.png"
                alt="Dashboard de control del hogar inteligente Lumos"
                width={720}
                height={520}
                className="w-full h-auto object-cover"
              />
              {/* Subtle warm overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(197,112,75,0.04) 0%, transparent 50%)",
                }}
              />
            </div>

            {/* Floating pill — voice */}
            <div
              className="absolute -top-4 -right-4 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl transition-all duration-700"
              style={{
                background: "rgba(255,255,255,0.94)",
                backdropFilter: "blur(14px)",
                border: "1px solid rgba(197,112,75,0.16)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.07)",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(-12px)",
                transitionDelay: "800ms",
              }}
            >
              {/* Mic icon */}
              <svg viewBox="0 0 24 24" fill="none" stroke="#c5704b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
              <p className="text-xs font-semibold text-black">Control por voz activo</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
