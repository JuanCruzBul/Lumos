"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useContactForm } from "@/lib/use-contact-form";

const ease = [0.22, 1, 0.36, 1] as const;

export function ContactSection({
  sectionId = "contacto",
  idSuffix = "",
}: {
  sectionId?: string;
  idSuffix?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const { formState, fields, handleChange, handleSubmit } = useContactForm();

  const contactInfo = [
    { label: "Email", value: "lumosdomotica@gmail.com" },
    { label: "Teléfono", value: "+54 3541 598686" },
    { label: "Ciudad", value: "Villa Carlos Paz, Córdoba" },
  ];

  const buttonConfig = {
    idle: {
      bg: "#c5704b",
      content: <span className="relative">Enviar Mensaje</span>,
    },
    loading: {
      bg: "#c5704b",
      content: (
        <span className="relative flex items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" /> Enviando...
        </span>
      ),
    },
    success: {
      bg: "#3a9c6e",
      content: (
        <span className="relative flex items-center justify-center gap-2">
          <CheckCircle className="h-4 w-4" /> ¡Mensaje enviado!
        </span>
      ),
    },
    error: {
      bg: "#c5504b",
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
      id={sectionId}
      className="relative overflow-hidden bg-[#fdf8f4] min-h-screen flex flex-col justify-center py-16 lg:py-28 px-4 sm:px-8"
    >
      {/* Warm glow — animates in */}
      <motion.div
        className="pointer-events-none absolute right-1/4 top-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full blur-[140px]"
        style={{ background: "radial-gradient(circle, rgba(250,178,87,0.13) 0%, transparent 70%)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      <div
        ref={ref}
        className="relative max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 items-start"
      >
        {/* Left: copy */}
        <motion.div
          className="pt-4"
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#c5704b] mb-6">
            <span
              className="inline-block w-6 h-px"
              style={{ background: "#c5704b" }}
            />
            Contacto
          </span>

          <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold text-black leading-[1.08] mb-6 tracking-tight">
            Transformá tu hogar con{" "}
            <span className="text-[#c5704b]">
              Lumos
            </span>
          </h2>

          <p className="text-black/60 text-sm leading-relaxed max-w-xs mb-12">
            Nuestro equipo diseña la solución perfecta para tu espacio.
            Contanos qué necesitás y nos ponemos en contacto a la brevedad.
          </p>

          {/* Contact info — stagger */}
          <motion.div
            className="space-y-4"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
              hidden: {},
            }}
          >
            {contactInfo.map(({ label, value }) => (
              <motion.div
                key={label}
                className="flex items-baseline gap-4"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
                }}
              >
                <span className="text-[10px] uppercase tracking-widest text-[#c5704b]/70 w-16 shrink-0">
                  {label}
                </span>
                <span className="text-[#2a2420] text-sm">{value}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Response time badge */}
          <motion.div
            className="mt-10 inline-flex items-center gap-3 border border-black/10 rounded-full px-3 sm:px-5 py-2.5 cursor-default"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.55, ease: "easeOut" }}
            whileHover={{ scale: 1.03 }}
          >
            <span className="h-2 w-2 rounded-full bg-[#c5704b] animate-pulse" />
            <span className="text-black/40 text-xs tracking-wide">Respondemos a la brevedad</span>
          </motion.div>
        </motion.div>

        {/* Right: form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease }}
        >
          <p className="text-black/50 text-xs uppercase tracking-widest mb-10">
            Todos los campos son obligatorios
          </p>

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Field
                label="Nombre"
                type="text"
                name="nombre"
                id={`nombre${idSuffix}`}
                placeholder="Juan García"
                value={fields.nombre}
                onChange={handleChange}
              />
              <Field
                label="Email"
                type="email"
                name="email"
                id={`email${idSuffix}`}
                placeholder="juan@email.com"
                value={fields.email}
                onChange={handleChange}
              />
            </div>

            <Field
              label="Teléfono"
              type="tel"
              name="telefono"
              id={`telefono${idSuffix}`}
              placeholder="+54 11 0000-0000"
              value={fields.telefono}
              onChange={handleChange}
            />

            <TextareaField
              label="Mensaje"
              name="mensaje"
              id={`mensaje${idSuffix}`}
              placeholder="Contanos sobre tu proyecto, tipo de hogar, qué sistemas te interesan..."
              value={fields.mensaje}
              onChange={handleChange}
            />

            <div className="pt-2">
              <motion.button
                type="submit"
                disabled={formState === "loading" || formState === "success"}
                className="relative overflow-hidden w-full h-14 flex items-center justify-center rounded-xl text-white font-bold text-xs uppercase tracking-widest transition-[background] duration-500 disabled:cursor-not-allowed"
                style={{ background: buttonConfig[formState].bg }}
                whileHover={formState === "idle" ? { scale: 1.01 } : {}}
                whileTap={formState === "idle" ? { scale: 0.99 } : {}}
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
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

function Field({
  label,
  type,
  name,
  id,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  type: string;
  name: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [focused, setFocused] = useState(false);

  const autoCompleteMap: Record<string, string> = {
    nombre: "name",
    email: "email",
    telefono: "tel",
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[10px] font-semibold uppercase tracking-widest mb-3 transition-colors duration-200"
        style={{ color: focused ? "#c5704b" : "rgba(197,112,75,0.7)" }}
      >
        {label}
      </label>
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
          className="w-full bg-transparent border-0 border-b border-black/12 py-3 text-sm text-black placeholder:text-black/35 focus:outline-none focus:ring-0"
        />
        <motion.span
          className="absolute bottom-0 left-0 h-px origin-left"
          style={{ background: "#c5704b" }}
          animate={{ scaleX: focused ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function TextareaField({
  label,
  name,
  id,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  name: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[10px] font-semibold uppercase tracking-widest mb-3 transition-colors duration-200"
        style={{ color: focused ? "#c5704b" : "rgba(197,112,75,0.7)" }}
      >
        {label}
      </label>
      <div className="relative">
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={4}
          required
          className="w-full bg-transparent border-0 border-b border-black/12 py-3 text-sm text-black placeholder:text-black/35 focus:outline-none focus:ring-0 resize-none"
        />
        <motion.span
          className="absolute bottom-0 left-0 h-px origin-left"
          style={{ background: "#c5704b" }}
          animate={{ scaleX: focused ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
