---
name: audit
description: "Audita el código del proyecto Lumos (Next.js/TypeScript/Tailwind) en busca de deuda técnica: código duplicado, componentes mal organizados, tipos `any`, falta de tipado, archivos demasiado grandes, malas prácticas de React/Next.js e inconsistencias con las convenciones de CLAUDE.md. Genera un reporte de auditoría en docs/audit/ y consolida todos los hallazgos en un único docs/implements/tech_debt.md (formato TD-XXX con severidad, archivos afectados, descripción, riesgo y recomendación). Usar esta skill siempre que el usuario pida auditar el código, revisar deuda técnica, hacer un 'code audit', evaluar la calidad/mantenibilidad del código, o pida un '/audit', aunque no use esas palabras exactas (ej: 'revisá si tenemos código sucio', 'qué tan mal está el código', 'necesito un informe de calidad de código'). Es una skill de análisis y documentación — NO modifica ni refactoriza código."
---

# Audit — Auditoría de deuda técnica

Analiza el código del proyecto y documenta la deuda técnica encontrada — sin tocar el código en sí. El objetivo es dejar un rastro escrito y accionable que el equipo (o una sesión futura de Claude) pueda usar para priorizar y ejecutar el trabajo de refactor más adelante.

Esta skill genera documentos, nunca aplica cambios de código. Si el usuario quiere que además se implemente alguna solución, eso es un pedido separado y explícito — no lo hagas como parte de este flujo.

Todos los ítems de deuda técnica viven en **un solo archivo**, `docs/implements/tech_debt.md`, con el mismo formato que ya se usa en otros proyectos del equipo (ver Paso 4). No generes un archivo por hallazgo ni una carpeta separada de "soluciones" — la recomendación de cómo resolver cada ítem va integrada en su propia entrada, como una viñeta más.

## Cuándo correr esto

Cada corrida es una foto del estado actual del código. Es normal correrla repetidamente a medida que el proyecto avanza — por eso el reporte de auditoría se nombra por fecha, mientras que `tech_debt.md` se actualiza in-place (ver "Manejo de corridas repetidas" más abajo).

## Paso 1 — Preparar carpetas y fecha

Asegurate de que existan estas carpetas (creálas si faltan):

- `docs/audit/`
- `docs/implements/`

Obtené la fecha de hoy en formato `YYYY-MM-DD` (por ejemplo con `date +%F`). El reporte de esta corrida va a ser `docs/audit/YYYY-MM-DD.md`. Si ya existe un archivo para la fecha de hoy, sobreescribilo — es la auditoría más reciente del día, no tiene sentido acumular varias por día.

## Paso 2 — Analizar el código

Leé el código real, no asumas nada por el nombre de los archivos. Recorré al menos:

- `app/` (layout, páginas)
- `components/ui/` (cada sección/componente de la landing)
- `lib/`

Para cada archivo, buscá específicamente:

1. **Código duplicado** — lógica, JSX o estilos repetidos entre dos o más componentes que podrían extraerse a un helper, hook o subcomponente compartido.
2. **Componentes mal organizados** — archivos que mezclan demasiadas responsabilidades (datos + presentación + lógica de animación, por ejemplo), o que deberían dividirse en piezas más chicas.
3. **Tipado débil** — uso de `any`, `unknown` sin narrowing, props sin tipar, o valores de retorno implícitos que deberían ser explícitos.
4. **Archivos grandes** — como guía aproximada, un componente de sección que supera ~250-300 líneas suele valer la pena revisar si puede dividirse, aunque el tamaño por sí solo no es el problema — evaluá si de verdad mezcla responsabilidades.
5. **Malas prácticas de React/Next.js** — `"use client"` en componentes que no lo necesitan (o falta del mismo donde sí se necesita), efectos que podrían evitarse, dependencias de `useEffect` incompletas o mentirosas, renders innecesarios, keys de listas mal elegidas, riesgos de hydration mismatch.
6. **Inconsistencias con `CLAUDE.md`** — por ejemplo imágenes de equipo que no están en `.webp` dentro de `public/images/`, secciones sin `id` para anclas de navegación, componentes client-side sin `"use client"` al tope, o cualquier otra convención documentada en `CLAUDE.md` que el código no esté siguiendo.

No hace falta limitarte a esta lista si encontrás algo claramente problemático que no encaje en ninguna categoría — inclui igual, usando criterio.

