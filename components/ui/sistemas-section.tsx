"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, Shield, Cpu, Zap, X, Check } from "lucide-react";
import Image from "next/image";

// ── Ecosystem brand logos (inline SVG) ───────────────────────────────────────

function AlexaLogo() {
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="64" height="64" rx="13" fill="#232F3E" />
      <circle cx="32" cy="29" r="14" stroke="#00CAFF" strokeWidth="2.5" fill="none" />
      <path d="M19 38 Q32 49 45 38" stroke="#00CAFF" strokeWidth="2.8" strokeLinecap="round" fill="none" />
      <circle cx="32" cy="25" r="4" fill="#00CAFF" />
    </svg>
  );
}

function GoogleHomeLogo() {
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="64" height="64" rx="13" fill="white" stroke="#E8E8E8" strokeWidth="1.5" />
      {/* Google G — four colored arcs + crossbar */}
      <path d="M32 13 A19 19 0 0 1 51 32" stroke="#EA4335" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M51 32 A19 19 0 0 1 32 51" stroke="#FBBC05" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M32 51 A19 19 0 0 1 13 32" stroke="#34A853" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M13 32 A19 19 0 0 1 32 13" stroke="#4285F4" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M32 32 H51" stroke="#4285F4" strokeWidth="5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function HomeAssistantLogo() {
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="64" height="64" rx="13" fill="#18BCF2" />
      {/* Three interconnected nodes — HA node topology / house shape */}
      <circle cx="32" cy="15" r="6.5" fill="white" />
      <circle cx="15" cy="46" r="6.5" fill="white" />
      <circle cx="49" cy="46" r="6.5" fill="white" />
      <line x1="32" y1="15" x2="15" y2="46" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <line x1="32" y1="15" x2="49" y2="46" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <line x1="15" y1="46" x2="49" y2="46" stroke="white" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function HomeKitLogo() {
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="64" height="64" rx="13" fill="#1C1C1E" />
      <path d="M32 13 L51 29 V52 H13 V29 Z" stroke="white" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
      <rect x="25.5" y="38" width="13" height="14" rx="6.5" fill="white" />
    </svg>
  );
}

const ECOSYSTEMS: Record<string, { Logo: () => React.ReactElement; label: string }> = {
  alexa:    { Logo: AlexaLogo,         label: "Amazon Alexa"  },
  google:   { Logo: GoogleHomeLogo,    label: "Google Home"   },
  ha:       { Logo: HomeAssistantLogo, label: "Home Assistant" },
  homekit:  { Logo: HomeKitLogo,       label: "Apple HomeKit" },
};

// ── Service data ─────────────────────────────────────────────────────────────

type Service = {
  id: string;
  Icon: React.ElementType;
  title: string;
  tagline: string;
  cardDesc: string;
  tag: string;
  accent: string;
  image: string;
  description: string;
  features: string[];
  brands: string[];
  ecosystems: string[];
};

