"use client";
import dynamic from "next/dynamic";

const Navbar = dynamic(
  () => import("@/components/ui/navbar").then((m) => m.Navbar),
  { ssr: false }
);

export function NavbarClient() {
  return <Navbar />;
}
