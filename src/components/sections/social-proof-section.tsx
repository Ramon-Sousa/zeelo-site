"use client";

import Image from "next/image";
import { AnimatedSection } from "@/components/ui/animated-section";
import { TagBadge } from "@/components/ui/tag-badge";

export function SocialProofSection() {
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

  return (
    <section
      aria-labelledby="prova-social-heading"
      className="bg-bg-gray py-10 md:py-16 lg:py-[72px] border-y border-border"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-24 xl:px-32">
        {/* Heading */}
        <AnimatedSection className="text-center mb-8 md:mb-10">
          <TagBadge variant="orange">+1.290 PESSOAS JÁ ORGANIZAM SEU NOVO LAR COM O ZEELO</TagBadge>
          <h2 id="prova-social-heading" className="font-heading font-bold text-[#121212] text-[28px] sm:text-[36px] md:text-[44px] leading-[1.3] mt-5">
            Depoimentos de quem já economizou na montagem do seu enxoval
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
