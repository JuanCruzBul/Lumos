import { LIGHT_SWATCHES } from "../scene-presets";

export function LightPicker({
  lightColor,
  brightness,
  accent,
  onPick,
  onBrightness,
}: {
  lightColor: string;
  brightness: number;
  accent: string;
  onPick: (hex: string) => void;
  onBrightness: (value: number) => void;
}) {
  const brightnessPct = Math.round(brightness * 100);

  return (
    <section>
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#8a90a0]">Luces</h2>
      <div className="mb-4 flex flex-wrap gap-2.5">
        {LIGHT_SWATCHES.map((hex) => (
          <button
            key={hex}
            onClick={() => onPick(hex)}
            title={hex}
            className="h-[30px] w-[30px] rounded-full border-2 border-white/15 p-0"
            style={{
              background: hex,
              outline: lightColor === hex ? `2px solid ${accent}` : "none",
              outlineOffset: "2px",
            }}
          />
        ))}
      </div>
      <div className="mb-2 flex justify-between text-xs text-[#8a90a0]">
        <span>Intensidad</span>
        <span>{brightnessPct} %</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={brightnessPct}
        onChange={(e) => onBrightness(Number(e.target.value) / 100)}
        className="h-[18px] w-full"
        style={{ accentColor: accent }}
      />
    </section>
  );
}
