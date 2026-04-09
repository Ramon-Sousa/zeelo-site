"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { useInView } from "@/hooks/useInView";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";

const OFFER_LINK = "https://pay.cakto.com.br/ktmjrjp_819342";
const LOGIN_LINK = "https://app.zeelo.site/login";

const imgPs = [
  "/images/prova_social/pf_01.jpg",
  "/images/prova_social/pf_02.jpg",
  "/images/prova_social/pf_03.jpg",
  "/images/prova_social/pf_04.jpg",
];


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
          ? "bg-white/70 backdrop-blur-lg border-b border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.03)]" 
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-24 xl:px-32 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <a href="#" className="flex items-center shrink-0">
          <div className="relative h-8 w-[128px]">
            <Image
              src="/images/logo-2x1-brand.png"
              alt="Zeelo"
              fill
              className="object-contain object-left"
            />
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => scrollTo("como-funciona")}
            className="text-text-body font-body font-light text-[15.5px] hover:text-primary transition-colors duration-200"
          >
            Como funciona
          </button>
          <button
            onClick={() => scrollTo("preco")}
            className="text-text-body font-body font-light text-[15.5px] hover:text-primary transition-colors duration-200"
          >
            Preço
          </button>
          <button
            onClick={() => scrollTo("duvidas")}
            className="text-text-body font-body font-light text-[15.5px] hover:text-primary transition-colors duration-200"
          >
            Dúvidas
          </button>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={LOGIN_LINK}
            className="h-[44px] px-5 flex items-center justify-center rounded-[4px] border border-border-gold text-[#131413] font-body font-light text-[13.5px] hover:bg-gray-50 transition-colors duration-200"
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
            onClick={() => scrollTo("como-funciona")}
            className="text-left text-text-body font-body font-light text-[15.5px]"
          >
            Como funciona
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
  const scrollToOffer = useCallback(() => {
    document.getElementById("preco")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section className="relative pt-[72px] overflow-hidden min-h-[90vh] md:min-h-screen flex flex-col items-center">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
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
            animate="on"
            bgColor1="#000000"
            bgColor2="#000000"
            brightness={1.2}
            cAzimuthAngle={180}
            cDistance={2.4}
            cPolarAngle={95}
            cameraZoom={1}
            color1="#faf6e8"
            color2="#ffe5e3"
            color3="#ffeadb"
            destination="onCanvas"
            embedMode="off"
            envPreset="city"
            format="gif"
            fov={45}
            frameRate={10}
            gizmoHelper="hide"
            grain="off"
            lightType="3d"
            pixelDensity={1}
            positionX={0}
            positionY={-2.1}
            positionZ={0}
            range="disabled"
            rangeEnd={40}
            rangeStart={0}
            reflection={0.1}
            rotationX={0}
            rotationY={0}
            rotationZ={225}
            shader="defaults"
            type="waterPlane"
            uAmplitude={0}
            uDensity={1.8}
            uFrequency={5.5}
            uSpeed={0.2}
            uStrength={3}
            uTime={0.2}
            wireframe={false}
          />
        </ShaderGradientCanvas>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-10 lg:px-24 xl:px-32 flex flex-col items-center text-center pt-8 md:pt-24 lg:pt-20">
        {/* Text Content */}
        <div className="max-w-4xl flex flex-col items-center mb-8 md:mb-16">
          <AnimatedSection>
             <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-2 px-4">
                <div className="flex -space-x-3 sm:-space-x-4">
                  {imgPs.map((img, i) => (
                    <div key={i} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white overflow-hidden bg-gray-200">
                      <Image src={img} alt="" width={40} height={40} />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col items-center sm:items-start leading-none gap-1 sm:gap-1.5 ml-0 sm:ml-1">
                  <div className="flex text-yellow-500 text-[12px] sm:text-[14px]">
                    {"★".repeat(5)}
                  </div>
                  <span className="text-[12px] sm:text-[14px] text-text-body/70 font-medium">Usado por +1.200 pessoas</span>
                </div>
              </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <h1 className="font-heading font-bold text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.1] mt-6 md:mt-8 text-text-dark tracking-tight max-w-3xl">
              Monte seu enxoval como sempre sonhou <span className="italic text-primary">pagando barato!</span>
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <p className="font-body font-light text-text-body text-[15px] sm:text-base md:text-lg leading-relaxed mt-4 md:mt-6 max-w-2xl mx-auto opacity-80">
              Com o Zeelo você organiza todo o enxoval com lista completa por cômodo, controle financeiro em tempo real e alertas de promoções, direto no celular.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <div className="mt-8 md:mt-10">
              <CTAButton onClick={scrollToOffer}>Organizar enxoval agora</CTAButton>
            </div>
          </AnimatedSection>
        </div>

        {/* Hero Image / Mockup below - aligned to bottom and cropped */}
        <AnimatedSection
          className="relative w-full mt-auto px-4 md:px-0"
          delay={400}
        >
          <div className="relative w-full max-w-[2400px] mx-auto overflow-hidden">
            <div className="overflow-hidden -mb-6 md:-mb-20 rounded-t-[12px] md:rounded-t-[24px] border border-primary/20 md:border-4 border-primary/100">
              <Image
                src="/images/convidado.png"
                alt="Zeelo - Plataforma de organização de enxoval"
                width={2400}
                height={1400}
                className="w-full h-auto block"
                priority
              />
            </div>

          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── Feature 1: "Você ainda faz isso?" ─── */
function ProblemSection() {
  const features = [
    {
      image: "/images/feature-listas.png",
      title: "Listas impressas",
      desc: "Um caderno enorme cheio de produtos, aqui o nível de planejamento é quase ZERO.",
    },
    {
      image: "/images/feature-planner.png",
      title: "Planner online",
      desc: "Esses podem até te ajudar, mas ainda não fornecem informações para tomada de decisões.",
    },
    {
      image: "/images/feature-sem-planejamento.png",
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
            Listas em PDF, planilhas manuais e cadernos de anotações. .
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {features.map((f, i) => (
            <AnimatedSection
              key={f.title}
              delay={i * 150}
              className="flex flex-col items-center text-center bg-white rounded-[16px] p-6 md:p-8 border border-border hover:border-primary/20 hover:shadow-sm transition-all duration-300"
            >
              <div className="relative w-[200px] h-[120px] overflow-hidden mb-6">
                <Image
                  src={f.image}
                  alt={f.title}
                  fill
                  className="object-contain"
                  sizes="200px"
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

/* ─── Feature 2: Praticidade (Interactive Mockups + Auto-Carousel) ─── */
function PraticalSection() {
  const [activeCard, setActiveCard] = useState(0);
  const pausedRef = useRef(false);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cards = [
    {
      icon: "/images/icon-calendar.svg",
      title: "Promoções 24/7",
      desc: "Receba notificações em tempo real de promoções e cupons, você passa menos tempo procurando o lugar mais barato.",
      mockup: "/images/promos.png",
    },
    {
      icon: "/images/icon-layers.svg",
      title: "Separação inteligente",
      desc: "Acompanhe o progresso de montagem individualizado para cada área do seu enxoval.",
      mockup: "/images/itens.png",
    },
    {
      icon: "/images/icon-coin.svg",
      title: "Controle financeiro",
      desc: "Estimativa de gastos, caixinha de mudança, evolução de compras e investimentos em um só lugar.",
      mockup: "/images/financas.png",
    },
    {
      icon: "/images/icon-keyframes.svg",
      title: "Montagem em dupla",
      desc: "Adicione gratuitamente uma pessoa adicional para participar da montagem de seu enxoval em conjunto.",
      mockup: "/images/convidado.png",
    },
  ];

  // Auto-advance every 3s, pause for 5s after a manual click
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
        <AnimatedSection className="flex flex-col items-center text-center mb-10 md:mb-16">
          <TagBadge variant="dark">Tudo em um só lugar</TagBadge>
          <h2 className="font-heading font-bold text-[#121212] text-[28px] sm:text-[36px] md:text-[48px] lg:text-[52px] leading-[1.29] mt-5">
            Praticidade em um só lugar
          </h2>
        </AnimatedSection>

        {/* Main Mockup Display */}
        <AnimatedSection delay={100} className="mb-6 md:mb-8">
          <div className="relative w-full overflow-hidden rounded-[16px] md:rounded-[24px] border-2 md:border-4 border-primary shadow-lg">
            <div className="relative w-full aspect-[1680/888]">
              <Image
                src={cards[activeCard].mockup}
                alt={`Demonstração: ${cards[activeCard].title}`}
                fill
                className="object-cover transition-all duration-500 ease-in-out"
                sizes="(max-width: 768px) 100vw, 1440px"
              />
            </div>
          </div>

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
                    : "w-2 bg-border hover:bg-primary/40"
                }`}
              />
            ))}
          </div>
        </AnimatedSection>

        {/* Feature Cards — clickable tabs */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
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
                    ? "border-primary bg-primary-light shadow-sm"
                    : "border-border bg-white hover:border-primary/30 hover:shadow-sm"
                }`}
              >
                <div className="w-[40px] h-[40px] md:w-[52px] md:h-[52px] flex items-center justify-center mb-3 md:mb-4">
                  <Image
                    src={card.icon}
                    alt=""
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <h3 className="font-heading font-bold text-[#121212] text-[14px] md:text-[18px] lg:text-[20px] leading-[1.3]">
                  {card.title}
                </h3>
                <p className="font-body font-light text-text-body text-[12px] md:text-[14px] lg:text-[15px] leading-[1.5] mt-1.5 hidden sm:block">
                  {card.desc}
                </p>
              </button>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Feature 3: Simplifique (Carousel on desktop, stacked on mobile) ─── */
function SimplifySection() {
  const [current, setCurrent] = useState(0);
  const scrollToOffer = useCallback(() => {
    document.getElementById("preco")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const slides = [
    {
      image: "/images/screenshot-inspiracoes.png",
      title: "Painel de referência e inspirações",
      desc: "Organize estilos de decoração, inspirações de moveis, eletrodomésticos para montar seu novo lar como sempre sonhou.",
    },
    {
      image: "/images/screenshot-favoritos.png",
      title: "Favoritos em um só lugar",
      desc: "Salve seus produtos favoritos de diferentes lojas em um só lugar.",
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrent((p) => (p + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrent((p) => (p - 1 + slides.length) % slides.length);
  }, [slides.length]);

  return (
    <section className="relative bg-bg-gray border-y border-border py-12 md:py-16 lg:py-[96px]">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-24 xl:px-32">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Left Content */}
          <div className="lg:w-[380px] shrink-0 flex flex-col gap-8 lg:gap-12">
            <AnimatedSection>
              <TagBadge variant="gold">SIMPLIFIQUE</TagBadge>
              <h2 className="font-heading font-bold text-[#121212] text-[28px] sm:text-[36px] md:text-[44px] lg:text-[48px] leading-[1.3] mt-5">
                Sua única preocupação será com a decoração.
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={150}>
              <CTAButton onClick={scrollToOffer}>
                Quero organizar meu enxoval
              </CTAButton>
            </AnimatedSection>
          </div>

          {/* Right: Carousel (desktop) / Stacked (mobile) */}
          <div className="flex-1 min-w-0">
            {/* Mobile: stacked cards */}
            <div className="flex flex-col gap-4 lg:hidden">
              {slides.map((slide, i) => (
                <AnimatedSection key={slide.title} delay={i * 150}>
                  <div className="rounded-[12px] border border-border overflow-hidden bg-white">
                    <div className="relative w-full aspect-[560/360] bg-[#fafafa]">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 560px"
                      />
                    </div>
                    <div className="p-4 md:p-6 border-t border-border">
                      <h3 className="font-heading font-bold text-[#121212] text-base md:text-xl leading-[1.5]">
                        {slide.title}
                      </h3>
                      <p className="font-body font-light text-text-body text-[14px] md:text-[15.6px] leading-[1.54] mt-1.5">
                        {slide.desc}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* Desktop: carousel */}
            <div className="hidden lg:block relative overflow-hidden h-[537px]">
              <div
                className="flex gap-8 transition-transform duration-500 ease-in-out h-full"
                style={{
                  transform: `translateX(-${current * (560 + 32)}px)`,
                }}
              >
                {slides.map((slide) => (
                  <div
                    key={slide.title}
                    className="shrink-0 w-[560px] rounded-[16px] border border-border overflow-hidden bg-white flex flex-col"
                  >
                    <div className="relative w-full h-[360px] bg-[#fafafa]">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-cover"
                        sizes="560px"
                      />
                    </div>
                    <div className="p-6 border-t border-border flex-1">
                      <h3 className="font-heading font-bold text-[#121212] text-xl leading-[1.5]">
                        {slide.title}
                      </h3>
                      <p className="font-body font-light text-text-body text-[15.6px] leading-[1.54] mt-2">
                        {slide.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Carousel Controls */}
              <div className="absolute inset-0 flex items-center justify-between p-6 pointer-events-none">
                <button
                  onClick={prevSlide}
                  className={`pointer-events-auto w-10 h-10 rounded-full bg-border-gold flex items-center justify-center transition-all duration-200 hover:scale-110 ${
                    current === 0 ? "opacity-0" : "opacity-100"
                  }`}
                  aria-label="Anterior"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M12.5 15l-5-5 5-5"
                      stroke="#4e4b49"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className={`pointer-events-auto w-10 h-10 rounded-full bg-border-gold flex items-center justify-center transition-all duration-200 hover:scale-110 ${
                    current === slides.length - 1 ? "opacity-0" : "opacity-100"
                  }`}
                  aria-label="Próximo"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M7.5 5l5 5-5 5"
                      stroke="#4e4b49"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA / Pricing Section ─── */
const ALL_BENEFITS = [
  "Mais de 196 itens disponíveis",
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
        <Image src="/images/cta-bg.png" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-[rgba(3,3,3,0.4)]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-24 xl:px-32 relative z-10">
        <AnimatedSection>
          <div className="bg-bg-gray rounded-[16px] p-5 md:p-8 lg:p-14 overflow-hidden relative">
            {/* Decorative patterns */}
            <div className="absolute bottom-0 left-0 w-[300px] lg:w-[599px] h-[280px] lg:h-[555px] opacity-10 pointer-events-none" aria-hidden="true">
              <Image src="/images/pattern-bg.png" alt="" fill className="object-cover" />
            </div>
            <div className="absolute top-0 right-0 w-[300px] lg:w-[599px] h-[280px] lg:h-[555px] opacity-10 rotate-180 pointer-events-none" aria-hidden="true">
              <Image src="/images/pattern-bg.png" alt="" fill className="object-cover" />
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
                <div className="bg-white rounded-[14px] border border-border p-5 md:p-6 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow duration-300">
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
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-primary font-mono text-[12px] font-black tracking-widest uppercase px-4 py-1.5 rounded-full z-20 whitespace-nowrap shadow-md border border-primary/10">
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
                <div className="bg-white rounded-[14px] border border-border p-5 md:p-6 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow duration-300">
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
      q: "Por quanto tempo vou ter acesso?",
      a: "O acesso ao Zeelo é vitalício! Você paga uma única vez e tem acesso para sempre, sem mensalidades ou cobranças adicionais.",
    },
    {
      q: "Consigo acessar no celular?",
      a: "Sim! O Zeelo é 100% responsivo e funciona perfeitamente em celulares, tablets e computadores.",
    },
    {
      q: "As promoções são atualizadas?",
      a: "Sim! As promoções e cupons são atualizados constantemente, 24 horas por dia, 7 dias por semana.",
    },
    {
      q: "Consigo adicionar outras pessoas para acessar o app?",
      a: "Sim! Você pode adicionar gratuitamente mais uma pessoa para participar da montagem do enxoval junto com você.",
    },
    {
      q: "Consigo adicionar mais itens na lista de enxoval?",
      a: "Claro! Além dos mais de 196 itens já disponíveis, você pode adicionar quantos itens personalizados quiser.",
    },
    {
      q: "Tenho que pagar mensalidade?",
      a: "Não! O Zeelo tem um pagamento único. Sem mensalidades, sem taxas escondidas.",
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
                    open === i ? "max-h-[200px] opacity-100 pb-6" : "max-h-0 opacity-0"
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

          <div className="flex items-center gap-6 md:gap-8">
            <button
              onClick={() => scrollTo("como-funciona")}
              className="font-body font-light text-primary-light text-[15.8px] hover:text-white transition-colors duration-200"
            >
              Como funciona
            </button>
            <button
              onClick={() => scrollTo("preco")}
              className="font-body font-light text-primary-light text-[15.6px] hover:text-white transition-colors duration-200"
            >
              Preço
            </button>
            <button
              onClick={() => scrollTo("duvidas")}
              className="font-body font-light text-primary-light text-[15.9px] hover:text-white transition-colors duration-200"
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
      avatar: "/images/testimonial-avatars.png",
      text: "Estava usando uma planilha com os itens do enxoval, achava o máximo por não depender de lista impressa, mas esse app é surreal! Já peguei meu microondas e uns movéis pra sala, economizei mais de 300 reais do valor que tava planejando. Recomendo demais!",
      stars: 5,
      accent: "#D3CA79",
    },
    {
      name: "Rafael & Camila",
      role: "Brotas, SP",
      avatar: "/images/testimonial-avatars.png",
      text: "Assinamos por recomendação de uma amiga, é simplesmente maravilhoso! Muito fácil de usar e ta nos ajudando muito na organização.",
      stars: 5,
      accent: "#D3CA79",
    },
    {
      name: "Fernanda L.",
      role: "Ribeirão Preto, SP",
      avatar: "/images/testimonial-avatars.png",
      text: "Vamos nos mudar em setembro, nossa montagem já esta em 40%, mas o que mais tem ajudado é o controle financeiro em conjunto com a priorização, não precisamos nos preocupar em comprar os itens maiores por questão de espaço e ainda sim temos controle do que falta.",
      stars: 5,
      accent: "#D3CA79",
    },
  ];

  const metrics = [
    { value: "1.290+", label: "Famílias usando" },
    { value: "196+", label: "Itens organizados" },
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
              className="flex flex-col bg-white rounded-[12px] overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow duration-300"
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
                    className="w-10 h-10 rounded-full overflow-hidden shrink-0 border-2"
                    style={{ borderColor: t.accent }}
                    aria-hidden="true"
                  >
                    <div
                      className="w-[120px] h-[40px] md:w-[120px]"
                      style={{
                        backgroundImage: `url('${t.avatar}')`,
                        backgroundSize: "300% 100%",
                        backgroundRepeat: "no-repeat",
                        width: "40px",
                        height: "40px",
                      }}
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
      </div>
    </section>
  );
}

/* ─── Comparison Section: Zeelo vs. Listas estáticas ─── */
function ComparisonSection() {
  const rows: { feature: string; zeelo: boolean; old: boolean }[] = [
    { feature: "Lista completa", zeelo: true, old: true },
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
            O que muda na prática
          </h2>
          <p className="font-body font-light text-text-body text-base md:text-lg mt-4 max-w-lg mx-auto">
            Papel não avisa promoção. Planilha não calcula o orçamento sozinha. Veja o que o Zeelo faz diferente.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="overflow-x-auto rounded-[12px] border border-border shadow-sm">
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
        <ProblemSection />
        <PraticalSection />
        <SocialProofSection />
        <SimplifySection />
        <ComparisonSection />
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
            logo: "https://zeelo.site/images/logo-2x1-brand.png",
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
                  "O Zeelo já vem com mais de 196 itens organizados por cômodo. Foi só marcar o que eu já tinha.",
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
                name: "Como montar enxoval de casa nova?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "O Zeelo oferece uma lista completa com mais de 196 itens organizados por cômodo. Você marca o que já tem, acompanha o progresso e recebe alertas de promoções dos itens que ainda faltam.",
                },
              },
              {
                "@type": "Question",
                name: "Por quanto tempo vou ter acesso?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "O Plano Vitalício oferece acesso para sempre, sem mensalidades. O Plano Anual dá acesso por 12 meses.",
                },
              },
              {
                "@type": "Question",
                name: "Consigo acessar no celular?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sim! O Zeelo é 100% responsivo e funciona em celulares, tablets e computadores.",
                },
              },
              {
                "@type": "Question",
                name: "As promoções são atualizadas em tempo real?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sim! As promoções e cupons são monitorados com IA e atualizados 24 horas por dia, 7 dias por semana. Você recebe notificações dos itens que realmente quer.",
                },
              },
              {
                "@type": "Question",
                name: "Consigo adicionar outras pessoas para acessar?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sim! Você pode adicionar gratuitamente mais uma pessoa para montar o enxoval em conjunto — ideal para casais.",
                },
              },
              {
                "@type": "Question",
                name: "Tenho que pagar mensalidade?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Não! O Plano Vitalício é um pagamento único, sem mensalidades ou taxas escondidas.",
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
    </>
  );
}
