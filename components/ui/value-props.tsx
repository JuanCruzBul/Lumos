"use client";

import { Smartphone, ShieldCheck, Wrench, Wifi, Zap, Brain } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const features = [
  {
    icon: Smartphone,
    title: "Control total desde el celular",
    tagline: "Tu hogar en el bolsillo",
    description:
      "Desde la app controlás luces, temperatura, cerraduras y cámaras en tiempo real — estés en casa o al otro lado del mundo. La interfaz es simple: un toque y el sistema responde.",
    detail: "Compatible con iOS y Android. Sin configuración técnica de tu parte.",
  },
  {
    icon: ShieldCheck,
    title: "Seguridad que trabaja sola",
    tagline: "Protección continua, sin interrupciones",
    description:
      "Tu sistema detecta movimiento, registra accesos y te notifica al instante si algo ocurre fuera de lo normal. Las cerraduras inteligentes y cámaras integradas generan un historial completo de actividad.",
    detail: "Alertas en tiempo real. Registros automáticos. Acceso remoto seguro.",
  },
  {
    icon: Brain,
    title: "Automatizaciones que aprenden",
    tagline: "La inteligencia hace el trabajo",
    description:
      "Configuramos rutinas que se adaptan a tu vida: las luces bajan solas a la noche, el clima se regula cuando salís, la música empieza cuando llegás. El hogar responde sin que vos hagas nada.",
    detail: "Integración con Alexa, Google Home y Home Assistant.",
  },
  {
    icon: Wifi,
    title: "Red local y privada",
    tagline: "Tus datos nunca salen de tu casa",
    description:
      "El cerebro del sistema es un servidor que se instala dentro de tu hogar. Sin depender de servidores externos ni suscripciones a la nube. Tu información es tuya — siempre.",
    detail: "Basado en Home Assistant. Funciona incluso sin internet.",
  },
  {
    icon: Zap,
    title: "Eficiencia energética real",
    tagline: "Menos consumo, más confort",
    description:
      "El sistema monitorea el consumo eléctrico en tiempo real y detecta dispositivos encendidos innecesariamente. Automatizamos el apagado en zonas vacías y optimizamos el uso del clima.",
    detail: "Panel de consumo en vivo. Reportes semanales. Ahorro verificable.",
  },
  {
    icon: Wrench,
    title: "Nosotros instalamos todo",
    tagline: "Sin tecnicismos, sin complicaciones",
    description:
      "No necesitás saber nada de tecnología. Nuestro equipo se encarga del relevamiento, la instalación y la configuración completa. Te acompañamos en cada paso hasta que tu hogar funcione exactamente como querés.",
    detail: "Instalación profesional. Soporte posterior incluido.",
  },
];

export function ValueProps() {
  const { ref, inView } = useInView(0.05);

  return (
    <section ref={ref} className="py-20 relative z-10 bg-[#fefefe]">
      <div className="max-w-6xl mx-auto px-8">

        {/* Header */}
        <div
          className="mb-14 transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)" }}
        >
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#c5704b] mb-3">
            Por qué Lumos
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-black leading-tight max-w-lg">
            Todo lo que necesitás para un hogar{" "}
            <span className="italic font-normal text-[#c5704b]">verdaderamente inteligente.</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-black/[0.06] rounded-2xl overflow-hidden border border-black/[0.06]">
          {features.map(({ icon: Icon, title, tagline, description, detail }, i) => (
            <div
              key={title}
              className="bg-[#fefefe] p-8 group hover:bg-[#fdf8f4] transition-colors duration-300"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.6s ease ${i * 80}ms, transform 0.6s ease ${i * 80}ms, background-color 0.3s`,
              }}
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-xl bg-[#c5704b]/08 flex items-center justify-center mb-5 group-hover:bg-[#c5704b]/15 transition-colors duration-300"
                style={{ background: "rgba(197,112,75,0.08)" }}>
                <Icon size={20} className="text-[#c5704b]" />
              </div>

              {/* Tagline */}
              <p className="text-[11px] font-bold tracking-widest uppercase text-[#c5704b] mb-2">
                {tagline}
              </p>

              {/* Title */}
              <h3 className="text-[17px] font-bold text-black mb-3 leading-snug">
                {title}
              </h3>

              {/* Description */}
              <p className="text-sm text-black/70 leading-relaxed mb-4">
                {description}
              </p>

              {/* Detail line */}
              <p className="text-xs text-black/55 font-medium border-t border-black/[0.06] pt-3">
                {detail}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
