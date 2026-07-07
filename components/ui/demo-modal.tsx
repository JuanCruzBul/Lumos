"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

interface DemoModalProps {
  open: boolean;
  onClose: () => void;
  src: string;
  title: string;
}

export function DemoModal({ open, onClose, src, title }: DemoModalProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="relative h-full w-full max-w-6xl overflow-hidden rounded-2xl bg-[#0b0d12] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Cerrar demo"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white/80 transition-colors hover:bg-black/60 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
        <iframe
          src={src}
          title={title}
          className="h-full w-full border-0"
          allow="accelerometer; gyroscope"
        />
      </div>
    </div>
  );
}
