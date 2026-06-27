import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Lumos — Domótica y Hogar Inteligente";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #fdf8f4 0%, #fef6ee 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Warm glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 800,
            height: 500,
            background:
              "radial-gradient(ellipse at top, rgba(250,178,87,0.22) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Brand name */}
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "#c5704b",
            marginBottom: 16,
          }}
        >
          Lumos
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            fontWeight: 400,
            color: "rgba(42,36,32,0.65)",
            letterSpacing: "0.01em",
          }}
        >
          Domótica y Hogar Inteligente
        </div>

        {/* Divider */}
        <div
          style={{
            marginTop: 40,
            width: 80,
            height: 3,
            background: "linear-gradient(to right, #c5704b, #fab257)",
            borderRadius: 9999,
          }}
        />

        {/* Sub-copy */}
        <div
          style={{
            marginTop: 32,
            fontSize: 22,
            color: "rgba(42,36,32,0.45)",
            textAlign: "center",
            maxWidth: 700,
          }}
        >
          Automatización de luces, clima, seguridad y energía.
          Instalación profesional en Argentina.
        </div>
      </div>
    ),
    { ...size }
  );
}
