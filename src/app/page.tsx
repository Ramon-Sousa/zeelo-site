"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { useInView } from "@/hooks/useInView";
import dynamic from "next/dynamic";
import { ImagesBadge } from "@/components/ui/images-badge";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { MovingBorderImage } from "@/components/ui/moving-border-image";


const OFFER_LINK = "https://pay.cakto.com.br/ktmjrjp_819342";
const LOGIN_LINK = "https://app.zeelo.site/login";

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


/* ─── Animated Section Wrapper ─── */
function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isInView } = useInView(0.08);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease-out ${delay}ms, transform 0.7s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Tag Badge ─── */
function TagBadge({
  children,
  variant = "pink",
}: {
  children: React.ReactNode;
  variant?: "pink" | "orange" | "gold" | "dark";
}) {
  const variantClass = {
    pink: "bg-primary/5 backdrop-blur-md border border-primary/10 text-primary",
    orange: "bg-[#EA7300]/10 backdrop-blur-md border border-[#EA7300]/10 text-[#8A3D00]",
    gold: "bg-[#D3CA79]/20 backdrop-blur-md border border-[#D3CA79]/20 text-[#7A6A00]",
    dark: "bg-[#121212]/5 backdrop-blur-md border border-[#121212]/5 text-[#121212]",
  }[variant];

  return (
    <span
      className={`inline-block px-2 py-1 rounded-[2px] font-mono text-sm font-semibold tracking-[2.8px] uppercase ${variantClass}`}
    >
      {children}
    </span>
  );
}

/* ─── CTA Button ─── */
function CTAButton({
  children,
  href,
  size = "lg",
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  size?: "md" | "lg";
  className?: string;
  onClick?: () => void;
}) {
  const baseClass = `group inline-flex items-center justify-center gap-3 bg-primary text-[#fafafa] rounded-[4px] font-body font-light transition-all duration-300 hover:brightness-110 active:scale-[0.98] ${
    size === "lg" ? "h-[52px] px-6 text-[15.8px]" : "h-[44px] px-5 text-[13.8px]"
  } ${className}`;

  const content = (
    <>
      <span>{children}</span>
      <svg
        width={size === "lg" ? 20 : 16}
        height={size === "lg" ? 20 : 16}
        viewBox="0 0 20 20"
        fill="none"
        className="transition-transform duration-300 group-hover:translate-x-1"
      >
        <path
          d="M4.167 10h11.666M10.833 5l5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className={baseClass}>
        {content}
      </button>
    );
  }

  return (
    <a href={href} className={baseClass}>
      {content}
    </a>
  );
}


