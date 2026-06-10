import { Lightbulb, Shield, Cpu, Zap } from "lucide-react";

const items = [
  {
    Icon: Lightbulb,
    title: "Iluminación Inteligente",
    desc: "Instalamos switches y luces inteligentes en cualquier punto de tu hogar. Controlás desde el celular, con la voz o de forma automática por horario.",
    tag: "Iluminación",
  },
  {
    Icon: Cpu,
    title: "Ecosistemas Conectados",
    desc: "Integramos Alexa, Google Home y Home Assistant para que todos tus dispositivos trabajen juntos desde un solo lugar, sin importar la marca.",
    tag: "Ecosistema",
  },
  {
    Icon: Shield,
    title: "Seguridad Inteligente",
    desc: "Instalamos cerraduras inteligentes y cámaras Wi-Fi con acceso remoto. Sabés quién entra a tu casa y recibís alertas cuando importa.",
    tag: "Seguridad",
  },
  {
    Icon: Zap,
    title: "Automatizaciones a Medida",
    desc: "Creamos rutinas personalizadas: que las luces se apaguen solas, las cortinas se abran al amanecer o el clima se active al llegar a casa.",
    tag: "Automatización",
  },
];

export function SistemasSection() {
  return (
    <section id="productos" className="py-24 px-8 bg-[#fdf8f4]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#c5704b]">Servicios</span>
          <h2 className="text-4xl md:text-5xl font-bold text-black mt-3 mb-4">
            Todo lo que tu hogar necesita
          </h2>
          <p className="text-black/40 text-sm max-w-md mx-auto leading-relaxed">
            Soluciones simples, instaladas por nosotros. Solo tenés que disfrutar de tu hogar inteligente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map(({ Icon, title, desc, tag }) => (
            <div
              key={title}
              className="group glass-panel rounded-2xl p-7 hover:glow-active transition-all duration-500 cursor-pointer flex flex-col gap-5"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#c5704b]/10 flex items-center justify-center group-hover:bg-[#c5704b]/20 transition-colors">
                  <Icon size={22} className="text-[#c5704b]" />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-[#c5704b] font-semibold bg-[#c5704b]/10 px-2.5 py-1 rounded-full">
                  {tag}
                </span>
              </div>

              <div className="flex-1">
                <h3 className="text-black font-bold text-base mb-2">{title}</h3>
                <p className="text-black/45 text-sm leading-relaxed">{desc}</p>
              </div>

              <div className="pt-3 border-t border-black/[0.07]">
                <span className="text-[#c5704b] text-xs font-semibold uppercase tracking-wider group-hover:text-[#fab257] transition-colors">
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
