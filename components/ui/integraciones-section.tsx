"use client";

import { LUMOS_PRIMARY_HEX, LUMOS_PRIMARY_RGB } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";


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
    body: "Encendé luces, regulá la temperatura o cerrá puertas con un comando de voz o desde la app desde cualquier lugar del mundo.",
  },
  {
    num: "02",
    title: "Automatizaciones que trabajan por vos",
    body: "La iluminación, la temperatura y el ambiente se adaptan a tu rutina automáticamente.",
  },
  {
    num: "03",
    title: "Integración con Alexa y Google Home",
    body: "Usá el asistente que ya conocés para controlar todo tu hogar",
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
            `radial-gradient(ellipse at bottom left, rgba(${LUMOS_PRIMARY_RGB},0.07) 0%, transparent 65%)`,
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
                color: LUMOS_PRIMARY_HEX,
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
              El futuro de tu hogar {" "}
              <span className="italic font-normal" style={{ color: LUMOS_PRIMARY_HEX }}>
              empieza con Lumos.
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
              Lumos combina dispositivos inteligentes y automatizaciones diseñadas para adaptarse a tu rutina. 
              El resultado es un hogar que anticipa tus necesidades, responde de forma inteligente y simplifica tu día a día.
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
                { src: "/icon-alexa.svg", label: "Amazon Alexa" },
                { src: "/icon-google-home.svg", label: "Google Home" },
                { src: "/icon-home-assistant.svg", label: "Home Assistant" },
              ].map(({ src, label }) => (
                <div key={label}>
                  <div
                    className="flex items-center gap-2 px-4 py-2 rounded-full transition-colors duration-200 cursor-default"
                    style={{
                      background: `rgba(${LUMOS_PRIMARY_RGB},0.07)`,
                      border: `1px solid rgba(${LUMOS_PRIMARY_RGB},0.18)`,
                      color: "rgba(0,0,0,0.5)",
                    }}
                  >
                    <Image src={src} alt={label} width={16} height={16} className="w-4 h-4 object-contain" />
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
                    style={{ color: `rgba(${LUMOS_PRIMARY_RGB},0.80)`, letterSpacing: "0.05em" }}
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
                  `0 40px 100px rgba(0,0,0,0.10), 0 0 0 1px rgba(${LUMOS_PRIMARY_RGB},0.08)`,
              }}
            >
              <Image
                src="/smart-home-dashboard.png"
                alt="Dashboard de control del hogar inteligente Lumos"
                width={720}
                height={520}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              {/* Subtle warm overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    `linear-gradient(135deg, rgba(${LUMOS_PRIMARY_RGB},0.04) 0%, transparent 50%)`,
                }}
              />
            </div>

            {/* Floating pill — voice */}
            <div
              className="absolute -top-4 -right-4 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl transition-all duration-700"
              style={{
                background: "rgba(255,255,255,0.94)",
                backdropFilter: "blur(14px)",
                border: `1px solid rgba(${LUMOS_PRIMARY_RGB},0.16)`,
                boxShadow: "0 8px 32px rgba(0,0,0,0.07)",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(-12px)",
                transitionDelay: "800ms",
              }}
            >
              {/* Mic icon */}
              <svg viewBox="0 0 24 24" fill="none" stroke={LUMOS_PRIMARY_HEX} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0">
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
