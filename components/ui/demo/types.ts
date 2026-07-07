export type RoomSceneState = {
  lightColor: string;
  brightness: number;
  curtains: number;
  tvOn: boolean;
  acOn: boolean;
  night: boolean;
  wallColor: string;
  floorColor: string;
};

export type SceneId = "dia" | "noche" | "cine" | "lectura";

export type ScenePreset = Pick<
  RoomSceneState,
  "lightColor" | "brightness" | "curtains" | "tvOn" | "night"
>;
