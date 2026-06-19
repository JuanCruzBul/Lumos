"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { motion } from "framer-motion";

const JUAN_IMG = "/images/juan-cruz-bulatovich.webp";

const JESUS_IMG = "/images/jesus-manuel-martinez.webp";

export function NosotrosSection() {
  const bg1Ref = useRef<HTMLDivElement>(null);
  const bg2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const amount = 20;
      const x = (e.clientX / window.innerWidth - 0.5) * amount;
      const y = (e.clientY / window.innerHeight - 0.5) * amount;
      if (bg1Ref.current) bg1Ref.current.style.transform = `translate(${x}px, ${y}px)`;
      if (bg2Ref.current) bg2Ref.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="nosotros"
      className="relative min-h-screen flex flex-col items-center justify-center py-20 px-6 lg:px-24 overflow-hidden"
      style={{ background: "#fff8f6" }}
    >
      {/* Background glows */}
      <div
        ref={bg1Ref}
        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] -z-10 pointer-events-none"
        style={{ background: "rgba(145,71,38,0.05)" }}
      />
      <div
        ref={bg2Ref}
        className="absolute bottom-10 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] -z-10 pointer-events-none"
        style={{ background: "rgba(134,83,0,0.10)" }}
      />

      {/* Header */}
      <div className="w-full max-w-6xl mb-20">
        <span className="text-xs font-semibold text-[#c5704b] bg-[#ffdbcd]/30 px-4 py-1.5 rounded-full mb-6 inline-block uppercase tracking-widest">
          El Equipo
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-[60px] font-semibold text-[#221a17] leading-tight mb-5 mt-4">
          Mentes creativas <br />
          <span className="text-[#c5704b] font-bold">impulsando Lumos.</span>
        </h2>
        <p className="text-base text-[#54433c] max-w-2xl leading-relaxed">
          Creemos en la simplicidad sofisticada y en el poder de la luz para
          transformar experiencias digitales. Unimos visión estratégica y
          ejecución impecable.
        </p>
      </div>

      {/* Cards grid — stack on mobile, asymmetric on desktop */}
      <div className="relative w-full max-w-6xl">

        {/* Watermark */}
        <div className="hidden lg:block absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span
            className="text-[180px] font-bold whitespace-nowrap leading-none"
            style={{ color: "rgba(34,26,23,0.04)" }}
          >
            NOSOTROS
          </span>
        </div>

        {/* Two-column grid with offset for Jesús */}
        <div className="flex flex-col gap-16 lg:gap-0 lg:grid lg:grid-cols-2">

          {/* Juan Cruz — top left */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
            className="group z-10 lg:pr-12"
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
              <div className="relative flex-shrink-0">
                <div className="absolute -inset-4 bg-[#ffdbcd]/20 rounded-[2rem] rotate-6 group-hover:rotate-3 transition-transform duration-500" />
                <Image
                  src={JUAN_IMG}
                  alt="Juan Cruz Bulatovich"
                  width={220}
                  height={275}
                  className="relative w-[220px] h-[275px] object-cover rounded-[1.5rem] grayscale hover:grayscale-0 transition-all duration-700 shadow-xl border-4 border-white"
                />
              </div>
              <div className="flex flex-col text-center sm:text-left self-center">
                <h3 className="text-xl font-semibold text-[#221a17] mb-1">Juan Cruz Bulatovich</h3>
                <span className="text-xs font-semibold text-[#c5704b] mb-4 tracking-widest uppercase">
                  Fundador
                </span>
                <p className="text-sm text-[#54433c] leading-relaxed max-w-xs">
                  Estudiante de Ingeniería apasionado por la tecnología. Reparo y armo PCs, diseño y desarrollo páginas web, y creo automatizaciones con IA. En Lumos me encargo del diseño, la identidad visual, las redes sociales, la interacción con clientes y las pautas publicitarias.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Jesús Manuel — offset down on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
            className="group z-10 lg:pt-28 lg:pl-8"
          >
            <div className="flex flex-col sm:flex-row-reverse items-center sm:items-start gap-8">
              <div className="relative flex-shrink-0">
                <div className="absolute -inset-4 bg-[#ffddb9]/20 rounded-[3rem] -rotate-3 group-hover:rotate-0 transition-transform duration-500" />
                <Image
                  src={JESUS_IMG}
                  alt="Jesús Manuel Martínez"
                  width={256}
                  height={256}
                  className="relative w-64 h-64 object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl border-4 border-white"
                />
              </div>
              <div className="flex flex-col text-center sm:text-right self-center">
                <h3 className="text-xl font-semibold text-[#221a17] mb-1">Jesús Manuel Martínez</h3>
                <span className="text-xs font-semibold text-[#c5704b] mb-4 tracking-widest uppercase">
                  Cofundador
                </span>
                <p className="text-sm text-[#54433c] leading-relaxed max-w-xs">
                  Estudiante de Ingeniería y electricista de oficio. Desarrollo páginas web y aplicaciones, y ejecuto instalaciones eléctricas con precisión. En Lumos lidera el código, las revisiones técnicas y todas las instalaciones de domótica.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Quote */}
      <div className="w-full max-w-xl mt-20 lg:mt-28 text-center">
        <p className="text-sm text-[#87736b] mb-8 italic">
          &ldquo;Cada detalle, pensado para que vivas mejor.&rdquo;
        </p>
        <div
          className="h-px w-24 mx-auto rounded-full"
          style={{ background: "linear-gradient(135deg, #c5704b 0%, #fab257 100%)" }}
        />
      </div>
    </section>
  );
}
