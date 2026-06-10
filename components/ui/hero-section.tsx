import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1600&q=80"
          alt=""
          fill
          className="object-cover object-center opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#111117]/80 via-[#111117]/60 to-[#111117]" />
      </div>

      {/* Warm glow behind logo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none z-[1]"
        style={{ background: "radial-gradient(ellipse at top, rgba(197,112,75,0.12) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-8 flex flex-col items-center text-center">
        {/* Animated LUMOS text */}
        <div className="w-full max-w-lg mb-6">
          <svg
            className="w-full h-auto drop-shadow-[0_0_30px_rgba(197,112,75,0.6)]"
            viewBox="0 0 500 150"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path className="path-draw stagger-1" d="M 50 30 L 50 120 L 100 120" stroke="#c5704b" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            <path className="path-draw stagger-2" d="M 130 30 L 130 90 C 130 110 145 120 160 120 C 175 120 190 110 190 90 L 190 30" stroke="#c5704b" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            <path className="path-draw stagger-3" d="M 220 120 L 220 30 L 260 90 L 300 30 L 300 120" stroke="#c5704b" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            <circle className="path-draw stagger-4" cx="360" cy="75" r="45" stroke="#c5704b" strokeWidth="8" />
            <path className="path-draw stagger-5" d="M 470 45 C 470 35 460 30 445 30 C 430 30 420 40 420 55 C 420 80 470 70 470 95 C 470 115 460 120 445 120 C 430 120 420 110 420 100" stroke="#c5704b" strokeWidth="8" strokeLinecap="round" />
          </svg>
        </div>

        {/* Decorative line */}
        <div className="flex items-center gap-3 mb-7 w-56 fade-in-up" style={{ animationDelay: "2.3s" }}>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.25), rgba(250,179,89,0.5))" }} />
          <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(255,255,255,0.25), rgba(250,179,89,0.5))" }} />
        </div>

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 fade-in-up"
          style={{
            animationDelay: "2.5s",
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.14)",
            backdropFilter: "blur(10px)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#fab359] animate-pulse" />
          <span className="text-white/75 text-xs font-medium tracking-widest uppercase">Domótica inteligente</span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-5 fade-in-up leading-tight" style={{ animationDelay: "2.6s" }}>
          Inteligencia{" "}
          <span className="text-[#fab359] drop-shadow-[0_0_20px_rgba(250,179,89,0.5)]">
            Atmosférica
          </span>
        </h1>

        {/* Thin accent underline */}
        <div
          className="w-24 h-0.5 mb-7 fade-in-up rounded-full"
          style={{
            animationDelay: "2.7s",
            background: "linear-gradient(to right, #c5704b, #fab359, #c5704b)",
          }}
        />

        <p
          className="text-base font-normal max-w-xl mb-10 fade-in-up leading-relaxed"
          style={{ animationDelay: "2.9s", color: "rgba(255,255,255,0.78)" }}
        >
          Experimentá la domótica que respira con vos. Lumos anticipa tus
          necesidades, armonizando luz, clima y seguridad en un abrazo cálido
          y sin interrupciones.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-14 fade-in-up" style={{ animationDelay: "3.2s" }}>
          <button className="bg-[#fab359] text-[#3d1800] px-10 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#f5a840] active:scale-95 transition-all duration-200">
            Explorar Sistemas
          </button>
          <button
            className="text-white px-10 py-3 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-white/10 active:scale-95 transition-all duration-200"
            style={{ border: "1px solid rgba(255,255,255,0.25)", backdropFilter: "blur(8px)" }}
          >
            Ver Demo
          </button>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-10 fade-in-up" style={{ animationDelay: "3.5s" }}>
          {[
            { value: "12K+", label: "Hogares" },
            { value: "98%", label: "Satisfacción" },
            { value: "24/7", label: "Soporte" },
          ].map(({ value, label }, i) => (
            <div key={label} className="flex flex-col items-center gap-0.5">
              {i > 0 && (
                <div className="hidden sm:block absolute -left-5 top-1/2 -translate-y-1/2 w-px h-6 bg-white/10" />
              )}
              <span className="text-2xl font-bold text-white">{value}</span>
              <span className="text-xs uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 fade-in-up z-10"
        style={{ animationDelay: "3.8s" }}
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>Scroll</span>
        <div className="w-px h-8" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)" }} />
      </div>
    </section>
  );
}
