"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ImagesBadge } from "@/components/ui/images-badge";
import { MovingBorderImage } from "@/components/ui/moving-border-image";
import { CTAButton } from "@/components/ui/cta-button";

const imgPs = [
  "/images/loja_1.png",
  "/images/loja_2.png",
  "/images/loja_3.png",
];

// Lazy load the heaviest component to clear main-thread
const ShaderGradientCanvas = dynamic(
  () => import("@shadergradient/react").then((mod) => mod.ShaderGradientCanvas),
  { ssr: false, loading: () => null }
);

const ShaderGradient = dynamic(
  () => import("@shadergradient/react").then((mod) => mod.ShaderGradient),
  { ssr: false, loading: () => null }
);

export function HeroSection() {
  const [shaderReady, setShaderReady] = useState(false);

  const scrollToOffer = useCallback(() => {
    document.getElementById("preco")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const mount = () => setShaderReady(true);
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    };
    if (typeof w.requestIdleCallback === "function") {
      w.requestIdleCallback(mount, { timeout: 2500 });
    } else {
      const t = setTimeout(mount, 1200);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <section className="relative pt-[112px] overflow-hidden min-h-[90vh] md:min-h-screen flex flex-col items-center">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
        {shaderReady && (
        <ShaderGradientCanvas
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          {/* @ts-ignore */}
          <ShaderGradient
            {...({
              animate: "on",
              bgColor1: "#000000",
              bgColor2: "#000000",
              brightness: 1.2,
              cAzimuthAngle: 180,
              cDistance: 2.4,
              cPolarAngle: 95,
              cameraZoom: 1,
              color1: "#faf6e8",
              color2: "#ffe5e3",
              color3: "#ffeadb",
              destination: "onCanvas",
              embedMode: "off",
              envPreset: "city",
              format: "gif",
              fov: 45,
              frameRate: 10,
              gizmoHelper: "hide",
              grain: "off",
              lightType: "3d",
              pixelDensity: 1,
              positionX: 0,
              positionY: -2.1,
              positionZ: 0,
              range: "disabled",
              rangeEnd: 40,
              rangeStart: 0,
              reflection: 0.1,
              rotationX: 0,
              rotationY: 0,
              rotationZ: 225,
              shader: "defaults",
              type: "waterPlane",
              uAmplitude: 0,
              uDensity: 1.8,
              uFrequency: 5.5,
              uSpeed: 0.2,
              uStrength: 3,
              uTime: 0.2,
              wireframe: false,
            } as any)}
          />

        </ShaderGradientCanvas>
        )}
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 md:px-10 lg:px-24 xl:px-32 flex flex-col items-center text-center pt-8 md:pt-10 lg:pt-10">
        {/* Text Content */}
        <div className="max-w-4xl flex flex-col items-center mb-8 md:mb-16">
          <div className="flex h-16 w-full items-center uppercase justify-center animate-fade-in-up delay-100">
            <ImagesBadge
              text="Encontre sempre o melhor preço para seu lar"
              images={imgPs}
            />
          </div>

          <h1 className="font-heading font-bold text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.1] mt-6 md:mt-8 text-text-dark tracking-tight max-w-3xl animate-fade-in-up delay-100">
           Organize todo seu <span className="italic text-primary"> enxoval de casa nova</span> em um só lugar!
          </h1>

          <p className="font-body font-light text-text-body text-[15px] sm:text-base md:text-lg leading-relaxed mt-4 md:mt-6 max-w-2xl mx-auto opacity-80 animate-fade-in-up delay-200">
            Esqueça listas impressas. O Zeelo organiza seu enxoval, cuida do seu financeiro e te avisa das melhores ofertas em tempo real.
          </p>

          <div className="mt-8 md:mt-10 animate-fade-in-up delay-300">
            <CTAButton href="https://app.zeelo.site/register">QUERO ORGANIZAR MEU ENXOVAL</CTAButton>
          </div>
        </div>

        {/* Hero Image / Mockup below - aligned to bottom and cropped */}
        <div className="relative w-full mt-auto px-2 md:px-0 animate-fade-in-up delay-400">
          <div className="relative w-full max-w-[2400px] mx-auto -mb-6 md:-mb-20">
            <MovingBorderImage
              borderRadius="12px"
              containerClassName="w-full"
              duration={5000}
            >
              <Image
                src="/images/dash.png"
                alt="Painel do Zeelo com a lista de enxoval de casa nova completa, organizada por cômodo"
                width={2400}
                height={1400}
                className="w-full h-auto block"
                priority
                fetchPriority="high"
                sizes="(max-width: 768px) 100vw, (max-width: 1440px) 90vw, 1440px"
                quality={75}
              />
            </MovingBorderImage>
          </div>
        </div>
      </div>
    </section>
  );
}
