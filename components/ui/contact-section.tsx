"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

type FormState = "idle" | "loading" | "success" | "error";

const ease = [0.22, 1, 0.36, 1] as const;

export function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fields, setFields] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });

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
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const data = await res.json();

      if (!res.ok || data.error) {
        setErrorMsg(data.error || "Error al enviar. Intentá de nuevo.");
        setFormState("error");
        setTimeout(() => setFormState("idle"), 4000);
      } else {
        setFormState("success");
        setFields({ nombre: "", email: "", telefono: "", mensaje: "" });
        setTimeout(() => setFormState("idle"), 4000);
      }
    } catch {
      setErrorMsg("Error de red. Revisá tu conexión.");
      setFormState("error");
      setTimeout(() => setFormState("idle"), 4000);
    }
  }

  const contactInfo = [
    { label: "Email", value: "lumosdomotica@gmail.com" },
    { label: "Teléfono", value: "+54 3541 598686" },
    { label: "Ciudad", value: "Villa Carlos Paz, Córdoba" },
  ];

  const buttonConfig = {
    idle: {
      bg: "linear-gradient(135deg, #c5704b 0%, #fab257 100%)",
      content: <span className="relative">Enviar Mensaje</span>,
    },
    loading: {
      bg: "linear-gradient(135deg, #c5704b 0%, #fab257 100%)",
      content: (
        <span className="relative flex items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" /> Enviando...
        </span>
      ),
    },
    success: {
      bg: "linear-gradient(135deg, #3a9c6e 0%, #5dd99c 100%)",
      content: (
        <span className="relative flex items-center justify-center gap-2">
          <CheckCircle className="h-4 w-4" /> ¡Mensaje enviado!
        </span>
      ),
    },
    error: {
      bg: "linear-gradient(135deg, #c5504b 0%, #e07050 100%)",
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
      className="relative overflow-hidden bg-[#fdf8f4] min-h-screen flex flex-col justify-center py-20 lg:py-28 px-8"
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
        className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-20 items-start"
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
              style={{ background: "linear-gradient(to right, #c5704b, #fab257)" }}
            />
            Contacto
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-[1.08] mb-6 tracking-tight">
            Transformá tu<br />
            hogar con{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #c5704b 0%, #fab257 100%)" }}
            >
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
            className="mt-10 inline-flex items-center gap-3 border border-black/10 rounded-full px-5 py-2.5 cursor-default"
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
            <div className="grid grid-cols-2 gap-6">
              <Field
                label="Nombre"
                type="text"
                name="nombre"
                placeholder="Juan García"
                value={fields.nombre}
                onChange={handleChange}
              />
              <Field
                label="Email"
                type="email"
                name="email"
                placeholder="juan@email.com"
                value={fields.email}
                onChange={handleChange}
              />
            </div>

            <Field
              label="Teléfono"
              type="tel"
              name="telefono"
              placeholder="+54 11 0000-0000"
              value={fields.telefono}
              onChange={handleChange}
            />

            <TextareaField
              label="Mensaje"
              name="mensaje"
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
  placeholder,
  value,
  onChange,
}: {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <motion.div whileFocus={{ y: -2 }}>
      <label
        className="block text-[10px] font-semibold uppercase tracking-widest mb-3 transition-colors duration-200"
        style={{ color: focused ? "#c5704b" : "rgba(197,112,75,0.7)" }}
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent border-0 border-b border-black/12 py-3 text-sm text-black placeholder:text-black/35 focus:outline-none focus:ring-0"
        />
        <motion.span
          className="absolute bottom-0 left-0 h-px origin-left"
          style={{ background: "linear-gradient(to right, #c5704b, #fab257)" }}
          animate={{ scaleX: focused ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

function TextareaField({
  label,
  name,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <motion.div whileFocus={{ y: -2 }}>
      <label
        className="block text-[10px] font-semibold uppercase tracking-widest mb-3 transition-colors duration-200"
        style={{ color: focused ? "#c5704b" : "rgba(197,112,75,0.7)" }}
      >
        {label}
      </label>
      <div className="relative">
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={4}
          className="w-full bg-transparent border-0 border-b border-black/12 py-3 text-sm text-black placeholder:text-black/35 focus:outline-none focus:ring-0 resize-none"
        />
        <motion.span
          className="absolute bottom-0 left-0 h-px origin-left"
          style={{ background: "linear-gradient(to right, #c5704b, #fab257)" }}
          animate={{ scaleX: focused ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}
