"use client";

import { LUMOS_PRIMARY_HEX } from "@/lib/utils";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Check } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

function AlexaLogo() {
  return <Image src="/icon-alexa.svg" alt="Amazon Alexa" width={48} height={48} className="w-full h-full object-contain" />;
}
function GoogleHomeLogo() {
  return <Image src="/icon-google-home.svg" alt="Google Home" width={48} height={48} className="w-full h-full object-contain" />;
}
function HomeAssistantLogo() {
  return <Image src="/icon-home-assistant.svg" alt="Home Assistant" width={48} height={48} className="w-full h-full object-contain" />;
}
function HomeKitLogo() {
  return (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <rect width="64" height="64" rx="13" fill="#1C1C1E" />
      <path d="M32 13 L51 29 V52 H13 V29 Z" stroke="white" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
      <rect x="25.5" y="38" width="13" height="14" rx="6.5" fill="white" />
    </svg>
  );
}

const ECOSYSTEMS: Record<string, { Logo: () => React.ReactElement; label: string }> = {
  alexa: { Logo: AlexaLogo, label: "Amazon Alexa" },
  google: { Logo: GoogleHomeLogo, label: "Google Home" },
  ha: { Logo: HomeAssistantLogo, label: "Home Assistant" },
  homekit: { Logo: HomeKitLogo, label: "Apple HomeKit" },
};

// Íconos SVG personalizados por servicio
const IconLuz = ({ color }: { color: string }) => (
  <svg width="22" height="22" viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="18" r="7" stroke={color} strokeWidth="2.2" />
    <line x1="20" y1="4" x2="20" y2="7" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <line x1="20" y1="29" x2="20" y2="32" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <line x1="6" y1="18" x2="9" y2="18" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <line x1="31" y1="18" x2="34" y2="18" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <line x1="10.5" y1="8.5" x2="12.6" y2="10.6" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <line x1="27.4" y1="25.4" x2="29.5" y2="27.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <line x1="29.5" y1="8.5" x2="27.4" y2="10.6" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <line x1="12.6" y1="25.4" x2="10.5" y2="27.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <path d="M16 29h8" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M17 32h6" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const IconHub = ({ color }: { color: string }) => (
  <svg width="22" height="22" viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="4" stroke={color} strokeWidth="2.2" />
    <circle cx="20" cy="7" r="2.5" stroke={color} strokeWidth="2" />
    <circle cx="20" cy="33" r="2.5" stroke={color} strokeWidth="2" />
    <circle cx="7" cy="20" r="2.5" stroke={color} strokeWidth="2" />
    <circle cx="33" cy="20" r="2.5" stroke={color} strokeWidth="2" />
    <line x1="20" y1="9.5" x2="20" y2="16" stroke={color} strokeWidth="1.8" strokeDasharray="2 2" />
    <line x1="20" y1="24" x2="20" y2="30.5" stroke={color} strokeWidth="1.8" strokeDasharray="2 2" />
    <line x1="9.5" y1="20" x2="16" y2="20" stroke={color} strokeWidth="1.8" strokeDasharray="2 2" />
    <line x1="24" y1="20" x2="30.5" y2="20" stroke={color} strokeWidth="1.8" strokeDasharray="2 2" />
  </svg>
);