Para cada problema real que encuentres, anotá: archivo(s) afectado(s) con línea aproximada, una descripción concreta (no genérica) de qué está mal, por qué constituye deuda técnica (el riesgo de dejarlo así), y una recomendación concreta de cómo resolverlo.

Sé selectivo: preferí reportar 6-8 problemas reales y bien argumentados antes que 30 nitpicks débiles. La señal importa más que el volumen.

## Paso 3 — Escribir el reporte de auditoría

Guardá en `docs/audit/YYYY-MM-DD.md` con esta estructura:

```markdown
# Auditoría de código — YYYY-MM-DD

## Resumen ejecutivo
[2-4 líneas: estado general del código, principales áreas de riesgo]

## Alcance
[Qué carpetas/archivos se revisaron]

## Hallazgos

### 1. [Título corto del hallazgo]
- **Severidad**: Alta / Media / Baja
- **Archivos**: `components/ui/ejemplo.tsx:42`
- **Descripción**: [qué está mal, concretamente]
- **Por qué es deuda técnica**: [costo de no arreglarlo]
- **Ítem relacionado**: `docs/implements/tech_debt.md#td-XXX`

[... un bloque por hallazgo ...]

## Métricas rápidas
- Ítems de deuda técnica encontrados: N
- Severidad alta: X · media: Y · baja: Z
```

## Paso 4 — Consolidar en `docs/implements/tech_debt.md`

Un único archivo, agrupado por severidad, con este formato (calcado del que ya usa el equipo en otros proyectos):

```markdown
# Deuda Técnica — Lumos

**Última actualización:** YYYY-MM-DD (auditoría docs/audit/YYYY-MM-DD.md)

---

## Alta

### TD-001 — [Título corto y descriptivo]

- **Archivos afectados:** `ruta/al/archivo.tsx:línea`, `ruta/otro.tsx:línea`
- **Descripción:** [Qué está mal, con referencias concretas al código. Puede incluir en qué auditoría se detectó.]
- **Riesgo:** [Qué pasa si se deja sin resolver — costo concreto, no genérico]
- **Recomendación:** [Cómo resolverlo — 2-4 líneas concretas y accionables, no un plan de proyecto completo]

## Media

### TD-002 — [Título]
[... mismos campos ...]

## Baja

### TD-003 — [Título]
[... mismos campos ...]
```

Reglas para los IDs y el contenido:

- Los IDs `TD-XXX` son correlativos y **nunca se reutilizan**, incluso si un ítem se resuelve y se borra de la lista de pendientes — así una referencia vieja a "TD-003" en un commit o PR sigue siendo inequívoca.
- Agrupá los ítems bajo `## Alta`, `## Media`, `## Baja` en ese orden; si una severidad no tiene ítems, omití esa sección.
- La **Recomendación** reemplaza lo que en otros flujos sería un documento de solución aparte: tiene que ser concreta y accionable (qué archivo tocar, qué extraer, qué patrón aplicar), pero no hace falta un paso a paso exhaustivo ni un archivo dedicado.
- Si dos hallazgos comparten la misma causa raíz, agrupalos en un solo ítem en vez de fragmentar artificialmente en dos IDs.

## Manejo de corridas repetidas

`docs/implements/tech_debt.md` se edita in-place, no se regenera desde cero:

- **Ítems que siguen vigentes**: dejalos como están (mismo ID), salvo que haya info nueva relevante para actualizar la descripción o el riesgo.
- **Ítems nuevos**: agregalos con el siguiente ID correlativo disponible, en la sección de severidad que corresponda.
- **Ítems resueltos**: no los dejes mezclados con los pendientes. Movelos a una sección `## Resueltos` al final del mismo archivo (no crees un archivo separado), con una línea breve indicando en qué auditoría se detectó y en cuál se confirmó resuelto. Mantené el mismo `TD-XXX` para que la referencia histórica no se pierda.
- Si no existe todavía `docs/implements/tech_debt.md` (primera corrida), creálo desde cero con esta estructura.

## Paso 5 — Resumen final

Al terminar, respondé al usuario con un resumen breve (no repitas todo el contenido de los documentos):

- Cantidad de ítems de deuda técnica abiertos (y desglose por severidad), y cuántos se movieron a "Resueltos" en esta corrida si aplica
- Ruta del reporte de auditoría generado
- Ruta de `docs/implements/tech_debt.md`
