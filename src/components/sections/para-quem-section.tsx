"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatedSection } from "@/components/ui/animated-section";
import { CTAButton } from "@/components/ui/cta-button";
import { ArrowUpFromDot, PiggyBank, ClipboardList } from "lucide-react";
import { TagBadge } from "../ui/tag-badge";

export function ParaQuemSection() {
  const [activeImage, setActiveImage] = useState(0);
  const images = ["/images/pq-1.png", "/images/pq-2.png", "/images/pq-3.png"];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const items = [
    {
      title: "Para quem não sabe por onde começar",
      desc: "Montar uma casa nova é uma avalanche de decisões. O Zeelo te ajuda a organizar o que é essencial e cria o seu roteiro inicial. É o ponto de partida que falta para o seu enxoval sair do papel.",
      icon: (
        <ArrowUpFromDot className="text-[#A62C2C] w-6 h-6" strokeWidth={2} />
      )
    },
    {
      title: "Para quem busca economizar sem abrir mão da qualidade",
      desc: "Se o seu tempo e dinheiro são valiosos demais para serem gastos caçando ofertas manualmente. Monitoramos preços em tempo real nas maiores lojas e cuidamos do seu controle financeiro para você economizar dinheiro sem abrir mão dos itens que deseja.",
      icon: (
        <PiggyBank className="text-[#EA7300] w-6 h-6" strokeWidth={2} />
      )
    },
    {
      title: "Para quem cuida de cada detalhe",
      desc: "Organize itens por cômodo, crie seu quadro dos sonhos e organize suas finanças para que absolutamente nada fique para trás no dia da mudança.",
      icon: (
        <ClipboardList className="text-[#D3CA79] w-6 h-6" strokeWidth={2} />
      )
    }
  ];

  return (
    <section className="bg-white py-10 md:py-16 lg:py-[48px]">
      <AnimatedSection className="text-center mb-8 md:mb-12">
                    <TagBadge variant="gold">Feito pra você</TagBadge>
                    <h2 id="comparacao-heading" className="font-heading font-bold text-[#121212] text-[28px] sm:text-[36px] md:text-[48px] leading-[1.27] mt-5">
                      Pra quem é esse app?
                    </h2>
                  </AnimatedSection>
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-24 xl:px-32">
        <AnimatedSection className="bg-bg-gray rounded-[24px] border border-border/50 p-5 sm:p-8 md:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            
            {/* Image Side */}
            <div className="relative w-full aspect-[4/3] sm:aspect-square md:aspect-[4/3] lg:aspect-auto lg:h-full min-h-[250px] sm:min-h-[350px] lg:min-h-[500px] rounded-[16px] flex justify-center items-center overflow-hidden">
              {images.map((src, index) => (
                <Image 
                  key={src}
                  src={src} 
                  alt={`Painel do Zeelo em destaque ${index + 1}`}
                  fill
                  className={`object-contain transition-opacity duration-1000 ${activeImage === index ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={index === 0}
                />
              ))}

              {/* Indicadores do Carrossel */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    aria-label={`Ir para imagem ${index + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${activeImage === index ? "bg-primary w-6" : "bg-primary/30 w-2"}`}
                  />
                ))}
              </div>
            </div>

            {/* Content Side */}
            <div className="flex flex-col">
              <div className="flex flex-col gap-8">
                {items.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 md:gap-5">
                    <div className="flex-shrink-0 w-12 h-12 bg-white rounded-[12px] flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-heading font-bold text-[#121212] text-[17px] md:text-[19px] leading-[1.3] mb-2">
                        {item.title}
                      </h3>
                      <p className="font-body font-light text-text-body text-[14px] md:text-[14.5px] leading-[1.6]">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
