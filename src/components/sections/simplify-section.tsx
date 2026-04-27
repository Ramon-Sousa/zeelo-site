"use client";

import { useCallback } from "react";
import Image from "next/image";
import { TagBadge } from "@/components/ui/tag-badge";
import { CTAButton } from "@/components/ui/cta-button";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

const bentoItems = [
  {
    title: "Quadro dos sonhos e Inspirações",
    description: "Organize estilos de decoração e tenha clareza do que combina com o seu novo lar antes mesmo de comprar.",
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
  },
  {
    title: "Salve seus favoritos",
    description: "Compare opções e salve seus itens favoritos para decidir com calma quando o preço baixar.",
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
  },
  {
    title: "Planejamento a quatro mãos",
    description: "Convide seu parceiro(a) para montar o enxoval com você. Decisões compartilhadas em tempo real para garantir que a casa tenha a cara dos dois.",
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
  },
  {
    title: "Sugestões para todos os itens",
    description: "Receba sugestões de produtos com o melhor custo-benefício para cada item da sua lista.",
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
  },
];

export function SimplifySection() {
  const scrollToOffer = useCallback(() => {
    document.getElementById("preco")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section className="relative bg-white border-y border-border py-10 md:py-16 lg:py-[96px]">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-24 xl:px-32">
        <div className="flex flex-col items-center text-center mb-8 md:mb-16">
          <TagBadge variant="gold">SIMPLIFIQUE</TagBadge>
          <h2 className="font-heading font-bold text-[#121212] text-[28px] sm:text-[36px] md:text-[44px] lg:text-[48px] leading-[1.3] mt-5 max-w-3xl">
            Você cuida da decoração, o Zeelo cuida da "parte chata"
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

        <div className="flex justify-center mt-8 md:mt-16">
          <CTAButton onClick={scrollToOffer} className="w-full sm:w-auto">
            Quero organizar meu enxoval
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
