"use client";

import { AnimatedSection } from "@/components/ui/animated-section";
import { TagBadge } from "@/components/ui/tag-badge";

export function QuantoCustaSection() {
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
      className="bg-bg-gray py-10 md:py-16 lg:py-[72px] border-y border-border"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-24 xl:px-32">
        <AnimatedSection className="flex flex-col items-center text-center mb-8 md:mb-12">
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
              <article className="h-full bg-white rounded-[14px] border border-border p-5 md:p-7 hover:border-primary/40 transition-all duration-300 flex flex-col">
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
