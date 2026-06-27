"use client";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=60"
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

      {/* Above-the-fold: logo + LUMOS centered in full viewport */}
      <div className="relative z-10 w-full h-screen flex flex-col items-center justify-center px-4 sm:px-8">
        {/* Logo mark */}
        <div className="mb-3">
          <Image
            src="/logo.svg"
            alt="Lumos"
            width={200}
            height={200}
            className="mx-auto w-32 h-32 sm:w-40 sm:h-40 md:w-[200px] md:h-[200px] drop-shadow-[0_0_50px_rgba(197,112,75,0.32)]"
            priority
            fetchPriority="high"
          />
        </div>

        {/* Animated LUMOS text */}
        <div className="w-full max-w-[220px] sm:max-w-xs md:max-w-sm mb-6 sm:mb-10">
          <h1 className="sr-only">Lumos — Domótica y Hogar Inteligente</h1>
          <svg
            aria-hidden="true"
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

        {/* CTA Buttons */}
        <div className="hero-buttons flex flex-wrap justify-center gap-4">
          <button
            className="hero-btn-primary bg-[#c5704b] text-white px-7 py-3 sm:px-10 sm:py-4 rounded-full text-xs font-bold uppercase tracking-wider"
            onClick={() => document.getElementById("productos")?.scrollIntoView({ behavior: "smooth" })}
          >
            Conocer Sistemas
          </button>
          <button
            className="hero-btn-outline text-[#c5704b] px-7 py-3 sm:px-10 sm:py-4 rounded-full text-xs font-semibold uppercase tracking-wider border border-[#c5704b]/40 hover:border-[#c5704b]/70 transition-colors duration-300"
            onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}
          >
            Ver Demo
          </button>
        </div>
      </div>

    </section>
  );
}
