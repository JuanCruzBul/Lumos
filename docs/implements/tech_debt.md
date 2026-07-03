# Deuda Técnica — Lumos

**Última actualización:** 2026-07-03 (auditoría `docs/audit/2026-07-03.md`)

---

## Media

### TD-009 — Trabajo de animación corriendo de forma permanente aunque la sección no esté en pantalla

- **Archivos afectados:** `components/ui/sistemas-section.tsx:187-202`, `components/ui/nosotros-section.tsx:44-54`
- **Descripción:** `SistemasSection` corre un loop de `requestAnimationFrame` toda la vida de la página (barra de progreso + rotación del carrusel cada 4s) aunque la sección esté fuera del viewport. `NosotrosSection` registra un `mousemove` global que escribe transforms de parallax en cada movimiento del mouse, también sin chequear visibilidad. Detectado en auditoría 2026-07-03.
- **Riesgo:** Style recalcs y montaje/desmontaje de paneles (`AnimatePresence`) en secciones invisibles consumen main thread y batería de forma continua, compitiendo con las animaciones que sí están en pantalla.
- **Recomendación:** En ambos componentes, gates con `IntersectionObserver` sobre la sección: en `SistemasSection` setear `pausedRef.current = !isIntersecting` (la infraestructura de pausa ya existe para el hover); en `NosotrosSection` registrar/desregistrar el listener de `mousemove` según visibilidad.

### TD-010 — Hydration mismatch persistente en los formularios (framer-motion)

- **Archivos afectados:** `components/ui/lead-form-section.tsx`, `components/ui/contact-section.tsx`
- **Descripción:** React reporta en dev un hydration mismatch (`style={{}}`) sobre los inputs/textareas de ambas secciones de formulario — observado en runtime el 2026-07-02 (overlay de Next con "1 Issue" permanente). El commit `834f0e1` resolvió un warning similar de framer-motion; esta variante quedó viva. Detectado en auditoría 2026-07-03.
- **Riesgo:** El overlay rojo constante entrena al equipo a ignorar errores de hidratación (el próximo mismatch real pasa desapercibido), y en React 19 el mismatch fuerza re-render del subtree en cliente, desperdiciando el SSR de esas secciones.
- **Recomendación:** Reproducir con el overlay de dev y aislar qué wrapper de framer-motion inyecta `style` en los hijos (probable interacción de `motion.div` + `useInView` sobre el card del formulario). Si el `initial` de framer es la causa, mover la animación a un wrapper que no contenga los inputs, o inicializar con `style` explícito idéntico en SSR y cliente.

### TD-011 — `CLAUDE.md` desactualizado respecto de la estructura real

