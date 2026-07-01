"use client";
import { useEffect, useState, type RefObject } from "react";

type NavLink = { label: string; href: string };

/**
 * Tracks which section is currently in view and exposes `active` for the navbar pill.
 * `pausedRef` lets a caller (e.g. the pill drag interaction) temporarily suppress
 * scroll-driven updates while the user is dragging or a programmatic scroll is in flight.
 */
export function useScrollSpy(navLinks: NavLink[], pausedRef: RefObject<boolean>) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (pausedRef.current) return;
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
  }, [navLinks, pausedRef]);

  return { active, setActive };
}
