"use client";
import { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

const pasos = [
  {
    num: "01",
    title: "Consultá",
    desc: "Analizamos tu espacio y necesidades en una visita sin cargo.",
  },
  {
    num: "02",
    title: "Diseñamos",
    desc: "Creamos tu sistema a medida, pensado para tu estilo de vida.",
  },
  {
    num: "03",
    title: "Instalamos",
    desc: "Instalación profesional en 1 día. Sin obras, sin complicaciones.",
  },
  {
    num: "04",
    title: "Controlá",
    desc: "App, voz o automático. Tu hogar responde como vos querés.",
  },
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
  const start = 0.12 + (index / 4) * 0.6;
  const end = start + 0.14;
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const y = useTransform(scrollYProgress, [start, end], [32, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="flex flex-col items-center text-center px-6 mb-12 md:mb-0"
    >
      <div className="relative mb-8 z-10">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center bg-[#fefefe]"
          style={{ border: "1.5px solid rgba(197,112,75,0.45)" }}
        >
          <span className="text-[#c5704b] text-lg font-bold">{num}</span>
        </div>
      </div>
      <h3 className="text-black font-bold text-base mb-2">{title}</h3>
      <p className="text-black/40 text-sm leading-relaxed max-w-[150px] mx-auto">{desc}</p>
    </motion.div>
  );
}

export function ComoFuncionaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Line draws left to right as steps appear
  const lineScaleX = useTransform(scrollYProgress, [0.12, 0.75], [0, 1]);

  // Header fades in at the very beginning
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.1], [20, 0]);

  return (
    <section
      ref={sectionRef}
      id="proceso"
      className="relative bg-[#fefefe]"
      style={{ height: "280vh" }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-8">

        {/* Header */}
        <motion.div
          style={{ opacity: headerOpacity, y: headerY }}
          className="text-center mb-20"
        >
          <span className="text-xs uppercase tracking-widest font-semibold text-[#c5704b]">
            Proceso
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-black mt-3">Así de simple</h2>
          <p className="text-black/38 text-sm mt-4">
            De la consulta a tu hogar inteligente, en cuatro pasos.
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-4 max-w-5xl w-full">

          {/* Base line (faint) */}
          <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-black/8" />

          {/* Animated fill line */}
          <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px overflow-hidden">
            <motion.div
              className="h-full w-full origin-left"
              style={{
                scaleX: lineScaleX,
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
