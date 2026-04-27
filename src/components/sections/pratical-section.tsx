"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { AnimatedSection } from "@/components/ui/animated-section";
import { TagBadge } from "@/components/ui/tag-badge";
import { MovingBorderImage } from "@/components/ui/moving-border-image";

export function PraticalSection() {
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
    <section className="bg-white py-10 md:py-16 lg:py-[72px]" id="funcionalidades">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-24 xl:px-32">
        <AnimatedSection className="flex flex-col items-center text-center mb-8 md:mb-12">
          <TagBadge variant="dark">Tudo em um só lugar</TagBadge>
          <h2 className="font-heading font-bold text-[#121212] text-[28px] sm:text-[36px] md:text-[44px] lg:text-[50px] leading-[1.2] mt-5 max-w-[980px]">
           Controle total na palma da sua sua mão
          </h2>
        </AnimatedSection>

        {/* Main Mockup Display */}
        <AnimatedSection delay={100} className="mb-6 md:mb-8 w-full">
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
