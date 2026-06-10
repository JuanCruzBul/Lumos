const pasos = [
  {
    num: "01",
    title: "Consultá",
    desc: "Analizamos tu espacio y necesidades en una visita sin cargo.",
  },
  {
    num: "02",
    title: "Diseñamos",
    desc: "Creamos tu sistema a medida, pensado para tu estilo de vida.",
  },
  {
    num: "03",
    title: "Instalamos",
    desc: "Instalación profesional en 1 día. Sin obras, sin complicaciones.",
  },
  {
    num: "04",
    title: "Controlá",
    desc: "App, voz o automático. Tu hogar responde como vos querés.",
  },
];

export function ComoFuncionaSection() {
  return (
    <section id="proceso" className="py-24 px-8 bg-[#0d0d12]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#fab359]">Proceso</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">Así de simple</h2>
          <p className="text-white/40 text-sm mt-4">De la consulta a tu hogar inteligente, en cuatro pasos.</p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-4">
          {/* Connecting line */}
          <div
            className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(197,112,75,0.4), rgba(250,179,89,0.4), transparent)",
            }}
          />

          {pasos.map(({ num, title, desc }) => (
            <div key={num} className="flex flex-col items-center text-center px-6 mb-12 md:mb-0">
              {/* Number */}
              <div className="relative mb-8 z-10">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[#0d0d12]"
                  style={{ border: "1.5px solid rgba(197,112,75,0.45)" }}>
                  <span className="text-[#fab359] text-lg font-bold">{num}</span>
                </div>
              </div>

              <h3 className="text-white font-bold text-base mb-2">{title}</h3>
              <p className="text-white/40 text-sm leading-relaxed max-w-[150px] mx-auto">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