const SERVICES: Service[] = [
  {
    id: "iluminacion",
    Icon: Lightbulb,
    title: "Iluminación Inteligente",
    tagline: "Tu hogar responde a tu voz, tu app o el horario",
    cardDesc:
      "Instalamos switches y luces inteligentes en cualquier punto de tu hogar. Controlás desde el celular, con la voz o de forma automática por horario.",
    tag: "Iluminación",
    accent: "#F59E0B",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85",
    description:
      "Reemplazamos tus interruptores convencionales por switches WiFi sin romper paredes ni hacer obras. En un solo día tu hogar puede responder a tu voz, una app o un horario programado.",
    features: [
      "Switches WiFi instalados en un día, sin obras",
      "Control por voz con Alexa, Google Assistant o Siri",
      "Escenas personalizadas: Cine, Lectura, Bienvenida",
      "Horarios, temporizadores y modo ausente",
      "Atenuación y temperatura de color ajustable",
      "Acceso remoto desde cualquier lugar del mundo",
    ],
    brands: ["Sonoff", "Shelly", "Philips Hue", "IKEA Tradfri"],
    ecosystems: ["alexa", "google", "ha"],
  },
  {
    id: "ecosistemas",
    Icon: Cpu,
    title: "Ecosistemas Conectados",
    tagline: "Una app, una voz. Todo bajo control",
    cardDesc:
      "Integramos Alexa, Google Home y Home Assistant para que todos tus dispositivos trabajen juntos desde un solo lugar, sin importar la marca.",
    tag: "Ecosistema",
    accent: "#3B82F6",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=900&q=85",
    description:
      "No importa la marca de tus dispositivos. Configuramos Alexa, Google Home o Home Assistant para centralizar el control de todo tu hogar en un solo lugar, con una sola voz.",
    features: [
      "Integración multi-marca sin fricciones ni hubs extra",
      "Panel de control centralizado (dashboard propio)",
      "Automatizaciones cruzadas entre distintos ecosistemas",
      "Home Assistant local: privacidad 100% tuya",
      "Rutinas de voz para toda la familia",
      "Perfiles de acceso separados por miembro del hogar",
    ],
    brands: [],
    ecosystems: ["alexa", "google", "ha", "homekit"],
  },
  {
    id: "seguridad",
    Icon: Shield,
    title: "Seguridad Inteligente",
    tagline: "Sabés quién entra. Desde donde estés",
    cardDesc:
      "Instalamos cerraduras inteligentes y cámaras Wi-Fi con acceso remoto. Sabés quién entra a tu casa y recibís alertas cuando importa.",
    tag: "Seguridad",
    accent: "#EF4444",
    image: "https://images.unsplash.com/photo-1557858310-9052820906f7?w=900&q=85",
    description:
      "Cerraduras WiFi, cámaras IP y timbres con video. Recibís notificaciones instantáneas, ves video en vivo desde cualquier parte y controlás quién puede entrar a tu casa.",
    features: [
      "Cerraduras WiFi: abrí con el celular, sin llave física",
      "Cámaras IP con visión nocturna en color",
      "Timbre con video y audio bidireccional",
      "Alertas instantáneas por movimiento o apertura de puerta",
      "Historial de accesos con fecha, hora y foto",
      "Acceso temporal para visitas o personal de servicio",
    ],
    brands: ["Yale", "August", "TP-Link Tapo", "Reolink"],
    ecosystems: ["alexa", "google", "ha"],
  },
  {
    id: "automatizaciones",
    Icon: Zap,
    title: "Automatizaciones a Medida",
    tagline: "Tu hogar anticipa lo que necesitás",
    cardDesc:
      "Creamos rutinas personalizadas: que las luces se apaguen solas, las cortinas se abran al amanecer o el clima se active al llegar a casa.",
    tag: "Automatización",
    accent: "#8B5CF6",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=900&q=85",
    description:
      "Diseñamos rutinas inteligentes para tu estilo de vida. Desde que el clima se active cuando llegás hasta que las cortinas se abran al amanecer, tu hogar trabaja por vos.",
    features: [
      '"Buenos días": luces suaves + temperatura al despertar',
      '"Llegué a casa": todo se activa al detectar tu celular',
      '"Modo cine": luces, persianas y TV en un toque',
      '"Buenas noches": todo apagado con una sola palabra',
      '"Modo ausente": simula presencia cuando viajás',
      "Integración con clima local, calendario y ubicación",
    ],
    brands: [],
    ecosystems: ["alexa", "google", "ha"],
  },
];

// ── Modal ────────────────────────────────────────────────────────────────────

