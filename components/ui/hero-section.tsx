import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1600&q=80"
          alt=""
          fill
          className="object-cover object-center opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#fdf8f4]/85 via-[#fefefe]/65 to-[#fefefe]" />
      </div>

      {/* Warm glow behind logo */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none z-[1]"
        style={{ background: "radial-gradient(ellipse at top, rgba(250,178,87,0.13) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-8 flex flex-col items-center text-center">
        {/* Logo mark */}
        <div className="mb-3 fade-in-up" style={{ animationDelay: "0.1s" }}>
          <Image
            src="/logo.svg"
            alt="Lumos"
            width={200}
            height={200}
            className="mx-auto drop-shadow-[0_0_50px_rgba(197,112,75,0.32)]"
            priority
          />
        </div>

        {/* Animated LUMOS text */}
        <div className="w-full max-w-sm mb-2">
          <svg
            className="w-full h-auto drop-shadow-[0_0_20px_rgba(197,112,75,0.4)]"
            viewBox="20 10 340 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path className="path-draw stagger-1" d="M 30 20 L 30 80 L 68 80" stroke="#c5704b" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <path className="path-draw stagger-2" d="M 90 20 L 90 60 C 90 75 101 80 112 80 C 123 80 134 75 134 60 L 134 20" stroke="#c5704b" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <path className="path-draw stagger-3" d="M 156 80 L 156 20 L 186 65 L 216 20 L 216 80" stroke="#c5704b" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <circle className="path-draw stagger-4" cx="268" cy="50" r="30" stroke="#c5704b" strokeWidth="6" />
            <path className="path-draw stagger-5" d="M 348 30 C 348 23 341 20 331 20 C 321 20 314 27 314 37 C 314 53 348 47 348 63 C 348 77 341 80 331 80 C 321 80 314 73 314 66" stroke="#c5704b" strokeWidth="6" strokeLinecap="round" />
          </svg>
        </div>

        {/* Decorative line */}
        <div className="flex items-center gap-3 mb-7 w-56 fade-in-up" style={{ animationDelay: "0.4s" }}>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(0,0,0,0.15), rgba(197,112,75,0.45))" }} />
          <div className="w-1.5 h-1.5 rounded-full bg-black/25" />
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(0,0,0,0.15), rgba(197,112,75,0.45))" }} />
        </div>

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 fade-in-up"
          style={{
            animationDelay: "0.6s",
            background: "rgba(197,112,75,0.08)",
            border: "1px solid rgba(197,112,75,0.2)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#fab257] animate-pulse" />
          <span className="text-black/65 text-xs font-medium tracking-widest uppercase">Automatización residencial · Villa Carlos Paz</span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-5 fade-in-up leading-tight" style={{ animationDelay: "0.8s" }}>
          Inteligencia{" "}
          <span className="text-[#c5704b] drop-shadow-[0_0_24px_rgba(197,112,75,0.3)]">
            Atmosférica
          </span>
        </h1>

        {/* Thin accent underline */}
        <div
          className="w-24 h-0.5 mb-7 fade-in-up rounded-full"
          style={{
            animationDelay: "1.0s",
            background: "linear-gradient(to right, #c5704b, #fab257, #c5704b)",
          }}
        />

        <p
          className="text-base font-normal max-w-xl mb-10 fade-in-up leading-relaxed"
          style={{ animationDelay: "1.2s", color: "rgba(0,0,0,0.58)" }}
        >
          Lumos convierte tu hogar en un espacio inteligente. Control total
          desde el celular o con la voz, instalado por nosotros en un solo día.
          Sin complicaciones.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-14 fade-in-up" style={{ animationDelay: "1.5s" }}>
          <button className="bg-[#c5704b] text-white px-10 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#b5613c] active:scale-95 transition-all duration-200">
            Ver Servicios
          </button>
          <button
            className="text-black px-10 py-3 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-black/[0.06] active:scale-95 transition-all duration-200"
            style={{ border: "1.5px solid rgba(0,0,0,0.18)" }}
          >
            Ver Demo
          </button>
        </div>
      </div>
    </section>
  );
}
