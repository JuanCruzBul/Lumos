import { Sun, ShieldCheck, Leaf } from "lucide-react";

const features = [
  {
    icon: Sun,
    title: "Control Atmosférico",
    description:
      "Iluminación dinámica que transita sin esfuerzo desde la claridad del día hasta la calidez de la noche.",
  },
  {
    icon: ShieldCheck,
    title: "Seguridad Avanzada",
    description:
      "Protección invisible. Sensores con contexto que distinguen entre lo habitual y lo anómalo.",
  },
  {
    icon: Leaf,
    title: "Eficiencia Ecológica",
    description:
      "Gestión climática inteligente que optimiza el consumo energético sin sacrificar el confort.",
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
