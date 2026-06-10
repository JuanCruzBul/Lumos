import { Smartphone, ShieldCheck, Wrench } from "lucide-react";

const features = [
  {
    icon: Smartphone,
    title: "Control Total desde el Celular",
    description:
      "Manejá las luces, el clima y la seguridad de tu hogar desde cualquier lugar del mundo. Si tenés señal, tenés control.",
  },
  {
    icon: ShieldCheck,
    title: "Más Seguridad, Menos Preocupaciones",
    description:
      "Cerraduras y cámaras que te avisan cuando importa. Salís tranquilo sabiendo que tu hogar está protegido.",
  },
  {
    icon: Wrench,
    title: "Nosotros Instalamos Todo",
    description:
      "No necesitás saber de tecnología. Nuestro equipo instala, configura y te enseña a usar tu hogar inteligente en un solo día.",
  },
];

export function ValueProps() {
  return (
    <section className="py-20 relative z-10 bg-[#fefefe]">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="glass-panel p-12 rounded-xl hover:glow-active transition-all duration-500 group"
            >
              <div className="w-12 h-12 rounded-full bg-[#c5704b]/10 flex items-center justify-center mb-6 group-hover:bg-[#c5704b]/20 transition-colors">
                <Icon size={28} className="text-[#c5704b]" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-3">
                {title}
              </h3>
              <p className="text-base font-normal text-black/55 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
