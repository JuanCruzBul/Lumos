"use client";

import { LUMOS_PRIMARY_HEX, LUMOS_PRIMARY_RGB } from "@/lib/utils";
import { useState } from "react";
import { motion } from "framer-motion";

/** Colores de estado del botón de envío, compartidos por ambos formularios. */
export const FORM_SUCCESS_COLOR = "#3a9c6e";
export const FORM_ERROR_COLOR = "#c5504b";

/**
 * Variantes visuales de los campos de contacto:
 * - "underline": línea inferior con subrayado animado al focus (ContactSection)
 * - "rounded": pill con fondo crema y ring al focus (LeadFormSection)
 */
export type FieldVariant = "underline" | "rounded";

const autoCompleteMap: Record<string, string> = {
  nombre: "name",
  email: "email",
  telefono: "tel",
};

const labelClassByVariant: Record<FieldVariant, string> = {
  underline: "block text-[10px] font-semibold uppercase tracking-widest mb-3 transition-colors duration-200",
  rounded: "block text-xs font-semibold text-black/60 mb-2 ml-1",
};

const inputClassByVariant: Record<FieldVariant, string> = {
  underline:
    "w-full bg-transparent border-0 border-b border-black/12 py-3 text-sm text-black placeholder:text-black/35 focus:outline-none focus:ring-0",
  rounded:
    "w-full rounded-full bg-[#fdf8f4] border border-black/10 px-5 py-3.5 text-sm text-black placeholder:text-black/35 focus:outline-none focus:border-lumos-primary focus:ring-2 focus:ring-lumos-primary/15 transition-colors",
};

const textareaClassByVariant: Record<FieldVariant, string> = {
  underline:
    "w-full bg-transparent border-0 border-b border-black/12 py-3 text-sm text-black placeholder:text-black/35 focus:outline-none focus:ring-0 resize-none",
  rounded:
    "w-full rounded-3xl bg-[#fdf8f4] border border-black/10 px-5 py-3.5 text-sm text-black placeholder:text-black/35 focus:outline-none focus:border-lumos-primary focus:ring-2 focus:ring-lumos-primary/15 transition-colors resize-none",
};

function FieldLabel({
  variant,
  htmlFor,
  focused,
  children,
}: {
  variant: FieldVariant;
  htmlFor: string;
  focused: boolean;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={labelClassByVariant[variant]}
      style={
        variant === "underline"
          ? { color: focused ? LUMOS_PRIMARY_HEX : `rgba(${LUMOS_PRIMARY_RGB},0.7)` }
          : undefined
      }
    >
      {children}
    </label>
  );
}

function FocusUnderline({ focused }: { focused: boolean }) {
  return (
    <motion.span
      className="absolute bottom-0 left-0 h-px origin-left"
      style={{ background: LUMOS_PRIMARY_HEX }}
      animate={{ scaleX: focused ? 1 : 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    />
  );
}

export function FormField({
  variant,
  label,
  type,
  name,
  id,
  placeholder,
  value,
  onChange,
}: {
  variant: FieldVariant;
  label: string;
  type: string;
  name: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div>
      <FieldLabel variant={variant} htmlFor={id} focused={focused}>
        {label}
      </FieldLabel>
      <div className="relative">
        <input
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required
          autoComplete={autoCompleteMap[name] ?? "off"}
          className={inputClassByVariant[variant]}
        />
        {variant === "underline" && <FocusUnderline focused={focused} />}
      </div>
    </div>
  );
}

export function FormTextarea({
  variant,
  label,
  name,
  id,
  placeholder,
  value,
  onChange,
  rows = 4,
}: {
  variant: FieldVariant;
  label: string;
  name: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div>
      <FieldLabel variant={variant} htmlFor={id} focused={focused}>
        {label}
      </FieldLabel>
      <div className="relative">
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={rows}
          required
          className={textareaClassByVariant[variant]}
        />
        {variant === "underline" && <FocusUnderline focused={focused} />}
      </div>
    </div>
  );
}
