"use client";

export function ContactSection() {
  return (
    <section id="contacto" className="relative overflow-hidden bg-[#fdf8f4] py-20 lg:py-28 px-8">

      {/* Subtle warm glow */}
      <div
        className="pointer-events-none absolute right-1/4 top-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full blur-[140px]"
        style={{ background: "radial-gradient(circle, rgba(250,178,87,0.13) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-20 items-start">

        {/* Left: copy */}
        <div className="pt-4">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#c5704b] mb-6">
            <span
              className="inline-block w-6 h-px"
              style={{ background: "linear-gradient(to right, #c5704b, #fab257)" }}
            />
            Contacto
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-[1.08] mb-6 tracking-tight">
            Transformá tu<br />
            hogar con{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #c5704b 0%, #fab257 100%)" }}
            >
              Lumos
            </span>
          </h2>

          <p className="text-black/60 text-sm leading-relaxed max-w-xs mb-12">
            Nuestro equipo diseña la solución perfecta para tu espacio.
            Contanos qué necesitás y te respondemos en menos de 24&nbsp;hs.
          </p>

          {/* Contact info */}
          <div className="space-y-4">
            {[
              { label: "Email", value: "hola@lumos.ar" },
              { label: "Teléfono", value: "+54 11 4000-0000" },
              { label: "Ciudad", value: "Buenos Aires, Argentina" },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-baseline gap-4">
                <span className="text-[10px] uppercase tracking-widest text-[#c5704b]/70 w-16 shrink-0">
                  {label}
                </span>
                <span className="text-[#2a2420] text-sm">{value}</span>
              </div>
            ))}
          </div>

          {/* Response time badge */}
          <div className="mt-10 inline-flex items-center gap-3 border border-black/10 rounded-full px-5 py-2.5">
            <span className="h-2 w-2 rounded-full bg-[#c5704b] animate-pulse" />
            <span className="text-black/40 text-xs tracking-wide">Respuesta en menos de 24 hs</span>
          </div>
        </div>

        {/* Right: editorial form */}
        <div>
          <p className="text-black/50 text-xs uppercase tracking-widest mb-10">
            Todos los campos son obligatorios
          </p>

          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>

            <div className="grid grid-cols-2 gap-6">
              <Field label="Nombre" type="text" placeholder="Juan García" />
              <Field label="Email" type="email" placeholder="juan@email.com" />
            </div>

            <Field label="Teléfono" type="tel" placeholder="+54 11 0000-0000" />

            <div>
              <label className="block text-[10px] font-semibold text-[#c5704b]/70 uppercase tracking-widest mb-3">
                Mensaje
              </label>
              <textarea
                placeholder="Contanos sobre tu proyecto, tipo de hogar, qué sistemas te interesan..."
                rows={4}
                className="w-full bg-transparent border-0 border-b border-black/12 py-3 text-sm text-black placeholder:text-black/35 focus:outline-none focus:ring-0 resize-none transition-all duration-300 focus:border-[#c5704b]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="relative overflow-hidden group w-full py-4 rounded-xl text-white font-bold text-xs uppercase tracking-widest transition-all duration-300"
                style={{ background: "linear-gradient(135deg, #c5704b 0%, #fab257 100%)" }}
              >
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                <span className="relative">Enviar Mensaje</span>
              </button>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
}

function Field({
  label,
  type,
  placeholder,
}: {
  label: string;
  type: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className="block text-[10px] font-semibold text-[#c5704b]/70 uppercase tracking-widest mb-3">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-transparent border-0 border-b border-black/12 py-3 text-sm text-black placeholder:text-black/35 focus:outline-none focus:ring-0 transition-all duration-300 focus:border-[#c5704b]"
      />
    </div>
  );
}
