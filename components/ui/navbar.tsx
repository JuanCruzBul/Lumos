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
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

export function Navbar() {
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pill, setPill] = useState({ left: 0, width: 0, visible: false });
  const [isDragging, setIsDragging] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const pillVisibleRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragPillStartLeftRef = useRef(0);
  const dragPillStartWidthRef = useRef(0);
  const didDragRef = useRef(false);
  const suppressScrollRef = useRef(false);

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
      if (isDraggingRef.current || suppressScrollRef.current) return;
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
    if (isDraggingRef.current) return;
    if (!active) {
      pillVisibleRef.current = false;
      setPill((p) => ({ ...p, visible: false }));
      return;
    }

    const update = () => {
      // Re-check: if drag started again while we were waiting, bail out
      if (isDraggingRef.current) return;
      const link = linkRefs.current[active];
      const list = listRef.current;
      if (!link || !list) return;
      const lr = link.getBoundingClientRect();
      const nr = list.getBoundingClientRect();
      const newLeft = lr.left - nr.left;
      const newWidth = lr.width;

      if (!pillVisibleRef.current) {
        setPill({ left: newLeft, width: newWidth, visible: false });
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setPill({ left: newLeft, width: newWidth, visible: true });
            pillVisibleRef.current = true;
          });
        });
      } else {
        setPill({ left: newLeft, width: newWidth, visible: true });
      }
    };

    // Small delay after drag-release so the pill is already at the target
    // position before we re-apply the transition — prevents visual jump.
    const tid = setTimeout(update, 20);
    return () => clearTimeout(tid);
  }, [active]);

  // Global mouse move / up for drag
  useEffect(() => {
    const getClosestLink = (mouseX: number, nr: DOMRect) => {
      let closestId = "";
      let closestDist = Infinity;
      for (const { href } of navLinks) {
        const id = href.replace("#", "");
        const link = linkRefs.current[id];
        if (!link) continue;
        const lr = link.getBoundingClientRect();
        const center = lr.left - nr.left + lr.width / 2;
        const dist = Math.abs(mouseX - center);
        if (dist < closestDist) {
          closestDist = dist;
          closestId = id;
        }
      }
      return closestId;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - dragStartXRef.current;
      if (Math.abs(dx) > 3) didDragRef.current = true;

      const list = listRef.current;
      if (!list) return;
      const nr = list.getBoundingClientRect();
      const mouseX = e.clientX - nr.left;

      // Clamp pill center within container
      const clampedX = Math.max(0, Math.min(mouseX, nr.width));
      const rawLeft = dragPillStartLeftRef.current + dx;

      // Preview: morph width toward nearest link
      const nearestId = getClosestLink(clampedX, nr);
      const nearestLink = nearestId ? linkRefs.current[nearestId] : null;
      const nearestLr = nearestLink?.getBoundingClientRect();
      const previewWidth = nearestLr ? nearestLr.width : dragPillStartWidthRef.current;
      const previewLeft = nearestLr ? nearestLr.left - nr.left : rawLeft;

      // Interpolate left between raw drag position and snapped position
      // based on how close we are to the nearest link center
      const nearestCenter = nearestLr
        ? nearestLr.left - nr.left + nearestLr.width / 2
        : clampedX;
      const distToNearest = Math.abs(clampedX - nearestCenter);
      const snapRadius = 30; // px — starts pulling toward link within this range
      const t = Math.max(0, 1 - distToNearest / snapRadius);
      const interpolatedLeft = rawLeft + (previewLeft - rawLeft) * t * 0.5;
      const clampedLeft = Math.max(0, Math.min(interpolatedLeft, nr.width - previewWidth));

      setPill((p) => ({ ...p, left: clampedLeft, width: previewWidth }));
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      setIsDragging(false);

      const list = listRef.current;
      if (!list) return;
      const nr = list.getBoundingClientRect();
      const mouseX = e.clientX - nr.left;

      const closestId = getClosestLink(mouseX, nr);

      if (closestId) {
        setActive(closestId);
        const el = document.getElementById(closestId);
        if (el) {
          suppressScrollRef.current = true;
          el.scrollIntoView({ behavior: "smooth" });
          // Release suppression after scroll animation completes (~800ms)
          setTimeout(() => { suppressScrollRef.current = false; }, 800);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleLinkMouseDown = (e: React.MouseEvent, id: string) => {
    // Only start drag if the pill is already visible (a section is active)
    if (!pillVisibleRef.current) return;
    e.preventDefault();
    isDraggingRef.current = true;
    didDragRef.current = false;
    dragStartXRef.current = e.clientX;
    dragPillStartLeftRef.current = pill.left;
    dragPillStartWidthRef.current = pill.width;
    setIsDragging(true);
  };

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    // Suppress navigation if this was a drag, not a click
    if (didDragRef.current) {
      e.preventDefault();
    }
  };

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
          <div
            ref={listRef}
            className="hidden md:flex items-center relative overflow-hidden rounded-full"
            style={{ userSelect: "none" }}
          >
            {/* Animated pill indicator */}
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
                transition: isDragging
                  ? "opacity 200ms ease"
                  : "left 300ms cubic-bezier(0.4,0,0.2,1), width 300ms cubic-bezier(0.4,0,0.2,1), opacity 200ms ease",
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
                  onMouseDown={(e) => handleLinkMouseDown(e, id)}
                  onClick={(e) => handleLinkClick(e, href)}
                  draggable={false}
                  className={`relative z-10 text-sm font-semibold px-5 py-2.5 rounded-full whitespace-nowrap select-none transition-colors duration-200 ${
                    isDragging ? "cursor-grabbing" : "cursor-pointer"
                  } ${isActive ? "text-white" : "text-black hover:text-black/60"}`}
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
