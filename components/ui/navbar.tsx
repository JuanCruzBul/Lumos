"use client";
import Link from "next/link";
import { Menu } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { label: "Sistemas", href: "#productos" },
  { label: "Proceso", href: "#proceso" },
  { label: "Planes", href: "#planes" },
  { label: "Clientes", href: "#clientes" },
  { label: "Contacto", href: "#contacto" },
];

export function Navbar() {
  return (
    <nav
      className="fixed top-0 w-full z-50 backdrop-blur-md transition-all duration-300"
      style={{
        background: "rgba(254,254,254,0.88)",
        borderBottom: "1px solid rgba(197,112,75,0.12)",
      }}
    >
      <div className="flex justify-between items-center px-8 py-5 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center">
          <Image src="/logo.svg" alt="Lumos" width={44} height={44} className="flex-shrink-0" />
        </Link>

        <div className="hidden md:flex gap-1 items-center">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-sm font-semibold text-black/45 hover:text-black hover:bg-black/[0.05] px-3 py-1.5 rounded-lg transition-all duration-200"
            >
              {label}
            </Link>
          ))}
        </div>

        <Link
          href="#contacto"
          className="hidden md:block bg-[#c5704b] text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#b5613c] active:scale-95 transition-all duration-200"
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
