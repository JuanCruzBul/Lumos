"use client";

import React, { useEffect, useState } from "react";
import { Lightbulb, Shield, Cpu, Zap, Check } from "lucide-react";
import Image from "next/image";

// ── Ecosystem logos ───────────────────────────────────────────────────────────

function AlexaLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="5" fill="#232F3E"/>
      <path fill="#00CAFF" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10c1.787 0 3.458-.392 4.966-1.088a.96.96 0 0 0-.832-1.735A8.33 8.33 0 0 1 12 20.33C7.4 20.33 3.67 16.6 3.67 12S7.4 3.67 12 3.67 20.33 7.4 20.33 12a8.32 8.32 0 0 1-1.572 4.878.96.96 0 1 0 1.565 1.116A10 10 0 0 0 22 12C22 6.477 17.523 2 12 2zm-.15 3.833c-3 0-5.417 2.417-5.417 5.417s2.417 5.417 5.417 5.417c1.014 0 1.96-.28 2.75-.762v.845a.417.417 0 0 0 .833 0v-5.567c-.155-2.863-2.5-5.35-3.583-5.35z"/>
    </svg>
  );
}

function GoogleHomeLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="5" fill="white" stroke="#E0E0E0" strokeWidth="0.5"/>
      <path d="M21.8 12.204c0-.698-.063-1.37-.18-2.018H12v3.815h5.506a4.706 4.706 0 0 1-2.04 3.086v2.566h3.305c1.933-1.78 3.03-4.404 3.03-7.449z" fill="#4285F4"/>
      <path d="M12 22c2.766 0 5.087-.917 6.772-2.48l-3.305-2.566c-.916.614-2.087.975-3.467.975-2.666 0-4.924-1.8-5.731-4.22H2.877v2.644A10 10 0 0 0 12 22z" fill="#34A853"/>
      <path d="M6.269 13.709A6.02 6.02 0 0 1 5.952 12c0-.596.102-1.175.317-1.709V7.647H2.877A10 10 0 0 0 2 12c0 1.614.387 3.14 1.067 4.5l3.202-2.791z" fill="#FBBC05"/>
      <path d="M12 5.581c1.505 0 2.855.518 3.917 1.533l2.939-2.938A9.94 9.94 0 0 0 12 2 10 10 0 0 0 2.877 7.647l3.392 2.644C7.076 7.873 9.334 5.581 12 5.581z" fill="#EA4335"/>
    </svg>
  );
}

function HomeAssistantLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="5" fill="#18BCF2"/>
      <path fill="white" d="M21.82 13.5c0-2.65-1.42-5.06-3.72-6.36L12 3.68 5.9 7.14C3.6 8.44 2.18 10.85 2.18 13.5v.07l1.82-1.04V12.5c0-2.07 1.1-3.97 2.9-5L12 4.04l5.1 2.99c1.8 1.03 2.9 2.93 2.9 5v.47l1.82 1.04v-.1zM8.5 11.4v2.35c0 .23.13.44.33.55L12 16.07l3.17-1.77c.2-.11.33-.32.33-.55V11.4L12 13.37 8.5 11.4zm7.9-1.05L12 8.38 7.6 10.35 12 12.7l4.4-2.35zM12 17.5l-3.67-2.09a.65.65 0 0 1-.33-.56v-2.7L4 10.6v2.9c0 .23.12.44.33.56L12 18.5l7.67-4.44A.65.65 0 0 0 20 13.5v-2.9l-4 1.55v2.7c0 .23-.13.44-.33.56L12 17.5z"/>
    </svg>
  );
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
  alexa:   { Logo: AlexaLogo,         label: "Amazon Alexa"  },
  google:  { Logo: GoogleHomeLogo,    label: "Google Home"   },
  ha:      { Logo: HomeAssistantLogo, label: "Home Assistant" },
  homekit: { Logo: HomeKitLogo,       label: "Apple HomeKit" },
};

