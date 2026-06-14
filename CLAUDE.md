# Lumos — Contexto del Proyecto

Landing page de marketing para **Lumos**, empresa de domótica e inteligencia atmosférica para el hogar.

## Stack

- **Framework**: Next.js 15 (App Router)
- **Estilos**: Tailwind CSS
- **Fuente**: Quicksand (Google Fonts)
- **UI components**: shadcn/ui (`components.json`)
- **Lenguaje**: TypeScript

## Estructura

```
Lumos/
├── app/
│   ├── globals.css
│   ├── layout.tsx          ← root layout (fuente Quicksand, Navbar, body)
│   └── page.tsx            ← página principal (ensambla todas las secciones)
│
├── components/
│   └── ui/
│       ├── navbar.tsx                    ← navegación con pill animado y menú mobile
│       ├── hero-section.tsx              ← sección hero principal
│       ├── hero-scroll-demo.tsx          ← dashboard interactivo de domótica (tablet mockup)
│       ├── container-scroll-animation.tsx← animación de scroll para el dashboard
│       ├── value-props.tsx               ← propuesta de valor
│       ├── como-funciona-section.tsx     ← pasos de cómo funciona el servicio
│       ├── sistemas-section.tsx          ← catálogo de sistemas/servicios
│       ├── planes-section.tsx            ← planes y precios
│       ├── testimonios-section.tsx       ← testimonios de clientes
│       ├── nosotros-section.tsx          ← equipo fundador
│       ├── contact-section.tsx           ← formulario de contacto
│       ├── footer.tsx
│       └── utils.ts
│
├── lib/
│   └── utils.ts            ← utilidades compartidas (cn helper)
│
├── public/
│   ├── images/
│   │   ├── juan-cruz-bulatovich.webp   ← foto fundador
│   │   ├── jesus-manuel-martinez.webp  ← foto fundador
│   │   └── juan.jpeg
│   ├── logo.svg
│   └── smart-home-dashboard.png
│
├── next.config.ts
├── tailwind.config.ts
├── components.json
└── package.json
```

## Convenciones

- Cada sección de la landing vive en su propio componente dentro de `components/ui/`.
- Los componentes client-side llevan `"use client"` al tope del archivo.
- Las imágenes del equipo se sirven desde `public/images/` en formato `.webp`.
- El scroll entre secciones usa `id` en cada sección y la navbar navega con anclas.

## Notas importantes

- `suppressHydrationWarning` en el `<body>` del layout para evitar errores de hidratación causados por extensiones del navegador.
- El reloj en `hero-scroll-demo.tsx` inicializa con `null` y se setea en `useEffect` para evitar mismatch de SSR.
