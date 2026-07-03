"use client";

import { useEffect, useState } from "react";

export type FormState = "idle" | "loading" | "success" | "error";

// `website` es un honeypot anti-bots: nunca se muestra a humanos y el
// endpoint descarta el envío si viene con contenido.
const emptyFields = { nombre: "", email: "", telefono: "", mensaje: "", website: "" };

export function useContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [fields, setFields] = useState(emptyFields);

  useEffect(() => {
    function onPlanSelected(e: Event) {
      const { mensaje } = (e as CustomEvent<{ mensaje: string }>).detail;
      setFields((prev) => ({ ...prev, mensaje }));
    }
    window.addEventListener("lumos:plan-selected", onPlanSelected);
    return () => window.removeEventListener("lumos:plan-selected", onPlanSelected);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (formState === "loading" || formState === "success") return;

    setFormState("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const data = await res.json();

      if (!res.ok || data.error) {
        setFormState("error");
        setTimeout(() => setFormState("idle"), 4000);
      } else {
        setFormState("success");
        setFields(emptyFields);
        setTimeout(() => setFormState("idle"), 4000);
      }
    } catch {
      setFormState("error");
      setTimeout(() => setFormState("idle"), 4000);
    }
  }

  return { formState, fields, handleChange, handleSubmit };
}
