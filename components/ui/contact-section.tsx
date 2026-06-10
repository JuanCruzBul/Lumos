"use client";

export function ContactSection() {
  return (
    <section id="contacto" className="py-28 px-8 bg-[#fdf8f4] relative overflow-hidden">
      {/* Subtle warm glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(250,178,87,0.08) 0%, transparent 65%)" }}
      />

      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* Left: copy + info */}
        <div>
          <span className="text-xs uppercase tracking-widest font-semibold text-[#c5704b]">
            Contacto
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-black mt-3 mb-5 leading-tight">
            Transformá tu
            <br />
            hogar con Lumos
          </h2>
          <p className="text-black/52 text-sm leading-relaxed max-w-sm">
            Nuestro equipo está listo para diseñar la solución perfecta para tu
            espacio. Contanos qué necesitás y te respondemos en menos de 24 hs.
          </p>

          {/* Divider */}
          <div
            className="w-16 h-px my-8"
            style={{ background: "linear-gradient(to right, #c5704b, #fab257)" }}
          />

          <div className="space-y-5">
            {[
              { label: "Email", value: "hola@lumos.ar" },
              { label: "Teléfono", value: "+54 11 4000-0000" },
              { label: "Ciudad", value: "Buenos Aires, Argentina" },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="text-xs text-black/30 uppercase tracking-widest">{label}</span>
                <span className="text-black/75 text-sm font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: dark card form */}
        <div className="bg-[#000000] rounded-2xl p-8 md:p-10 shadow-[0_40px_80px_rgba(0,0,0,0.18)]">
          <h3 className="text-white text-xl font-bold mb-1">Envianos un mensaje</h3>
          <p className="text-white/35 text-xs mb-7">Todos los campos son obligatorios.</p>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-semibold text-white/40 uppercase tracking-wider block mb-1.5">
                  Nombre
                </label>
                <input
                  type="text"
                  placeholder="Juan García"
                  className="w-full border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#c5704b] focus:ring-2 focus:ring-[#c5704b]/15 transition-all bg-white/[0.05]"
                />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-white/40 uppercase tracking-wider block mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="juan@email.com"
                  className="w-full border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#c5704b] focus:ring-2 focus:ring-[#c5704b]/15 transition-all bg-white/[0.05]"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-semibold text-white/40 uppercase tracking-wider block mb-1.5">
                Teléfono
              </label>
              <input
                type="tel"
                placeholder="+54 11 0000-0000"
                className="w-full border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#c5704b] focus:ring-2 focus:ring-[#c5704b]/15 transition-all bg-white/[0.05]"
              />
            </div>

            <div>
              <label className="text-[10px] font-semibold text-white/40 uppercase tracking-wider block mb-1.5">
                Mensaje
              </label>
              <textarea
                placeholder="Contanos sobre tu proyecto, tipo de hogar, qué sistemas te interesan..."
                rows={4}
                className="w-full border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#c5704b] focus:ring-2 focus:ring-[#c5704b]/15 transition-all resize-none bg-white/[0.05]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#c5704b] text-white py-4 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-[#b5613c] active:scale-[0.99] transition-all duration-200"
            >
              Enviar Mensaje
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