- **Archivos afectados:** `CLAUDE.md`
- **Descripción:** La estructura documentada lista `value-props.tsx`, `footer.tsx` y `components/ui/utils.ts` que ya no existen, y omite los 4 hooks de `lib/`, `app/api/contact/route.ts`, `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, `smart-home-dashboard-data.ts` y las secciones `integraciones-section` y `lead-form-section`. Detectado en auditoría 2026-07-03.
- **Riesgo:** `CLAUDE.md` es el contexto que cargan las sesiones de Claude Code y la referencia de onboarding; una estructura falsa produce suposiciones erróneas (p. ej. que existe un footer) y decisiones basadas en convenciones que ya no aplican.
- **Recomendación:** Regenerar el árbol de estructura desde el filesystem real, agregar la convención de hooks en `lib/` (extraer lógica compartida a hooks con prefijo `use-`) y documentar el endpoint `/api/contact` con sus variables de entorno (`RESEND_API_KEY`, `RESEND_FROM_EMAIL`).

## Baja

### TD-012 — `integraciones-section` reimplementa `useInView` a mano

- **Archivos afectados:** `components/ui/integraciones-section.tsx:8-24`
- **Descripción:** Define un hook local `useInView` con `IntersectionObserver` y anima con estilos inline de transición, mientras el resto de las secciones usa `useInView`/`whileInView` de framer-motion (ya dependencia del proyecto). Detectado en auditoría 2026-07-03.
- **Riesgo:** Dos mecanismos de reveal para el mismo efecto: más código propio que mantener y ajustes de timing/easing no transferibles entre secciones.
- **Recomendación:** Migrar la sección a `whileInView` de framer-motion como las demás; si se prefiere conservar el hook custom (es más liviano), moverlo a `lib/use-in-view.ts` y usarlo consistentemente.

### TD-013 — `sistemas-section` mezcla 140+ líneas de data y 4 íconos SVG con la lógica del carrusel

- **Archivos afectados:** `components/ui/sistemas-section.tsx:9-146`
- **Descripción:** El array `SERVICES`, el mapa `ECOSYSTEMS` con sus logos y 4 íconos SVG conviven con el carrusel en 382 líneas — el mismo patrón que TD-005 resolvió para el dashboard. Además `ECOSYSTEMS` es `Record<string, ...>` con claves string libres: un typo en `ecosystems: [...]` compila y desaparece silenciosamente del render. Detectado en auditoría 2026-07-03.
- **Riesgo:** Editar contenido de marketing requiere navegar lógica de animación, y el tipado débil convierte errores de datos en fallas silenciosas de UI.
- **Recomendación:** Extraer data e íconos a `components/ui/sistemas-data.tsx` siguiendo el patrón de `smart-home-dashboard-data.ts`, y tipar `type EcosystemId = "alexa" | "google" | "ha" | "homekit"` usándolo en `ECOSYSTEMS` y en `ecosystems: EcosystemId[]`.

---

## Resueltos

### TD-008 — Cuatro componentes de campo de formulario casi idénticos entre las dos secciones de contacto ✅

- Detectado en auditoría 2026-07-03 · resuelto en 2026-07-03 (rama `refactor/td-008-form-fields`). Se creó `components/ui/form-fields.tsx` con `FormField`/`FormTextarea` parametrizados por `variant: "underline" | "rounded"`, un único `autoCompleteMap` y las constantes compartidas `FORM_SUCCESS_COLOR`/`FORM_ERROR_COLOR`. `ContactSection` y `LeadFormSection` consumen los componentes compartidos; se eliminaron `Field`, `TextareaField`, `RoundedField` y `RoundedTextarea` (la diferencia de `rows` quedó como prop explícita).

### TD-007 — Endpoint público `/api/contact` sin rate limiting ni validación de entrada ✅

- Detectado en auditoría 2026-07-03 · resuelto en 2026-07-03 (rama `fix/td-007-contact-api-hardening`). Se agregó rate limiting en memoria por IP (5 requests / 10 min), validación de formato de email y longitudes máximas por campo, y un honeypot (`HoneypotField`, campo `website`) en ambos formularios que el endpoint descarta con éxito falso. El destinatario se movió a `RESEND_TO_EMAIL` (con fallback) y se documentaron las env vars en `.env.local.example`. De paso se corrigió un crash preexistente: `new Resend()` a nivel de módulo tiraba abajo la ruta entera cuando faltaba `RESEND_API_KEY`; ahora se instancia dentro del handler y la falta de configuración responde un 500 controlado.

### TD-001 — Duplicación de lógica de formulario entre `contact-section` y `lead-form-section` ✅

- Detectado en auditoría 2026-07-01 · confirmado resuelto en 2026-07-01. Se extrajo la lógica compartida (estado, `FormState`, listener de `lumos:plan-selected`, `handleChange`, `handleSubmit`) al hook `useContactForm()` en `lib/use-contact-form.ts`; ambos componentes quedaron solo con su presentación. (La capa de presentación sigue duplicada — ver TD-008.)

### TD-002 — Código muerto: wrappers de dynamic import, prop y parámetros sin usar ✅

- Detectado en auditoría 2026-07-01 · confirmado resuelto en 2026-07-01. Se borraron `navbar-client.tsx` y `hero-scroll-client.tsx`, se quitó la prop `hideHeader` de `SistemasSection` y se simplificaron las firmas de `handleLinkMouseDown`/`handleLinkClick`.

### TD-003 — Color de marca hardcodeado en 67+ lugares ✅

- Detectado en auditoría 2026-07-01 · confirmado resuelto en 2026-07-01 (verificado vigente en 2026-07-03). Token `lumos-primary` en `tailwind.config.ts` + constantes `LUMOS_PRIMARY_HEX`/`LUMOS_PRIMARY_RGB` en `lib/utils.ts`, reemplazando todos los usos en los 12 archivos afectados.

### TD-004 — `navbar.tsx` concentra demasiadas responsabilidades ✅

- Detectado en auditoría 2026-07-01 · confirmado resuelto en 2026-07-01 (verificado vigente en 2026-07-03: navbar quedó en 218 líneas de presentación). Se extrajeron `useScrollSpy`, `useNavEntranceAnimation` y `usePillDrag` a `lib/`, coordinados por una única `scrollPauseRef`.

### TD-005 — Falta de tipado explícito y mezcla de mock data con UI en `SmartHomeDashboard` ✅

- Detectado en auditoría 2026-07-01 · confirmado resuelto en 2026-07-01. `type SmartHomeDashboardProps` explícito y data movida a `components/ui/smart-home-dashboard-data.ts`.

### TD-006 — Helper `cn()` duplicado y sin usar en ningún lado ✅

- Detectado en auditoría 2026-07-01 · confirmado resuelto en 2026-07-01. Se borró `components/ui/utils.ts`; `lib/utils.ts` queda como única fuente.
