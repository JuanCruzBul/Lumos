"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { RoomSceneState } from "./types";

function buildScene(container: HTMLDivElement) {
  const col: Record<string, THREE.Color> = {};
  const colorFor = (hex: string) => (col[hex] ??= new THREE.Color(hex));

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.domElement.style.cssText = "width:100%;height:100%;display:block;touch-action:none;cursor:grab";
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#171c26");
  const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 100);

  /* ---------- órbita simple ---------- */
  const target = new THREE.Vector3(0, 1.05, 0);
  let theta = 0.85;
  let phi = 1.12;
  let radius = 9.0;
  const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
  const updateCam = () => {
    camera.position.set(
      target.x + radius * Math.sin(phi) * Math.sin(theta),
      target.y + radius * Math.cos(phi),
      target.z + radius * Math.sin(phi) * Math.cos(theta)
    );
    camera.lookAt(target);
  };
  updateCam();

  let dragging = false;
  let px = 0;
  let py = 0;
  const cv = renderer.domElement;
  const onPointerDown = (e: PointerEvent) => {
    dragging = true;
    px = e.clientX;
    py = e.clientY;
    cv.setPointerCapture(e.pointerId);
    cv.style.cursor = "grabbing";
  };
  const onPointerMove = (e: PointerEvent) => {
    if (!dragging) return;
    theta -= (e.clientX - px) * 0.005;
    phi = clamp(phi - (e.clientY - py) * 0.005, 0.22, 1.48);
    px = e.clientX;
    py = e.clientY;
    updateCam();
  };
  const onPointerUp = () => {
    dragging = false;
    cv.style.cursor = "grab";
  };
  const onWheel = (e: WheelEvent) => {
    e.preventDefault();
    radius = clamp(radius * Math.exp(e.deltaY * 0.001), 4.5, 15);
    updateCam();
  };
  cv.addEventListener("pointerdown", onPointerDown);
  cv.addEventListener("pointermove", onPointerMove);
  cv.addEventListener("pointerup", onPointerUp);
  cv.addEventListener("wheel", onWheel, { passive: false });

  /* ---------- materiales base ---------- */
  const std = (opts: THREE.MeshStandardMaterialParameters) => new THREE.MeshStandardMaterial(opts);
  const wallMat = std({ color: "#cfc6ba", roughness: 0.95, side: THREE.BackSide });
  const floorMat = std({ color: "#8a6a4d", roughness: 0.75, side: THREE.BackSide });
  const ceilMat = std({ color: "#e9e6df", roughness: 0.95, side: THREE.BackSide });

  let addTarget: THREE.Scene | THREE.Group = scene;
  const box = (
    w: number,
    h: number,
    d: number,
    mat: THREE.Material,
    x: number,
    y: number,
    z: number,
    cast = true,
    recv = true
  ) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.position.set(x, y, z);
    m.castShadow = cast;
    m.receiveShadow = recv;
    addTarget.add(m);
    return m;
  };
  const cyl = (
    rt: number,
    rb: number,
    h: number,
    mat: THREE.Material,
    x: number,
    y: number,
    z: number,
    seg = 24
  ) => {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat);
    m.position.set(x, y, z);
    m.castShadow = true;
    m.receiveShadow = true;
    addTarget.add(m);
    return m;
  };

  /* ---------- cascarón de la habitación (efecto casa de muñecas) ---------- */
  const W = 6;
  const H = 3;
  const D = 5;
  const shell = new THREE.Mesh(new THREE.BoxGeometry(W, H, D), [
    wallMat,
    wallMat,
    ceilMat,
    floorMat,
    wallMat,
    wallMat,
  ]);
  shell.position.y = H / 2;
  shell.receiveShadow = true;
  scene.add(shell);

  /* ---------- ventana (pared del fondo, z = -2.5) ---------- */
  const skyMat = new THREE.MeshBasicMaterial({ color: "#bfe0ff" });
  const sky = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 1.5), skyMat);
  sky.position.set(0, 1.65, -D / 2 + 0.01);
  scene.add(sky);

  const frameMat = std({ color: "#4a453d", roughness: 0.6 });
  box(2.7, 0.08, 0.08, frameMat, 0, 2.44, -D / 2 + 0.05);
  box(2.7, 0.08, 0.08, frameMat, 0, 0.86, -D / 2 + 0.05);
  box(0.08, 1.66, 0.08, frameMat, -1.31, 1.65, -D / 2 + 0.05);
  box(0.08, 1.66, 0.08, frameMat, 1.31, 1.65, -D / 2 + 0.05);
  box(0.05, 1.5, 0.05, frameMat, 0, 1.65, -D / 2 + 0.05);

  /* cortina enrollable inteligente */
  const shadeMat = std({ color: "#e3d7c3", roughness: 0.9, side: THREE.DoubleSide });
  const shadeGeo = new THREE.PlaneGeometry(2.65, 1.62);
  shadeGeo.translate(0, -0.81, 0); /* origen en el borde superior */
  const shade = new THREE.Mesh(shadeGeo, shadeMat);
  shade.position.set(0, 2.47, -D / 2 + 0.12);
  shade.castShadow = true;
  scene.add(shade);
  cyl(0.045, 0.045, 2.8, std({ color: "#3a352e", roughness: 0.5 }), 0, 2.52, -D / 2 + 0.12).rotation.z = Math.PI / 2;

  /* ---------- luz solar (foco a través de la ventana) ---------- */
  const sun = new THREE.SpotLight("#fff3dd", 0, 20, 0.62, 0.55, 1.4);
  sun.position.set(0, 2.1, -D / 2 - 0.4);
  sun.target.position.set(0, 0, 1.8);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.bias = -0.0004;
  scene.add(sun, sun.target);

  const hemi = new THREE.HemisphereLight("#dfe8f2", "#4a4238", 0.6);
  scene.add(hemi);
  const amb = new THREE.AmbientLight("#ffffff", 0.12);
  scene.add(amb);

  /* ---------- luz de techo ---------- */
  cyl(0.42, 0.42, 0.06, std({ color: "#f2f0ea", roughness: 0.5 }), 0, 2.94, 0);
  const bulbMat = std({ color: "#fffdf5", roughness: 0.4, emissive: "#ffd9a8", emissiveIntensity: 1.5 });
  const bulb = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.02, 32), bulbMat);
  bulb.position.set(0, 2.9, 0);
  scene.add(bulb);
  const ceilLight = new THREE.PointLight("#ffd9a8", 30, 14, 1.8);
  ceilLight.position.set(0, 2.62, 0);
  ceilLight.castShadow = true;
  ceilLight.shadow.mapSize.set(1024, 1024);
  ceilLight.shadow.bias = -0.0035;
  scene.add(ceilLight);

  /* ---------- lámpara de pie ---------- */
  const lampX = 2.35;
  const lampZ = -1.85;
  cyl(0.17, 0.2, 0.03, std({ color: "#2e2a26", roughness: 0.5 }), lampX, 0.015, lampZ);
  cyl(0.02, 0.02, 1.45, std({ color: "#3a352e", roughness: 0.4, metalness: 0.4 }), lampX, 0.75, lampZ);
  const lampShadeMat = std({
    color: "#efe6d4",
    roughness: 0.9,
    emissive: "#ffd9a8",
    emissiveIntensity: 0.5,
    side: THREE.DoubleSide,
  });
  const lampShade = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.21, 0.3, 24, 1, true), lampShadeMat);
  lampShade.position.set(lampX, 1.55, lampZ);
  scene.add(lampShade);
  const lampLight = new THREE.PointLight("#ffd9a8", 10, 8, 1.8);
  lampLight.position.set(lampX, 1.5, lampZ);
  scene.add(lampLight);

  /* ---------- sala: alfombra, sofá, mesa ---------- */
  const salaGroup = new THREE.Group();
  scene.add(salaGroup);
  addTarget = salaGroup;
  box(3.0, 0.025, 2.1, std({ color: "#5c6b70", roughness: 1 }), -0.5, 0.013, 0.1, false, true);

  const sofaMat = std({ color: "#77809a", roughness: 1 });
  const sofaMat2 = std({ color: "#8b93ab", roughness: 1 });
  box(0.95, 0.42, 2.2, sofaMat, 1.25, 0.24, 0.1); /* base */
  box(0.22, 0.78, 2.2, sofaMat, 1.72, 0.5, 0.1); /* respaldo */
  box(0.95, 0.6, 0.22, sofaMat, 1.25, 0.32, -1.09); /* brazo */
  box(0.95, 0.6, 0.22, sofaMat, 1.25, 0.32, 1.29); /* brazo */
  box(0.85, 0.14, 0.95, sofaMat2, 1.2, 0.52, -0.4); /* cojín asiento */
  box(0.85, 0.14, 0.95, sofaMat2, 1.2, 0.52, 0.62); /* cojín asiento */
  box(0.14, 0.5, 0.9, sofaMat2, 1.56, 0.85, -0.4); /* cojín respaldo */
  box(0.14, 0.5, 0.9, sofaMat2, 1.56, 0.85, 0.62); /* cojín respaldo */

  const woodMat = std({ color: "#4a3a2c", roughness: 0.55 });
  box(0.85, 0.05, 1.35, woodMat, -0.45, 0.42, 0.1); /* mesa de centro */
  for (const [lx, lz] of [
    [-0.8, -0.5],
    [-0.1, -0.5],
    [-0.8, 0.7],
    [-0.1, 0.7],
  ])
    cyl(0.025, 0.025, 0.4, woodMat, lx, 0.2, lz, 10);
  addTarget = scene;

  /* ---------- mueble TV + televisor (pared x = -3) ---------- */
  box(0.42, 0.5, 2.1, std({ color: "#3d3229", roughness: 0.6 }), -2.75, 0.25, 0.1);
  box(0.06, 1.14, 2.02, std({ color: "#14151a", roughness: 0.35 }), -2.94, 1.52, 0.1); /* bisel */
  const tvMat = std({ color: "#05070c", roughness: 0.2, emissive: "#8db6ff", emissiveIntensity: 0 });
  const tvScreen = new THREE.Mesh(new THREE.PlaneGeometry(1.92, 1.06), tvMat);
  tvScreen.rotation.y = Math.PI / 2;
  tvScreen.position.set(-2.9, 1.52, 0.1);
  scene.add(tvScreen);
  const tvLight = new THREE.PointLight("#8db6ff", 0, 6, 1.8);
  tvLight.position.set(-2.55, 1.5, 0.1);
  scene.add(tvLight);

  /* ---------- aire acondicionado ---------- */
  const acBodyMat = std({ color: "#f4f4f2", roughness: 0.5 });
  box(1.05, 0.3, 0.24, acBodyMat, 2.35, 2.55, -D / 2 + 0.13);
  const flap = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.015, 0.13), std({ color: "#e2e2df", roughness: 0.6 }));
  flap.geometry.translate(0, 0, 0.065);
  flap.position.set(2.35, 2.42, -D / 2 + 0.2);
  flap.castShadow = true;
  scene.add(flap);
  const acLedMat = std({ color: "#1a1d22", emissive: "#4dffb0", emissiveIntensity: 0 });
  box(0.06, 0.03, 0.02, acLedMat, 2.75, 2.48, -D / 2 + 0.26, false, false);

  /* ---------- planta ---------- */
  cyl(0.16, 0.12, 0.32, std({ color: "#b06f4a", roughness: 0.9 }), 2.4, 0.16, 2.0);
  const leafMat = std({ color: "#3f6b3a", roughness: 1 });
  for (const [dx, dy, dz, r] of [
    [0, 0.62, 0, 0.28],
    [-0.14, 0.5, 0.1, 0.18],
    [0.15, 0.52, -0.08, 0.17],
    [0.02, 0.82, 0.03, 0.2],
  ]) {
    const s = new THREE.Mesh(new THREE.SphereGeometry(r, 14, 12), leafMat);
    s.position.set(2.4 + dx, dy, 2.0 + dz);
    s.castShadow = true;
    scene.add(s);
  }

  /* cuadro en la pared derecha */
  box(0.04, 0.9, 1.3, std({ color: "#2c303c", roughness: 0.8 }), 2.97, 1.7, 0.9, false, false);
  box(0.05, 0.74, 1.14, std({ color: "#c98d5f", roughness: 0.9 }), 2.955, 1.7, 0.9, false, false);

  return {
    renderer,
    scene,
    camera,
    wallMat,
    floorMat,
    skyMat,
    sky,
    shade,
    sun,
    hemi,
    amb,
    ceilLight,
    bulbMat,
    lampLight,
    lampShade,
    tvMat,
    tvLight,
    flap,
    acLedMat,
    colorFor,
    dispose: () => {
      cv.removeEventListener("pointerdown", onPointerDown);
      cv.removeEventListener("pointermove", onPointerMove);
      cv.removeEventListener("pointerup", onPointerUp);
      cv.removeEventListener("wheel", onWheel);
    },
  };
}