const IconShield = ({ color }: { color: string }) => (
  <svg width="22" height="22" viewBox="0 0 40 40" fill="none">
    <path d="M20 4L7 10v9c0 8 5.5 14 13 16 7.5-2 13-8 13-16V10L20 4z" stroke={color} strokeWidth="2.2" strokeLinejoin="round" />
    <polyline points="13.5,20 17.5,24.5 26.5,15" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconAuto = ({ color }: { color: string }) => (
  <svg width="22" height="22" viewBox="0 0 40 40" fill="none">
    <path d="M8 19L20 8l12 11" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 19v12h16V19" stroke={color} strokeWidth="2.2" strokeLinejoin="round" />
    <circle cx="17" cy="25" r="2" stroke={color} strokeWidth="1.8" />
    <circle cx="23" cy="25" r="2" stroke={color} strokeWidth="1.8" />
    <line x1="19" y1="25" x2="21" y2="25" stroke={color} strokeWidth="1.8" />
    <line x1="17" y1="23" x2="17" y2="21" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <line x1="23" y1="23" x2="23" y2="21" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const SERVICES = [
  {
    id: "iluminacion",
    Icon: IconLuz,
    title: "Iluminación inteligente",
    tagline: "",
    description: "Convertimos tus interruptores tradicionales en inteligentes para que puedas controlar y automatizar la iluminación de tu hogar de una forma más simple.",
    accent: "#F59E0B",
    image: "/images/services/iluminacion.webp",
    features: [
      "Control por voz, app o rutina automática",
      "Escenas personalizadas con un toque",
      "Se apaga solo cuando no hay nadie",
    ],
    ecosystems: ["alexa", "google", "ha"],
  },
  {
    id: "ecosistemas",
    Icon: IconHub,
    title: "Ecosistemas conectados",
    tagline: "",
    description: "Centralizamos Alexa, Google Home y Home Assistant en un solo panel.",
    accent: "#3B82F6",
    image: "/images/services/ecosistema.webp",
    features: [
      "Un solo lugar para controlar todo tu hogar.",
      "Compatible con Google, Alexa y Home Assistant.",
      "Configuración flexible para cada espacio.",
    ],
    ecosystems: ["alexa", "google", "ha"],
  },
  {
    id: "seguridad",
    Icon: IconShield,
    title: "Seguridad inteligente",
    tagline: "",
    description: "Cerraduras WiFi, cámaras y timbres con video integrados. Ves lo que pasa en tu casa en tiempo real y recibís alertas al instante si algo ocurre fuera de lo normal.",
    accent: "#EF4444",
    image: "/images/services/seguridad.webp",
    features: [
      "Cerraduras WiFi y cámaras con visión nocturna",
      "Alertas al instante en tu celular",
      "Historial completo de accesos",
    ],
    ecosystems: ["alexa", "google", "ha"],
  },

];

const panelVariants = {
  enter: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.22, ease: [0.4, 0, 1, 1] } },
};

const listVariants = {
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};
const listItemVariants = {
  enter: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } },
};

const imageVariants = {
  enter: { opacity: 0, scale: 1.04 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 0.97, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } },
};

const DURATION = 4000; // ms por servicio