function ServiceModal({ service, onClose }: { service: Service; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-[6px]"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Panel */}
      <motion.div
        className="relative z-10 w-full md:max-w-[860px] bg-white rounded-t-[28px] md:rounded-[28px] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[93vh] md:max-h-[84vh]"
        initial={{ y: 80, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 80, opacity: 0, scale: 0.96 }}
        transition={{ type: "spring", damping: 30, stiffness: 320, mass: 0.8 }}
      >
        {/* ── Image column ── */}
        <div className="relative w-full h-52 flex-shrink-0 md:w-[42%] md:h-auto">
          {/* Drag handle (mobile) */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-9 h-1 rounded-full bg-white/50 z-10 md:hidden" />

          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 42vw"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-transparent" />

          {/* Mobile tag badge on image */}
          <div className="absolute bottom-4 left-5 md:hidden">
            <span
              className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full text-white"
              style={{ background: service.accent }}
            >
              {service.tag}
            </span>
          </div>

          {/* Desktop: accent band at bottom of image */}
          <div
            className="hidden md:block absolute bottom-0 left-0 right-0 h-1"
            style={{ background: `linear-gradient(to right, ${service.accent}, transparent)` }}
          />
        </div>

        {/* ── Content column ── */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-7 md:p-9 flex flex-col gap-6">

          {/* Header */}
          <div className="flex items-start gap-3 justify-between">
            <div className="flex-1 min-w-0">
              <span
                className="hidden md:inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-2.5 text-white"
                style={{ background: service.accent }}
              >
                {service.tag}
              </span>
              <h2 className="text-[1.6rem] font-bold text-black leading-snug">{service.title}</h2>
              <p className="text-sm text-black/40 mt-1 font-medium">{service.tagline}</p>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 mt-1 w-9 h-9 rounded-full bg-black/[0.06] hover:bg-black/[0.11] transition-colors flex items-center justify-center"
            >
              <X size={15} className="text-black/55" />
            </button>
          </div>

          {/* Description */}
          <p className="text-sm text-black/55 leading-relaxed -mt-2">{service.description}</p>

          {/* Features */}
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-black/28 mb-3">
              Qué incluye
            </p>
            <ul className="space-y-2.5">
              {service.features.map((feat, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-black/65"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.28 }}
                >
                  <Check
                    size={14}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: service.accent }}
                  />
                  {feat}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Compatible brands */}
          {service.brands.length > 0 && (
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-black/28 mb-2.5">
                Marcas disponibles
              </p>
              <div className="flex flex-wrap gap-2">
                {service.brands.map((b) => (
                  <span
                    key={b}
                    className="text-xs font-semibold text-black/45 bg-black/[0.05] px-3 py-1 rounded-full"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Ecosystem logos */}
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-black/28 mb-3.5">
              Compatible con
            </p>
            <div className="flex gap-4 flex-wrap">
              {service.ecosystems.map((eco, i) => {
                const entry = ECOSYSTEMS[eco];
                if (!entry) return null;
                const { Logo, label } = entry;
                return (
                  <motion.div
                    key={eco}
                    className="flex flex-col items-center gap-1.5"
                    initial={{ opacity: 0, scale: 0.7, y: 6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      delay: 0.28 + i * 0.07,
                      type: "spring",
                      stiffness: 380,
                      damping: 22,
                    }}
                  >
                    <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-sm ring-1 ring-black/[0.07]">
                      <Logo />
                    </div>
                    <span className="text-[9px] text-black/35 font-medium text-center leading-tight w-14">
                      {label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-auto pt-5 border-t border-black/[0.07]">
            <a
              href="#contacto"
              onClick={onClose}
              className="block w-full text-center text-white text-xs font-bold uppercase tracking-widest py-4 rounded-2xl transition-all active:scale-[0.98] hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #c5704b 0%, #fab257 100%)",
              }}
            >
              Consultar sobre este servicio
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Section ──────────────────────────────────────────────────────────────────

export function SistemasSection() {
  const [active, setActive] = useState<Service | null>(null);

  return (
    <>
      <section id="productos" className="relative min-h-screen flex flex-col justify-center py-24 px-8 bg-[#fefefe] overflow-hidden">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-24 -left-16 w-96 h-96 rounded-full bg-[#c5704b]/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-16 w-96 h-96 rounded-full bg-[#fab257]/5 blur-3xl" />

        <div className="relative max-w-6xl mx-auto">

          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#c5704b]/80">
              Servicios
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight">
              Todo lo que tu hogar{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #c5704b 0%, #fab257 100%)" }}
              >
                necesita.
              </span>
            </h2>
            <p className="text-black/55 text-base max-w-xl mx-auto leading-relaxed font-medium">
              Soluciones simples, instaladas por nosotros. Solo tenés que disfrutar de tu hogar inteligente.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, i) => {
              const { Icon, title, cardDesc } = service;
              return (
                <motion.button
                  key={service.id}
                  onClick={() => setActive(service)}
                  className="group glass-panel rounded-xl p-8 hover:glow-active hover:-translate-y-2 transition-all duration-[400ms] cursor-pointer flex flex-col items-start gap-6 text-left w-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="w-12 h-12 rounded-lg bg-[#c5704b]/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-[#c5704b]/20">
                    <Icon size={22} className="text-[#c5704b]" />
                  </div>

                  <div className="flex-1 space-y-3">
                    <h3 className="text-black font-semibold text-xl">{title}</h3>
                    <p className="text-black/55 text-sm leading-relaxed">{cardDesc}</p>
                  </div>

                  <div className="mt-auto pt-4 flex items-center gap-1">
                    <span className="text-xs font-bold text-[#c5704b] group-hover:underline">
                      Conocer más
                    </span>
                    <span className="text-xs font-bold text-[#c5704b] transition-transform duration-200 group-hover:translate-x-0.5">
                      →
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Bottom social proof */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#c5704b]/20 bg-[#fdf8f4]">
              <div className="flex -space-x-2">
                {["JC","MR","AG","LP"].map((initials) => (
                  <div key={initials} className="w-6 h-6 rounded-full border-2 border-white bg-[#c5704b]/20 flex items-center justify-center">
                    <span className="text-[7px] font-bold text-[#c5704b]">{initials}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs font-semibold text-black/50 uppercase tracking-widest">
                Más de 30 hogares ya automatizados
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {active && (
          <ServiceModal
            key={active.id}
            service={active}
            onClose={() => setActive(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
