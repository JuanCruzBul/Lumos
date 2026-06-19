"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles, ChevronDown } from "lucide-react";

type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
};

const SUGGESTIONS = [
  "¿Qué sistemas instalan?",
  "¿Cuánto cuesta?",
  "¿Cómo funciona el proceso?",
];

const WELCOME: Message = {
  id: 0,
  role: "assistant",
  text: "¡Hola! Soy Lux, el asistente de Lumos 🌟\n¿En qué puedo ayudarte hoy?",
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(1);

  useEffect(() => {
    if (open) {
      setUnread(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { id: nextId.current++, role: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.text,
          })),
        }),
      });

      const data = await res.json();
      const reply: Message = {
        id: nextId.current++,
        role: "assistant",
        text: data.reply ?? "Lo siento, no pude procesar tu consulta.",
      };
      setMessages((prev) => [...prev, reply]);
      if (!open) setUnread(true);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: nextId.current++, role: "assistant", text: "Ocurrió un error. Intentá de nuevo." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Abrir asistente Lux"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          background: "linear-gradient(135deg, #c5704b 0%, #fab257 100%)",
          boxShadow: "0 4px 24px rgba(197,112,75,0.45)",
        }}
      >
        {unread && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-white" />
        )}
        <span
          className="transition-all duration-300"
          style={{ transform: open ? "rotate(180deg) scale(0.8)" : "rotate(0deg) scale(1)" }}
        >
          {open ? <ChevronDown size={22} color="white" /> : <Sparkles size={22} color="white" />}
        </span>
      </button>

      {/* Chat panel */}
      <div
        className="fixed bottom-24 right-6 z-50 flex flex-col rounded-2xl overflow-hidden"
        style={{
          width: "min(360px, calc(100vw - 48px))",
          height: "480px",
          background: "rgba(254,254,254,0.96)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(197,112,75,0.18)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.12), 0 0 0 1px rgba(197,112,75,0.08)",
          transform: open ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "transform 280ms cubic-bezier(0.34,1.56,0.64,1), opacity 220ms ease",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, #c5704b 0%, #fab257 100%)",
          }}
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <Sparkles size={16} color="white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm leading-none">Lux</p>
            <p className="text-white/70 text-xs mt-0.5">Asistente Lumos</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-white/70 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
            aria-label="Cerrar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ scrollbarWidth: "thin" }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className="max-w-[80%] text-sm leading-relaxed whitespace-pre-wrap"
                style={{
                  padding: "10px 14px",
                  borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  background:
                    msg.role === "user"
                      ? "linear-gradient(135deg, #c5704b 0%, #fab257 100%)"
                      : "rgba(197,112,75,0.08)",
                  color: msg.role === "user" ? "white" : "#1a1a1a",
                  border: msg.role === "user" ? "none" : "1px solid rgba(197,112,75,0.14)",
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div
                className="flex items-center gap-1"
                style={{
                  padding: "12px 16px",
                  borderRadius: "18px 18px 18px 4px",
                  background: "rgba(197,112,75,0.08)",
                  border: "1px solid rgba(197,112,75,0.14)",
                }}
              >
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background: "#c5704b",
                      animation: "dotPulse 1.2s ease-in-out infinite",
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Suggestions (only on first message) */}
        {messages.length === 1 && (
          <div className="px-4 pb-2 flex flex-wrap gap-1.5 flex-shrink-0">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="text-xs px-3 py-1.5 rounded-full border transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  borderColor: "rgba(197,112,75,0.3)",
                  color: "#c5704b",
                  background: "rgba(197,112,75,0.05)",
                }}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div
          className="flex items-center gap-2 px-3 py-3 flex-shrink-0"
          style={{ borderTop: "1px solid rgba(197,112,75,0.12)" }}
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send(input)}
            placeholder="Escribí tu consulta..."
            className="flex-1 text-sm bg-transparent outline-none placeholder:text-black/30 font-quicksand"
            style={{ color: "#1a1a1a" }}
            disabled={loading}
          />
          <button
            onClick={() => send(input)}
            disabled={!input.trim() || loading}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-40 hover:scale-110 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #c5704b 0%, #fab257 100%)",
            }}
            aria-label="Enviar"
          >
            <Send size={14} color="white" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes dotPulse {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </>
  );
}
