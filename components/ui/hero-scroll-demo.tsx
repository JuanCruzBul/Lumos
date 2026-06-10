"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden bg-[#fefefe]">
      <ContainerScroll
        titleComponent={
          <>
            <p className="text-sm font-semibold text-[#c5704b] uppercase tracking-widest mb-4">
              La Experiencia Lumos
            </p>
            <h2 className="text-4xl font-bold text-black">
              Tu hogar, <br />
              <span className="text-4xl md:text-[5rem] font-bold mt-1 leading-none text-[#c5704b]">
                reinventado.
              </span>
            </h2>
          </>
        }
      >
        <div className="relative w-full h-full">
          <Image
            src="/smart-home-dashboard.png"
            alt="Lumos smart home interface"
            fill
            className="object-cover object-top"
            draggable={false}
          />
        </div>
      </ContainerScroll>
    </div>
  );
}
