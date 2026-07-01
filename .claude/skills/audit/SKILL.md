---
name: audit
description: "Audita el código del proyecto Lumos (Next.js/TypeScript/Tailwind) en busca de deuda técnica: código duplicado, componentes mal organizados, tipos `any`, falta de tipado, archivos demasiado grandes, malas prácticas de React/Next.js e inconsistencias con las convenciones de CLAUDE.md. Genera un reporte de auditoría en docs/audit/, ítems de deuda técnica en docs/implements/tech_debt/ y propuestas de solución en docs/implements/solutions/. Usar esta skill siempre que el usuario pida auditar el código, revisar deuda técnica, hacer un 'code audit', evaluar la calidad/mantenibilidad del código, o pida un '/audit', aunque no use esas palabras exactas (ej: 'revisá si tenemos código sucio', 'qué tan mal está el código', 'necesito un informe de calidad de código'). Es una skill de análisis y documentación — NO modifica ni refactoriza código."
---

# Audit — Auditoría de deuda técnica

Analiza el código del proyecto, documenta la deuda técnica encontrada y propone soluciones — sin tocar el código en sí. El objetivo es dejar un rastro escrito y accionable que el equipo (o una sesión futura de Claude) pueda usar para priorizar y ejecutar el trabajo de refactor más adelante.

Esta skill genera documentos, nunca aplica cambios de código. Si el usuario quiere que además se implemente alguna solución, eso es un pedido separado y explícito — no lo hagas como parte de este flujo.

## Cuándo correr esto

Cada corrida es una foto del estado actual del código. Es normal correrla repetidamente a medida que el proyecto avanza — por eso el reporte de auditoría se nombra por fecha y los ítems de deuda técnica se regeneran cada vez (ver "Manejo de corridas repetidas" más abajo).

## Paso 1 — Preparar carpetas y fecha

Asegurate de que existan estas carpetas (creálas si faltan):

- `docs/audit/`
- `docs/implements/tech_debt/`
- `docs/implements/solutions/`

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

Para cada problema real que encuentres, anotá: archivo(s) afectado(s) con línea aproximada, una descripción concreta (no genérica) de qué está mal, y por qué te parece que constituye deuda técnica (qué costo tiene dejarlo así — mantenibilidad, riesgo de bugs, performance, legibilidad, etc.).

Sé selectivo: preferí reportar 8 problemas reales y bien argumentados antes que 30 nitpicks débiles. Cada ítem que generes va a producir dos archivos, así que la señal importa más que el volumen.

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
- **Ítem relacionado**: `docs/implements/tech_debt/[slug].md`

[... un bloque por hallazgo ...]

## Métricas rápidas
- Ítems de deuda técnica encontrados: N
- Severidad alta: X · media: Y · baja: Z
```

## Paso 4 — Generar los ítems de deuda técnica

Por cada hallazgo del paso 2, creá un archivo en `docs/implements/tech_debt/[slug].md`, donde `[slug]` es un nombre descriptivo en kebab-case (ej: `duplicacion-logica-scroll-animation.md`, no `hallazgo-1.md`). Si dos hallazgos son parte del mismo problema raíz, agrupalos en un solo archivo en vez de fragmentar artificialmente.

Estructura de cada archivo:

```markdown
# [Título del hallazgo]

**Severidad**: Alta / Media / Baja
**Detectado**: YYYY-MM-DD
**Archivos afectados**: `ruta/al/archivo.tsx:línea`, `ruta/otro.tsx:línea`

## Descripción del problema
[Explicación concreta, con referencias al código real]

## Por qué es deuda técnica
[Impacto de dejarlo sin resolver]

## Solución propuesta
Ver `docs/implements/solutions/[mismo-slug].md`
```

## Paso 5 — Generar la propuesta de solución

Por cada ítem de deuda técnica, creá el archivo correspondiente en `docs/implements/solutions/[mismo-slug].md` (mismo slug que el de tech_debt, para que queden emparejados 1 a 1).

Estructura:

```markdown
# Solución: [Título del hallazgo]

**Ítem relacionado**: `docs/implements/tech_debt/[slug].md`

## Enfoque
[Cómo resolverlo, en 2-4 líneas de alto nivel]

## Pasos concretos
1. [paso]
2. [paso]
3. ...

## Trade-offs
[Si hay alguno — por ejemplo, más abstracción a cambio de menos duplicación, o esfuerzo vs. beneficio. Si no hay trade-offs relevantes, indicá "Ninguno relevante" en vez de inventar uno.]
```

## Manejo de corridas repetidas

Si ya existen ítems previos en `docs/implements/tech_debt/` de una corrida anterior:
- Si el problema sigue existiendo tal cual, dejá el archivo como está (no lo reescribas sin necesidad).
- Si el problema ya no existe (fue solucionado), podés mencionarlo en el reporte de auditoría del día como "resuelto desde la última auditoría", pero no borres el archivo histórico sin que el usuario lo pida explícitamente.
- Si aparece un hallazgo nuevo, sumalo con su propio slug.

## Paso 6 — Resumen final

Al terminar, respondé al usuario con un resumen breve (no repitas todo el contenido de los documentos):

- Cantidad de ítems de deuda técnica encontrados (y desglose por severidad)
- Ruta del reporte de auditoría generado
- Rutas de los archivos de tech_debt y de solutions generados
