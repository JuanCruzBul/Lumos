import { SCENE_DEFS } from "../scene-presets";
import type { SceneId } from "../types";

export function SceneSelector({
  activeScene,
  accent,
  onSelect,
}: {
  activeScene: SceneId | null;
  accent: string;
  onSelect: (id: SceneId) => void;
}) {
  return (
    <section>
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#8a90a0]">Escenas</h2>
      <div className="grid grid-cols-2 gap-2.5">
        {SCENE_DEFS.map((sc) => {
          const active = activeScene === sc.id;
          return (
            <button
              key={sc.id}
              onClick={() => onSelect(sc.id)}
              className="flex flex-col items-start gap-0.5 rounded-xl border px-3.5 py-3 text-left text-[#e8eaf0] transition-all"
              style={{
                background: active ? hexToRgba(accent, 0.13) : "#171b26",
                borderColor: active ? accent : "#232837",
              }}
            >
              <span className="text-[15px] font-semibold">{sc.name}</span>
              <span className="text-[11px] text-[#8a90a0]">{sc.desc}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function hexToRgba(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}
