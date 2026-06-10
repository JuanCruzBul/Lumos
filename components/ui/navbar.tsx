"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Sistemas", href: "#productos" },
  { label: "Proceso", href: "#proceso" },
  { label: "Planes", href: "#planes" },
  { label: "Clientes", href: "#clientes" },
  { label: "Contacto", href: "#contacto" },
];

export function Navbar() {
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pill, setPill] = useState({ left: 0, width: 0, visible: false });
  const listRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const pillVisibleRef = useRef(false);

  // Disable browser scroll restoration so reload always starts at top
  useEffect(() => {
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      // Guard: at the very top, nothing is active
      if (window.scrollY < 10) {
        setActive("");
        return;
      }
      const ids = navLinks.map((l) => l.href.replace("#", ""));
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          return;
        }
      }
      setActive("");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Slide indicator to active link
  useEffect(() => {
    if (!active) {
      pillVisibleRef.current = false;
      setPill((p) => ({ ...p, visible: false }));
      return;
    }
    const link = linkRefs.current[active];
    const list = listRef.current;
    if (!link || !list) return;
    const lr = link.getBoundingClientRect();
    const nr = list.getBoundingClientRect();
    const newLeft = lr.left - nr.left;
    const newWidth = lr.width;

    if (!pillVisibleRef.current) {
      // Teleport to correct position while still invisible, then fade in.
      // This prevents the pill from "flying" from 0,0 on first appearance.
      setPill({ left: newLeft, width: newWidth, visible: false });
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setPill({ left: newLeft, width: newWidth, visible: true });
          pillVisibleRef.current = true;
        });
      });
    } else {
      // Already visible: slide smoothly to new position
      setPill({ left: newLeft, width: newWidth, visible: true });
    }
  }, [active]);

  return (
    <>
      <style>{`html { scroll-behavior: smooth; }`}</style>

      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-4">
        {/* Pill container */}
        <div
          className="flex items-center px-4 py-3 rounded-full"
          style={{
            background: "rgba(254,254,254,0.93)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            boxShadow: "0 1px 4px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.06)",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center px-3 mr-3 flex-shrink-0"
            onClick={(e) => {
              e.preventDefault();
              setActive("");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <Image src="/logo.svg" alt="Lumos" width={38} height={38} />
          </Link>

          {/* Nav links + sliding pill — desktop */}
          {/* overflow:hidden forces Safari to establish a proper containing block for the absolute pill */}
          <div ref={listRef} className="hidden md:flex items-center relative overflow-hidden rounded-full">
            {/* Animated pill indicator */}
            {/* Avoid inset-y-0 — it misreads height on Safari flex containers */}
            <span
              aria-hidden
              className="absolute rounded-full pointer-events-none"
              style={{
                top: "50%",
                transform: "translateY(-50%)",
                height: "100%",
                left: pill.left,
                width: pill.width,
                background: "#c5704b",
                opacity: pill.visible ? 1 : 0,
                willChange: "left, width, opacity",
                transition:
                  "left 300ms cubic-bezier(0.4,0,0.2,1), width 300ms cubic-bezier(0.4,0,0.2,1), opacity 200ms ease",
              }}
            />

            {navLinks.map(({ label, href }) => {
              const id = href.replace("#", "");
              const isActive = active === id;
              return (
                <Link
                  key={label}
                  href={href}
                  ref={(el) => {
                    linkRefs.current[id] = el;
                  }}
                  className={`relative z-10 text-sm font-semibold px-5 py-2.5 rounded-full whitespace-nowrap select-none transition-colors duration-200 ${
                    isActive ? "text-white" : "text-black hover:text-black/60"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden ml-2 p-1.5 text-black/60 hover:text-black transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menú"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div
            className="absolute top-[76px] left-4 right-4 rounded-2xl p-2 flex flex-col gap-0.5 md:hidden"
            style={{
              background: "rgba(254,254,254,0.97)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05)",
            }}
          >
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-semibold text-black hover:bg-black/[0.05] px-4 py-3 rounded-xl transition-all duration-200"
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
