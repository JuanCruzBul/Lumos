"use client";
import Link from "next/link";
import { Menu } from "lucide-react";

const navLinks = [
  { label: "Sistemas", href: "#productos" },
  { label: "Proceso", href: "#proceso" },
  { label: "Planes", href: "#planes" },
  { label: "Clientes", href: "#clientes" },
  { label: "Contacto", href: "#contacto" },
];

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#111117]/40 backdrop-blur-md transition-all duration-300"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="flex justify-between items-center px-8 py-5 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="text-xl font-bold text-[#c5704b] tracking-tight">Lumos</span>
        </Link>

        <div className="hidden md:flex gap-1 items-center">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-sm font-semibold text-white/50 hover:text-white hover:bg-white/[0.06] px-3 py-1.5 rounded-lg transition-all duration-200"
            >
              {label}
            </Link>
          ))}
        </div>

        <Link
          href="#contacto"
          className="hidden md:block bg-[#fab359] text-[#3d1800] px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#f5a840] active:scale-95 transition-all duration-200"
        >
          Comenzar
        </Link>

        <button className="md:hidden text-[#c5704b]">
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
}
