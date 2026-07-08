"use client";

import { LUMOS_PRIMARY_HEX, LUMOS_PRIMARY_RGB } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

const JUAN_IMG = "/images/juan-cruz-bulatovich.webp";
const JESUS_IMG = "/images/jesus-manuel-martinez.webp";


const MisionIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <line x1="12" y1="2" x2="12" y2="4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <line x1="12" y1="19.5" x2="12" y2="22" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <line x1="2" y1="12" x2="4.5" y2="12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <line x1="19.5" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const VisionIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const ValoresIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
      stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);


export function NosotrosSection() {
  const bg1Ref = useRef<HTMLDivElement>(null);
  const bg2Ref = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (shouldReduce) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 22;
      const y = (e.clientY / window.innerHeight - 0.5) * 22;
      if (bg1Ref.current) bg1Ref.current.style.transform = `translate(${x}px, ${y}px)`;
      if (bg2Ref.current) bg2Ref.current.style.transform = `translate(${-x * 0.5}px, ${-y * 0.5}px)`;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [shouldReduce]);

  const fadeUp = (delay = 0) =>
    shouldReduce
      ? {}
      : {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.1 },
        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay },
      };

  return (
    <div id="nosotros">
      {/* ── PARTE 1: misión/visión/valores — fondo claro ── */}
      <section
        className="relative overflow-hidden pt-20 md:pt-32 pb-10 md:pb-12 px-4 sm:px-8"
        style={{ background: "#fff8f6" }}
      >
        {/* Decorative glows */}
        <div
          ref={bg1Ref}
          className="absolute top-[-60px] left-[20%] w-[560px] h-[560px] rounded-full blur-[130px] pointer-events-none"
          style={{ background: `rgba(${LUMOS_PRIMARY_RGB},0.09)`, transition: "transform 0.8s ease-out" }}
        />
        <div
          ref={bg2Ref}
          className="absolute bottom-10 right-[15%] w-[440px] h-[440px] rounded-full blur-[110px] pointer-events-none"
          style={{ background: "rgba(250,178,87,0.1)", transition: "transform 0.8s ease-out" }}
        />

        <div className="max-w-6xl mx-auto relative">

          {/* ── HEADER ── */}
          <motion.div {...fadeUp(0)} className="mb-14 md:mb-20">
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-lumos-primary bg-lumos-primary/8 px-4 py-1.5 rounded-full inline-block mb-6">
              Nosotros
            </span>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-bold text-[#221a17] leading-[1.04] tracking-tight mb-5">
              Lumos es
              <br />
              <span className="text-lumos-primary">
                Inteligencia para tu hogar.
              </span>
            </h2>

            {/* Animated rule */}
            <motion.div
              initial={shouldReduce ? {} : { scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 h-[2px] max-w-[260px] rounded-full"
              style={{ background: LUMOS_PRIMARY_HEX }}
            />
          </motion.div>

          {/* ── BENTO GRID ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16 md:mb-24">
            {/* Quote card — 2 cols */}
            <motion.div
              {...fadeUp(0.26)}
              className="relative md:col-span-2 rounded-2xl px-8 py-8 overflow-hidden flex items-center"
              style={{
                background: "rgba(255,255,255,0.55)",
                border: `1px solid rgba(${LUMOS_PRIMARY_RGB},0.1)`,
                backdropFilter: "blur(14px)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-lumos-primary/5 via-transparent to-[#fab257]/5 pointer-events-none" />
              <div className="relative flex items-start gap-5">
                <div
                  className="text-[72px] font-black leading-[0.8] shrink-0 select-none mt-1"
                  style={{ color: `rgba(${LUMOS_PRIMARY_RGB},0.18)`, fontFamily: "Georgia, serif" }}
                >
                  &ldquo;
                </div>
                <p className="text-base md:text-lg font-medium text-[#221a17]/75 leading-relaxed italic">
                  Lumos existe para que cualquier hogar pueda ser inteligente — sin obras, sin complicaciones y sin precios de lujo.
                </p>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* ── PARTE 2: founders — fondo oscuro ── */}
      <section className="relative overflow-hidden py-20 md:py-28 px-4 sm:px-8" style={{ background: "#f5ede6" }}>
        {/* Glow decorativo cálido */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full blur-[120px] pointer-events-none" style={{ background: `rgba(${LUMOS_PRIMARY_RGB},0.08)` }} />

        <div className="max-w-6xl mx-auto relative">
          <div className="flex flex-col md:flex-row items-start gap-12 md:gap-16">

            {/* Fotos */}
            <motion.div
              {...(shouldReduce ? {} : {
                initial: { opacity: 0, x: -24 },
                whileInView: { opacity: 1, x: 0 },
                viewport: { once: true, amount: 0.15 },
                transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
              })}
              className="flex gap-4 sm:gap-6 shrink-0 justify-center md:justify-start w-full md:w-auto"
            >
              {[
                { img: JUAN_IMG, name: "Juan Cruz Bulatovich", role: "Fundador" },
                { img: JESUS_IMG, name: "Jesús Manuel Martínez", role: "Cofundador" },
              ].map(({ img, name, role }) => (
                <div key={name} className="flex flex-col items-center gap-3">
                  <div
                    className="relative w-[140px] h-[186px] sm:w-[180px] sm:h-[240px] md:w-[210px] md:h-[280px] rounded-2xl overflow-hidden"
                    style={{ border: `1.5px solid rgba(${LUMOS_PRIMARY_RGB},0.18)`, boxShadow: `0 8px 32px rgba(${LUMOS_PRIMARY_RGB},0.12)` }}
                  >
                    <Image
                      src={img}
                      alt={name}
                      fill
                      className="object-cover object-[center_10%] grayscale hover:grayscale-0 transition-all duration-700"
                      sizes="(max-width: 640px) 140px, (max-width: 768px) 180px, 210px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-[#221a17] leading-tight">{name}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-lumos-primary mt-0.5">{role}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Texto */}
            <motion.div
              {...(shouldReduce ? {} : {
                initial: { opacity: 0, x: 24 },
                whileInView: { opacity: 1, x: 0 },
                viewport: { once: true, amount: 0.15 },
                transition: { duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] },
              })}
              className="flex flex-col justify-center"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-lumos-primary mb-5 block">El equipo</span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#221a17] leading-snug mb-6">
                Dos Personas con<br />
                <span className="text-lumos-primary">
                  una pregunta simple.
                </span>
              </h3>
              <p className="text-sm sm:text-base text-[#54433c]/75 leading-relaxed text-left">
                ¿por qué la domótica sigue pareciendo un lujo?<br />
                Desde la combinación de conocimientos en electricidad, instalaciones, tecnología, diseño e inteligencia artificial, creamos una forma diferente de llevar hogares inteligentes a más personas.
                Una solución pensada para la vida real: más simple con la confianza de un acompañamiento profesional en cada etapa.
              </p>

              {/* Línea decorativa */}
              <motion.div
                initial={shouldReduce ? {} : { scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 h-[2px] max-w-[180px] rounded-full"
                style={{ background: LUMOS_PRIMARY_HEX }}
              />
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}