export function SistemasSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const pausedRef = useRef(false);
  const startRef = useRef<number>(Date.now());
  const rafRef = useRef<number | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);

  // Avanzar al siguiente servicio (solo actualiza React state para cambiar la card)
  const advance = useCallback(() => {
    const next = (activeIndexRef.current + 1) % SERVICES.length;
    activeIndexRef.current = next;
    startRef.current = Date.now();
    setActiveIndex(next);
  }, []);

  // RAF loop — actualiza el DOM directamente, sin re-renders de React
  useEffect(() => {
    const tick = () => {
      if (!pausedRef.current) {
        const pct = Math.min((Date.now() - startRef.current) / DURATION, 1);
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${pct * 100}%`;
        }
        if (pct >= 1) {
          advance();
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [advance]);

  // Reiniciar barra al cambiar de servicio
  useEffect(() => {
    startRef.current = Date.now();
    if (progressBarRef.current) progressBarRef.current.style.width = "0%";
  }, [activeIndex]);

  const select = (i: number) => {
    activeIndexRef.current = i;
    startRef.current = Date.now();
    setActiveIndex(i);
  };

  const svc = SERVICES[activeIndex];

  return (
    <section
      id="productos"
      className="relative bg-[#fdf8f4] py-16 sm:py-24"
    >
      <div className="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#fab257]/6 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-lumos-primary/5 blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-8">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-lumos-primary mb-3">Servicios</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-black leading-tight">
            Todo lo que tu hogar{" "}
            <span className="italic font-normal text-lumos-primary">necesita.</span>
          </h2>
        </div>

        {/* Tabs — íconos + nombre */}
        <div className="flex gap-2 sm:gap-3 mb-10 overflow-x-auto pb-1 scrollbar-hide">
          {SERVICES.map(({ id, Icon, title, accent }, i) => {
            const active = activeIndex === i;
            return (
              <button
                key={id}
                type="button"
                aria-label={title}
                onClick={() => select(i)}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-sm font-semibold shrink-0 transition-all duration-300 cursor-pointer"
                style={{
                  background: active ? "white" : "transparent",
                  borderColor: active ? accent : "rgba(0,0,0,0.10)",
                  color: active ? "rgba(0,0,0,0.85)" : "rgba(0,0,0,0.45)",
                  boxShadow: active ? `0 2px 12px rgba(0,0,0,0.07)` : "none",
                }}
              >
                <Icon color={active ? accent : "rgba(0,0,0,0.35)"} />
                <span className="hidden sm:inline">{title}</span>
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <div
          className="rounded-3xl border border-black/[0.06] overflow-hidden bg-white"
          style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.06)" }}
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => { pausedRef.current = false; }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={svc.id}
              variants={panelVariants}
              initial="enter"
              animate="visible"
              exit="exit"
              className="flex flex-col md:flex-row"
            >
              {/* LEFT — texto */}
              <div className="flex-1 p-7 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: `${svc.accent}18`,
                        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.8)`,
                      }}
                    >
                      <svc.Icon color={svc.accent} />
                    </div>
                    <p className="text-xs font-bold tracking-[0.18em] uppercase" style={{ color: svc.accent }}>
                      {svc.tagline}
                    </p>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-black mb-3 leading-tight">
                    {svc.title}
                  </h3>
                  <p className="text-sm text-black/55 leading-relaxed mb-7 max-w-sm">
                    {svc.description}
                  </p>

                  <motion.ul className="space-y-2.5 mb-8" variants={listVariants}>
                    {svc.features.map((feat, fi) => (
                      <motion.li
                        key={fi}
                        variants={listItemVariants}
                        className="flex items-start gap-2.5"
                      >
                        <Check size={13} className="mt-0.5 shrink-0" style={{ color: svc.accent }} />
                        <span className="text-sm text-black/65">{feat}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>

                {/* Footer del panel */}
                <div className="flex flex-wrap items-center gap-4 pt-5 border-t border-black/[0.06]">
                  <div className="flex gap-1.5">
                    {svc.ecosystems.map((eco) => {
                      const entry = ECOSYSTEMS[eco];
                      if (!entry) return null;
                      const { Logo, label } = entry;
                      return (
                        <div key={eco} title={label} className="w-7 h-7 rounded-lg overflow-hidden ring-1 ring-black/[0.07] bg-white flex items-center justify-center p-0.5">
                          <Logo />
                        </div>
                      );
                    })}
                  </div>
                  <a
                    href="#contacto"
                    className="ml-auto text-xs font-bold uppercase tracking-widest text-white px-5 py-2.5 rounded-full transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                    style={{ background: LUMOS_PRIMARY_HEX }}
                  >
                    Consultar
                  </a>
                </div>
              </div>

              {/* RIGHT — foto */}
              <div className="md:w-56 lg:w-72 shrink-0 relative overflow-hidden">
                <div className="h-48 md:h-full min-h-[200px] relative">
                  <motion.div
                    className="absolute inset-0"
                    variants={imageVariants}
                    initial="enter"
                    animate="visible"
                    exit="exit"
                  >
                    <Image
                      src={svc.image}
                      alt={svc.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 300px"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.25) 100%)" }}
                    />
                  </motion.div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Progress bar — borde inferior de la card */}
          <div className="h-[3px] w-full" style={{ background: `${svc.accent}20` }}>
            <div
              ref={progressBarRef}
              className="h-full"
              style={{ width: "0%", background: svc.accent }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
