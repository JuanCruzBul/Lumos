"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Sun, 
  Clock, 
  Home as HomeIcon, 
  Lightbulb, 
  Cloud, 
  Shield, 
  Zap, 
  Menu, 
  MoreVertical, 
  Lock, 
  Unlock, 
  Activity, 
  X, 
  Moon, 
  Plus, 
  Trash2, 
  Droplets, 
  Wind 
} from "lucide-react";
import { ContainerScroll } from "./container-scroll-animation";

// NOTA PARA TU PROYECTO NEXT.JS:
// Descomenta la siguiente línea y elimina el mock de ContainerScroll que está al final de este archivo.
// import { ContainerScroll } from "@/components/ui/container-scroll-animation";

/**
 * 1. COMPONENTE INTERACTIVO DE DOMÓTICA (MÓDULO DE TABLET)
 */
export function SmartHomeDashboard({ 
  embeddedMode = true, 
  defaultDarkMode = false,
  initialLights = [
    { id: 1, name: 'Sala', active: true },
    { id: 2, name: 'Cocina', active: true },
    { id: 3, name: 'Habitación', active: false },
    { id: 4, name: 'Pasillo', active: false }
  ],
  className = ""
}) {
  const [darkMode, setDarkMode] = useState(defaultDarkMode);
  const [time, setTime] = useState<Date | null>(null);
  const [lights, setLights] = useState(initialLights);
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const [activeModal, setActiveModal] = useState(null);
  const [newLightName, setNewLightName] = useState('');
  const [security, setSecurity] = useState({ doorLocked: true, motionDetected: false });

  const [forecast] = useState([
    { day: 'Jue', tempMax: 22, tempMin: 12, text: 'Despejado', humidity: 45, wind: 12 },
    { day: 'Vie', tempMax: 24, tempMin: 13, text: 'Soleado', humidity: 40, wind: 15 },
    { day: 'Sáb', tempMax: 23, tempMin: 12, text: 'Parcialmente Nublado', humidity: 50, wind: 10 },
    { day: 'Dom', tempMax: 21, tempMin: 11, text: 'Despejado', humidity: 42, wind: 8 },
    { day: 'Lun', tempMax: 22, tempMin: 12, text: 'Despejado', humidity: 45, wind: 12 }
  ]);

  const [securityLogs] = useState([
    { time: '02:15 AM', event: 'No se detecta movimiento en el pasillo', status: 'normal' },
    { time: '11:45 PM', event: 'Puerta Principal cerrada y asegurada', status: 'secure' },
    { time: '09:30 PM', event: 'Movimiento detectado en entrada exterior', status: 'warning' },
    { time: '07:15 PM', event: 'Puerta Principal abierta por Usuario de Casa', status: 'info' },
    { time: '06:00 PM', event: 'Modo seguridad en casa activado', status: 'secure' }
  ]);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getFormattedTime = () => {
    if (!time) return '--:--';
    return time.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const getFormattedDate = () => {
    if (!time) return '';
    const options = { weekday: 'long', day: 'numeric', month: 'long' } as const;
    const dateStr = time.toLocaleDateString('es-ES', options);
    return dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
  };

  const toggleLight = (id:number) => {
    setLights(prev => prev.map(light => 
      light.id === id ? { ...light, active: !light.active } : light
    ));
  };

  const handleAddLight = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newLightName.trim()) return;
    const newId = lights.length > 0 ? Math.max(...lights.map(l => l.id)) + 1 : 1;
    setLights([...lights, { id: newId, name: newLightName, active: false }]);
    setNewLightName('');
  };

  const handleDeleteLight = (id: number) => {
    setLights(prev => prev.filter(light => light.id !== id));
  };

  const activeLightsCount = lights.filter(l => l.active).length;
  const calculatedEnergyToday = (10.2 + (activeLightsCount * 0.55)).toFixed(1);

  const energyData = [
    { hour: '0', val: 0.15 }, { hour: '1', val: 0.12 }, { hour: '2', val: 0.10 },
    { hour: '3', val: 0.10 }, { hour: '4', val: 0.12 }, { hour: '5', val: 0.25 },
    { hour: '6', val: 0.45 }, { hour: '7', val: 0.75 }, { hour: '8', val: 0.60 },
    { hour: '9', val: 0.82 }, { hour: '10', val: 0.50 }, { hour: '11', val: 0.95 },
    { hour: '12', val: 1.10 }, { hour: '13', val: 0.85 }, { hour: '14', val: 0.70 },
    { hour: '15', val: 0.65 }, { hour: '16', val: 0.50 }, { hour: '17', val: 0.72 },
    { hour: '18', val: 0.90 }, { hour: '19', val: 1.15 }, { hour: '20', val: 1.30 },
    { hour: '21', val: 1.20 }, { hour: '22', val: 0.80 }, { hour: '23', val: 0.40 }
  ];

  const getAdjustedEnergyValue = (index:number, baseVal:number) => {
    if (index >= 18 && index <= 22) {
      return baseVal + (activeLightsCount * 0.08);
    }
    return baseVal;
  };

  const selectedWeather = forecast[selectedDayIdx];

  const themeClasses = darkMode 
    ? 'bg-slate-950 text-slate-100 dark-theme' 
    : 'bg-[#f6f8fa] text-slate-800 light-theme';

  const containerClasses = embeddedMode
    ? `w-full h-full flex flex-col transition-colors duration-300 ${darkMode ? 'text-slate-100 bg-slate-950' : 'text-slate-800 bg-[#f6f8fa]'} ${className}`
    : `min-h-screen transition-colors duration-300 font-sans ${themeClasses} ${className}`;

  return (
    <div className={containerClasses}>
      
      {/* HEADER DE LA TABLET */}
      <header className={`px-6 py-4 flex items-center justify-between border-b transition-colors duration-300 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
        <div className="flex items-center gap-4">
          <button className={`p-2 rounded-full hover:bg-opacity-80 transition-colors ${darkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-600'}`}>
            <Menu size={20} />
          </button>
          <h1 className="text-lg font-medium tracking-tight">Mi hogar</h1>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            title="Cambiar tema de la tablet"
            className={`p-2 rounded-full transition-colors ${darkMode ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-250'}`}
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button className={`p-2 rounded-full hover:bg-opacity-80 transition-colors ${darkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-600'}`}>
            <MoreVertical size={18} />
          </button>
        </div>
      </header>

      {/* CONTENIDO INTERNO DE LA TABLET */}
      <div className="p-4 md:p-6 space-y-6 flex-1 overflow-y-auto custom-scrollbar">
        
        {/* FILA SUPERIOR */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Clima Rápido */}
          <div className={`p-4 rounded-2xl flex items-center gap-3 shadow-xs border transition-all ${darkMode ? 'bg-slate-900 border-slate-800/80' : 'bg-white border-slate-100'}`}>
            <div className="p-2.5 bg-amber-100 text-amber-500 rounded-xl dark:bg-amber-950/25 dark:text-amber-400">
              <Sun size={22} className="animate-spin-slow" />
            </div>
            <div>
              <p className="text-lg font-semibold tracking-tight">21,5 °C</p>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Despejado</p>
            </div>
          </div>

          {/* Reloj */}
          <div className={`p-4 rounded-2xl flex items-center gap-3 shadow-xs border transition-all ${darkMode ? 'bg-slate-900 border-slate-800/80' : 'bg-white border-slate-100'}`}>
            <div className="p-2.5 bg-blue-50 text-blue-500 rounded-xl dark:bg-blue-950/40 dark:text-blue-400">
              <Clock size={22} className="animate-pulse" />
            </div>
            <div>
              <p className="text-lg font-semibold tracking-tight">{getFormattedTime()}</p>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{getFormattedDate()}</p>
            </div>
          </div>

          {/* Estado de presencia */}
          <div className={`p-4 rounded-2xl flex items-center gap-3 shadow-xs border transition-all ${darkMode ? 'bg-slate-900 border-slate-800/80' : 'bg-white border-slate-100'}`}>
            <div className="p-2.5 bg-green-50 text-green-500 rounded-xl dark:bg-green-950/40 dark:text-green-400">
              <HomeIcon size={22} />
            </div>
            <div>
              <p className="text-lg font-semibold tracking-tight">En casa</p>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Todos en casa</p>
            </div>
          </div>

        </section>

        {/* REJILLA DE WIDGETS */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* LUCES */}
          <div className={`rounded-2xl border shadow-xs flex flex-col justify-between overflow-hidden transition-all duration-300 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb size={18} className="text-amber-500" />
                <h2 className="text-base font-semibold">Luces</h2>
              </div>

              <div className="space-y-3">
                {lights.slice(0, 4).map((light) => (
                  <div key={light.id} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{light.name}</span>
                    <button
                      onClick={() => toggleLight(light.id)}
                      className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${
                        light.active ? 'bg-blue-500' : (darkMode ? 'bg-slate-700' : 'bg-slate-200')
                      }`}
                    >
                      <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${light.active ? 'translate-x-5' : 'translate-x-1'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className={`px-5 py-3 border-t ${darkMode ? 'border-slate-800 bg-slate-900/50' : 'border-slate-100 bg-slate-50/50'}`}>
              <button onClick={() => setActiveModal('lights')} className="text-blue-500 hover:text-blue-600 font-bold text-[10px] tracking-wider">
                VER TODO
              </button>
            </div>
          </div>

          {/* CLIMA INTERACTIVO */}
          <div className={`rounded-2xl border shadow-xs p-5 flex flex-col justify-between transition-all duration-300 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Cloud size={18} className="text-sky-500" />
                <h2 className="text-base font-semibold">Clima</h2>
              </div>

              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <span className="text-3xl font-light">{selectedWeather.tempMax.toFixed(1).replace('.', ',')}°C</span>
                  <p className="text-xs text-slate-500 capitalize">{selectedWeather.text}</p>
                </div>
                <div className="text-[11px] text-slate-400 space-y-0.5 text-right">
                  <div>Humedad: <span className="font-semibold text-slate-600 dark:text-slate-300">{selectedWeather.humidity}%</span></div>
                  <div>Viento: <span className="font-semibold text-slate-600 dark:text-slate-300">{selectedWeather.wind} km/h</span></div>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-1 pt-2">
                {forecast.map((f, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedDayIdx(idx)}
                    className={`p-1.5 rounded-xl flex flex-col items-center justify-between text-center border transition-all ${
                      selectedDayIdx === idx 
                        ? 'bg-blue-50/80 border-blue-200 text-blue-600 dark:bg-blue-950/40 dark:border-blue-800 dark:text-blue-400' 
                        : (darkMode ? 'bg-slate-800/40 border-transparent text-slate-300' : 'bg-slate-50 border-transparent text-slate-600')
                    }`}
                  >
                    <span className="text-[10px] font-semibold">{f.day}</span>
                    <span className="text-xs font-bold my-0.5">{f.tempMax}°</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* SEGURIDAD */}
          <div className={`rounded-2xl border shadow-xs flex flex-col justify-between overflow-hidden transition-all duration-300 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <Shield size={18} className="text-blue-500" />
                <h2 className="text-base font-semibold">Seguridad</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Puerta principal</span>
                  <button 
                    onClick={() => setSecurity(prev => ({ ...prev, doorLocked: !prev.doorLocked }))}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold ${
                      security.doorLocked 
                        ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
                        : 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400'
                    }`}
                  >
                    {security.doorLocked ? 'Cerrado' : 'Abierto'}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Movimiento</span>
                  <button 
                    onClick={() => setSecurity(prev => ({ ...prev, motionDetected: !prev.motionDetected }))}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                      security.motionDetected
                        ? 'bg-rose-500 text-white animate-pulse'
                        : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                    }`}
                  >
                    {security.motionDetected ? '¡Alerta!' : 'Sin movimiento'}
                  </button>
                </div>
              </div>
            </div>
            <div className={`px-5 py-3 border-t ${darkMode ? 'border-slate-800 bg-slate-900/50' : 'border-slate-100 bg-slate-50/50'}`}>
              <button onClick={() => setActiveModal('security')} className="text-blue-500 hover:text-blue-600 font-bold text-[10px] tracking-wider">
                VER TODO
              </button>
            </div>
          </div>

          {/* ENERGÍA */}
          <div className={`rounded-2xl border shadow-xs p-5 transition-all duration-300 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
            <div className="flex items-center gap-2 mb-3">
              <Zap size={18} className="text-blue-500" />
              <h2 className="text-base font-semibold">Consumo de energía</h2>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold tracking-tight">{calculatedEnergyToday.replace('.', ',')}</span>
              <span className="text-xs text-slate-500 font-semibold">kWh Hoy</span>
            </div>

            {/* Micro Gráfica de Barras */}
            <div className="h-16 flex items-end justify-between gap-[2px] mt-3">
              {energyData.map((d, index) => {
                const finalVal = getAdjustedEnergyValue(index, d.val);
                const heightPercent = Math.min((finalVal / 1.5) * 100, 100);
                return (
                  <div key={d.hour} className="flex-1 h-full flex flex-col justify-end group relative">
                    <div className="absolute bottom-full mb-1 hidden group-hover:block bg-slate-800 text-white text-[8px] py-0.5 px-1 rounded shadow-xs">
                      {finalVal.toFixed(2)}
                    </div>
                    <div 
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full rounded-t-[1px] ${index === 12 ? 'bg-blue-500' : 'bg-blue-200 dark:bg-blue-900/70'}`}
                    />
                  </div>
                );
              })}
            </div>
          </div>

        </section>

      </div>

      {/* MODALES FLOTANTES */}
      {activeModal === 'lights' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className={`w-full max-w-sm rounded-2xl shadow-xl overflow-hidden ${darkMode ? 'bg-slate-900 text-white border border-slate-800' : 'bg-white text-slate-800'}`}>
            <div className="p-4 flex items-center justify-between border-b border-slate-500/10">
              <span className="font-semibold text-sm">Administrar Luces</span>
              <button onClick={() => setActiveModal(null)} className="p-1 rounded-full hover:bg-slate-500/10">
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleAddLight} className="p-4 border-b border-slate-500/10 flex gap-2">
              <input 
                type="text" 
                value={newLightName}
                onChange={(e) => setNewLightName(e.target.value)}
                placeholder="Nueva luz..."
                className={`flex-1 px-3 py-1.5 rounded-lg text-xs border focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                  darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                }`}
              />
              <button type="submit" className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1">
                <Plus size={14} /> Añadir
              </button>
            </form>
            <div className="p-4 max-h-48 overflow-y-auto space-y-3">
              {lights.map(light => (
                <div key={light.id} className="flex items-center justify-between text-xs">
                  <span className="font-medium">{light.name}</span>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${light.active ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-500'}`}>
                      {light.active ? 'Encendida' : 'Apagada'}
                    </span>
                    <button onClick={() => handleDeleteLight(light.id)} className="p-1 text-rose-500 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950/20">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeModal === 'security' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className={`w-full max-w-sm rounded-2xl shadow-xl overflow-hidden ${darkMode ? 'bg-slate-900 text-white border border-slate-800' : 'bg-white text-slate-800'}`}>
            <div className="p-4 flex items-center justify-between border-b border-slate-500/10">
              <span className="font-semibold text-sm">Historial Reciente</span>
              <button onClick={() => setActiveModal(null)} className="p-1 rounded-full hover:bg-slate-500/10">
                <X size={16} />
              </button>
            </div>
            <div className="p-4 max-h-60 overflow-y-auto space-y-3">
              {securityLogs.map((log, idx) => (
                <div key={idx} className="flex justify-between text-xs py-1 border-b border-slate-500/5 last:border-0">
                  <div className="flex gap-2 items-start">
                    <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${log.status === 'secure' ? 'bg-emerald-500' : log.status === 'warning' ? 'bg-amber-500' : 'bg-blue-500'}`} />
                    <span className="text-[11px] leading-tight">{log.event}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0">{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

/**
 * 2. COMPONENTE DE DEMO EN HERO SCROLL (NEXT.JS READY)
 */
export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden bg-[#fefefe]">
      <ContainerScroll
        titleComponent={
          <>
            <p className="text-sm font-semibold text-[#c5704b] uppercase tracking-widest mb-4">
              Mirá cómo funciona
            </p>
            <h2 className="text-4xl font-bold text-black">
              Tu hogar, <br />
              <span className="text-4xl md:text-[5rem] font-bold mt-1 leading-none text-[#c5704b]">
                inteligente.
              </span>
            </h2>
          </>
        }
      >
        <div className="relative w-full h-full select-none">
          <SmartHomeDashboard embeddedMode={true} defaultDarkMode={false} />
        </div>
      </ContainerScroll>
    </div>
  );
}

/**
 * EXPORTACIÓN COMPORTAMENTAL DE LA PÁGINA (Para el visor o renderizado por defecto)
 */
export default function App() {
  return (
    <div className="min-h-screen bg-[#fefefe]">
      <HeroScrollDemo />
    </div>
  );
}
