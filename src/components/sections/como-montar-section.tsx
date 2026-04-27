"use client";

import { useCallback } from "react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { TagBadge } from "@/components/ui/tag-badge";
import { CTAButton } from "@/components/ui/cta-button";

export function ComoMontarSection() {
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
      className="bg-white py-10 md:py-16 lg:py-[72px]"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-24 xl:px-32">
        <AnimatedSection className="flex flex-col items-center text-center mb-8 md:mb-14">
          <TagBadge variant="orange">Prático e rápido</TagBadge>
          <h2
            id="como-montar-heading"
            className="font-heading font-bold text-[#121212] text-[28px] sm:text-[36px] md:text-[44px] lg:text-[50px] leading-[1.22] mt-5 max-w-[920px]"
          >
           Configure seu enxoval em apenas 3 minutos
          </h2>
        </AnimatedSection>

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5" role="list">
          {steps.map((step, i) => (
            <AnimatedSection key={step.n} delay={i * 80} className="h-full">
              <li className="relative h-full bg-bg-gray rounded-[14px] border border-border p-4 md:p-6 hover:border-primary/40 transition-all duration-300 flex flex-col">
                <span className="font-heading font-bold text-primary text-[36px] sm:text-[42px] md:text-[48px] leading-none opacity-80">
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

        <AnimatedSection delay={300} className="flex justify-center mt-8 md:mt-12">
          <CTAButton onClick={scrollToOffer} className="w-full sm:w-auto">Começar minha lista agora</CTAButton>
        </AnimatedSection>
      </div>
    </section>
  );
}
