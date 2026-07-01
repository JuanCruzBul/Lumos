# Deuda Técnica — Lumos

**Última actualización:** 2026-07-01 (auditoría `docs/audit/2026-07-01.md`)

---

## Alta

### TD-001 — Duplicación de lógica de formulario entre `contact-section` y `lead-form-section` ✅ Resuelto (2026-07-01)

- **Archivos afectados:** `components/ui/contact-section.tsx`, `components/ui/lead-form-section.tsx`, `lib/use-contact-form.ts`
- **Descripción:** Ambos componentes definían el mismo `type FormState`, el mismo estado `fields` (nombre/email/telefono/mensaje), el mismo listener del evento `lumos:plan-selected`, y la misma función `handleSubmit` que hace `fetch("/api/contact", ...)` con el mismo manejo de loading/success/error. Solo diferían los subcomponentes de campo (línea inferior vs. bordes redondeados) y el layout.
- **Resolución:** Se extrajo la lógica compartida al hook `useContactForm()` en `lib/use-contact-form.ts` (estado de campos, `FormState`, listener de `lumos:plan-selected`, `handleChange`, `handleSubmit`). Ambos componentes ahora solo son responsables de su presentación y consumen el mismo hook para el comportamiento.

## Media

### TD-002 — Código muerto: wrappers de dynamic import, prop y parámetros sin usar ✅ Resuelto (2026-07-01)

- **Archivos afectados:** `components/ui/navbar-client.tsx` (eliminado), `components/ui/hero-scroll-client.tsx` (eliminado), `components/ui/sistemas-section.tsx`, `components/ui/navbar.tsx`
- **Descripción:** `navbar-client.tsx` y `hero-scroll-client.tsx` envolvían `Navbar`/`HeroScrollDemo` en `dynamic(..., { ssr: false })`, pero ninguno se importaba en el proyecto. `SistemasSection` aceptaba `hideHeader` sin ningún caller que la pasara. En `navbar.tsx`, `handleLinkMouseDown`/`handleLinkClick` recibían un parámetro que no usaban.
- **Resolución:** Se borraron `navbar-client.tsx` y `hero-scroll-client.tsx`. Se quitó la prop `hideHeader` de `SistemasSection` (el header ahora siempre se renderiza). Se simplificaron las firmas de `handleLinkMouseDown`/`handleLinkClick` y sus callers, sin el parámetro sin uso.

### TD-003 — Color de marca hardcodeado en 67+ lugares

- **Archivos afectados:** 12 archivos, entre ellos `components/ui/navbar.tsx`, `components/ui/contact-section.tsx`, `components/ui/lead-form-section.tsx`, `components/ui/sistemas-section.tsx`, `components/ui/hero-scroll-demo.tsx`, `app/opengraph-image.tsx`
- **Descripción:** El color de marca `#c5704b` aparece como string literal 67 veces en 12 archivos (clases `text-[#c5704b]`, `style={{ background: "#c5704b" }}`, SVGs a mano), pese a que `tailwind.config.ts:53-60` ya define un sistema de tokens de color propio de Lumos que no incluye este tono. Detectado en auditoría 2026-07-01.
- **Riesgo:** Medio. Cambiar el color de marca requiere find-and-replace manual sobre 12 archivos, con instancias dentro de `style={{...}}` que ni siquiera aparecen en una búsqueda de clases de Tailwind.
- **Recomendación:** Agregar `#c5704b` como token en `tailwind.config.ts` (ej. `lumos-primary`) y reemplazar las clases hardcodeadas. Para los usos dentro de `style={{...}}` (SVGs, gradientes con `rgba(197,112,75,...)`), centralizar el valor RGB base en una constante compartida.

### TD-004 — `navbar.tsx` concentra demasiadas responsabilidades

- **Archivos afectados:** `components/ui/navbar.tsx:1-375`
- **Descripción:** Un solo componente maneja scroll-spy, tres fases de animación de entrada, un sistema completo de drag-and-drop del pill indicador con snapping, y el menú mobile — 10 `useState`/`useRef` y 5 `useEffect` coordinados entre sí. El historial de commits recientes (`fix(scroll-animation)` ×3) muestra que esta zona ya generó bugs de hidratación y timing. Detectado en auditoría 2026-07-01.
- **Riesgo:** Medio. Un cambio en una responsabilidad (ej. el drag) tiene más superficie de la necesaria para romper otra (ej. el scroll-spy), y no se puede testear cada pieza por separado.
- **Recomendación:** Extraer tres hooks: `useScrollSpy(navLinks)`, `useNavEntranceAnimation()` y `usePillDrag({ active, listRef, linkRefs })`. `Navbar` queda como componente de presentación que orquesta el render con el resultado de los tres.

### TD-005 — Falta de tipado explícito y mezcla de mock data con UI en `SmartHomeDashboard`

- **Archivos afectados:** `components/ui/hero-scroll-demo.tsx:21-31, 40-104`
- **Descripción:** `SmartHomeDashboard` recibe sus props sin una `interface`/`type` explícito — TypeScript solo infiere a partir de los valores por defecto en la desestructuración. Además mezcla datos de ejemplo hardcodeados (`forecast`, `securityLogs`, `energyData`, 25+ líneas de arrays) con la lógica de presentación e interacción en un archivo de 448 líneas. Detectado en auditoría 2026-07-01.
- **Riesgo:** Medio. Sin type explícito no hay contrato claro para reusar o extender el componente; mezclar mock data con UI infla el archivo innecesariamente.
- **Recomendación:** Definir `type SmartHomeDashboardProps` explícito, y mover `forecast`/`securityLogs`/`energyData`/`initialLights` a un archivo separado (`smart-home-dashboard-data.ts`) que el componente importe.

## Baja

### TD-006 — Helper `cn()` duplicado y sin usar en ningún lado

- **Archivos afectados:** `lib/utils.ts:1-6`, `components/ui/utils.ts:1-6`
- **Descripción:** Ambos archivos son idénticos byte por byte (helper `cn()` con clsx + tailwind-merge). Ningún componente del proyecto lo importa actualmente. Detectado en auditoría 2026-07-01.
- **Riesgo:** Bajo. Es duplicación de una utilidad sin uso hoy, pero el día que se empiece a consumir, hay dos copias candidatas y riesgo de editar una y no la otra.
- **Recomendación:** Borrar `components/ui/utils.ts` y dejar solo `lib/utils.ts` (la ruta que espera `components.json` para componentes shadcn/ui).

---

## Resueltos

_Ninguno todavía — esta es la primera auditoría del proyecto (2026-07-01)._
