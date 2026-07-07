import type { SceneId, ScenePreset } from "./types";

export const SCENE_DEFS: { id: SceneId; name: string; desc: string }[] = [
  { id: "dia", name: "Día", desc: "Luz natural" },
  { id: "noche", name: "Noche", desc: "Cálida y tenue" },
  { id: "cine", name: "Cine", desc: "TV y luz ambiente" },
  { id: "lectura", name: "Lectura", desc: "Brillo máximo" },
];

export const SCENE_PRESETS: Record<SceneId, ScenePreset> = {
  dia: { lightColor: "#fff6e8", brightness: 0.35, curtains: 0.0, tvOn: false, night: false },
  noche: { lightColor: "#ffb35c", brightness: 0.65, curtains: 1.0, tvOn: false, night: true },
  cine: { lightColor: "#5b5bff", brightness: 0.22, curtains: 1.0, tvOn: true, night: true },
  lectura: { lightColor: "#ffe3b0", brightness: 1.0, curtains: 1.0, tvOn: false, night: true },
};

export const LIGHT_SWATCHES = [
  "#ffffff",
  "#ffe3b0",
  "#ffb35c",
  "#ff6b6b",
  "#ff5ccb",
  "#8a5cff",
  "#4d7bff",
  "#3fd2c7",
  "#7bff8a",
];
