"use client";
import dynamic from "next/dynamic";

const HeroScrollDemo = dynamic(
  () => import("@/components/ui/hero-scroll-demo").then((m) => m.HeroScrollDemo),
  { ssr: false, loading: () => <div className="h-[44rem] sm:h-[52rem] md:h-[72rem]" /> }
);

export function HeroScrollClient() {
  return <HeroScrollDemo />;
}
