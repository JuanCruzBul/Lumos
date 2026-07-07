"use client";

import { LUMOS_PRIMARY_HEX, LUMOS_PRIMARY_RGB } from "@/lib/utils";
import { useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2, CheckCircle, AlertCircle, Sparkles, ShieldCheck, Clock } from "lucide-react";
import { useContactForm } from "@/lib/use-contact-form";
import { HoneypotField } from "@/components/ui/honeypot-field";
import { FormField, FormTextarea, FORM_SUCCESS_COLOR, FORM_ERROR_COLOR } from "@/components/ui/form-fields";

const ease = [0.22, 1, 0.36, 1] as const;



export function LeadFormSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const { formState, fields, handleChange, handleSubmit } = useContactForm();

  const buttonConfig = {
    idle: {
      content: (
        <span className="relative flex items-center justify-center gap-2">
          Quiero mi cotización gratis
          <ArrowRight className="h-4 w-4" />
        </span>
      ),
    },
    loading: {
      content: (
        <span className="relative flex items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" /> Enviando...
        </span>
      ),
    },
    success: {
      content: (
        <span className="relative flex items-center justify-center gap-2">
          <CheckCircle className="h-4 w-4" /> ¡Listo! Te contactamos pronto
        </span>
      ),
    },
    error: {
      content: (
        <span className="relative flex items-center justify-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>Error al enviar. Revisá los campos.</span>
        </span>
      ),
    },
  };

  return (
    <section
      id="contacto"
      className="relative overflow-hidden py-20 lg:py-28 px-4 sm:px-8"
      style={{ background: "#fdf8f4" }}
    >
      {/* Decorative glows */}
      <motion.div
        className="pointer-events-none absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full blur-[140px]"
        style={{ background: "radial-gradient(circle, rgba(250,178,87,0.15) 0%, transparent 70%)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />
      <motion.div
        className="pointer-events-none absolute right-1/4 bottom-0 h-[400px] w-[400px] rounded-full blur-[130px]"
        style={{ background: `radial-gradient(circle, rgba(${LUMOS_PRIMARY_RGB},0.15) 0%, transparent 70%)` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
      />

      <div ref={ref} className="relative max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white mb-6"
            style={{ background: LUMOS_PRIMARY_HEX }}
          >
            Cotización gratis y sin compromiso
          </span>

          <h2 className="text-3xl md:text-5xl font-bold text-[#2a2420] leading-[1.1] mb-4 tracking-tight">
            Empezá a transformar tu hogar{" "}
          </h2>

          <p className="text-[#2a2420]/60 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            Dejanos tus datos y nos contactaremos con vos para diseñar la mejor solucion para tu hogar
          </p>
        </motion.div>

        {/* Rounded card with form */}
        <motion.div
          className="relative rounded-[2.5rem] bg-white p-6 sm:p-10 shadow-2xl"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease }}
        >
          <form className="space-y-5" onSubmit={handleSubmit}>
            <HoneypotField value={fields.website} onChange={handleChange} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FormField
                variant="rounded"
                label="Nombre"
                type="text"
                name="nombre"
                id="lead-nombre"
                placeholder="Juan García"
                value={fields.nombre}
                onChange={handleChange}
              />
              <FormField
                variant="rounded"
                label="Email"
                type="email"
                name="email"
                id="lead-email"
                placeholder="juan@email.com"
                value={fields.email}
                onChange={handleChange}
              />
            </div>

            <FormField
              variant="rounded"
              label="Teléfono"
              type="tel"
              name="telefono"
              id="lead-telefono"
              placeholder="+54 11 0000-0000"
              value={fields.telefono}
              onChange={handleChange}
            />

            <FormTextarea
              variant="rounded"
              rows={3}
              label="Contanos sobre tu proyecto"
              name="mensaje"
              id="lead-mensaje"
              placeholder="Tipo de hogar, sistemas que te interesan..."
              value={fields.mensaje}
              onChange={handleChange}
            />

            <motion.button
              type="submit"
              disabled={formState === "loading" || formState === "success"}
              className="relative overflow-hidden w-full h-14 flex items-center justify-center rounded-full text-white font-bold text-sm tracking-wide transition-[background] duration-500 disabled:cursor-not-allowed shadow-lg"
              style={{
                background:
                  formState === "success"
                    ? FORM_SUCCESS_COLOR
                    : formState === "error"
                      ? FORM_ERROR_COLOR
                      : LUMOS_PRIMARY_HEX,
              }}
              whileHover={formState === "idle" ? { scale: 1.02 } : {}}
              whileTap={formState === "idle" ? { scale: 0.98 } : {}}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={formState}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="block"
                >
                  {buttonConfig[formState].content}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </form>

        </motion.div>
      </div>
    </section>
  );
}
