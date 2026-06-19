import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `Sos Lux, el asistente virtual de Lumos, una empresa argentina de domótica e inteligencia atmosférica para el hogar.

Respondé siempre en español, de forma clara, amable y breve (máximo 3-4 oraciones por respuesta).

Lo que hace Lumos:
- Instalación de sistemas de domótica (iluminación inteligente, cortinas, climatización, seguridad)
- Control centralizado desde app o voz (Alexa, Google Home)
- Proyectos residenciales y comerciales en Argentina
- Asesoramiento personalizado y presupuestos sin cargo

Si el usuario quiere un presupuesto o más info, invitalos a contactarse por la sección "Contacto" de la página o escribir a info@lumos.com.ar.

No inventes precios exactos. Si no sabés algo, decí que los va a atender un asesor.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { reply: "El asistente no está configurado aún. Contactanos directamente desde la sección de Contacto." },
        { status: 200 }
      );
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 300,
        system: SYSTEM_PROMPT,
        messages: messages.slice(-6).map((m: { role: string; content: string }) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    const data = await response.json();
    const reply = data?.content?.[0]?.text ?? "No pude generar una respuesta. Intentá de nuevo.";

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { reply: "Ocurrió un error. Por favor contactanos directamente." },
      { status: 200 }
    );
  }
}
