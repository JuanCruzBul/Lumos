"use client";
import { useEffect, useState } from "react";

export type NavPhase = "hidden" | "circle" | "expanded";

const CIRCLE_DELAY = 200;
const EXPAND_DELAY = 1800;

/**
 * Drives the navbar's three-phase entrance animation (hidden -> circle -> expanded)
 * and resets scroll restoration on mount so the animation always plays from the top.
 */
export function useNavEntranceAnimation() {
  const [navPhase, setNavPhase] = useState<NavPhase>("hidden");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
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

  return { navPhase, mounted };
}
