import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nombre, email, telefono, mensaje } = body;

    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: "Faltan campos requeridos: nombre, email y mensaje son obligatorios." },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: "Lumos Contacto <onboarding@resend.dev>",
      to: "lumosdomotica@gmail.com",
      subject: `Nuevo contacto desde lumoshogar.ar — ${nombre}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f9f9f9; border-radius: 8px;">
          <h2 style="color: #1a1a1a; margin-bottom: 24px;">Nuevo mensaje de contacto</h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; width: 120px;">
                <strong style="color: #555;">Nombre</strong>
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; color: #1a1a1a;">
                ${nombre}
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                <strong style="color: #555;">Email</strong>
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; color: #1a1a1a;">
                <a href="mailto:${email}" style="color: #6366f1;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                <strong style="color: #555;">Teléfono</strong>
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; color: #1a1a1a;">
                ${telefono || "No proporcionado"}
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; vertical-align: top;">
                <strong style="color: #555;">Mensaje</strong>
              </td>
              <td style="padding: 12px 0; color: #1a1a1a; white-space: pre-wrap;">
                ${mensaje}
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
