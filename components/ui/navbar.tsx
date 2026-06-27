"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Integración", href: "#sistema" },
  { label: "Sistemas", href: "#productos" },
  { label: "Proceso", href: "#proceso" },
  { label: "Planes", href: "#planes" },
  { label: "Clientes", href: "#clientes" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

type NavPhase = "hidden" | "circle" | "expanded";

export function Navbar() {
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pill, setPill] = useState({ left: 0, width: 0, visible: false });
  const [isDragging, setIsDragging] = useState(false);
  const [dragHoverId, setDragHoverId] = useState("");
  const [navPhase, setNavPhase] = useState<NavPhase>("hidden");
  const [mounted, setMounted] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const pillVisibleRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragPillStartLeftRef = useRef(0);
  const dragPillStartWidthRef = useRef(0);
  const didDragRef = useRef(false);
  const suppressScrollRef = useRef(false);

  useEffect(() => {
    const CIRCLE_DELAY = 200;
    const EXPAND_DELAY = 1800;

    setMounted(true);

    const t1 = setTimeout(() => {
      setNavPhase("circle");
    }, CIRCLE_DELAY);

    const t2 = setTimeout(() => {
      setNavPhase("expanded");
    }, EXPAND_DELAY);

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isDraggingRef.current || suppressScrollRef.current) return;
      if (window.scrollY < 10) { setActive(""); return; }
      const ids = navLinks.map((l) => l.href.replace("#", ""));
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) { setActive(id); return; }
      }
      setActive("");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isDraggingRef.current) return;
    if (!active) {
      pillVisibleRef.current = false;
      setPill((p) => ({ ...p, visible: false }));
      return;
    }
    const update = () => {
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
    const tid = setTimeout(update, 20);
    return () => clearTimeout(tid);
  }, [active]);

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
        if (dist < closestDist) { closestDist = dist; closestId = id; }
      }
      return closestId;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      e.preventDefault();
      const dx = e.clientX - dragStartXRef.current;
      if (Math.abs(dx) > 3) didDragRef.current = true;
      const list = listRef.current;
      if (!list) return;
      const nr = list.getBoundingClientRect();
      const mouseX = e.clientX - nr.left;
      const clampedX = Math.max(0, Math.min(mouseX, nr.width));
      const rawLeft = dragPillStartLeftRef.current + dx;
      const nearestId = getClosestLink(clampedX, nr);
      const nearestLink = nearestId ? linkRefs.current[nearestId] : null;
      const nearestLr = nearestLink?.getBoundingClientRect();
      const previewWidth = nearestLr ? nearestLr.width : dragPillStartWidthRef.current;
      const previewLeft = nearestLr ? nearestLr.left - nr.left : rawLeft;
      const nearestCenter = nearestLr ? nearestLr.left - nr.left + nearestLr.width / 2 : clampedX;
      const distToNearest = Math.abs(clampedX - nearestCenter);
      const snapRadius = 30;
      const t = Math.max(0, 1 - distToNearest / snapRadius);
      const interpolatedLeft = rawLeft + (previewLeft - rawLeft) * t * 0.5;
      const clampedLeft = Math.max(0, Math.min(interpolatedLeft, nr.width - previewWidth));
      setPill((p) => ({ ...p, left: clampedLeft, width: previewWidth }));
      setDragHoverId(nearestId);
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      setIsDragging(false);
      setDragHoverId("");
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
          setTimeout(() => { suppressScrollRef.current = false; }, 800);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: false });
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleLinkMouseDown = (e: React.MouseEvent, _id: string) => {
    if (!pillVisibleRef.current) return;
    e.preventDefault();
    isDraggingRef.current = true;
    didDragRef.current = false;
    dragStartXRef.current = e.clientX;
    dragPillStartLeftRef.current = pill.left;
    dragPillStartWidthRef.current = pill.width;
    setIsDragging(true);
  };

  const handleLinkClick = (e: React.MouseEvent, _href: string) => {
    if (didDragRef.current) e.preventDefault();
  };

  const pillStyle: React.CSSProperties = (() => {
    const base: React.CSSProperties = {
      display: "flex",
      alignItems: "center",
      height: "62px",
      whiteSpace: "nowrap" as const,
      borderRadius: "9999px",
    };

    if (navPhase === "hidden") {
      return {
        ...base,
        overflow: "hidden",
        pointerEvents: "none",
        maxWidth: "62px",
        padding: "12px",
        justifyContent: "center",
        background: "#FAB358",
        opacity: 0,
        transform: "translateY(-60px) scale(0.3)",
        transition: "none",
      };
    }
    if (navPhase === "circle") {
      return {
        ...base,
        overflow: "visible",
        pointerEvents: "none",
        maxWidth: "62px",
        padding: "12px",
        justifyContent: "center",
        background: "#FAB358",
        opacity: 1,
        transform: "translateY(0px) scale(1)",
        transition: "transform 600ms cubic-bezier(0.34,1.56,0.64,1), opacity 400ms ease",
      };
    }
    return {
      ...base,
      overflow: "hidden",
      pointerEvents: "auto",
      maxWidth: "800px",
      padding: "12px",
      justifyContent: "flex-start",
      background: "rgba(254,254,254,0.93)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      boxShadow: "0 1px 4px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.06)",
      opacity: 1,
      transform: "translateY(0px) scale(1)",
      transition: "max-width 600ms cubic-bezier(0.4,0,0.2,1), background 400ms ease, box-shadow 400ms ease",
    };
  })();

  if (!mounted) {
    return <nav className="fixed top-0 left-0 right-0 z-50" aria-hidden />;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 md:pt-5 px-3 md:px-4">
        <div suppressHydrationWarning style={pillStyle} className={navPhase === "circle" ? "lumos-circle" : ""}>

          <Link
            href="/"
            className="flex items-center flex-shrink-0"
            style={{ padding: 0 }}
            onClick={(e) => {
              e.preventDefault();
              setActive("");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <Image
              src="/logo.svg"
              alt="Lumos"
              width={38}
              height={38}
              style={{
                opacity: navPhase === "expanded" ? 1 : 0,
                transform: navPhase === "expanded" ? "scale(1)" : "scale(0.5)",
                transition: navPhase === "expanded"
                  ? "opacity 400ms ease 100ms, transform 500ms cubic-bezier(0.34,1.4,0.64,1) 100ms"
                  : "none",
              }}
            />
          </Link>

          {navPhase === "expanded" && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "10px",
              }}
            >
              <div
                ref={listRef}
                className="hidden md:flex items-center relative overflow-hidden rounded-full"
                style={{ userSelect: "none" }}
              >
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
                {navLinks.map(({ label, href }, i) => {
                  const id = href.replace("#", "");
                  const isHighlighted = isDragging ? dragHoverId === id : active === id;
                  return (
                    <Link
                      key={label}
                      href={href}
                      ref={(el) => { linkRefs.current[id] = el; }}
                      onMouseDown={(e) => handleLinkMouseDown(e, id)}
                      onClick={(e) => handleLinkClick(e, href)}
                      draggable={false}
                      className={`relative z-10 text-sm font-semibold px-5 py-2.5 rounded-full whitespace-nowrap select-none transition-colors duration-200 ${
                        isDragging ? "cursor-grabbing" : "cursor-pointer"
                      } ${isHighlighted ? "text-white" : "text-black hover:text-black/60"}`}
                      style={{
                        animation: `navLinkIn 400ms ease ${200 + i * 60}ms both`,
                      }}
                    >
                      {label}
                    </Link>
                  );
                })}
              </div>

              <button
                className="md:hidden ml-2 p-1.5 text-black/60 hover:text-black transition-colors"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Menú"
                aria-expanded={mobileOpen}
                style={{ animation: "navLinkIn 400ms ease 200ms both" }}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          )}
        </div>

        {mobileOpen && (
          <div
            className="absolute top-[68px] md:top-[76px] left-3 right-3 md:left-4 md:right-4 rounded-2xl p-2 flex flex-col gap-0.5 md:hidden"
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
  );
}

export default Navbar;
