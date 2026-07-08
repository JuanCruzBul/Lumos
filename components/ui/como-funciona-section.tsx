"use client";
import { LUMOS_PRIMARY_HEX, LUMOS_PRIMARY_RGB } from "@/lib/utils";
import { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue, useSpring, useReducedMotion } from "framer-motion";

const pasos = [
  {
    num: "01",
    title: "Consultá",
    desc: "Nos contás qué querés mejorar. Analizamos tu espacio y te proponemos la mejor solución.",
  },
  {
    num: "02",
    title: "Diseñamos",
    desc: "Armamos tu solución a medida: qué dispositivos, dónde y cómo van a funcionar.",
  },
  {
    num: "03",
    title: "Instalamos",
    desc: "Nuestro equipo instala y configura todo de forma prolija y eficiente.",
  },
  {
    num: "04",
    title: "Disfrutá",
    desc: "Controlás todo desde el celular, la voz o de forma automática. Tu hogar trabaja por vos.",
  },
];

// Line spans scrollYProgress [0.20, 0.85].
// It reaches each circle at: 01=0.20, 02≈0.38, 03≈0.57, 04≈0.75
// Circles start ~0.18 before the line arrives to be fully settled (springs need buffer).
const STEP_TIMINGS = [
  { start: 0.02, end: 0.10 }, // 01 — fully settled by 0.07, line arrives 0.20
  { start: 0.20, end: 0.28 }, // 02 — fully settled by 0.25, line arrives 0.38
  { start: 0.38, end: 0.46 }, // 03 — fully settled by 0.43, line arrives 0.57
  { start: 0.57, end: 0.65 }, // 04 — fully settled by 0.62, line arrives 0.75
];

function StepItem({
  num,
  title,
  desc,
  index,
  scrollYProgress,
}: {
  num: string;
  title: string;
  desc: string;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const prefersReduced = useReducedMotion();
  const { start } = STEP_TIMINGS[index];

  // 1. Circle — fade + drop (no spring on Y/opacity so it stays ahead of the line)
  const circleOpacity = useTransform(scrollYProgress, [start, start + 0.04], [0, 1]);
  const circleY = useTransform(scrollYProgress, [start, start + 0.04], [24, 0]);

  // Scale pop: overshoot then settle (spring only here — decorative, can lag a bit)
  const circleScaleRaw = useTransform(scrollYProgress, [start, start + 0.03, start + 0.06], [0.55, 1.15, 1]);
  const circleScale = useSpring(circleScaleRaw, { stiffness: 320, damping: 20 });

  // Ripple ring: expands outward and fades
  const ringScale = useTransform(scrollYProgress, [start + 0.02, start + 0.10], [0.8, 1.9]);
  const ringOpacity = useTransform(scrollYProgress, [start + 0.02, start + 0.06, start + 0.10], [0, 0.5, 0]);

  // Second ring, slightly delayed
  const ring2Scale = useTransform(scrollYProgress, [start + 0.04, start + 0.13], [0.8, 2.2]);
  const ring2Opacity = useTransform(scrollYProgress, [start + 0.04, start + 0.08, start + 0.13], [0, 0.3, 0]);

  // Inner glow pulse mapped to scroll
  const glowOpacity = useTransform(scrollYProgress, [start + 0.05, start + 0.12], [0, 0.6]);

  // 2. Title
  const titleOpacity = useTransform(scrollYProgress, [start + 0.04, start + 0.07], [0, 1]);
  const titleY = useTransform(scrollYProgress, [start + 0.04, start + 0.07], [12, 0]);

  // 3. Description
  const descOpacity = useTransform(scrollYProgress, [start + 0.07, start + 0.10], [0, 1]);
  const descY = useTransform(scrollYProgress, [start + 0.07, start + 0.10], [8, 0]);

  return (
    <div className="flex flex-col items-center text-center px-4 sm:px-6 mb-10 md:mb-0">
      <motion.div
        style={{ opacity: circleOpacity, y: prefersReduced ? 0 : circleY }}
        className="relative mb-8 z-10"
      >
        {/* Ripple ring 1 */}
        {!prefersReduced && (
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              scale: ringScale,
              opacity: ringOpacity,
              border: `1.5px solid rgba(${LUMOS_PRIMARY_RGB},0.6)`,
            }}
          />
        )}
        {/* Ripple ring 2 */}
        {!prefersReduced && (
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              scale: ring2Scale,
              opacity: ring2Opacity,
              border: `1px solid rgba(${LUMOS_PRIMARY_RGB},0.35)`,
            }}
          />
        )}
        {/* Glow behind circle */}
        {!prefersReduced && (
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              opacity: glowOpacity,
              background: `radial-gradient(circle, rgba(${LUMOS_PRIMARY_RGB},0.22) 0%, transparent 75%)`,
              scale: 1.5,
            }}
          />
        )}
        {/* Circle itself */}
        <motion.div
          style={{ scale: prefersReduced ? 1 : circleScale }}
          className="w-16 h-16 rounded-full flex items-center justify-center bg-[#fefefe] relative z-10"
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center bg-[#fefefe]"
            style={{ border: `1.5px solid rgba(${LUMOS_PRIMARY_RGB},0.45)` }}
          >
            <span className="text-lumos-primary text-lg font-bold">{num}</span>
          </div>
        </motion.div>
      </motion.div>
      <motion.h3
        style={{ opacity: titleOpacity, y: prefersReduced ? 0 : titleY }}
        className="text-black font-bold text-base mb-2"
      >
        {title}
      </motion.h3>
      <motion.p
        style={{ opacity: descOpacity, y: prefersReduced ? 0 : descY }}
        className="text-black/65 text-sm leading-relaxed max-w-[200px] md:max-w-[160px] mx-auto"
      >
        {desc}
      </motion.p>
    </div>
  );
}

export function ComoFuncionaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // offset "start 0.4" means progress=0 when section top is 40% down the viewport
  // → by the time sticky kicks in (top=0), progress ≈ 0.18, so content is already visible
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.4", "end end"],
  });

  // Line draws from circle 01 to 04, delayed so circles are already visible
  const lineWidth = useTransform(scrollYProgress, [0.20, 0.85], ["0%", "100%"]);

  const headerOpacity = useTransform(scrollYProgress, [0, 0.04], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.04], [20, 0]);

  return (
    <section
      ref={sectionRef}
      id="proceso"
      className="relative bg-[#fefefe]"
      style={{ height: "280vh" }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center pt-24 md:pt-28 px-4 sm:px-8">

        {/* Header */}
        <motion.div
          style={{ opacity: headerOpacity, y: headerY }}
          className="text-center mb-10 md:mb-20"
        >
          <span className="text-xs uppercase tracking-widest font-semibold text-lumos-primary">
            Proceso
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mt-3">Así de simple</h2>
          <p className="text-black/60 text-sm sm:text-[15px] mt-4">
            De la primera consulta a tu hogar funcionando, en cuatro pasos.
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="relative grid grid-cols-2 md:grid-cols-4 max-w-5xl w-full gap-y-2 md:gap-y-0">

          {/* Base line (faint) */}
          <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-black/8" />

          {/* Animated fill line */}
          <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px">
            <motion.div
              className="h-full"
              style={{
                width: lineWidth,
                background: LUMOS_PRIMARY_HEX,
              }}
            />
          </div>

          {pasos.map((paso, i) => (
            <StepItem
              key={paso.num}
              {...paso}
              index={i}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
