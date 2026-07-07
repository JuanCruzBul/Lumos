export function DeviceSwitch({
  label,
  on,
  accent,
  onToggle,
}: {
  label: string;
  on: boolean;
  accent: string;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-[#232837] bg-[#171b26] px-3.5 py-3">
      <div>
        <div className="text-sm font-medium">{label}</div>
        <div className="mt-0.5 text-[11px] text-[#8a90a0]">{on ? "Encendido" : "Apagado"}</div>
      </div>
      <button
        onClick={onToggle}
        className="relative h-[26px] w-[46px] shrink-0 rounded-full border-none p-0 transition-colors"
        style={{ background: on ? accent : "#2a3040" }}
      >
        <span
          className="absolute top-[3px] block h-5 w-5 rounded-full bg-white transition-[left]"
          style={{ left: on ? "23px" : "3px" }}
        />
      </button>
    </div>
  );
}
