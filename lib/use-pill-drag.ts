"use client";
import { useEffect, useRef, useState, type RefObject } from "react";

type NavLink = { label: string; href: string };

/**
 * Owns the pill indicator's position/visibility and its drag-to-snap interaction.
 * Syncs the pill to `active` when idle, and lets the user drag it between links,
 * snapping to whichever link is closest on release.
 */
export function usePillDrag({
  navLinks,
  active,
  setActive,
  listRef,
  linkRefs,
  scrollPauseRef,
}: {
  navLinks: NavLink[];
  active: string;
  setActive: (id: string) => void;
  listRef: RefObject<HTMLDivElement | null>;
  linkRefs: RefObject<Record<string, HTMLAnchorElement | null>>;
  scrollPauseRef: RefObject<boolean>;
}) {
  const [pill, setPill] = useState({ left: 0, width: 0, visible: false });
  const [isDragging, setIsDragging] = useState(false);
  const [dragHoverId, setDragHoverId] = useState("");
  const pillVisibleRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragPillStartLeftRef = useRef(0);
  const dragPillStartWidthRef = useRef(0);
  const didDragRef = useRef(false);

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
  }, [active, linkRefs, listRef]);

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
      scrollPauseRef.current = false;
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
          scrollPauseRef.current = true;
          el.scrollIntoView({ behavior: "smooth" });
          setTimeout(() => { scrollPauseRef.current = false; }, 800);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: false });
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [navLinks, linkRefs, listRef, setActive, scrollPauseRef]);

  const handleLinkMouseDown = (e: React.MouseEvent) => {
    if (!pillVisibleRef.current) return;
    e.preventDefault();
    isDraggingRef.current = true;
    scrollPauseRef.current = true;
    didDragRef.current = false;
    dragStartXRef.current = e.clientX;
    dragPillStartLeftRef.current = pill.left;
    dragPillStartWidthRef.current = pill.width;
    setIsDragging(true);
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    if (didDragRef.current) e.preventDefault();
  };

  return { pill, isDragging, dragHoverId, handleLinkMouseDown, handleLinkClick };
}
