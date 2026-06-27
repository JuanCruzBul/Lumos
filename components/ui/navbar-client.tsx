"use client";
import dynamic from "next/dynamic";

const NavbarDynamic = dynamic(
  () => import("@/components/ui/navbar").then((m) => m.Navbar),
  { ssr: false }
);

export function NavbarClient() {
  return <NavbarDynamic />;
}
