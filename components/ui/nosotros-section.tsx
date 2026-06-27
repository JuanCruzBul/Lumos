"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

const JUAN_IMG = "/images/juan-cruz-bulatovich.webp";
const JESUS_IMG = "/images/jesus-manuel-martinez.webp";

function WordReveal({ text, className }: { text: string; className?: string }) {
  const shouldReduce = useReducedMotion();
  const words = text.split(" ");

  return (
    <motion.p
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        visible: { transition: { staggerChildren: shouldReduce ? 0 : 0.018 } },
        hidden: {},
      }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.28em]">
          <motion.span
            className="inline-block"
            variants={
              shouldReduce
                ? {}
                : {
                    hidden: { y: "105%", opacity: 0 },
                    visible: {
                      y: "0%",
                      opacity: 1,
                      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
                    },
                  }
            }
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.p>
  );
}

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
        style={{ background: "rgba(197,112,75,0.09)", transition: "transform 0.8s ease-out" }}
      />
      <div
        ref={bg2Ref}
        className="absolute bottom-10 right-[15%] w-[440px] h-[440px] rounded-full blur-[110px] pointer-events-none"
        style={{ background: "rgba(250,178,87,0.1)", transition: "transform 0.8s ease-out" }}
      />

      <div className="max-w-6xl mx-auto relative">

        {/* ── HEADER ── */}
        <motion.div {...fadeUp(0)} className="mb-14 md:mb-20">
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#c5704b] bg-[#c5704b]/8 px-4 py-1.5 rounded-full inline-block mb-6">
            Nosotros
          </span>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-bold text-[#221a17] leading-[1.04] tracking-tight mb-5">
            Lumos es domótica
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(120deg, #c5704b 0%, #fab257 55%, #c5704b 100%)" }}
            >
              para todos.
            </span>
          </h2>

          <p className="text-base md:text-lg text-[#54433c]/75 max-w-xl leading-relaxed">
            Nació para hacer accesible lo que siempre fue exclusivo — un hogar
            inteligente, real, instalado y funcionando.
          </p>

          {/* Animated rule */}
          <motion.div
            initial={shouldReduce ? {} : { scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 h-[2px] max-w-[260px] rounded-full"
            style={{ background: "linear-gradient(to right, #c5704b, #fab257, transparent)" }}
          />
        </motion.div>

        {/* ── BENTO GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16 md:mb-24">

          {/* Fila 1: Misión (2 cols) + Visión (1 col) */}

          {/* Card 01 — Misión */}
          <motion.div
            {...fadeUp(0.05)}
            whileHover={shouldReduce ? {} : { y: -3, transition: { duration: 0.22 } }}
            className="relative md:col-span-2 rounded-2xl p-7 md:p-8 overflow-hidden cursor-default"
            style={{
              background: "rgba(255,255,255,0.85)",
              border: "1px solid rgba(197,112,75,0.13)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 2px 32px rgba(197,112,75,0.07), 0 1px 4px rgba(0,0,0,0.04)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#c5704b]/6 to-transparent pointer-events-none" />
            <span className="absolute top-4 right-6 text-[90px] font-black leading-none select-none pointer-events-none" style={{ color: "rgba(197,112,75,0.05)" }}>01</span>
            <div className="relative flex flex-col sm:flex-row sm:items-start sm:gap-7">
              <div className="mb-4 sm:mb-0 sm:pt-1 shrink-0">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "rgba(197,112,75,0.1)", color: "#c5704b" }}>
                  <MisionIcon />
                </div>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c5704b] block mb-2">Misión</span>
                <h3 className="text-xl md:text-2xl font-bold text-[#221a17] leading-snug mb-3">
                  Hacer accesible lo que siempre fue exclusivo
                </h3>
                <p className="text-sm text-[#54433c]/68 leading-relaxed max-w-md">
                  Que cualquier hogar — sin importar su tamaño ni presupuesto — pueda ser inteligente. Sin obras, sin técnicos de turno y sin precios de lujo.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 02 — Visión */}
          <motion.div
            {...fadeUp(0.12)}
            whileHover={shouldReduce ? {} : { y: -3, transition: { duration: 0.22 } }}
            className="relative rounded-2xl p-7 overflow-hidden cursor-default"
            style={{
              background: "rgba(255,255,255,0.85)",
              border: "1px solid rgba(197,112,75,0.13)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 2px 32px rgba(197,112,75,0.07), 0 1px 4px rgba(0,0,0,0.04)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#d97d52]/7 to-transparent pointer-events-none" />
            <span className="absolute top-4 right-5 text-[90px] font-black leading-none select-none pointer-events-none" style={{ color: "rgba(197,112,75,0.05)" }}>02</span>
            <div className="relative">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(217,125,82,0.1)", color: "#d97d52" }}>
                <VisionIcon />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d97d52] block mb-2">Visión</span>
              <h3 className="text-lg font-bold text-[#221a17] leading-snug mb-3">
                El hogar inteligente como nuevo estándar
              </h3>
              <p className="text-sm text-[#54433c]/68 leading-relaxed">
                Un futuro donde la domótica es la norma, no el privilegio. Donde encender una luz sea tan natural como hablar en la misma habitación.
              </p>
            </div>
          </motion.div>

          {/* Fila 2: Valores (1 col) + Quote (2 cols) */}

          {/* Card 03 — Valores */}
          <motion.div
            {...fadeUp(0.19)}
            whileHover={shouldReduce ? {} : { y: -3, transition: { duration: 0.22 } }}
            className="relative rounded-2xl p-7 overflow-hidden cursor-default"
            style={{
              background: "rgba(255,255,255,0.85)",
              border: "1px solid rgba(197,112,75,0.13)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 2px 32px rgba(197,112,75,0.07), 0 1px 4px rgba(0,0,0,0.04)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#fab257]/6 to-transparent pointer-events-none" />
            <span className="absolute top-4 right-5 text-[90px] font-black leading-none select-none pointer-events-none" style={{ color: "rgba(197,112,75,0.05)" }}>03</span>
            <div className="relative">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(250,178,87,0.12)", color: "#fab257" }}>
                <ValoresIcon />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#fab257] block mb-2">Valores</span>
              <h3 className="text-lg font-bold text-[#221a17] leading-snug mb-3">
                Simplicidad, honestidad y presencia
              </h3>
              <p className="text-sm text-[#54433c]/68 leading-relaxed">
                Hacemos lo que prometemos. Explicamos lo que instalamos. Y seguimos presentes — porque una casa inteligente necesita respaldo real.
              </p>
            </div>
          </motion.div>

          {/* Quote card — 2 cols */}
          <motion.div
            {...fadeUp(0.26)}
            className="relative md:col-span-2 rounded-2xl px-8 py-8 overflow-hidden flex items-center"
            style={{
              background: "rgba(255,255,255,0.55)",
              border: "1px solid rgba(197,112,75,0.1)",
              backdropFilter: "blur(14px)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#c5704b]/5 via-transparent to-[#fab257]/5 pointer-events-none" />
            <div className="relative flex items-start gap-5">
              <div
                className="text-[72px] font-black leading-[0.8] shrink-0 select-none mt-1"
                style={{ color: "rgba(197,112,75,0.18)", fontFamily: "Georgia, serif" }}
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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full blur-[120px] pointer-events-none" style={{ background: "rgba(197,112,75,0.08)" }} />

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
            ].map(({ img, name, role }, i) => (
              <div key={name} className="flex flex-col items-center gap-3">
                <div
                  className="relative w-[140px] h-[186px] sm:w-[180px] sm:h-[240px] md:w-[210px] md:h-[280px] rounded-2xl overflow-hidden"
                  style={{ border: "1.5px solid rgba(197,112,75,0.18)", boxShadow: "0 8px 32px rgba(197,112,75,0.12)" }}
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
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#c5704b] mt-0.5">{role}</p>
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
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#c5704b] mb-5 block">El equipo</span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#221a17] leading-snug mb-6">
              Dos ingenieros con<br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(120deg, #c5704b 0%, #fab257 55%, #c5704b 100%)" }}
              >
                una pregunta simple.
              </span>
            </h3>
            <p className="text-sm sm:text-base text-[#54433c]/75 leading-relaxed mb-4 text-left">
              Somos dos ingenieros que se preguntaron por qué la domótica seguía siendo un lujo. Uno con experiencia en electricidad e instalaciones, el otro en diseño, tecnología e inteligencia artificial.
            </p>
            <p className="text-sm sm:text-base text-[#54433c]/75 leading-relaxed text-left">
              La combinación exacta para hacer algo distinto. Así nació Lumos: no para vender tecnología cara, sino para que cualquier hogar funcione mejor — sin obras, sin complicaciones, con respaldo real de principio a fin.
            </p>

            {/* Línea decorativa */}
            <motion.div
              initial={shouldReduce ? {} : { scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 h-[2px] max-w-[180px] rounded-full"
              style={{ background: "linear-gradient(to right, #c5704b, #fab257, transparent)" }}
            />
          </motion.div>

        </div>
      </div>
    </section>
    </div>
  );
}

