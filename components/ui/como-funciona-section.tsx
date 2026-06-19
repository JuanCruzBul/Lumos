"use client";
import { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

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
    desc: "Nuestro equipo instala y configura todo de forma prolija y eficiente. Sin obras ni remodelaciones mayores.",
  },
  {
    num: "04",
    title: "Disfrutá",
    desc: "Controlás todo desde el celular, la voz o de forma automática. Tu hogar trabaja por vos.",
  },
];

// Line spans scrollYProgress [0.15, 0.80].
// It reaches each circle at: 01=0.15, 02≈0.37, 03≈0.58, 04≈0.80
// Each circle appears ~0.10 before the line arrives so it's settled when touched.
const STEP_TIMINGS = [
  { start: 0.06, end: 0.14 }, // 01 — appears before line starts
  { start: 0.27, end: 0.35 }, // 02 — line arrives ~0.37
  { start: 0.48, end: 0.56 }, // 03 — line arrives ~0.58
  { start: 0.69, end: 0.77 }, // 04 — line arrives ~0.80
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
  const { start } = STEP_TIMINGS[index];

  // 1. Circle
  const circleOpacity = useTransform(scrollYProgress, [start, start + 0.05], [0, 1]);
  const circleY = useTransform(scrollYProgress, [start, start + 0.05], [20, 0]);

  // 2. Title — starts after circle settles
  const titleOpacity = useTransform(scrollYProgress, [start + 0.05, start + 0.09], [0, 1]);
  const titleY = useTransform(scrollYProgress, [start + 0.05, start + 0.09], [12, 0]);

  // 3. Description — starts after title settles
  const descOpacity = useTransform(scrollYProgress, [start + 0.09, start + 0.13], [0, 1]);
  const descY = useTransform(scrollYProgress, [start + 0.09, start + 0.13], [10, 0]);

  return (
    <div className="flex flex-col items-center text-center px-4 sm:px-6 mb-10 md:mb-0">
      <motion.div
        style={{ opacity: circleOpacity, y: circleY }}
        className="relative mb-8 z-10"
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center bg-[#fefefe]"
          style={{ border: "1.5px solid rgba(197,112,75,0.45)" }}
        >
          <span className="text-[#c5704b] text-lg font-bold">{num}</span>
        </div>
      </motion.div>
      <motion.h3
        style={{ opacity: titleOpacity, y: titleY }}
        className="text-black font-bold text-base mb-2"
      >
        {title}
      </motion.h3>
      <motion.p
        style={{ opacity: descOpacity, y: descY }}
        className="text-black/65 text-sm leading-relaxed max-w-[200px] md:max-w-[160px] mx-auto"
      >
        {desc}
      </motion.p>
    </div>
  );
}

export function ComoFuncionaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Line draws after step 01 settles, reaching each circle in sync
  const lineWidth = useTransform(scrollYProgress, [0.15, 0.80], ["0%", "100%"]);

  const headerOpacity = useTransform(scrollYProgress, [0, 0.06], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.06], [20, 0]);

  return (
    <section
      ref={sectionRef}
      id="proceso"
      className="relative bg-[#fefefe]"
      style={{ height: "280vh" }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-4 sm:px-8">

        {/* Header */}
        <motion.div
          style={{ opacity: headerOpacity, y: headerY }}
          className="text-center mb-10 md:mb-20"
        >
          <span className="text-xs uppercase tracking-widest font-semibold text-[#c5704b]">
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
                background: "linear-gradient(to right, #c5704b, #fab257)",
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
