import type { Metadata } from "next";
import { HabitacionInteligenteDemo } from "@/components/ui/demo/habitacion-inteligente-demo";

export const metadata: Metadata = {
  title: "Demo — Habitación Inteligente",
};

export default function HabitacionInteligentePage() {
  return <HabitacionInteligenteDemo />;
}