// ── Data ──────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: "iluminacion",
    Icon: Lightbulb,
    title: "Iluminación inteligente",
    tagline: "Tu hogar responde a tu voz, tu app o el horario",
    accent: "#F59E0B",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85",
    description:
      "Reemplazamos tus interruptores convencionales por switches WiFi sin romper paredes ni hacer obras. En un solo día tu hogar puede responder a tu voz, una app o un horario programado. La iluminación deja de ser algo que simplemente encendés o apagás, y se convierte en parte de la experiencia de vivir en tu casa.",
    features: [
      "Switches WiFi instalados en un día, sin obras ni cableado nuevo",
      "Control por voz con Alexa, Google Assistant o Siri",
      "Escenas personalizadas: Cine, Lectura, Bienvenida",
      "Horarios, temporizadores y modo ausente automático",
      "Atenuación y temperatura de color ajustable",
      "Acceso remoto desde cualquier lugar del mundo",
    ],
    brands: ["Sonoff", "Shelly", "Philips Hue", "IKEA Tradfri"],
    ecosystems: ["alexa", "google", "ha"],
  },
  {
    id: "ecosistemas",
    Icon: Cpu,
    title: "Ecosistemas conectados",
    tagline: "Una app, una voz. Todo bajo control",
    accent: "#3B82F6",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=900&q=85",
    description:
      "No importa la marca de tus dispositivos. Configuramos Alexa, Google Home o Home Assistant para centralizar el control de todo tu hogar en un solo lugar, con una sola voz. El corazón del sistema es un servidor local instalado dentro de tu casa — tus datos nunca salen de tu red, sin suscripciones mensuales ni dependencia de terceros.",
    features: [
      "Integración multi-marca sin fricciones ni hubs extra",
      "Panel de control centralizado con dashboard propio",
      "Automatizaciones cruzadas entre distintos ecosistemas",
      "Home Assistant local: privacidad 100% tuya, sin la nube",
      "Rutinas de voz para toda la familia",
      "Perfiles de acceso separados por miembro del hogar",
    ],
    brands: [],
    ecosystems: ["alexa", "google", "ha", "homekit"],
  },
  {
    id: "seguridad",
    Icon: Shield,
    title: "Seguridad inteligente",
    tagline: "Sabés quién entra. Desde donde estés",
    accent: "#EF4444",
    image: "https://images.unsplash.com/photo-1557858310-9052820906f7?w=900&q=85",
    description:
      "Cerraduras WiFi, cámaras IP y timbres con video. Recibís notificaciones instantáneas, ves video en vivo desde cualquier parte y controlás quién puede entrar a tu casa. El historial queda guardado localmente, sin depender de ningún servidor externo. Tu seguridad, en tus manos.",
    features: [
      "Cerraduras WiFi: abrí con el celular, sin llave física",
      "Cámaras IP con visión nocturna en color",
      "Timbre con video y audio bidireccional en tiempo real",
      "Alertas instantáneas por movimiento o apertura de puerta",
      "Historial de accesos con fecha, hora y captura de imagen",
      "Acceso temporal para visitas o personal de servicio",
    ],
    brands: ["Yale", "August", "TP-Link Tapo", "Reolink"],
    ecosystems: ["alexa", "google", "ha"],
  },
  {
    id: "automatizaciones",
    Icon: Zap,
    title: "Automatizaciones a medida",
    tagline: "Tu hogar anticipa lo que necesitás",
    accent: "#8B5CF6",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=900&q=85",
    description:
      "Diseñamos rutinas inteligentes para tu estilo de vida. Desde que el clima se active cuando llegás hasta que las cortinas se abran al amanecer, tu hogar trabaja por vos. Cada automatización se configura específicamente para tu familia, tus horarios y tus hábitos — nada genérico.",
    features: [
      '"Buenos días": luces suaves + temperatura al despertar',
      '"Llegué a casa": todo se activa al detectar tu celular en la red',
      '"Modo cine": luces, persianas y TV en un solo toque',
      '"Buenas noches": todo apagado con una sola palabra',
      '"Modo ausente": simula presencia cuando viajás',
      "Integración con clima local, calendario y ubicación GPS",
    ],
    brands: [],
    ecosystems: ["alexa", "google", "ha"],
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export function SistemasSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const select = (i: number) => {
    if (i === activeIndex) return;
    setVisible(false);
    setTimeout(() => {
      setActiveIndex(i);
      setAnimKey(k => k + 1);
      setVisible(true);
    }, 180);
  };

  // Reveal on first mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const svc = SERVICES[activeIndex];

  return (
    <section id="productos" className="relative bg-[#fdf8f4]">
      <div className="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#fab257]/6 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#c5704b]/5 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-8">

        {/* Section header */}
        <div className="pt-24 pb-14">
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#c5704b] mb-4">Servicios</p>
          <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight max-w-xl">
            Todo lo que tu hogar{" "}
            <span className="italic font-normal text-[#c5704b]">necesita.</span>
          </h2>
          <p className="text-black/65 text-[15px] mt-4 max-w-lg leading-relaxed">
            Seleccioná un servicio para conocer todos los detalles.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 pb-24">

          {/* LEFT — tab list */}
          <div className="lg:w-56 shrink-0">
            <div className="lg:sticky lg:top-28 flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {SERVICES.map(({ id, Icon, title, accent }, i) => (
                <button
                  key={id}
                  onClick={() => select(i)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-left shrink-0 transition-all duration-250 cursor-pointer"
                  style={{
                    background: activeIndex === i ? "rgba(197,112,75,0.09)" : "transparent",
                  }}
                >
                  <span
                    className="w-0.5 h-5 rounded-full shrink-0 transition-all duration-300"
                    style={{ background: activeIndex === i ? accent : "rgba(0,0,0,0.1)" }}
                  />
                  <Icon
                    size={15}
                    className="shrink-0 transition-colors duration-300"
                    style={{ color: activeIndex === i ? accent : "rgba(0,0,0,0.28)" }}
                  />
                  <span
                    className="text-sm font-semibold leading-snug whitespace-nowrap transition-colors duration-300"
                    style={{ color: activeIndex === i ? "rgba(0,0,0,0.90)" : "rgba(0,0,0,0.58)" }}
                  >
                    {title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT — single panel, animates on selection */}
          <div className="flex-1 min-w-0">
            <div
              key={animKey}
              className="flex flex-col gap-7 transition-all duration-400"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.35s ease, transform 0.35s ease",
              }}
            >
              {/* Image */}
              <div
                className="relative w-full rounded-2xl overflow-hidden"
                style={{
                  aspectRatio: "16/7",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)",
                }}
              >
                <Image
                  src={svc.image}
                  alt={svc.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 55%)" }} />
                <div className="absolute bottom-5 left-6 flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
                  >
                    <svc.Icon size={14} color="white" />
                  </div>
                  <span className="text-white text-xs font-bold tracking-wide">{svc.title}</span>
                </div>
              </div>

              {/* Text grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Description col */}
                <div
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateX(0)" : "translateX(-14px)",
                    transition: "opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s",
                  }}
                >
                  <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: svc.accent }}>
                    {svc.tagline}
                  </p>
                  <h3 className="text-2xl font-bold text-black mb-4 leading-tight">{svc.title}</h3>
                  <p className="text-sm text-black/72 leading-relaxed">{svc.description}</p>

                  {svc.brands.length > 0 && (
                    <div className="mt-5">
                      <p className="text-[11px] uppercase tracking-widest font-bold text-black/50 mb-2">Marcas disponibles</p>
                      <div className="flex flex-wrap gap-2">
                        {svc.brands.map((b) => (
                          <span key={b} className="text-xs font-semibold text-black/60 bg-black/[0.05] px-3 py-1 rounded-full">{b}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-5">
                    <p className="text-[11px] uppercase tracking-widest font-bold text-black/50 mb-3">Compatible con</p>
                    <div className="flex gap-3 flex-wrap">
                      {svc.ecosystems.map((eco) => {
                        const entry = ECOSYSTEMS[eco];
                        if (!entry) return null;
                        const { Logo, label } = entry;
                        return (
                          <div key={eco} className="flex flex-col items-center gap-1.5">
                            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm ring-1 ring-black/[0.07]"><Logo /></div>
                            <span className="text-[10px] text-black/55 font-medium text-center w-12 leading-tight">{label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Features col */}
                <div
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateX(0)" : "translateX(14px)",
                    transition: "opacity 0.4s ease 0.18s, transform 0.4s ease 0.18s",
                  }}
                >
                  <p className="text-[11px] uppercase tracking-widest font-bold text-black/50 mb-4">Qué incluye</p>
                  <ul className="space-y-3">
                    {svc.features.map((feat, fi) => (
                      <li
                        key={fi}
                        className="flex items-start gap-3"
                        style={{
                          opacity: visible ? 1 : 0,
                          transform: visible ? "translateY(0)" : "translateY(8px)",
                          transition: `opacity 0.35s ease ${0.22 + fi * 0.055}s, transform 0.35s ease ${0.22 + fi * 0.055}s`,
                        }}
                      >
                        <Check size={13} className="mt-0.5 shrink-0" style={{ color: svc.accent }} />
                        <span className="text-sm text-black/72 leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contacto"
                    className="inline-flex items-center gap-2 mt-8 text-xs font-bold uppercase tracking-widest text-white px-6 py-3 rounded-full transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                    style={{ background: "linear-gradient(135deg, #c5704b 0%, #fab257 100%)" }}
                  >
                    Consultar sobre este servicio
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
