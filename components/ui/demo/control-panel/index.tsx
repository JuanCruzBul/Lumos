import type { RoomSceneState, SceneId } from "../types";
import { SceneSelector } from "./scene-selector";
import { LightPicker } from "./light-picker";
import { CurtainControl } from "./curtain-control";
import { DeviceSwitch } from "./device-switch";
import { ExteriorToggle } from "./exterior-toggle";

export function ControlPanel({
  state,
  activeScene,
  accent,
  onScene,
  onPart,
}: {
  state: RoomSceneState;
  activeScene: SceneId | null;
  accent: string;
  onScene: (id: SceneId) => void;
  onPart: (patch: Partial<RoomSceneState>) => void;
}) {
  return (
    <aside className="flex w-[340px] shrink-0 flex-col gap-6 overflow-y-auto border-l border-[#232837] bg-[#12151d] px-[22px] py-[26px]">
      <SceneSelector activeScene={activeScene} accent={accent} onSelect={onScene} />

      <LightPicker
        lightColor={state.lightColor}
        brightness={state.brightness}
        accent={accent}
        onPick={(hex) => onPart({ lightColor: hex })}
        onBrightness={(brightness) => onPart({ brightness })}
      />

      <CurtainControl
        curtains={state.curtains}
        accent={accent}
        onCurtains={(curtains) => onPart({ curtains })}
        onOpen={() => onPart({ curtains: 0 })}
        onClose={() => onPart({ curtains: 1 })}
      />

      <section>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#8a90a0]">Dispositivos</h2>
        <div className="flex flex-col gap-2.5">
          <DeviceSwitch label="Televisor" on={state.tvOn} accent={accent} onToggle={() => onPart({ tvOn: !state.tvOn })} />
          <DeviceSwitch label="Aire acondicionado" on={state.acOn} accent={accent} onToggle={() => onPart({ acOn: !state.acOn })} />
        </div>
      </section>

      <ExteriorToggle
        night={state.night}
        accent={accent}
        onDay={() => onPart({ night: false })}
        onNight={() => onPart({ night: true })}
      />
    </aside>
  );
}
