# LUMOS — Sitio Web: Documentación Técnica

Landing page de marketing para Lumos, empresa de domótica e inteligencia atmosférica para el hogar.

Ruta del proyecto: `/home/juanchi/Escritorio/Lumos`

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 15 (App Router) |
| Estilos | Tailwind CSS v4 |
| Animaciones | Framer Motion |
| Iconos | Lucide React |
| Fuente | Quicksand (Google Fonts, variable `--font-quicksand`) |
| Imágenes | next/image |
| UI Components | shadcn/ui (`components.json`) |
| Lenguaje | TypeScript |

---

## Estructura de archivos

```
Lumos/
├── app/
│   ├── globals.css              ← variables CSS, clases globales (.glass-panel, .path-draw, etc.)
│   ├── layout.tsx               ← root layout (fuente Quicksand, Navbar, body)
│   └── page.tsx                 ← página principal (ensambla todas las secciones)
│
├── components/
│   └── ui/
│       ├── navbar.tsx                     ← navegación con pill animado y menú mobile
│       ├── hero-section.tsx               ← sección hero principal con logo animado
│       ├── hero-scroll-demo.tsx           ← dashboard interactivo de domótica (tablet mockup)
│       ├── container-scroll-animation.tsx ← animación de scroll para el dashboard
│       ├── value-props.tsx                ← propuesta de valor (grid 3 cols)
│       ├── como-funciona-section.tsx      ← pasos de cómo funciona (sticky scroll 280vh)
│       ├── sistemas-section.tsx           ← catálogo de servicios con modal
│       ├── planes-section.tsx             ← kits y precios (grid 3 cols)
│       ├── testimonios-section.tsx        ← testimonios de clientes
│       ├── nosotros-section.tsx           ← equipo fundador
│       ├── contact-section.tsx            ← formulario de contacto
│       ├── footer.tsx                     ← (comentado en page.tsx, no visible)
│       └── utils.ts
│
├── public/
│   ├── images/
│   │   ├── juan-cruz-bulatovich.webp     ← foto fundador
│   │   └── jesus-manuel-martinez.webp    ← foto cofundador
│   ├── logo.svg
│   └── smart-home-dashboard.png
│
├── CLAUDE.md                    ← instrucciones para Claude Code
├── components.json
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

---

## Orden de secciones en la landing

```
1. HeroSection          → min-h-screen, bg Unsplash opacity-20, logo animado SVG
2. HeroScrollDemo       → ContainerScroll + SmartHomeDashboard (tablet mockup)
3. ValueProps           → grid 3 cols, glass-panel
4. SistemasSection      → id="productos", grid 4 cols en lg, con modal de detalle
5. ComoFuncionaSection  → id="proceso", sticky scroll 280vh, Framer Motion
6. PlanesSection        → id="planes", grid 3 cols, plan central en negro
7. TestimoniosSection   → id="clientes", grid 3 cols, glass-panel
8. NosotrosSection      → id="nosotros", fotos fundadores
9. ContactSection       → id="contacto", grid 2 cols (copy + form)
10. Footer              ← comentado/deshabilitado actualmente
```

---

## IDs de navegación (anclas)

```
#productos   → SistemasSection
#proceso     → ComoFuncionaSection
#planes      → PlanesSection
#clientes    → TestimoniosSection
#nosotros    → NosotrosSection
#contacto    → ContactSection
```

---

## Convenciones de código

- Componentes en `components/ui/`, uno por archivo
- Datos locales (arrays de contenido) definidos en el mismo archivo del componente
- `"use client"` solo cuando hay estado, efectos o scroll hooks
- Colores inline con `style={}` para valores con opacidad variable; clases Tailwind para el resto
- Imágenes del equipo en `public/images/` en formato `.webp`
- `suppressHydrationWarning` en el `<body>` del layout (evita errores por extensiones del navegador)
- El reloj en `hero-scroll-demo.tsx` inicializa con `null` y se setea en `useEffect` (evita mismatch SSR)

---

## Estado actual del sitio

- La sección `Footer` existe pero está **comentada** en `page.tsx` (línea 24: `{/* <Footer /> */}`)
- El sitio tiene Git configurado con remote en origin
- Hay fotos reales de los fundadores en `public/images/`
- El hero usa imagen de Unsplash (foto de hogar moderno)
- El dashboard interactivo del hero simula un panel de control de domótica

---

## Notas de desarrollo

- Para correr en desarrollo: `npm run dev` desde `/home/juanchi/Escritorio/Lumos`
- Tailwind v4 no usa `tailwind.config.ts` de la misma forma que v3 — respetar configuración existente
- Framer Motion se usa en SistemasSection (cards + modal), ComoFuncionaSection, NosotrosSection, HeroScrollDemo
