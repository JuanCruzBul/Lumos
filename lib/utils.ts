import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Color de marca Lumos (#c5704b), también disponible como token Tailwind `lumos-primary`. */
export const LUMOS_PRIMARY_HEX = "#c5704b";
/** Componentes RGB del color de marca, para usar en `rgba(${LUMOS_PRIMARY_RGB}, alpha)`. */
export const LUMOS_PRIMARY_RGB = "197, 112, 75";
