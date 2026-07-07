export function ExteriorToggle({
  night,
  accent,
  onDay,
  onNight,
}: {
  night: boolean;
  accent: string;
  onDay: () => void;
  onNight: () => void;
}) {
  const segStyle = (active: boolean): React.CSSProperties => ({
    background: active ? accent : "transparent",
    color: active ? "#14161c" : "#8a90a0",
  });

  return (
    <section>
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#8a90a0]">Exterior</h2>
      <div className="flex gap-1 rounded-xl border border-[#232837] bg-[#171b26] p-1">
        <button
          onClick={onDay}
          className="flex-1 rounded-[9px] py-2.5 text-[13px] font-semibold transition-all"
          style={segStyle(!night)}
        >
          Día
        </button>
        <button
          onClick={onNight}
          className="flex-1 rounded-[9px] py-2.5 text-[13px] font-semibold transition-all"
          style={segStyle(night)}
        >
          Noche
        </button>
      </div>
    </section>
  );
}