/* ─── Navbar ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = useCallback((id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-white/70 backdrop-blur-lg border-b border-white/20" 
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-24 xl:px-32 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <a href="#" className="flex items-center shrink-0">
          <div className="relative h-8 w-[128px]">
            <Image
              src="/images/logo_hor-brand.png"
              alt="Zeelo"
              fill
              sizes="128px"
              priority
              className="object-contain object-left"
            />
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-5 lg:gap-6">
          <button
            onClick={() => scrollTo("lista-enxoval")}
            className="text-text-body font-body font-light text-[14.5px] lg:text-[15.5px] hover:text-primary transition-colors duration-200"
          >
            Lista de enxoval
          </button>
          <button
            onClick={() => scrollTo("como-montar")}
            className="text-text-body font-body font-light text-[14.5px] lg:text-[15.5px] hover:text-primary transition-colors duration-200"
          >
            Como montar
          </button>
          <button
            onClick={() => scrollTo("preco")}
            className="text-text-body font-body font-light text-[14.5px] lg:text-[15.5px] hover:text-primary transition-colors duration-200"
          >
            Preço
          </button>
          <button
            onClick={() => scrollTo("duvidas")}
            className="text-text-body font-body font-light text-[14.5px] lg:text-[15.5px] hover:text-primary transition-colors duration-200"
          >
            Dúvidas
          </button>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={LOGIN_LINK}
            className="bg-white h-[44px] px-5 flex items-center justify-center rounded-[4px] border border-border-gold text-[#131413] font-body font-light text-[13.5px] hover:bg-gray-50 transition-colors duration-200"
          >
            Entrar
          </a>
          <CTAButton onClick={() => scrollTo("preco")} size="md">
            Organizar enxoval
          </CTAButton>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
        >
          <span
            className={`w-6 h-0.5 bg-text-dark transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-text-dark transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-text-dark transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-white border-b border-border ${
          mobileOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-5 py-4 gap-4">
          <button
            onClick={() => scrollTo("lista-enxoval")}
            className="text-left text-text-body font-body font-light text-[15.5px]"
          >
            Lista de enxoval
          </button>
          <button
            onClick={() => scrollTo("como-montar")}
            className="text-left text-text-body font-body font-light text-[15.5px]"
          >
            Como montar
          </button>
          <button
            onClick={() => scrollTo("preco")}
            className="text-left text-text-body font-body font-light text-[15.5px]"
          >
            Preço
          </button>
          <button
            onClick={() => scrollTo("duvidas")}
            className="text-left text-text-body font-body font-light text-[15.5px]"
          >
            Dúvidas
          </button>
          <div className="flex gap-3 pt-2">
            <a
              href={LOGIN_LINK}
              className="flex-1 h-[44px] flex items-center justify-center rounded-[4px] border border-border-gold text-[#131413] font-body font-light text-[13.5px]"
            >
              Entrar
            </a>
            <CTAButton onClick={() => scrollTo("preco")} size="md" className="flex-1">
              Organizar enxoval
            </CTAButton>
          </div>
        </div>
      </div>
    </nav>
  );
}

/* ─── Hero Section ─── */
function HeroSection() {
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
    <section className="relative pt-[72px] overflow-hidden min-h-[90vh] md:min-h-screen flex flex-col items-center">
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

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-10 lg:px-24 xl:px-32 flex flex-col items-center text-center pt-8 md:pt-10 lg:pt-10">
        {/* Text Content */}
        <div className="max-w-4xl flex flex-col items-center mb-8 md:mb-16">
          <div className="flex h-16 w-full items-center uppercase justify-center animate-fade-in-up delay-100">
            <ImagesBadge
              text="Economia em tempo real"
              images={imgPs}
            />
          </div>

          <h1 className="font-heading font-bold text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.1] mt-6 md:mt-8 text-text-dark tracking-tight max-w-3xl animate-fade-in-up delay-100">
            Sua casa completa, <span className="italic text-primary">gastando muito menos</span> do que você imagina.
          </h1>

          <p className="font-body font-light text-text-body text-[15px] sm:text-base md:text-lg leading-relaxed mt-4 md:mt-6 max-w-2xl mx-auto opacity-80 animate-fade-in-up delay-200">
            Com o Zeelo você organiza seu enxoval de forma inteligente, com controle financeiro em tempo real e alertas de promoções.
          </p>

          <div className="mt-8 md:mt-10 animate-fade-in-up delay-300">
            <CTAButton onClick={scrollToOffer}>Organizar enxoval agora</CTAButton>
          </div>
        </div>

        {/* Hero Image / Mockup below - aligned to bottom and cropped */}
        <div className="relative w-full mt-auto px-4 md:px-0 animate-fade-in-up delay-400">
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

/* ─── Feature 1: "Você ainda faz isso?" ─── */
function ProblemSection() {
  const features = [
    {
      image: "/images/feature-listas.png",
      alt: "Lista de enxoval impressa em papel — método antigo",
      title: "Listas impressas",
      desc: "Um caderno enorme cheio de produtos, aqui o nível de planejamento é quase ZERO.",
    },
    {
      image: "/images/feature-planner.png",
      alt: "Planner online genérico para enxoval — sem alertas nem orçamento automático",
      title: "Planner online",
      desc: "Esses podem até te ajudar, mas ainda não fornecem informações para tomada de decisões.",
    },
    {
      image: "/images/feature-sem-planejamento.png",
      alt: "Anotações soltas de enxoval espalhadas em bloco de notas e prints",
      title: "Sem planejamento",
      desc: "Blocos de notas, links, prints, nenhuma organização, é fácil sair do controle.",
    },
  ];

  return (
    <section
      id="como-funciona"
      className="relative bg-white border-y border-border py-12 md:py-16 lg:py-[72px]"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-24 xl:px-32">
        <AnimatedSection className="flex flex-col items-center text-center mb-10 md:mb-16">
          <TagBadge variant="orange">Você ainda faz isso?</TagBadge>
          <h2 className="font-heading font-bold text-[#121212] text-[28px] sm:text-[36px] md:text-[48px] lg:text-[53px] leading-[1.27] mt-5 max-w-[960px]">
            Como a maioria das pessoas
            <br className="hidden md:block" /> tenta montar o enxoval:
          </h2>
          <p className="font-body font-light text-text-body text-base md:text-lg mt-4 max-w-2xl">
            Começar a montar o enxoval de casa nova é um dos momentos mais marcantes antes da mudança e também um dos mais cansativos quando você depende de uma lista de enxoval em PDF, planilha ou caderno. 
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {features.map((f, i) => (
            <AnimatedSection
              key={f.title}
              delay={i * 150}
              className="flex flex-col items-center text-center bg-white rounded-[16px] p-6 md:p-8 border border-border hover:border-primary/40 transition-all duration-300"
            >
              <div className="relative w-[200px] h-[120px] overflow-hidden mb-6">
                <Image
                  src={f.image}
                  alt={f.alt}
                  fill
                  loading="lazy"
                  className="object-contain"
                  sizes="200px"
                  quality={70}
                />
              </div>
              <h3 className="font-heading font-bold text-[#121212] text-[16.5px] leading-[1.3]">
                {f.title}
              </h3>
              <p className="font-body font-light text-text-body text-[13.7px] leading-[1.53] mt-2 max-w-[226px]">
                {f.desc}
              </p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Feature 2: Praticidade (Antes → Agora + Mockups) ─── */
function PraticalSection() {
  const [activeCard, setActiveCard] = useState(0);
  const pausedRef = useRef(false);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cards = [
    {
      icon: "/images/icon-calendar.svg",
      title: "Promoções 24/7",
      after: "O Zeelo avisa quando o item da sua lista entra em promoção.",
      mockup: "/images/deals.png",
    },
    {
      icon: "/images/icon-layers.svg",
      title: "Separação inteligente",
      after: "Acompanhe o progresso do seu enxoval em detalhes para cada cômodo",
      mockup: "/images/itens.png",
    },
    {
      icon: "/images/icon-coin.svg",
      title: "Controle financeiro",
      after: "Orçamento atualizado em tempo real junto com a montagem.",
      mockup: "/images/financas.png",
    },
    {
      icon: "/images/icon-keyframes.svg",
      title: "Cupons atualizados",
      after: "Cupons atualizados diariamente pra economizar",
      mockup: "/images/cupons.png",
    },
  ];

  const roomPills = [
    { label: "Cozinha", count: 48 },
    { label: "Sala", count: 22 },
    { label: "Quarto", count: 34 },
    { label: "Banheiro", count: 28 },
    { label: "Lavanderia", count: 18 },
    { label: "Home Office", count: 12 },
    { label: "Varanda", count: 14 },
    { label: "Limpeza", count: 20 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!pausedRef.current) {
        setActiveCard((prev) => (prev + 1) % cards.length);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [cards.length]);

  const handleCardClick = useCallback((i: number) => {
    setActiveCard(i);
    pausedRef.current = true;
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, 5000);
  }, []);

  return (
    <section className="bg-white py-12 md:py-16 lg:py-[72px]">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-24 xl:px-32">
        <AnimatedSection className="flex flex-col items-center text-center mb-8 md:mb-12">
          <TagBadge variant="dark">Tudo em um só lugar</TagBadge>
          <h2 className="font-heading font-bold text-[#121212] text-[28px] sm:text-[36px] md:text-[44px] lg:text-[50px] leading-[1.2] mt-5 max-w-[980px]">
            Sua <span className="italic text-primary">lista de enxoval de casa nova</span> completa
          </h2>
          
        </AnimatedSection>

        {/* Main Mockup Display */}
        <AnimatedSection delay={100} className="mb-6 md:mb-8">
          <MovingBorderImage
            borderRadius="16px"
            containerClassName="w-full"
            duration={4000}
          >
            <div className="relative w-full aspect-[1680/888]">
              <Image
                src={cards[activeCard].mockup}
                alt={`Demonstração da lista de enxoval no Zeelo: ${cards[activeCard].title}`}
                fill
                loading="lazy"
                className="object-cover transition-all duration-500 ease-in-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1440px) 90vw, 1440px"
                quality={75}
              />
            </div>
          </MovingBorderImage>

          {/* Progress dots */}
          <div className="flex items-center justify-center gap-2 mt-4" role="tablist" aria-label="Navegação das funcionalidades">
            {cards.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={activeCard === i}
                aria-label={`Ver ${cards[i].title}`}
                onClick={() => handleCardClick(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeCard === i
                    ? "w-8 bg-primary"
                    : "w-2 bg-border"
                }`}
              />
            ))}
          </div>
        </AnimatedSection>

        {/* Feature Cards — Antes → Agora */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
          role="tablist"
          aria-label="Funcionalidades do Zeelo"
        >
          {cards.map((card, i) => (
            <AnimatedSection key={card.title} delay={i * 80} className="h-full">
              <button
                role="tab"
                aria-selected={activeCard === i}
                onClick={() => handleCardClick(i)}
                className={`w-full h-full text-left rounded-[12px] md:rounded-[16px] border p-4 md:p-5 lg:p-6 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                  activeCard === i
                    ? "border-2 border-primary"
                    : "border-border bg-white hover:border-primary/50"
                }`}
              >
                <div className="w-[40px] h-[40px] md:w-[52px] md:h-[52px] flex items-center justify-center mb-3 md:mb-4">
                  <Image
                    src={card.icon}
                    alt=""
                    width={32}
                    height={32}
                    loading="lazy"
                    className="object-contain"
                  />
                </div>
                <h3 className="font-heading font-bold text-[#121212] text-[15px] md:text-[18px] lg:text-[20px] leading-[1.3]">
                  {card.title}
                </h3>
                <div className="mt-2.5 flex flex-col gap-1.5">
                 
                  <p className="font-body font-light text-[#121212] text-[12.5px] md:text-[14px] lg:text-[15px] leading-[1.5]">
                    {card.after}
                  </p>
                </div>
              </button>
            </AnimatedSection>
          ))}
        </div>

          
      </div>
    </section>
  );
}

/* ─── Feature 3: Simplifique (Carousel on desktop, stacked on mobile) ─── */



const bentoItems = [
  {
    title: "Painel de Referências",
    description: "Organize estilos de decoração e inspirações em um só lugar.",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden bg-neutral-100 dark:bg-black border border-transparent dark:border-white/[0.2]">
        <Image
          src="/images/screenshot-inspiracoes.png"
          alt="Inspiracoes"
          width={500}
          height={300}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 500px"
          quality={65}
          className="object-cover w-full h-full"
        />
      </div>
    ),
    className: "md:col-span-2",
    // icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Favoritos de Lojas",
    description: "Salve produtos de diferentes lojas e compare preços.",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden bg-neutral-100 dark:bg-black border border-transparent dark:border-white/[0.2]">
        <Image
          src="/images/screenshot-favoritos.png"
          alt="Favoritos"
          width={500}
          height={300}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 500px"
          quality={70}
          className="object-cover w-full h-full"
        />
      </div>
    ),
    className: "md:col-span-1",
    // icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Montagem em dupla",
    description: "Você e sua companhia organizam juntas a montagem do enxoval",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden bg-neutral-100 dark:bg-black border border-transparent dark:border-white/[0.2]">
        <Image
          src="/images/dupla.png"
          alt="Dupla"
          width={500}
          height={300}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 500px"
          quality={75}
          className="object-cover w-full h-full"
        />
      </div>
    ),
    className: "md:col-span-1",
    // icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Sugestões individualizadas",
    description: "Receba sugestões de produtos para todos os itens do seu enxoval",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden bg-neutral-100 dark:bg-black border border-transparent dark:border-white/[0.2]">
        <Image
          src="/images/sugestoes.png"
          alt="Sugestoes"
          width={500}
          height={300}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 500px"
          quality={75}
          className="object-cover w-full h-full"
        />
      </div>
    ),
    className: "md:col-span-2",
    // icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
];


function SimplifySection() {
  const scrollToOffer = useCallback(() => {
    document.getElementById("preco")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section className="relative bg-white border-y border-border py-12 md:py-16 lg:py-[96px]">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-24 xl:px-32">
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <TagBadge variant="gold">SIMPLIFIQUE</TagBadge>
          <h2 className="font-heading font-bold text-[#121212] text-[28px] sm:text-[36px] md:text-[44px] lg:text-[48px] leading-[1.3] mt-5 max-w-3xl">
            Sua única preocupação será com a decoração.
          </h2>
        </div>

        <BentoGrid className="max-w-5xl mx-auto md:auto-rows-[20rem]">
          {bentoItems.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              className={item.className}
            />

          ))}
        </BentoGrid>

        <div className="flex justify-center mt-12 md:mt-16">
          <CTAButton onClick={scrollToOffer}>
            Quero organizar meu enxoval
          </CTAButton>
        </div>
      </div>
    </section>
  );
}


/* ─── CTA / Pricing Section ─── */
const ALL_BENEFITS = [
  "Mais de 200 itens disponíveis",
  "Priorização e organização por cômodos",
  "Promoções e cupons 24 horas por dia.",
  "Controle de finanças e evolução do enxoval",
  "Quadro dos sonhos",
  "Adicione +1 perfil na sua conta",
];

const ArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
    <path d="M4.167 10h11.666M10.833 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function PricingSection() {
  const allBenefits = ALL_BENEFITS;
  return (
    <section id="preco" className="relative bg-white py-12 md:py-16 lg:py-[72px] overflow-hidden">
      {/* BG Image — hidden on mobile */}
      <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden="true">
        <Image src="/images/cta-bg.png" alt="" fill loading="lazy" quality={60} className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-[rgba(3,3,3,0.4)]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-24 xl:px-32 relative z-10">
        <AnimatedSection>
          <div className="bg-bg-gray rounded-[16px] p-5 md:p-8 lg:p-14 overflow-hidden relative">
            {/* Decorative patterns */}
            <div className="absolute bottom-0 left-0 w-[300px] lg:w-[599px] h-[280px] lg:h-[555px] opacity-10 pointer-events-none" aria-hidden="true">
              <Image src="/images/pattern-bg.png" alt="" fill loading="lazy" quality={60} className="object-cover" sizes="(max-width: 1024px) 300px, 599px" />
            </div>
            <div className="absolute top-0 right-0 w-[300px] lg:w-[599px] h-[280px] lg:h-[555px] opacity-10 rotate-180 pointer-events-none" aria-hidden="true">
              <Image src="/images/pattern-bg.png" alt="" fill loading="lazy" quality={60} className="object-cover" sizes="(max-width: 1024px) 300px, 599px" />
            </div>

            {/* Heading */}
            <div className="text-center mb-8 md:mb-12 relative z-10">
              <h2 className="font-heading font-bold text-[#121212] text-[24px] sm:text-[32px] md:text-[40px] leading-[1.2]">
                Qual plano se adapta melhor para sua organização?
              </h2>
              <p className="font-body font-light text-text-body text-base md:text-xl leading-[1.5] mt-3 max-w-[600px] mx-auto">
                Sem pegadinhas, sem pagamentos adicionais, escolha por quanto tempo deseja usar o Zeelo.
              </p>
            </div>

            {/* 3-column card grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 items-end relative z-10 max-w-5xl mx-auto">

              {/* ── Card 1: Mensal ── */}
              <AnimatedSection delay={0} className="w-full">
                <div className="bg-white rounded-[14px] border border-border p-5 md:p-6 flex flex-col h-full hover:border-primary/40 transition-all duration-300">
                  <div>
                    {/* <p className="font-mono text-[11px] font-semibold tracking-[2px] uppercase text-text-body/50">Plano</p> */}
                    <h3 className="font-body font-bold text-[#121212] text-lg md:text-xl uppercase leading-tight mt-1">Mensal</h3>
                    <div className="mt-3" aria-label="Preço: R$21,90 por mês">
                      <span className="font-heading font-bold text-[#121212] text-[36px] md:text-[44px] leading-none">R$21,90</span>
                      <span className="font-body text-text-body/50 text-sm ml-1">/mês</span>
                    </div>
                    <p className="font-body font-light text-text-body/70 text-[13px] leading-[1.5] mt-1">Renovação mensal automática</p>

                    <ul className="flex flex-col gap-3 mt-6">
                      {allBenefits.slice(0, 6).map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="shrink-0 mt-0.5" aria-hidden="true">
                            <rect width="20" height="20" rx="10" fill="#f0efef" />
                            <path d="M14 7L8.5 12.5L6 10" stroke="#A62C2C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span className="font-body text-text-body text-[13px] leading-[1.4]">{b}</span>
                        </li>
                      ))}
                      
                        <li className="flex items-start gap-2 opacity-40">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5" aria-hidden="true">
                            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                          </svg>
                          <span className="font-body text-text-body text-[13px] leading-[1.4] line-through">Acesso vitalício</span>
                        </li>
                      
                    </ul>
                  </div>

                  <div className="mt-6">
                    <a
                      href="https://pay.cakto.com.br/sqewq5b"
                      className="group inline-flex items-center justify-center gap-2 w-full h-[46px] px-5 text-[14px] bg-[#F0EFEF] text-[#121212] rounded-[4px] font-body font-semibold transition-all duration-300 hover:bg-[#E5E4E4] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      aria-label="Assinar Plano Mensal por R$21,90"
                    >
                      ASSINAR MENSAL <ArrowIcon />
                    </a>
                  </div>
                </div>
              </AnimatedSection>

              {/* ── Card 2: Anual — DESTAQUE ── */}
              <AnimatedSection delay={100} className="w-full sm:-mt-4 sm:-mb-0">
                <div className="relative bg-primary rounded-[14px] p-[2px] shadow-2xl">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-primary font-mono text-[12px] font-black tracking-widest uppercase px-4 py-1.5 rounded-full z-20 whitespace-nowrap border border-primary/20">
                    <span role="img" aria-label="Fogo" className="mr-1">🔥</span> MELHOR OPÇÃO
                  </div>
                  <div className="bg-primary rounded-[12px] p-5 md:p-7 flex flex-col">
                    <div>
                      {/* <p className="font-mono text-[11px] font-semibold tracking-[2px] uppercase text-white/60">Plano</p> */}
                      <h3 className="font-body font-bold text-white text-lg md:text-xl uppercase leading-tight mt-1">Anual</h3>
                      <div className="mt-3" aria-label="Preço: R$47,90 por ano. Equivale a R$3,99 por mês">
                        <span className="font-heading font-bold text-white text-[36px] md:text-[44px] leading-none">R$47,90</span>
                        <span className="font-body text-white/60 text-sm ml-1">/ano</span>
                      </div>
                      <p className="font-body font-light text-white/80 text-[13px] leading-[1.5] mt-1">Menos de R$4/mês</p>

                      <ul className="flex flex-col gap-3 mt-6">
                        {allBenefits.map((b) => (
                          <li key={b} className="flex items-start gap-2">
                            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="shrink-0 mt-0.5" aria-hidden="true">
                              <rect width="20" height="20" rx="10" fill="white" fillOpacity="0.2" />
                              <path d="M14 7L8.5 12.5L6 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="font-body text-white text-[13px] leading-[1.4]">{b}</span>
                          </li>
                        ))}
                        <li className="flex items-start gap-2 opacity-50">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5" aria-hidden="true">
                            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                          </svg>
                          <span className="font-body text-white text-[13px] leading-[1.4] line-through">Acesso vitalício</span>
                        </li>
                      </ul>
                    </div>

                    <div className="mt-6">
                      <a
                        href="https://pay.cakto.com.br/334sty9"
                        className="group flex items-center justify-center gap-2 h-[52px] px-6 text-[15px] bg-white text-primary rounded-[4px] font-body font-bold transition-all duration-300 hover:bg-[#fafafa] hover:scale-[1.01] active:scale-[0.98] w-full shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                        aria-label="Assinar Plano Anual por R$47,90"
                      >
                        ASSINAR ANUAL <ArrowIcon />
                      </a>
                      <p className="font-body text-white/70 text-[12px] text-center mt-3">67% dos usuários escolhem este plano</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* ── Card 3: Vitalício ── */}
              <AnimatedSection delay={200} className="w-full">
                <div className="bg-white rounded-[14px] border border-border p-5 md:p-6 flex flex-col h-full hover:border-primary/40 transition-all duration-300">
                  <div>
                    {/* <p className="font-mono text-[11px] font-semibold tracking-[2px] uppercase text-text-body/50">Plano</p> */}
                    <h3 className="font-body font-bold text-[#121212] text-lg md:text-xl uppercase leading-tight mt-1">Vitalício</h3>
                    <div className="mt-3" aria-label="Preço único: R$77,90">
                      <span className="font-heading font-bold text-[#121212] text-[36px] md:text-[44px] leading-none">R$77,90</span>
                    </div>
                    <p className="font-body font-light text-text-body/70 text-[13px] leading-[1.5] mt-1">Use para sempre</p>

                    <ul className="flex flex-col gap-3 mt-6">
                      {allBenefits.map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="shrink-0 mt-0.5" aria-hidden="true">
                            <rect width="20" height="20" rx="10" fill="#f0efef" />
                            <path d="M14 7L8.5 12.5L6 10" stroke="#A62C2C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span className="font-body text-text-body text-[13px] leading-[1.4]">{b}</span>
                        </li>
                      ))}
                      <li className="flex items-start gap-2">
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="shrink-0 mt-0.5" aria-hidden="true">
                          <rect width="20" height="20" rx="10" fill="#A62C2C" />
                          <path d="M14 7L8.5 12.5L6 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="font-body font-bold text-[#121212] text-[13px] leading-[1.4]">Acesso Vitalício <span className="text-primary">(Para Sempre)</span></span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6">
                    <a
                      href="https://pay.cakto.com.br/ktmjrjp_819342"
                      className="group inline-flex items-center justify-center gap-2 w-full h-[46px] px-5 text-[14px] bg-primary text-white rounded-[4px] font-body font-semibold transition-all duration-300 hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      aria-label="Comprar Plano Vitalício por R$77,90"
                    >
                      COMPRAR VITALÍCIO <ArrowIcon />
                    </a>
                  </div>
                </div>
              </AnimatedSection>

            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── FAQ Section ─── */
function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  const faqs = [
    {
      q: "O que é enxoval de casa nova?",
      a: "Enxoval de casa nova é o conjunto de itens essenciais que você compra antes (ou logo depois) de se mudar: utensílios de cozinha, cama, banho, limpeza, eletrodomésticos básicos e móveis principais. Diferente do enxoval de bebê, o de casa é pensado por cômodo.",
    },
    {
      q: "Quantos itens tem um enxoval de casa nova completo?",
      a: "Entre 180 e 220 itens em média. A lista padrão do Zeelo traz +200 itens validados por +3.550 famílias, separados em 8 cômodos: cozinha, sala, quarto do casal, banheiro, lavanderia, varanda, home office e limpeza geral.",
    },
    {
      q: "Quanto tempo leva para montar o enxoval de casa nova?",
      a: "A lista fica pronta em menos de 3 minutos no Zeelo. A compra completa dos itens leva em média de 3 a 8 meses, dependendo do orçamento. Planejar cedo significa aproveitar mais promoções ao longo do caminho.",
    },
    {
      q: "Posso compartilhar a lista de enxoval com meu parceiro(a)?",
      a: "Sim. O Zeelo permite adicionar um usuário extra na mesma conta vocês montam a lista juntos, dividem as compras marcadas e acompanham o orçamento em tempo real.",
    },
    {
      q: "A lista de enxoval do Zeelo substitui o PDF ou a planilha?",
      a: "Substitui com vantagem: o PDF é estático, não avisa promoção nem calcula orçamento. A lista do Zeelo atualiza automaticamente, com alertas de promoção em tempo real, controle financeiro automático e colaboração em casal.",
    },
    {
      q: "Os itens sugeridos são seguros?",
      a: "Sim, nossa Inteligência Artificial busca os produtos em promoção que atendam critérios de compra e boas notas de avaliação. Ainda assim não temos vínculo direto com os produtos ou lojas sugeridas.",
    },
    {
      q: "Consigo acessar no celular?",
      a: "Sim, você pode acessar o Zeelo em qualquer dispositivo, seja computador, tablet ou celular.",
    },
    {
      q: "As promoções são atualizadas?",
      a: "O Zeelo atualiza promoções e cupons diversas vezes ao longo do dia, mesmo que você não veja a promoção no momento em que ela foi adicionada, ela continuará visível. Porém a disponibilidade depende do produto e loja.",
    },
    {
      q: "Consigo adicionar outras pessoas para acessar o app?",
      a: "Sim, você pode adicionar um usuário extra à sua conta, assim essa pessoa poderá te ajudar na montagem do enxoval como quiser.",
    },
    {
      q: "Consigo adicionar mais itens na lista de enxoval?",
      a: "Claro! Além dos itens já disponíveis, você pode adicionar quantos itens personalizados quiser à sua lista.",
    },
    {
      q: "Tenho garantia?",
      a: "Sim! Você tem 7 dias de garantia incondicional. Se não gostar, devolvemos 100% do seu dinheiro.",
    },
  ];

  return (
    <section id="duvidas" className="bg-white py-12 md:py-16 lg:py-[72px]">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-24 xl:px-32">
        <AnimatedSection className="text-center mb-8">
          <h2 className="font-heading font-bold text-[#121212] text-[36px] sm:text-[44px] md:text-[51.8px] leading-[1.3]">
            Dúvidas
          </h2>
        </AnimatedSection>

        <div className="flex flex-col">
          {faqs.map((faq, i) => (
            <AnimatedSection key={i} delay={i * 50}>
              <div className="border-b border-border">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-8 md:gap-14 py-6 cursor-pointer group"
                >
                  <span className="font-heading font-bold text-[#121212] text-left text-lg md:text-[22px] leading-[1.3] transition-colors duration-200 group-hover:text-[#121212]/70">
                    {faq.q}
                  </span>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    className={`shrink-0 transition-transform duration-300 ${
                      open === i ? "rotate-45" : "rotate-0"
                    }`}
                  >
                    <path
                      d="M16 6.667v18.666M6.667 16h18.666"
                      stroke="#a62c2c"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    open === i ? "max-h-[400px] opacity-100 pb-6" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="font-body font-light text-text-body text-base md:text-lg leading-[1.6]">
                    {faq.a}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={200} className="flex justify-center mt-8">
          <CTAButton href={OFFER_LINK} className="w-full max-w-[320px]">
            COMPRAR AGORA
          </CTAButton>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <footer className="bg-primary">
      {/* Top bar */}
      <div className="border-b border-primary-light/20">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-24 xl:px-32 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body font-light text-primary-light text-sm">
            ©2026 Zeelo
          </p>

          <div className="flex items-center flex-wrap justify-center gap-4 md:gap-6">
            <button
              onClick={() => scrollTo("lista-enxoval")}
              className="font-body font-light text-primary-light text-[14.5px] md:text-[15.5px] hover:text-white transition-colors duration-200"
            >
              Lista de enxoval
            </button>
            <button
              onClick={() => scrollTo("como-montar")}
              className="font-body font-light text-primary-light text-[14.5px] md:text-[15.5px] hover:text-white transition-colors duration-200"
            >
              Como montar
            </button>
            <button
              onClick={() => scrollTo("preco")}
              className="font-body font-light text-primary-light text-[14.5px] md:text-[15.5px] hover:text-white transition-colors duration-200"
            >
              Preço
            </button>
            <button
              onClick={() => scrollTo("duvidas")}
              className="font-body font-light text-primary-light text-[14.5px] md:text-[15.5px] hover:text-white transition-colors duration-200"
            >
              Dúvidas
            </button>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-6 h-6 opacity-80 hover:opacity-100 transition-opacity duration-200"
              aria-label="Instagram"
            >
              <Image
                src="/images/social-1.svg"
                alt="Instagram"
                width={24}
                height={24}
                loading="lazy"
              />
            </a>
            <a
              href="#"
              className="w-6 h-6 opacity-80 hover:opacity-100 transition-opacity duration-200"
              aria-label="Twitter"
            >
              <Image
                src="/images/social-2.svg"
                alt="Twitter"
                width={24}
                height={24}
                loading="lazy"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Big Logo */}
      <div className="flex items-center justify-center py-12 md:py-20 px-5 overflow-hidden">
        <div className="flex items-center gap-4 md:gap-8">
          {/* <div className="relative w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] md:w-[200px] md:h-[200px] lg:w-[300px] lg:h-[300px]">
            <Image
              src="/images/logo_h_white.png"
              alt=""
              fill
              className="object-contain"
            />
          </div> */}
          {/* <span className="font-logo text-white text-[60px] sm:text-[80px] md:text-[140px] lg:text-[220px] xl:text-[296px] leading-[0.8]">
            Zeelo
          </span> */}
        </div>
      </div>
    </footer>
  );
}

/* ─── Social Proof / E-E-A-T Section ─── */
function SocialProofSection() {
  const testimonials = [
    {
      name: "Mariana S.",
      role: "Santana do Paraíso, MG",
      avatar: "/images/prova_social/pf_01.jpg",
      text: "Estava usando uma planilha com os itens do enxoval, achava o máximo por não depender de lista impressa, mas esse app é surreal! Já peguei meu microondas e uns movéis pra sala, economizei mais de 300 reais do valor que tava planejando. Recomendo demais!",
      stars: 5,
      accent: "#D3CA79",
    },
    {
      name: "Rafael & Camila",
      role: "Brotas, SP",
      avatar: "/images/prova_social/pf_02.jpg",
      text: "Assinamos por recomendação de uma amiga, é simplesmente maravilhoso! Muito fácil de usar e ta nos ajudando muito na organização.",
      stars: 5,
      accent: "#D3CA79",
    },
    {
      name: "Fernanda L.",
      role: "Ribeirão Preto, SP",
      avatar: "/images/prova_social/pf_03.jpg",
      text: "Vamos nos mudar em setembro, nossa montagem já esta em 40%, mas o que mais tem ajudado é o controle financeiro em conjunto com a priorização, não precisamos nos preocupar em comprar os itens maiores por questão de espaço e ainda sim temos controle do que falta.",
      stars: 5,
      accent: "#D3CA79",
    },
  ];


  const metrics = [
    { value: "1.290+", label: "Famílias usando" },
    { value: "200+", label: "Itens organizados" },
    { value: "24/7", label: "Alertas de promoções" },
    { value: "7 dias", label: "Garantia total" },
  ];

  return (
    <section
      aria-labelledby="prova-social-heading"
      className="bg-bg-gray py-12 md:py-16 lg:py-[72px] border-y border-border"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-24 xl:px-32">

        {/* Metrics strip */}
        {/* <AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border mb-12 md:mb-16 overflow-hidden rounded-[12px] border border-border">
            {metrics.map((m, i) => (
              <div key={m.label} className="bg-white flex flex-col items-center justify-center py-7 px-4 text-center">
                <p
                  className="font-heading font-bold text-[40px] md:text-[48px] leading-none tabular-nums"
                  style={{ color: i === 1 ? "#EA7300" : i === 3 ? "#D3CA79" : "#A62C2C" }}
                >
                  {m.value}
                </p>
                <p className="font-body font-light text-text-body text-sm mt-1.5 leading-snug">{m.label}</p>
              </div>
            ))}
          </div>
        </AnimatedSection> */}

        {/* Heading */}
        <AnimatedSection className="text-center mb-10">
          <TagBadge variant="orange">+1.290 pessoas já organizam com o Zeelo</TagBadge>
          <h2 id="prova-social-heading" className="font-heading font-bold text-[#121212] text-[28px] sm:text-[36px] md:text-[44px] leading-[1.3] mt-5">
            Depoimentos de quem já economizou com o Zeelo
          </h2>
        </AnimatedSection>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {testimonials.map((t, i) => (
            <AnimatedSection
              key={t.name}
              delay={i * 100}
              className="flex flex-col bg-white rounded-[12px] overflow-hidden border border-border hover:border-primary/40 transition-all duration-300"
            >
              {/* Accent bar top */}
              <div className="h-[4px] w-full" style={{ backgroundColor: t.accent }} />

              <div className="flex flex-col gap-4 p-5 md:p-6 flex-1">
                {/* Stars */}
                <div className="flex gap-0.5" aria-label={`${t.stars} de 5 estrelas`}>
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <svg key={si} width="16" height="16" viewBox="0 0 20 20" fill="#EA7300" aria-hidden="true">
                      <path d="M10 1l2.39 5.26L18 7.27l-4 3.9.94 5.49L10 14.27l-4.94 2.39L6 11.17 2 7.27l5.61-.01L10 1z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="flex-1">
                  <p className="font-body font-light text-text-body text-[14.5px] md:text-[15px] leading-[1.65]">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </blockquote>

                {/* Author with avatar */}
                <footer className="flex items-center gap-3 pt-4 border-t border-border mt-auto">
                  <div
                    className="w-10 h-10 rounded-full overflow-hidden shrink-0 border-2 relative"
                    style={{ borderColor: t.accent }}
                    aria-hidden="true"
                  >
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      fill
                      loading="lazy"
                      quality={75}
                      className="object-cover object-center"
                      sizes="40px"
                    />
                  </div>

                  <div>
                    <p className="font-heading font-bold text-primary text-[14px] leading-none">{t.name}</p>
                    <p className="font-body font-light text-text-body text-[12px] mt-0.5">{t.role}</p>
                  </div>
                </footer>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={300} className="mt-10 md:mt-12 text-center">
          <p className="font-body text-[#121212] text-[16px] md:text-[18px] leading-[1.55] max-w-[640px] mx-auto">
            Com o Zeelo, usuárias economizam em média <strong className="text-primary">R$800</strong> usando os alertas de promoção — e <strong className="text-primary">67%</strong> escolhem o plano anual pela relação custo-benefício.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── Section A: O que entra na lista de enxoval ─── */
function ListaEnxovalSection() {
  const categories = [
    {
      name: "Cozinha",
      count: 48,
      examples: ["Panelas Profissionais", "Liquidificador", "Jogo de Talheres"],
      accent: "#A62C2C",
    },
    {
      name: "Sala",
      count: 22,
      examples: ["Móveis e Sofás", "Estante de TV", "Tapetes Decorativos"],
      accent: "#EA7300",
    },
    {
      name: "Quarto",
      count: 34,
      examples: ["Cama Box e Colchão", "Jogo de Lençol", "Travesseiros"],
      accent: "#A62C2C",
    },
    {
      name: "Banheiro",
      count: 28,
      examples: ["Jogo de Toalhas", "Antiderrapantes", "Organizadores"],
      accent: "#D3CA79",
    },
    {
      name: "Lavanderia",
      count: 18,
      examples: ["Máquina de Lavar", "Varal de Teto", "Tábua de Passar"],
      accent: "#EA7300",
    },
    {
      name: "Varanda",
      count: 14,
      examples: ["Rede de balanço", "Vasos e Plantas", "Churrasqueira"],
      accent: "#D3CA79",
    },
    {
      name: "Home Office",
      count: 12,
      examples: ["Mesa de Trabalho", "Cadeira Ergonômica", "Luminária"],
      accent: "#A62C2C",
    },
    {
      name: "Geral",
      count: 20,
      examples: ["Aspirador Robô", "Kits de Limpeza", "Mops e Organizadores"],
      accent: "#EA7300",
    },
  ];

  return (
    <section
      id="lista-enxoval"
      aria-labelledby="lista-enxoval-heading"
      className="bg-bg-gray py-16 md:py-24 border-y border-border"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-24 xl:px-32">
        <AnimatedSection className="flex flex-col items-center text-center mb-14 md:mb-20">
          <TagBadge variant="pink">Lista Completa</TagBadge>
          <h2
            id="lista-enxoval-heading"
            className="font-heading font-bold text-[#121212] text-3xl sm:text-4xl md:text-5xl leading-[1.15] mt-6 max-w-[850px] tracking-tight"
          >
            O que entra na lista de enxoval do Zeelo?
          </h2>
          <p className="font-body font-normal text-text-body text-base md:text-lg leading-relaxed mt-5 max-w-[700px] opacity-90">
            Receba <strong className="text-[#121212] font-semibold">+200 itens prontos</strong>, organizados por cômodo, com curadoria de marcas e preços atualizados.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {categories.map((cat, i) => (
            <AnimatedSection key={cat.name} delay={i * 50} className="flex h-full">
              <article className="group relative w-full bg-white rounded-2xl border border-border p-6 md:p-7 transition-all duration-300 hover:border-primary flex flex-col h-full overflow-hidden">
                {/* Barra de cor sutil no topo do card */}
                <div 
                  className="absolute top-0 left-0 w-full h-1.5" 
                  style={{ backgroundColor: cat.accent }}
                />
                
                <div className="flex flex-col mb-6">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="font-heading font-bold text-[#121212] text-lg md:text-xl tracking-tight">
                      {cat.name}
                    </h3>
                    <span
                      className="font-mono font-bold text-[11px] uppercase tracking-wider px-2 py-1 rounded-md"
                      style={{ backgroundColor: `${cat.accent}12`, color: cat.accent }}
                    >
                      {cat.count} itens
                    </span>
                  </div>
                </div>

                <ul className="flex flex-col gap-3 flex-grow" role="list">
                  {cat.examples.map((ex) => (
                    <li
                      key={ex}
                      className="font-body font-normal text-text-body text-sm md:text-[15px] flex items-start gap-3"
                    >
                      <svg 
                        className="w-4 h-4 mt-0.5 shrink-0" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        style={{ color: cat.accent }}
                      >
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {ex}
                    </li>
                  ))}
                  <li className="font-body italic text-text-body/60 text-xs mt-2 border-t border-border pt-3">
                    ... e mais {cat.count - 3} itens
                  </li>
                </ul>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Section B: Como montar o enxoval em 4 passos ─── */
function ComoMontarSection() {
  const scrollToOffer = useCallback(() => {
    document.getElementById("preco")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const steps = [
  {
    n: "01",
    title: "Personalize sua jornada",
    desc: "Monte o enxoval no seu ritmo. Escolha entre uma lista completa ou foque apenas no que é essencial e importante para o seu momento.",
  },
  {
    n: "02",
    title: "Inteligência financeira",
    desc: "Defina sua meta de gastos e deixe o Zeelo selecionar os itens com as melhores avaliações que cabem perfeitamente no seu bolso.",
  },
  {
    n: "03",
    title: "Radar de ofertas 24/7",
    desc: "Economize sem esforço. Ative alertas e receba avisos em tempo real sempre que um item da sua lista baixar de preço nas grandes lojas.",
  },
  {
    n: "04",
    title: "Sincronia total do casal",
    desc: "Conecte seu parceiro(a) para dividir tarefas, marcar itens comprados e ver a casa nova ganhar vida, com transparência e orçamento compartilhado.",
  },
];

  return (
    <section
      id="como-montar"
      aria-labelledby="como-montar-heading"
      className="bg-white py-12 md:py-16 lg:py-[72px]"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-24 xl:px-32">
        <AnimatedSection className="flex flex-col items-center text-center mb-10 md:mb-14">
          <TagBadge variant="orange">Prático e rápido</TagBadge>
          <h2
            id="como-montar-heading"
            className="font-heading font-bold text-[#121212] text-[28px] sm:text-[36px] md:text-[44px] lg:text-[50px] leading-[1.22] mt-5 max-w-[920px]"
          >
           Configure seu enxoval em apenas 3 minutos
          </h2>
          
        </AnimatedSection>

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5" role="list">
          {steps.map((step, i) => (
            <AnimatedSection key={step.n} delay={i * 80} className="h-full">
              <li className="relative h-full bg-bg-gray rounded-[14px] border border-border p-5 md:p-6 hover:border-primary/40 transition-all duration-300 flex flex-col">
                <span className="font-heading font-bold text-primary text-[42px] md:text-[48px] leading-none opacity-80">
                  {step.n}
                </span>
                <h3 className="font-heading font-bold text-[#121212] text-[16.5px] md:text-[18px] leading-[1.3] mt-3">
                  {step.title}
                </h3>
                <p className="font-body font-light text-text-body text-[13.5px] md:text-[14.5px] leading-[1.55] mt-2">
                  {step.desc}
                </p>
              </li>
            </AnimatedSection>
          ))}
        </ol>

        <AnimatedSection delay={300} className="flex justify-center mt-10 md:mt-12">
          <CTAButton onClick={scrollToOffer}>Começar minha lista agora</CTAButton>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── Section C: Quanto custa montar um enxoval ─── */
function QuantoCustaSection() {
  const tiers = [
    {
      name: "Enxoval básico",
      range: "R$4.000 — R$7.000",
      accent: "#D3CA79",
      desc: "O essencial para morar bem sem excessos: cama, cozinha funcional, banheiro equipado, máquina de lavar e móveis básicos de sala. Ideal para quem está começando a vida de casal ou se mudando sozinha e quer priorizar o que realmente se usa no dia a dia.",
    },
    {
      name: "Enxoval intermediário",
      range: "R$8.000 — R$14.000",
      accent: "#EA7300",
      desc: "A maioria das famílias se encaixa aqui. Inclui eletrodomésticos de linha melhor, jogo de lençol e toalha com mais qualidade, decoração inicial (tapete, cortinas, quadros) e home office simples. Equilíbrio entre conforto e orçamento.",
    },
    {
      name: "Enxoval completo",
      range: "R$15.000+",
      accent: "#A62C2C",
      desc: "Para quem quer casa pronta desde o primeiro dia: eletrodomésticos top de linha, decoração planejada, home office equipado, varanda mobiliada e itens duplos para receber visitas. Fica confortável tanto para casal com renda consolidada quanto para quem vai morar por muitos anos.",
    },
  ];

  return (
    <section
      aria-labelledby="quanto-custa-heading"
      className="bg-bg-gray py-12 md:py-16 lg:py-[72px] border-y border-border"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-24 xl:px-32">
        <AnimatedSection className="flex flex-col items-center text-center mb-10 md:mb-12">
          <TagBadge variant="gold">Orçamento</TagBadge>
          <h2
            id="quanto-custa-heading"
            className="font-heading font-bold text-[#121212] text-[28px] sm:text-[36px] md:text-[44px] lg:text-[50px] leading-[1.22] mt-5 max-w-[920px]"
          >
            Quanto custa montar um enxoval de casa nova?
          </h2>
          <p className="font-body font-light text-text-body text-[15px] md:text-[17px] leading-[1.65] mt-5 max-w-[780px]">
            Depende do seu estilo de vida e das escolhas de marca — mas a média brasileira em 2026 fica entre <strong className="text-[#121212]">R$4.000 e R$15.000</strong>. Abaixo estão as três faixas que o Zeelo usa como referência para estimar o seu orçamento.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {tiers.map((tier, i) => (
            <AnimatedSection key={tier.name} delay={i * 100} className="h-full">
              <article className="h-full bg-white rounded-[14px] border border-border p-6 md:p-7 hover:border-primary/40 transition-all duration-300 flex flex-col">
                <span
                  className="inline-block font-mono font-semibold text-[11px] uppercase tracking-[2px] px-2 py-1 rounded-[3px] self-start"
                  style={{ backgroundColor: `${tier.accent}20`, color: tier.accent }}
                >
                  {tier.name}
                </span>
                <p className="font-heading font-bold text-[#121212] text-[26px] md:text-[30px] leading-none mt-4">
                  {tier.range}
                </p>
                <p className="font-body font-light text-text-body text-[14px] md:text-[15px] leading-[1.6] mt-4">
                  {tier.desc}
                </p>
              </article>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={300} className="mt-10 md:mt-12 text-center">
          <p className="font-body text-[#121212] text-[16px] md:text-[18px] leading-[1.55] max-w-[640px] mx-auto">
            Com o Zeelo, usuárias economizam em média <strong className="text-primary">R$800</strong> usando os alertas de promoção — e <strong className="text-primary">67%</strong> escolhem o plano anual pela relação custo-benefício.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}


/* ─── Comparison Section: Zeelo vs. Listas estáticas ─── */
function ComparisonSection() {
  const rows: { feature: string; zeelo: boolean; old: boolean }[] = [
    { feature: "Lista de enxoval completa", zeelo: true, old: true },
    { feature: "Separação de itens por cômodos", zeelo: true, old: true },
    { feature: "Alertas de promoções em tempo real", zeelo: true, old: false },
    { feature: "Cálculo financeiro automático", zeelo: true, old: false },
    { feature: "Acompanhamento de evolução do enxoval", zeelo: true, old: false },
    { feature: "Painel de inspirações e moodboard", zeelo: true, old: false },
    { feature: "Acessível a qualquer momento", zeelo: true, old: false },
  ];

  const CheckIcon = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="mx-auto" aria-hidden="true">
      <circle cx="11" cy="11" r="11" fill="#A62C2C" />
      <path d="M6.5 11.5L9.5 14.5L15.5 8.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const CrossIcon = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="mx-auto" aria-hidden="true">
      <circle cx="11" cy="11" r="11" fill="#f0f0f0" />
      <path d="M14.5 7.5L7.5 14.5M7.5 7.5L14.5 14.5" stroke="#ccc" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );

  return (
    <section
      aria-labelledby="comparacao-heading"
      className="bg-white py-12 md:py-16 lg:py-[72px] border-t border-border"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-24 xl:px-32">
        <AnimatedSection className="text-center mb-10 md:mb-12">
          <TagBadge variant="gold">Compare</TagBadge>
          <h2 id="comparacao-heading" className="font-heading font-bold text-[#121212] text-[28px] sm:text-[36px] md:text-[48px] leading-[1.27] mt-5">
            Por que usar o Zeelo?
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="overflow-x-auto rounded-[12px] border border-border">
            <table
              className="w-full min-w-[480px]"
              role="table"
              aria-label="Comparação entre Zeelo e lista impressa"
            >
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="text-left font-body font-medium text-text-body/70 text-sm px-5 md:px-8 py-4 bg-bg-gray border-b border-border w-[52%]"
                  >
                    Recurso
                  </th>
                  <th
                    scope="col"
                    className="font-heading font-bold text-[14px] md:text-[15px] px-5 md:px-8 py-4 border-b border-border text-center w-[24%]"
                    style={{ backgroundColor: "#FFF5F5", color: "#A62C2C" }}
                  >
                    <span className="flex items-center justify-center gap-1.5">
                      Zeelo
                    </span>
                  </th>
                  <th
                    scope="col"
                    className="font-body font-medium text-text-body/50 text-sm px-5 md:px-8 py-4 bg-bg-gray border-b border-border text-center w-[24%]"
                  >
                    Lista impressa/PDF
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={`border-b border-border last:border-b-0 transition-colors duration-150 hover:bg-[#FAFAFA] bg-white`}
                  >
                    <td className="font-body font-light text-text-body text-sm md:text-[15px] px-5 md:px-8 py-4">
                      {row.feature}
                    </td>
                    <td
                      className="text-center px-5 md:px-8 py-4"
                      style={{ backgroundColor: "#FFF5F5" }}
                      aria-label={row.zeelo ? "Zeelo: sim" : "Zeelo: não"}
                    >
                      {row.zeelo ? <CheckIcon /> : <CrossIcon />}
                    </td>
                    <td
                      className="text-center px-5 md:px-8 py-4 bg-white"
                      aria-label={row.old ? "Lista: sim" : "Lista: não"}
                    >
                      {row.old ? <CheckIcon /> : <CrossIcon />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        {/* <ProblemSection /> */}
        <ComoMontarSection />
        <ListaEnxovalSection />
        <PraticalSection />
        <SimplifySection />
        <ComparisonSection />
        <SocialProofSection />
        <PricingSection />
        <FAQSection />
      </main>
      <Footer />

      {/* JSON-LD: Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Zeelo",
            url: "https://zeelo.site",
            logo: "https://zeelo.site/images/logo_hor-brand.png",
            sameAs: [],
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "customer support",
              availableLanguage: "Portuguese",
            },
          }),
        }}
      />

      {/* JSON-LD: SoftwareApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Zeelo — Organizador de Enxoval de Casa Nova",
            description:
              "Sistema para montar e organizar o enxoval de casa nova. Lista completa por cômodo, alertas de promoções em tempo real com IA, controle financeiro e montagem colaborativa em casal.",
            applicationCategory: "LifestyleApplication",
            operatingSystem: "Web, iOS, Android",
            inLanguage: "pt-BR",
            url: "https://zeelo.site",
            offers: [
              {
                "@type": "Offer",
                name: "Plano Anual",
                price: "47.90",
                priceCurrency: "BRL",
                availability: "https://schema.org/InStock",
                url: "https://pay.cakto.com.br/334sty9",
                priceValidUntil: "2026-12-31",
              },
              {
                "@type": "Offer",
                name: "Plano Vitalício",
                price: "77.90",
                priceCurrency: "BRL",
                availability: "https://schema.org/InStock",
                url: OFFER_LINK,
              },
            ],
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "3550",
              bestRating: "5",
              worstRating: "1",
            },
            review: [
              {
                "@type": "Review",
                author: { "@type": "Person", name: "Mariana S." },
                reviewRating: { "@type": "Rating", ratingValue: "5" },
                reviewBody:
                  "Estava usando uma planilha com os itens do enxoval, achava o máximo por não depender de lista impressa, mas esse app é surreal! Já peguei meu microondas e uns movéis pra sala, economizei mais de 300 reais do valor que tava planejando. Recomendo demais!",
              },
              {
                "@type": "Review",
                author: { "@type": "Person", name: "Rafael e Camila" },
                reviewRating: { "@type": "Rating", ratingValue: "5" },
                reviewBody:
                  "Usamos em conjunto — o controle financeiro nos ajudou a não sair do orçamento.",
              },
              {
                "@type": "Review",
                author: { "@type": "Person", name: "Fernanda L." },
                reviewRating: { "@type": "Rating", ratingValue: "5" },
                reviewBody:
                  "O Zeelo já vem com mais de 200 itens organizados por cômodo. Foi só marcar o que eu já tinha.",
              },
            ],
          }),
        }}
      />

      {/* JSON-LD: FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "O que é enxoval de casa nova?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Enxoval de casa nova é o conjunto de itens essenciais que você compra antes (ou logo depois) de se mudar: utensílios de cozinha, cama, banho, limpeza, eletrodomésticos básicos e móveis principais. Diferente do enxoval de bebê, o de casa é pensado por cômodo.",
                },
              },
              {
                "@type": "Question",
                name: "Quantos itens tem um enxoval de casa nova completo?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Entre 180 e 220 itens em média. A lista padrão do Zeelo traz +200 itens validados por +3.550 famílias, separados em 8 cômodos: cozinha, sala, quarto do casal, banheiro, lavanderia, varanda, home office e limpeza geral.",
                },
              },
              {
                "@type": "Question",
                name: "Quanto tempo leva para montar o enxoval de casa nova?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A lista fica pronta em menos de 30 minutos no Zeelo. A compra completa dos itens leva em média de 3 a 8 meses, dependendo do orçamento. Planejar cedo significa aproveitar mais promoções ao longo do caminho.",
                },
              },
              {
                "@type": "Question",
                name: "Posso compartilhar a lista de enxoval com meu parceiro(a)?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sim. O Zeelo permite adicionar um usuário extra na mesma conta vocês montam a lista juntos, dividem as compras marcadas e acompanham o orçamento em tempo real.",
                },
              },
              {
                "@type": "Question",
                name: "A lista de enxoval do Zeelo substitui o PDF ou a planilha?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Substitui com vantagem: o PDF é estático, não avisa promoção nem calcula orçamento. A lista do Zeelo atualiza automaticamente, com alertas de promoção em tempo real, controle financeiro automático e colaboração em casal.",
                },
              },
              {
                "@type": "Question",
                name: "Os itens sugeridos são seguros?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sim, nossa Inteligência Artificial busca os produtos em promoção que atendam critérios de compra e boas notas de avaliação. Ainda assim não temos vínculo direto com os produtos ou lojas sugeridas.",
                },
              },
              {
                "@type": "Question",
                name: "Consigo acessar no celular?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sim, você pode acessar o Zeelo em qualquer dispositivo, seja computador, tablet ou celular.",
                },
              },
              {
                "@type": "Question",
                name: "As promoções são atualizadas?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "O Zeelo atualiza promoções e cupons diversas vezes ao longo do dia, mesmo que você não veja a promoção no momento em que ela foi adicionada, ela continuará visível. Porém a disponibilidade depende do produto e loja.",
                },
              },
              {
                "@type": "Question",
                name: "Consigo adicionar outras pessoas para acessar o app?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sim, você pode adicionar um usuário extra à sua conta, assim essa pessoa poderá te ajudar na montagem do enxoval como quiser.",
                },
              },
              {
                "@type": "Question",
                name: "Consigo adicionar mais itens na lista de enxoval?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Claro! Além dos itens já disponíveis, você pode adicionar quantos itens personalizados quiser à sua lista.",
                },
              },
              {
                "@type": "Question",
                name: "Tenho garantia?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sim! Você tem 7 dias de garantia incondicional. Se não gostar, devolvemos 100% do seu dinheiro.",
                },
              },
            ],
          }),
        }}
      />

      {/* JSON-LD: HowTo — "Como montar a lista de enxoval" */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "Como montar a lista de enxoval de casa nova em 5 passos",
            description:
              "Fluxo guiado para montar sua lista de enxoval de casa nova em menos de 30 minutos, com priorização, orçamento e alertas de promoções.",
            totalTime: "PT30M",
            estimatedCost: {
              "@type": "MonetaryAmount",
              currency: "BRL",
              value: "8000",
            },
            supply: [
              { "@type": "HowToSupply", name: "Lista de cômodos da sua casa nova" },
              { "@type": "HowToSupply", name: "Orçamento estimado" },
            ],
            tool: [
              { "@type": "HowToTool", name: "Aplicativo Zeelo" },
            ],
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Liste os cômodos da sua casa nova",
                text: "Selecione no Zeelo os cômodos que a sua casa tem — cozinha, sala, quarto, banheiro, lavanderia, varanda, home office. A lista se adapta automaticamente aos espaços escolhidos.",
                url: "https://zeelo.site/#como-montar",
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Priorize essencial vs. desejável",
                text: "Marque o que já tem e classifique os itens entre essenciais (compra imediata) e desejáveis (podem esperar promoção). Isso protege seu orçamento.",
                url: "https://zeelo.site/#como-montar",
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Defina seu orçamento total",
                text: "Informe o teto de gasto. O Zeelo calcula em tempo real o quanto ainda falta, distribui o orçamento por cômodo e alerta se o enxoval vai estourar.",
                url: "https://zeelo.site/#como-montar",
              },
              {
                "@type": "HowToStep",
                position: 4,
                name: "Ative alertas de promoções",
                text: "Com um clique você passa a receber avisos 24/7 quando o item da sua lista de enxoval entra em promoção em lojas confiáveis.",
                url: "https://zeelo.site/#como-montar",
              },
              {
                "@type": "HowToStep",
                position: 5,
                name: "Acompanhe a evolução em casal",
                text: "Adicione seu parceiro(a) na conta. Vocês marcam o que já compraram, dividem tarefas e veem o progresso da casa nova ficar de pé juntos.",
                url: "https://zeelo.site/#como-montar",
              },
            ],
          }),
        }}
      />

      {/* JSON-LD: ItemList — Lista de enxoval por cômodo */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Lista de Enxoval de Casa Nova Completa",
            description:
              "Lista completa com 200 itens de enxoval de casa nova separados em 8 cômodos — cozinha, sala, quarto, banheiro, lavanderia, varanda, home office e limpeza.",
            numberOfItems: 200,
            itemListOrder: "https://schema.org/ItemListOrderAscending",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Cozinha", description: "61 itens — panelas, liquidificador, jogo de talheres, micro-ondas e mais." },
              { "@type": "ListItem", position: 2, name: "Sala de Estar", description: "16 itens — sofá, estante, TV, tapete, poltrona e mais." },
              { "@type": "ListItem", position: 3, name: "Quarto", description: "12" },
              { "@type": "ListItem", position: 4, name: "Banheiro", description: "18 itens — toalhas, tapete, cesto, porta-escovas, tapete antiderrapante e mais." },
              { "@type": "ListItem", position: 5, name: "Lavanderia", description: "24 itens — máquina de lavar, varal, cestos, produtos, tábua de passar e mais." },
              { "@type": "ListItem", position: 6, name: "Varanda / Área Externa", description: "14 itens — vaso, cadeira, churrasqueira, jogo de mesa e mais." },
              { "@type": "ListItem", position: 7, name: "Home Office", description: "20 itens — mesa, cadeira, luminária, organizadores e mais." },
            ],
          }),
        }}
      />

      {/* JSON-LD: BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Início", item: "https://zeelo.site" },
              { "@type": "ListItem", position: 2, name: "Lista de Enxoval de Casa Nova", item: "https://zeelo.site/#lista-enxoval" },
            ],
          }),
        }}
      />

      {/* JSON-LD: Product — libera snippet de preço */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Zeelo — Lista de Enxoval de Casa Nova",
            description:
              "Lista de enxoval de casa nova com +200 itens por cômodo, alertas de promoções em tempo real, controle financeiro e colaboração em casal.",
            brand: { "@type": "Brand", name: "Zeelo" },
            image: "https://zeelo.site/images/hero-screenshot.png",
            offers: {
              "@type": "AggregateOffer",
              lowPrice: "21.90",
              highPrice: "77.90",
              priceCurrency: "BRL",
              offerCount: 3,
              url: "https://zeelo.site#preco",
              availability: "https://schema.org/InStock",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "3550",
              bestRating: "5",
              worstRating: "1",
            },
          }),
        }}
      />
    </>
  );
}
