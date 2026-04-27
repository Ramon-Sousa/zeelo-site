"use client";

import Image from "next/image";
import { AnimatedSection } from "@/components/ui/animated-section";

const ArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
    <path d="M4.167 10h11.666M10.833 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function PricingSection() {
  return (
    <section id="preco" className="relative bg-white py-10 md:py-16 lg:py-[72px] overflow-hidden">
      {/* BG Image — hidden on mobile */}
      <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden="true">
        <Image src="/images/cta-bg.png" alt="" fill loading="lazy" quality={60} className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-[rgba(3,3,3,0.4)]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-24 xl:px-32 relative z-10">
        <AnimatedSection>
          <div className="bg-bg-gray rounded-[16px] p-4 sm:p-6 md:p-8 lg:p-14 overflow-hidden relative">
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
                    <h3 className="font-body font-bold text-[#121212] text-lg md:text-xl uppercase leading-tight mt-1">Mensal</h3>
                    <div className="mt-3" aria-label="Preço: R$9,90 por mês">
                      <span className="font-heading font-bold text-[#121212] text-[36px] md:text-[44px] leading-none">R$9,90</span>
                      <span className="font-body text-text-body/50 text-sm ml-1">/mês</span>
                    </div>

                    <p className="font-body font-normal text-text-body text-[14px] leading-[1.6] mt-6 flex-grow">
                      Organize sua mudança sem compromenter seu orçamento. Perfeito se você planeja finalizar o enxoval em até 8 meses.
                    </p>
                  </div>

                  <div className="mt-6">
                    <a
                      href="https://app.zeelo.site/register"
                      className="group inline-flex items-center justify-center gap-2 w-full h-[46px] px-5 text-[14px] bg-[#F0EFEF] text-[#121212] rounded-[4px] font-body font-semibold transition-all duration-300 hover:bg-[#E5E4E4] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      aria-label="Assinar Plano Mensal por R$9,90"
                    >
                      COMEÇAR AGORA <ArrowIcon />
                    </a>
                  </div>
                </div>
              </AnimatedSection>

              {/* ── Card 2: Anual — DESTAQUE ── */}
              <AnimatedSection delay={100} className="w-full sm:-mt-4 sm:-mb-0">
                <div className="relative bg-primary rounded-[14px] p-[2px] shadow-2xl">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-primary font-mono text-[12px] font-black tracking-widest uppercase px-4 py-1.5 rounded-full z-20 whitespace-nowrap border border-primary/20">
                    <span role="img" aria-label="Fogo" className="mr-1">🔥</span> Mais escolhido
                  </div>
                  <div className="bg-primary rounded-[12px] p-5 md:p-7 flex flex-col">
                    <div>
                      <h3 className="font-body font-bold text-white text-lg md:text-xl uppercase leading-tight mt-1">Anual</h3>
                      <div className="mt-3" aria-label="Preço: R$64,90 por ano">
                        <span className="font-heading font-bold text-white text-[36px] md:text-[44px] leading-none">R$64,90</span>
                        <span className="font-body text-white/60 text-sm ml-1">/ano</span>
                      </div>
                      <p className="font-body font-light text-white/80 text-[13px] leading-[1.5] mt-1">Menos de R$4/mês</p>

                      <p className="font-body font-normal text-white/90 text-[14px] leading-[1.6] mt-6 flex-grow">
                        A escolha ideal se você vai se mudar nos próximos 12 meses, pague meenos de R$6 por mês.
                      </p>
                    </div>

                    <div className="mt-6 flex flex-col h-full justify-end">
                      <a
                        href="https://app.zeelo.site/register"
                        className="group flex items-center justify-center gap-2 h-[52px] px-6 text-[15px] bg-white text-primary rounded-[4px] font-body font-bold transition-all duration-300 hover:bg-[#fafafa] hover:scale-[1.01] active:scale-[0.98] w-full shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                        aria-label="COMEÇAR AGORA no Plano Anual"
                      >
                        COMEÇAR AGORA <ArrowIcon />
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
                    <h3 className="font-body font-bold text-[#121212] text-lg md:text-xl uppercase leading-tight mt-1">Vitalício</h3>
                    <div className="mt-3" aria-label="Preço único: R$94,90">
                      <span className="font-heading font-bold text-[#121212] text-[36px] md:text-[44px] leading-none">R$94,90</span>
                    </div>

                    <p className="font-body font-normal text-text-body text-[14px] leading-[1.6] mt-6 flex-grow">
                      Sua casa pronta, no seu próprio ritmo. Sem renovações ou preocupações com prazos. O Zeelo será seu para sempre, até o último detalhe da decoração.
                    </p>
                  </div>

                  <div className="mt-6">
                    <a
                      href="https://app.zeelo.site/register"
                      className="group inline-flex items-center justify-center gap-2 w-full h-[46px] px-5 text-[14px] bg-primary text-white rounded-[4px] font-body font-semibold transition-all duration-300 hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      aria-label="Comprar Plano Vitalício por R$94,90"
                    >
                      COMEÇAR AGORA <ArrowIcon />
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