export function RoomScene({ state }: { state: RoomSceneState }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let dead = false;
    const world = buildScene(container);
    const {
      renderer,
      scene,
      camera,
      wallMat,
      floorMat,
      skyMat,
      shade,
      sun,
      hemi,
      amb,
      ceilLight,
      bulbMat,
      lampLight,
      lampShade,
      tvMat,
      tvLight,
      flap,
      acLedMat,
      colorFor,
    } = world;

    const initial = stateRef.current;
    const cur = {
      brightness: initial.brightness,
      curtains: initial.curtains,
      night: initial.night ? 1 : 0,
      tv: 0,
      ac: 0,
      light: new THREE.Color(initial.lightColor),
      wall: new THREE.Color(initial.wallColor),
      floor: new THREE.Color(initial.floorColor),
    };
    const daySky = new THREE.Color("#bfe0ff");
    const nightSky = new THREE.Color("#0a1228");
    const dayBg = new THREE.Color("#1b2230");
    const nightBg = new THREE.Color("#07090f");
    const tmp = new THREE.Color();
    const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

    const resize = () => {
      const w = container.clientWidth || 300;
      const h = container.clientHeight || 200;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const clock = new THREE.Clock();
    let rafId = 0;
    const loop = () => {
      if (dead) return;
      rafId = requestAnimationFrame(loop);
      const t = stateRef.current;
      const dt = Math.min(clock.getDelta(), 0.05);
      const time = clock.elapsedTime;
      const k = 1 - Math.pow(0.002, dt); /* suavizado independiente del framerate */

      cur.brightness = lerp(cur.brightness, t.brightness, k);
      cur.curtains = lerp(cur.curtains, t.curtains, k * 0.6);
      cur.night = lerp(cur.night, t.night ? 1 : 0, k * 0.7);
      cur.tv = lerp(cur.tv, t.tvOn ? 1 : 0, k);
      cur.ac = lerp(cur.ac, t.acOn ? 1 : 0, k * 0.7);
      cur.light.lerp(colorFor(t.lightColor), k);
      cur.wall.lerp(colorFor(t.wallColor), k);
      cur.floor.lerp(colorFor(t.floorColor), k);

      const b = cur.brightness;
      const day = 1 - cur.night;

      /* luces interiores */
      ceilLight.color.copy(cur.light);
      ceilLight.intensity = 4 + b * 42;
      bulbMat.emissive.copy(cur.light);
      bulbMat.emissiveIntensity = 0.15 + b * 2.4;
      lampLight.color.copy(cur.light);
      lampLight.intensity = 1 + b * 13;
      (lampShade.material as THREE.MeshStandardMaterial).emissive.copy(cur.light);
      (lampShade.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.1 + b * 0.9;
      amb.color.copy(cur.light);
      amb.intensity = 0.06 + b * 0.16;

      /* exterior día/noche */
      sun.intensity = day * (1 - cur.curtains) * 55;
      hemi.intensity = 0.12 + day * 0.5;
      skyMat.color.copy(tmp.copy(daySky).lerp(nightSky, cur.night));
      (scene.background as THREE.Color).copy(tmp.copy(dayBg).lerp(nightBg, cur.night));

      /* cortina */
      shade.scale.y = 0.04 + cur.curtains * 0.96;

      /* TV */
      const flicker = cur.tv * (1 + Math.sin(time * 7.3) * 0.07 + Math.sin(time * 23.1) * 0.05);
      tvMat.emissiveIntensity = flicker * 1.25;
      tvLight.intensity = flicker * 7;

      /* aire acondicionado */
      flap.rotation.x = -cur.ac * 0.85;
      acLedMat.emissiveIntensity = cur.ac * 2.5;

      /* colores de superficie */
      wallMat.color.copy(cur.wall);
      floorMat.color.copy(cur.floor);

      renderer.render(scene, camera);
    };
    loop();

    return () => {
      dead = true;
      cancelAnimationFrame(rafId);
      ro.disconnect();
      world.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 h-full w-full" />;
}
