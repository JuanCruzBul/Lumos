export function CurtainControl({
  curtains,
  accent,
  onCurtains,
  onOpen,
  onClose,
}: {
  curtains: number;
  accent: string;
  onCurtains: (value: number) => void;
  onOpen: () => void;
  onClose: () => void;
}) {
  const openPct = Math.round((1 - curtains) * 100);
  const label = curtains > 0.97 ? "Cerradas" : `${openPct} % abiertas`;

  return (
    <section>
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#8a90a0]">Cortinas</h2>
      <div className="mb-2 flex justify-between text-xs text-[#8a90a0]">
        <span>Apertura</span>
        <span>{label}</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={openPct}
        onChange={(e) => onCurtains(1 - Number(e.target.value) / 100)}
        className="h-[18px] w-full"
        style={{ accentColor: accent }}
      />
      <div className="mt-3 flex gap-2">
        <button
          onClick={onOpen}
          className="flex-1 rounded-[10px] border border-[#2b3242] bg-[#171b26] py-2.5 text-[13px] font-medium text-[#e8eaf0]"
        >
          Abrir
        </button>
        <button
          onClick={onClose}
          className="flex-1 rounded-[10px] border border-[#2b3242] bg-[#171b26] py-2.5 text-[13px] font-medium text-[#e8eaf0]"
        >
          Cerrar
        </button>
      </div>
    </section>
  );
}
