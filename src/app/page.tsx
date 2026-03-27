"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useInView } from "@/hooks/useInView";

const OFFER_LINK = "https://pay.cakto.com.br/ktmjrjp_819342";
const LOGIN_LINK = "https://app.zeelo.site/login";

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
  variant?: "pink" | "orange";
}) {
  return (
    <span
      className={`inline-block px-2 py-1 rounded-[2px] font-mono text-sm font-semibold tracking-[2.8px] uppercase text-primary ${
        variant === "pink" ? "bg-primary-light" : "bg-tag-orange"
      }`}
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
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = useCallback((id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md border-b border-border" : "bg-white border-b border-border"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-24 xl:px-32 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <a href="#" className="flex items-center shrink-0">
          <div className="relative h-8 w-[128px]">
            <Image
              src="/images/logo-2x1.png"
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
    <section className="relative bg-white pt-[72px] overflow-hidden">
      {/* Background pattern */}
      <div className="absolute bottom-0 left-0 w-64 lg:w-[480px] h-64 lg:h-[480px] opacity-10 pointer-events-none">
        <Image src="/images/pattern-bg.png" alt="" fill className="object-cover" />
      </div>
      <div className="absolute bottom-0 right-0 w-64 lg:w-[480px] h-64 lg:h-[480px] opacity-10 rotate-180 pointer-events-none">
        <Image src="/images/pattern-bg.png" alt="" fill className="object-cover" />
      </div>

      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-24 xl:px-32 lg:min-h-[calc(100vh-72px)] lg:flex lg:items-stretch">
        <div className="flex flex-col lg:flex-row lg:items-center w-full gap-8 lg:gap-0 py-10 md:py-14 lg:py-0">
          {/* Text Content */}
          <div className="flex-shrink-0 lg:w-[52%] flex flex-col justify-center lg:py-16 lg:pr-12 z-10">
            <AnimatedSection>
              <TagBadge>SEU LAR DOS SONHOS</TagBadge>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-[2.75rem] xl:text-5xl leading-tight mt-5 text-text-dark">
                Organize e monte o{" "}
                <span className="text-primary">enxoval dos sonhos </span>
                pagando barato
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <p className="font-body font-light text-text-body text-base md:text-lg leading-relaxed mt-4 max-w-lg">
                Deixe de lado as lista impressas e acompanhe em tempo real a
                evolução de seu projeto. Acompanhamento financeiro, promoções em
                um só lugar para acessar sempre que quiser.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="mt-8">
                <CTAButton onClick={scrollToOffer}>Organizar enxoval</CTAButton>
              </div>
            </AnimatedSection>
          </div>

          {/* Hero Image */}
          <AnimatedSection
            className="relative w-full lg:w-[48%]"
            delay={400}
          >
            <div className="relative mx-auto max-w-xl lg:max-w-none">
              <div className="bg-[#fafafa] border border-border-gold rounded-2xl p-3 md:p-4 lg:pb-0">
                <div className="relative w-full aspect-[803/628] rounded-2xl overflow-hidden">
                  <Image
                    src="/images/hero-screenshot.png"
                    alt="Zeelo - Plataforma de organização de enxoval"
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 720px"
                  />
                </div>
              </div>
            </div>
          </AnimatedSection>
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
      className="relative bg-bg-gray border-y border-border py-12 md:py-16 lg:py-[72px]"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-24 xl:px-32">
        <AnimatedSection className="flex flex-col items-center text-center mb-10 md:mb-16">
          <TagBadge variant="orange">Você ainda faz isso?</TagBadge>
          <h2 className="font-heading font-bold text-primary text-[28px] sm:text-[36px] md:text-[48px] lg:text-[53px] leading-[1.27] mt-5 max-w-[960px]">
            Você provavelmente tentou
            <br className="hidden md:block" /> montar seu enxoval assim:
          </h2>
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
              <h3 className="font-heading font-bold text-primary text-[16.5px] leading-[1.3]">
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

/* ─── Feature 2: Praticidade (Interactive Mockups) ─── */
function PraticalSection() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const cards = [
    {
      icon: "/images/icon-calendar.svg",
      title: "Promoções 24/7",
      desc: "Receba notificações em tempo real de promoções e cupons, você passa menos tempo procurando o lugar mais barato.",
      mockup: "/images/screenshot-inspiracoes.png",
    },
    {
      icon: "/images/icon-layers.svg",
      title: "Separação inteligente",
      desc: "Acompanhe o progresso de montagem individualizado para cada área do seu enxoval.",
      mockup: "/images/screenshot-favoritos.png",
    },
    {
      icon: "/images/icon-coin.svg",
      title: "Controle financeiro",
      desc: "Estimativa de gastos, caixinha de mudança, evolução de compras e investimentos em um só lugar.",
      mockup: "/images/screenshot-moodboard.png",
    },
    {
      icon: "/images/icon-keyframes.svg",
      title: "Montagem em dupla",
      desc: "Adicione gratuitamente uma pessoa adicional para participar da montagem de seu enxoval em conjunto.",
      mockup: "/images/hero-screenshot.png",
    },
  ];

  const currentMockup =
    activeCard !== null
      ? cards[activeCard].mockup
      : "/images/screenshot-list.png";

  return (
    <section className="bg-white py-12 md:py-16 lg:py-[72px]">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-24 xl:px-32">
        <AnimatedSection className="flex flex-col items-center text-center mb-10 md:mb-16">
          <TagBadge>Tudo em um só lugar</TagBadge>
          <h2 className="font-heading font-bold text-primary text-[28px] sm:text-[36px] md:text-[48px] lg:text-[52px] leading-[1.29] mt-5">
            Praticidade em um só lugar
          </h2>
        </AnimatedSection>

        {/* Interactive Mockup */}
        <AnimatedSection delay={100} className="mb-8 md:mb-10">
          <div className="relative w-full overflow-hidden rounded-[16px] md:rounded-[24px] border-[6px] md:border-[9px] border-primary shadow-lg">
            <div className="relative w-full aspect-[1680/888]">
              <Image
                src={currentMockup}
                alt="Mockup da plataforma Zeelo"
                fill
                className="object-cover transition-all duration-500 ease-in-out"
                sizes="(max-width: 768px) 100vw, 1440px"
              />
            </div>
          </div>
        </AnimatedSection>

        {/* Feature Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
          {cards.map((card, i) => (
            <AnimatedSection key={card.title} delay={i * 100}>
              <button
                onClick={() =>
                  setActiveCard(activeCard === i ? null : i)
                }
                className={`w-full text-left rounded-[12px] md:rounded-[16px] border p-4 md:p-6 transition-all duration-300 cursor-pointer ${
                  activeCard === i
                    ? "border-primary bg-primary-light scale-[1.02] shadow-sm"
                    : "border-border bg-white hover:border-primary/30 hover:shadow-sm hover:scale-[1.01]"
                }`}
              >
                <div className="w-[48px] h-[48px] md:w-[60px] md:h-[60px] flex items-center justify-center mb-4 md:mb-6">
                  <Image
                    src={card.icon}
                    alt=""
                    width={36}
                    height={36}
                    className="object-contain"
                  />
                </div>
                <h3 className="font-heading font-bold text-primary text-[16px] md:text-[20px] lg:text-[22px] leading-[1.3]">
                  {card.title}
                </h3>
                <p className="font-body font-light text-text-body text-[13px] md:text-[15px] lg:text-base leading-[1.5] mt-2 hidden sm:block">
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
              <TagBadge>SIMPLIFIQUE</TagBadge>
              <h2 className="font-heading font-bold text-primary text-[28px] sm:text-[36px] md:text-[44px] lg:text-[48px] leading-[1.3] mt-5">
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
                      <h3 className="font-heading font-bold text-primary text-base md:text-xl leading-[1.5]">
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
                      <h3 className="font-heading font-bold text-primary text-xl leading-[1.5]">
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
function PricingSection() {
  const benefits = [
    "Mais de 196 itens disponíveis",
    "Priorização e organização por cômodos",
    "Promoções e cupons 24 horas por dia.",
    "Controle de finanças e evolução do enxoval",
    "Quadro dos sonhos",
    "Adicione +1 perfil na sua conta",
    "Acesso Imediato e Vitalício",
  ];

  return (
    <section id="preco" className="relative bg-white py-12 md:py-16 lg:py-[72px] overflow-hidden">
      {/* BG Image */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/images/cta-bg.png"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(3,3,3,0.4)]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-24 xl:px-32 relative z-10">
        <AnimatedSection>
          <div className="bg-bg-gray rounded-[16px] p-5 md:p-10 lg:p-14 overflow-hidden relative">
            {/* Decorative patterns */}
            <div className="absolute bottom-0 left-0 w-[300px] lg:w-[599px] h-[280px] lg:h-[555px] opacity-10 pointer-events-none">
              <Image
                src="/images/pattern-bg.png"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute top-0 right-0 w-[300px] lg:w-[599px] h-[280px] lg:h-[555px] opacity-10 rotate-180 pointer-events-none">
              <Image
                src="/images/pattern-bg.png"
                alt=""
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-center justify-center relative z-10">
              {/* Benefits */}
              <div className="lg:w-[685px]">
                <h2 className="font-heading font-bold text-primary text-[28px] sm:text-[32px] md:text-[38px] leading-none">
                  Garanta o Zeelo com acesso vitalício
                </h2>
                <p className="font-body font-light text-text-body text-lg md:text-xl leading-[1.5] mt-2">
                  Todo seu enxoval reunido em um só lugar de forma prática para
                  não se preocupar com nada além da decoração.
                </p>

                <div className="flex flex-col gap-4 mt-6">
                  {benefits.map((b, i) => (
                    <AnimatedSection
                      key={b}
                      delay={i * 60}
                      className="flex items-center gap-3"
                    >
                      <Image
                        src="/images/icon-check.svg"
                        alt=""
                        width={20}
                        height={20}
                        className="shrink-0"
                      />
                      <span className="font-body font-light text-text-body text-base md:text-xl leading-[1.5]">
                        {b}
                      </span>
                    </AnimatedSection>
                  ))}
                </div>
              </div>

              {/* Pricing Card */}
              <AnimatedSection
                delay={200}
                className="w-full max-w-[440px] bg-white rounded-[16px] p-6 md:p-8 flex flex-col justify-between min-h-[416px]"
              >
                <div>
                  <p className="font-body font-light text-text-body text-lg md:text-xl uppercase leading-[1.5]">
                    Oferta por tempo limitado
                  </p>
                  <div className="flex items-center gap-4 md:gap-6 mt-2 flex-wrap">
                    <span className="font-heading font-bold text-primary text-[48px] sm:text-[60px] md:text-[73px] leading-none">
                      R$47,90
                    </span>
                    <span className="font-body font-light text-text-body text-lg md:text-xl line-through uppercase">
                      R$110,00
                    </span>
                  </div>
                  <p className="font-body font-light text-text-body text-base md:text-xl leading-[1.5] mt-2">
                    Em até 6X &bull; Acesso Imediato
                  </p>
                </div>

                <CTAButton href={OFFER_LINK} className="w-full mt-8">
                  COMPRAR AGORA
                </CTAButton>

                <div className="flex items-center gap-3 mt-6">
                  <div className="flex -space-x-3">
                    {[1, 0.8, 0.6, 0.3].map((opacity, i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full bg-[#160000] border-2 border-white"
                        style={{ opacity }}
                      />
                    ))}
                  </div>
                  <p className="font-body font-light text-primary text-sm md:text-base leading-[1.5] flex-1">
                    Junte-se aos 3.550+ clientes satisfeitos.
                  </p>
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
          <h2 className="font-heading font-bold text-primary text-[36px] sm:text-[44px] md:text-[51.8px] leading-[1.3]">
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
                  <span className="font-heading font-bold text-primary text-left text-lg md:text-[22px] leading-[1.3] transition-colors duration-200 group-hover:text-primary/80">
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
          <div className="relative w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] md:w-[200px] md:h-[200px] lg:w-[300px] lg:h-[300px]">
            <Image
              src="/images/logo_h_white.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>
          {/* <span className="font-logo text-white text-[60px] sm:text-[80px] md:text-[140px] lg:text-[220px] xl:text-[296px] leading-[0.8]">
            Zeelo
          </span> */}
        </div>
      </div>
    </footer>
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
        <SimplifySection />
        <PricingSection />
        <FAQSection />
      </main>
      <Footer />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Zeelo - Organizador de Enxoval",
            description:
              "Organize e monte o enxoval dos seus sonhos pagando barato. Promoções 24/7, controle financeiro e planejamento por cômodos.",
            brand: { "@type": "Brand", name: "Zeelo" },
            offers: {
              "@type": "Offer",
              price: "47.90",
              priceCurrency: "BRL",
              availability: "https://schema.org/InStock",
              url: OFFER_LINK,
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "3550",
            },
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Por quanto tempo vou ter acesso?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "O acesso ao Zeelo é vitalício! Você paga uma única vez e tem acesso para sempre.",
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
                name: "As promoções são atualizadas?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sim! As promoções e cupons são atualizados 24/7.",
                },
              },
              {
                "@type": "Question",
                name: "Tenho que pagar mensalidade?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Não! O Zeelo tem um pagamento único, sem mensalidades.",
                },
              },
              {
                "@type": "Question",
                name: "Tenho garantia?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sim! Você tem 7 dias de garantia incondicional.",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
