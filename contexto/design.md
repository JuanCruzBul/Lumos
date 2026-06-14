# Lumos — Design System

Sistema de diseño extraído directamente del código fuente en `/home/juanchi/Escritorio/Lumos`.

---

## Paleta de colores

### Colores primarios

| Token | Hex | Uso |
|---|---|---|
| Primary | `#c5704b` | Acentos, iconos, CTAs, pill activo en navbar |
| Secondary | `#fab257` | Gradientes, animaciones, texto degradado |
| Background | `#fefefe` | Fondo base de la página |
| Warm bg | `#fdf8f4` | Fondo de secciones alternadas (Sistemas, Contacto, Planes) |
| Black | `#000000` | Card destacado (plan Integral), footer |
| Text principal | `#000000` | Títulos y cuerpo |
| Text secundario | `rgba(0,0,0,0.55–0.60)` | Subtítulos y descripciones |
| Text tenue | `rgba(0,0,0,0.35–0.45)` | Metadatos, labels secundarios |

### Gradiente de marca

```css
background: linear-gradient(135deg, #c5704b 0%, #fab257 100%);
```

Usado en: botón primario de contacto, línea animada del proceso, underline del hero.

### Transparencias frecuentes

```
rgba(197,112,75, 0.08)  → fondo de badge
rgba(197,112,75, 0.10)  → fondo de íconos en cards
rgba(197,112,75, 0.14)  → borde glass-panel
rgba(197,112,75, 0.20)  → borde de badge hero
rgba(197,112,75, 0.40)  → borde glow-active
rgba(197,112,75, 0.45)  → borde de círculos del proceso
```

---

## Tipografía

**Familia única:** Quicksand (Google Fonts, variable via `--font-quicksand`)

Todos los elementos usan Quicksand. Los pesos se asignan por etiqueta:

| Elemento | Peso |
|---|---|
| `h1`, `.title` | Bold (700) |
| `h2`–`h6`, `.subtitle` | Semibold (600) |
| `p`, `li`, `span`, `.body-text` | Normal (400) |

### Escala tipográfica en uso

| Tamaño | Clase Tailwind | Contexto |
|---|---|---|
| 10px | `text-[10px]` | Labels de formulario, eyebrows de sección |
| 12px | `text-xs` | Badges, metadatos, pie de footer |
| 14px | `text-sm` | Cuerpo de cards, descripción de features |
| 16px | `text-base` | Párrafos hero, headers internos del dashboard |
| 20px | `text-xl` | Títulos de cards ValueProps |
| 36px | `text-4xl` | H2 mobile / secciones internas |
| 48px | `text-5xl` | H2 tablet |
| 60px | `text-6xl` | H2 desktop, Hero H1 en tablet |
| 72px | `text-7xl` | Hero H1 desktop |

**Tracking en eyebrows:** `tracking-widest` + `uppercase` + `text-[10px]` o `text-xs`.

---

## Breakpoints

Tailwind estándar, mobile-first:

| Nombre | Min-width | Uso principal |
|---|---|---|
| base | 0px | Mobile — layouts en 1 columna |
| `md` | 768px | Tablet — 2–4 columnas, navbar desktop visible |
| `lg` | 1024px | Desktop — tipografía grande, gaps amplios |

---

## Espaciado y layout

### Contenedores

| Sección | Clase |
|---|---|
| Mayoría de secciones | `max-w-6xl mx-auto` |
| ValueProps | `max-w-7xl mx-auto` |
| Proceso / Planes | `max-w-5xl mx-auto` |
| Hero | `max-w-4xl mx-auto` |

### Padding horizontal de secciones
`px-8` (32px) en todas las secciones.

### Padding vertical de secciones

| Sección | Clase |
|---|---|
| ValueProps | `py-20` |
| Sistemas, Testimonios, Planes | `py-24` |
| Contacto | `py-20 lg:py-28` |
| Hero | `min-h-screen pt-32` |
| Proceso | `height: 280vh` (sticky scroll) |

### Gaps de grillas

| Contexto | Clase |
|---|---|
| Cards generales | `gap-5` / `gap-6` |
| Contacto (columnas) | `gap-10 lg:gap-20` |
| Footer | `gap-10` |
| Hero buttons | `gap-4` |

---

## Componentes reutilizables

### `.glass-panel` (definido en globals.css)

```css
background: rgba(255, 255, 255, 0.82);
backdrop-filter: blur(20px);
border: 1px solid rgba(197, 112, 75, 0.14);
box-shadow: 0 2px 24px rgba(0, 0, 0, 0.05);
```

Usado en: ValueProps, Sistemas, Testimonios, plan Esencial y Elite.

### `.glow-active` (hover state de cards)

```css
box-shadow: 0 8px 40px rgba(197, 112, 75, 0.18);
border-color: rgba(197, 112, 75, 0.40) !important;
```

Transición: `transition-all duration-500`.

### Navbar pill (flotante)

- Fondo: `rgba(254,254,254,0.93)` + `backdrop-filter: blur(16px)`
- Sombra: `0 1px 4px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.06)`
- Borde: `rounded-full`
- Indicador activo: span absoluto `bg-[#c5704b]` con transición suave de `left` y `width`

### Botón primario

