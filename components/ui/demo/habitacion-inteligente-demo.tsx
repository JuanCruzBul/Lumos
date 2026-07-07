"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { LUMOS_PRIMARY_HEX } from "@/lib/utils";
import { ControlPanel } from "./control-panel";
import { SCENE_PRESETS } from "./scene-presets";
import type { RoomSceneState, SceneId } from "./types";

const RoomScene = dynamic(() => import("./room-scene").then((m) => m.RoomScene), { ssr: false });

const WALL_COLOR = "#cfc6ba";
const FLOOR_COLOR = "#8a6a4d";

const INITIAL_STATE: RoomSceneState = {
  lightColor: "#ffd9a8",
  brightness: 0.75,
  curtains: 0.15,
  tvOn: false,
  acOn: false,
  night: false,
  wallColor: WALL_COLOR,
  floorColor: FLOOR_COLOR,
};

export function HabitacionInteligenteDemo() {
  const [state, setState] = useState<RoomSceneState>(INITIAL_STATE);
  const [activeScene, setActiveScene] = useState<SceneId | null>("dia");

  const onPart = (patch: Partial<RoomSceneState>) => {
    setActiveScene(null);
    setState((prev) => ({ ...prev, ...patch }));
  };

  const onScene = (id: SceneId) => {
    setActiveScene(id);
    setState((prev) => ({ ...prev, ...SCENE_PRESETS[id] }));
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0b0d12] font-sans text-[#e8eaf0]">
      <div className="relative min-w-0 flex-1">
        <RoomScene state={state} />
        <div className="pointer-events-none absolute left-[26px] top-[22px]">
          <div className="text-xs uppercase tracking-[0.2em] text-[#9aa0ad]">Casa inteligente</div>
          <div className="mt-0.5 text-[26px] font-semibold">Sala de estar</div>
        </div>
        <div className="pointer-events-none absolute bottom-4 left-[26px] text-xs text-[#7e8494]">
          Arrastra para rotar · Rueda para acercar
        </div>
      </div>

      <ControlPanel state={state} activeScene={activeScene} accent={LUMOS_PRIMARY_HEX} onScene={onScene} onPart={onPart} />
    </div>
  );
}
