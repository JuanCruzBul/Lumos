import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// ── Rate limiting por IP (en memoria; suficiente para un server único) ──
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutos

const hitsByIp = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;

  // poda global ocasional para que el Map no crezca sin límite
  if (hitsByIp.size > 1000) {
    for (const [key, timestamps] of hitsByIp) {
      if (timestamps.every((t) => t <= windowStart)) hitsByIp.delete(key);
    }
  }

  const recent = (hitsByIp.get(ip) ?? []).filter((t) => t > windowStart);
  if (recent.length >= RATE_LIMIT_MAX) {
    hitsByIp.set(ip, recent);
    return true;
  }
  recent.push(now);
  hitsByIp.set(ip, recent);
  return false;
}

// ── Validación ──
const MAX_LENGTHS = { nombre: 200, email: 200, telefono: 50, mensaje: 2000 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactFields = { nombre: string; email: string; telefono: string; mensaje: string };

function validate(body: Record<string, unknown>): { fields: ContactFields } | { error: string } {
  const nombre = typeof body.nombre === "string" ? body.nombre.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const telefono = typeof body.telefono === "string" ? body.telefono.trim() : "";
  const mensaje = typeof body.mensaje === "string" ? body.mensaje.trim() : "";

  if (!nombre || !email || !mensaje) {
    return { error: "Faltan campos requeridos: nombre, email y mensaje son obligatorios." };
  }
  if (!EMAIL_RE.test(email)) {
    return { error: "El email no tiene un formato válido." };
  }
  if (
    nombre.length > MAX_LENGTHS.nombre ||
    email.length > MAX_LENGTHS.email ||
    telefono.length > MAX_LENGTHS.telefono ||
    mensaje.length > MAX_LENGTHS.mensaje
  ) {
    return { error: "Uno de los campos supera la longitud máxima permitida." };
  }
  return { fields: { nombre, email, telefono, mensaje } };
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Demasiados envíos. Esperá unos minutos e intentá de nuevo." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Honeypot: campo invisible para humanos; si viene lleno es un bot.
    // Se responde éxito falso para no darle señal de que fue detectado.
    if (typeof body.website === "string" && body.website.length > 0) {
      return NextResponse.json({ success: true });
    }

    const result = validate(body);
    if ("error" in result) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    const { nombre, email, telefono, mensaje } = result.fields;

    // Instanciado acá y no a nivel de módulo: el constructor de Resend
    // lanza si falta la API key, y eso rompería la carga de toda la ruta.
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY no configurada — no se puede enviar el email.");
      return NextResponse.json(
        { error: "El servicio de contacto no está disponible en este momento." },
        { status: 500 }
      );
    }
    const resend = new Resend(process.env.RESEND_API_KEY);

    const safeNombre = escapeHtml(nombre);
    const safeEmail = escapeHtml(email);
    const safeTelefono = telefono ? escapeHtml(telefono) : "No proporcionado";
    const safeMensaje = escapeHtml(mensaje);

    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "Lumos Contacto <onboarding@resend.dev>",
      to: process.env.RESEND_TO_EMAIL ?? "lumosdomotica@gmail.com",
      subject: `Nuevo contacto desde lumoshogar.ar — ${safeNombre}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f9f9f9; border-radius: 8px;">
          <h2 style="color: #1a1a1a; margin-bottom: 24px;">Nuevo mensaje de contacto</h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; width: 120px;">
                <strong style="color: #555;">Nombre</strong>
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; color: #1a1a1a;">
                ${safeNombre}
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                <strong style="color: #555;">Email</strong>
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; color: #1a1a1a;">
                <a href="mailto:${safeEmail}" style="color: #6366f1;">${safeEmail}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                <strong style="color: #555;">Teléfono</strong>
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; color: #1a1a1a;">
                ${safeTelefono}
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; vertical-align: top;">
                <strong style="color: #555;">Mensaje</strong>
              </td>
              <td style="padding: 12px 0; color: #1a1a1a; white-space: pre-wrap;">
                ${safeMensaje}
              </td>
            </tr>
          </table>

          <p style="margin-top: 32px; font-size: 12px; color: #999;">
            Este mensaje fue enviado desde el formulario de contacto de lumoshogar.ar
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Error al enviar el email. Por favor intentá nuevamente." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { error: "Error inesperado del servidor." },
      { status: 500 }
    );
  }
}
