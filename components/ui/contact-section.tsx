"use client";

export function ContactSection() {
  return (
    <section id="contacto" className="py-28 px-8 bg-[#0d0d12] relative overflow-hidden">
      {/* Subtle background glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(197,112,75,0.07) 0%, transparent 65%)" }}
      />

      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* Left: copy + info */}
        <div>
          <span className="text-xs uppercase tracking-widest font-semibold text-[#fab359]">
            Contacto
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-5 leading-tight">
            Transformá tu
            <br />
            hogar con Lumos
          </h2>
          <p className="text-white/55 text-sm leading-relaxed max-w-sm">
            Nuestro equipo está listo para diseñar la solución perfecta para tu
            espacio. Contanos qué necesitás y te respondemos en menos de 24 hs.
          </p>

          {/* Divider */}
          <div
            className="w-16 h-px my-8"
            style={{ background: "linear-gradient(to right, #c5704b, #fab359)" }}
          />

          <div className="space-y-5">
            {[
              { label: "Email", value: "hola@lumos.ar" },
              { label: "Teléfono", value: "+54 11 4000-0000" },
              { label: "Ciudad", value: "Buenos Aires, Argentina" },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="text-xs text-white/30 uppercase tracking-widest">{label}</span>
                <span className="text-white/80 text-sm font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: white card form */}
        <div className="bg-white rounded-2xl p-8 md:p-10 shadow-[0_40px_80px_rgba(0,0,0,0.45)]">
          <h3 className="text-[#151311] text-xl font-bold mb-1">Envianos un mensaje</h3>
          <p className="text-[#151311]/40 text-xs mb-7">Todos los campos son obligatorios.</p>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-semibold text-[#151311]/45 uppercase tracking-wider block mb-1.5">
                  Nombre
                </label>
                <input
                  type="text"
                  placeholder="Juan García"
                  className="w-full border border-[#151311]/12 rounded-lg px-4 py-3 text-sm text-[#151311] placeholder:text-[#151311]/25 focus:outline-none focus:border-[#c5704b] focus:ring-2 focus:ring-[#c5704b]/10 transition-all bg-transparent"
                />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-[#151311]/45 uppercase tracking-wider block mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="juan@email.com"
                  className="w-full border border-[#151311]/12 rounded-lg px-4 py-3 text-sm text-[#151311] placeholder:text-[#151311]/25 focus:outline-none focus:border-[#c5704b] focus:ring-2 focus:ring-[#c5704b]/10 transition-all bg-transparent"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-semibold text-[#151311]/45 uppercase tracking-wider block mb-1.5">
                Teléfono
              </label>
              <input
                type="tel"
                placeholder="+54 11 0000-0000"
                className="w-full border border-[#151311]/12 rounded-lg px-4 py-3 text-sm text-[#151311] placeholder:text-[#151311]/25 focus:outline-none focus:border-[#c5704b] focus:ring-2 focus:ring-[#c5704b]/10 transition-all bg-transparent"
              />
            </div>

            <div>
              <label className="text-[10px] font-semibold text-[#151311]/45 uppercase tracking-wider block mb-1.5">
                Mensaje
              </label>
              <textarea
                placeholder="Contanos sobre tu proyecto, tipo de hogar, qué sistemas te interesan..."
                rows={4}
                className="w-full border border-[#151311]/12 rounded-lg px-4 py-3 text-sm text-[#151311] placeholder:text-[#151311]/25 focus:outline-none focus:border-[#c5704b] focus:ring-2 focus:ring-[#c5704b]/10 transition-all resize-none bg-transparent"
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
