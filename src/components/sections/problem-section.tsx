"use client";

import Image from "next/image";
import { AnimatedSection } from "@/components/ui/animated-section";
import { TagBadge } from "@/components/ui/tag-badge";

export function ProblemSection() {
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
