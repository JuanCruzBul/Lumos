"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Globe2, Share2, Mail, Link2 } from "lucide-react";
import { motion } from "framer-motion";

const JUAN_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC7nFYGs_Vp2TNitq772JOI-I9adZBE-L2mTHq1yDvay5OPxZQVipx2V-BRo2D5DoSU7-JGjiFB3RLf2zyWeJmbVZli6erPsauOwvm8pGxDPVUBX4H3ZKISc_UUzeJaxIVpJjMSYwpg_430LDrB8Nq1cGYX1N_uPY2SW4mooy5SglDEPxmU0uuE_FXmByZ_Zjvq_IyJw6r6DasY_uFnyqwuJW2yxo2XKPm-yfSjGeKaPHFkrkbEYnihwqJaLPwMibaZOciyKFc5XjNSsg";

const JESUS_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCS7a5n9xPx-tD9lcJayJF9jAgb0E5TNPy5Yz96ZtA7hequkVdh86DWYkn-Lx97wVMCzryzr0bvd2nhStdZEWfWhc0USyB7tgnCq4jvTOT--ygru0cqKw1umalZyP-lpfcj3cTgwp-lbvV4wgg7oe-FJ87niJqGk3ybEVveuoHxE0X0EHEuLtB7JyTXsEgOyAFS71wBaleYLoegz4SbNW5lUSp5Uy7H2gYpld5mT6xLWtp75NAmyPEhzesNoyJwts5RmYTqRpwmrxc";

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
      className="relative flex flex-col items-center py-20 px-6 lg:px-24 overflow-hidden"
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
      <div className="w-full max-w-4xl mb-24 text-center lg:text-left">
        <span className="text-xs font-semibold text-[#c5704b] bg-[#ffdbcd]/30 px-4 py-1.5 rounded-full mb-6 inline-block uppercase tracking-widest">
          El Equipo
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-[60px] font-semibold text-[#221a17] leading-tight mb-6 mt-4">
          Mentes creativas{" "}
          <br />
          <span className="text-[#c5704b] font-bold">impulsando Lumos.</span>
        </h2>
        <p className="text-base text-[#54433c] max-w-2xl leading-relaxed">
          Creemos en la simplicidad sofisticada y en el poder de la luz para
          transformar experiencias digitales. Unimos visión estratégica y
          ejecución impecable.
        </p>
      </div>

      {/* Asymmetric layout */}
      <div className="relative w-full max-w-6xl flex flex-col lg:block space-y-24 lg:space-y-0">

        {/* Juan Cruz Bulatovich */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative lg:absolute lg:top-0 lg:left-0 w-full lg:w-[45%] group z-10"
        >
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
            <div className="relative flex-shrink-0">
              <div className="absolute -inset-4 bg-[#ffdbcd]/20 rounded-[2rem] rotate-6 group-hover:rotate-3 transition-transform duration-500" />
              <Image
                src={JUAN_IMG}
                alt="Juan Cruz Bulatovich"
                width={256}
                height={320}
                className="relative w-64 h-80 object-cover rounded-[1.5rem] grayscale hover:grayscale-0 transition-all duration-700 shadow-xl border-4 border-white"
              />
            </div>
            <div className="flex flex-col text-center lg:text-left self-center">
              <h3 className="text-xl font-semibold text-[#221a17] mb-1">Juan Cruz Bulatovich</h3>
              <span className="text-sm font-semibold text-[#c5704b] mb-4 tracking-wide uppercase">
                Director Creativo &amp; Cofundador
              </span>
              <p className="text-sm text-[#54433c] mb-6 leading-relaxed">
                Estratega visual con pasión por el diseño centrado en el ser
                humano. Juan lidera la visión estética de Lumos, asegurando que
                cada píxel transmita calidez y claridad.
              </p>
              <div className="flex justify-center lg:justify-start gap-4">
                <a href="#" className="text-[#87736b] hover:text-[#c5704b] transition-colors">
                  <Globe2 size={20} />
                </a>
                <a href="#" className="text-[#87736b] hover:text-[#c5704b] transition-colors">
                  <Share2 size={20} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Jesús Manuel Martínez */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative lg:absolute lg:top-48 lg:right-0 w-full lg:w-[48%] group"
        >
          <div className="flex flex-col lg:flex-row-reverse items-center lg:items-start gap-8 lg:gap-12">
            <div className="relative flex-shrink-0 floating">
              <div className="absolute -inset-4 bg-[#ffddb9]/20 rounded-[3rem] -rotate-3 group-hover:rotate-0 transition-transform duration-500" />
              <Image
                src={JESUS_IMG}
                alt="Jesús Manuel Martínez"
                width={288}
                height={288}
                className="relative w-72 h-72 object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl border-4 border-white"
              />
            </div>
            <div className="flex flex-col text-center lg:text-right self-center">
              <h3 className="text-xl font-semibold text-[#221a17] mb-1">Jesús Manuel Martínez</h3>
              <span className="text-sm font-semibold text-[#c5704b] mb-4 tracking-wide uppercase">
                CTO &amp; Estrategia Digital
              </span>
              <p className="text-sm text-[#54433c] mb-6 leading-relaxed">
                Arquitecto de soluciones innovadoras. Jesús combina la precisión
                técnica con una visión de futuro para construir productos
                digitales que no solo funcionan, sino que inspiran.
              </p>
              <div className="flex justify-center lg:justify-end gap-4">
                <a href="#" className="text-[#87736b] hover:text-[#c5704b] transition-colors">
                  <Mail size={20} />
                </a>
                <a href="#" className="text-[#87736b] hover:text-[#c5704b] transition-colors">
                  <Link2 size={20} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Decorative background text */}
        <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.04] select-none">
          <span className="text-[180px] font-bold text-[#221a17] whitespace-nowrap leading-none">
            NOSOTROS
          </span>
        </div>
      </div>

      {/* Quote */}
      <div className="w-full max-w-xl mt-48 lg:mt-[500px] text-center">
        <p className="text-sm text-[#87736b] mb-8 italic">
          &ldquo;La luz no solo nos permite ver, nos permite entender el camino.&rdquo;
        </p>
        <div
          className="h-px w-24 mx-auto rounded-full"
          style={{ background: "linear-gradient(135deg, #c5704b 0%, #fab257 100%)" }}
        />
      </div>
    </section>
  );
}
