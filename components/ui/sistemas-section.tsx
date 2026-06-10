import { Lightbulb, Wind, Shield, Cpu } from "lucide-react";

const items = [
  {
    Icon: Lightbulb,
    title: "Iluminación Adaptativa",
    desc: "Escenas de luz que evolucionan con tu rutina. Del amanecer productivo a la noche relajante, sin intervención.",
    tag: "Ambiente",
  },
  {
    Icon: Wind,
    title: "Clima Inteligente",
    desc: "Tu espacio a la temperatura perfecta, siempre. Integración total con AC, calefacción y ventilación.",
    tag: "Confort",
  },
  {
    Icon: Shield,
    title: "Seguridad 360°",
    desc: "Cámaras y sensores que aprenden lo que es normal en tu hogar. Alertas inteligentes, sin falsas alarmas.",
    tag: "Protección",
  },
  {
    Icon: Cpu,
    title: "Hub Central",
    desc: "Un cerebro que unifica todos tus dispositivos. Control por voz, app móvil o completamente automático.",
    tag: "Ecosistema",
  },
];

export function SistemasSection() {
  return (
    <section id="productos" className="py-24 px-8 bg-[#111117]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#fab359]">Sistemas</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            Todo lo que tu hogar necesita
          </h2>
          <p className="text-white/45 text-sm max-w-md mx-auto leading-relaxed">
            Cada sistema diseñado para trabajar en armonía. Solo o integrado, Lumos se adapta a vos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map(({ Icon, title, desc, tag }) => (
            <div
              key={title}
              className="group glass-panel rounded-2xl p-7 hover:glow-active transition-all duration-500 cursor-pointer flex flex-col gap-5"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#c5704b]/15 flex items-center justify-center group-hover:bg-[#c5704b]/25 transition-colors">
                  <Icon size={22} className="text-[#c5704b]" />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-[#fab359]/80 font-semibold bg-[#fab359]/10 px-2.5 py-1 rounded-full">
                  {tag}
                </span>
              </div>

              <div className="flex-1">
                <h3 className="text-white font-bold text-base mb-2">{title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
              </div>

              <div className="pt-3 border-t border-white/[0.06]">
                <span className="text-[#c5704b] text-xs font-semibold uppercase tracking-wider group-hover:text-[#fab359] transition-colors">
                  Conocer más →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
