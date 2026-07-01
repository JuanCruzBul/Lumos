export type Light = { id: number; name: string; active: boolean };

export const defaultInitialLights: Light[] = [
  { id: 1, name: "Sala", active: true },
  { id: 2, name: "Cocina", active: true },
  { id: 3, name: "Habitación", active: false },
  { id: 4, name: "Pasillo", active: false },
];

export const forecast = [
  { day: "Jue", tempMax: 22, tempMin: 12, text: "Despejado", humidity: 45, wind: 12 },
  { day: "Vie", tempMax: 24, tempMin: 13, text: "Soleado", humidity: 40, wind: 15 },
  { day: "Sáb", tempMax: 23, tempMin: 12, text: "Parcialmente Nublado", humidity: 50, wind: 10 },
  { day: "Dom", tempMax: 21, tempMin: 11, text: "Despejado", humidity: 42, wind: 8 },
  { day: "Lun", tempMax: 22, tempMin: 12, text: "Despejado", humidity: 45, wind: 12 },
];

export const securityLogs = [
  { time: "02:15 AM", event: "No se detecta movimiento en el pasillo", status: "normal" },
  { time: "11:45 PM", event: "Puerta Principal cerrada y asegurada", status: "secure" },
  { time: "09:30 PM", event: "Movimiento detectado en entrada exterior", status: "warning" },
  { time: "07:15 PM", event: "Puerta Principal abierta por Usuario de Casa", status: "info" },
  { time: "06:00 PM", event: "Modo seguridad en casa activado", status: "secure" },
];

export const energyData = [
  { hour: "0", val: 0.15 }, { hour: "1", val: 0.12 }, { hour: "2", val: 0.10 },
  { hour: "3", val: 0.10 }, { hour: "4", val: 0.12 }, { hour: "5", val: 0.25 },
  { hour: "6", val: 0.45 }, { hour: "7", val: 0.75 }, { hour: "8", val: 0.60 },
  { hour: "9", val: 0.82 }, { hour: "10", val: 0.50 }, { hour: "11", val: 0.95 },
  { hour: "12", val: 1.10 }, { hour: "13", val: 0.85 }, { hour: "14", val: 0.70 },
  { hour: "15", val: 0.65 }, { hour: "16", val: 0.50 }, { hour: "17", val: 0.72 },
  { hour: "18", val: 0.90 }, { hour: "19", val: 1.15 }, { hour: "20", val: 1.30 },
  { hour: "21", val: 1.20 }, { hour: "22", val: 0.80 }, { hour: "23", val: 0.40 },
];