```
bg-[#c5704b] text-white rounded-full px-10 py-3
text-xs font-bold uppercase tracking-wider
hover:bg-[#b5613c] active:scale-95 transition-all duration-200
```

### Botón secundario (outline)

```
text-black rounded-full px-10 py-3
text-xs font-semibold uppercase tracking-wider
border: 1.5px solid rgba(0,0,0,0.18)
hover:bg-black/[0.06] active:scale-95
```

### Botón full-width (formulario)

```
w-full py-4 rounded-xl text-white font-bold text-xs uppercase tracking-widest
background: linear-gradient(135deg, #c5704b 0%, #fab257 100%)
```

Lleva shimmer effect en hover: span absoluto con gradiente `via-white/15`.

### Eyebrow de sección

```tsx
<span className="text-xs uppercase tracking-widest font-semibold text-[#c5704b]">
  Nombre de sección
</span>
```

### Card de plan destacado (Kit Completo)

- Fondo: `bg-[#000000]`
- Badge "Más popular": `bg-[#c5704b]`, posición `absolute -top-3.5 left-1/2 -translate-x-1/2`
- Texto: blanco con opacidades `text-white/60`, `text-white/45`, `text-white/40`
- Check icon: `text-[#fab257]`

### Modal de servicio (SistemasSection)

- Overlay: `bg-black/60 backdrop-blur-[6px]`
- Panel: `bg-white rounded-t-[28px] md:rounded-[28px]`
- Layout: imagen 42% | contenido 58% en desktop; imagen encima en mobile
- Animación: spring (damping 30, stiffness 320, mass 0.8)
- Cierra con: click en overlay, botón X, tecla Escape

---

## Animaciones

### Path draw del logo (hero)

```css
.path-draw {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: drawPath 3s ease-in-out forwards;
}
@keyframes drawPath { to { stroke-dashoffset: 0; } }
```

Stagger delays: `.stagger-1` (0.2s), `.stagger-2` (0.6s), `.stagger-3` (1.0s), `.stagger-4` (1.4s), `.stagger-5` (1.8s).

### Fade-in-up (hero content)

```css
.fade-in-up {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 1s ease-out 2.5s forwards;
}
```

### Floating (logo hero)

```css
.floating { animation: floating 6s ease-in-out infinite; }
@keyframes floating {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-15px); }
}
```

### Scroll animations (Framer Motion)

**ComoFuncionaSection:**
- Sección sticky de `280vh` con `useScroll({ offset: ["start start", "end end"] })`
- Línea animada: `scaleX` de 0→1 entre progress `[0.15, 0.80]`
- Cada paso (círculo → título → descripción) aparece en secuencia con `useTransform` de opacidad + translateY

**ContainerScroll (HeroScrollDemo):**
- `rotateX` de 20°→0°
- `scale` de 1.05→1 (desktop) / 0.7→0.9 (mobile, ≤768px)
- `translateY` de 0→-100

**SistemasSection (cards):**
- `whileInView`: opacity 0→1, y 20→0
- Stagger: `delay: i * 0.1`
- Ease: `[0.22, 1, 0.36, 1]`

**NosotrosSection:**
- `whileInView`: opacity 0→1, y 40→0
- Parallax de fondo con `mousemove`

### Micro-animaciones

| Elemento | Animación |
|---|---|
| Sol en dashboard | `animate-spin-slow` |
| Reloj en dashboard | `animate-pulse` |
| Dot de estado activo | `animate-pulse` |
| Dot hero badge | `animate-pulse` |

---

## Estructura de secciones

```
HeroSection       → min-h-screen, bg imagen Unsplash opacity-20
HeroScrollDemo    → ContainerScroll + SmartHomeDashboard (tablet mockup)
ValueProps        → grid 3 cols, glass-panel
SistemasSection   → id="productos", grid 4 cols en lg
ComoFuncionaSection → id="proceso", sticky scroll 280vh
PlanesSection     → id="planes", grid 3 cols, plan central en negro
TestimoniosSection → id="clientes", grid 3 cols, glass-panel
NosotrosSection   → id="nosotros", fotos fundadores
ContactSection    → id="contacto", grid 2 cols (copy + form)
Footer            → bg-[#000000], grid 4 cols en md (deshabilitado)
```

---

## Sombras

| Uso | Valor |
|---|---|
| Glass panel | `0 2px 24px rgba(0,0,0,0.05)` |
| Card Kit Completo | `0 32px 64px rgba(0,0,0,0.22)` |
| Tablet mockup | `0 0 #0000001a, 0 9px 20px #00000018, ...` (multi-layer) |
| Logo hero | `drop-shadow-[0_0_50px_rgba(197,112,75,0.32)]` |
| Logo SVG | `drop-shadow-[0_0_20px_rgba(197,112,75,0.4)]` |
| Navbar | `0 1px 4px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.06)` |

---

## Variables CSS (globals.css)

```css
:root {
  --background: 40 33% 99%;       /* #fefefe */
  --foreground: 0 0% 0%;          /* #000000 */
  --primary: 18 51% 53%;          /* #c5704b */
  --secondary: 36 94% 65%;        /* #fab257 */
  --muted: 28 30% 96%;            /* warm off-white */
  --border: 18 25% 88%;           /* warm light border */
  --radius: 0.5rem;
}
```
