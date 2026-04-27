"use client";

import { useState } from "react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { CTAButton } from "@/components/ui/cta-button";

const OFFER_LINK = "https://pay.cakto.com.br/ktmjrjp_819342";

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  const faqs = [
    {
      q: "O que é enxoval de casa nova?",
      a: "Enxoval de casa nova é o conjunto de itens essenciais que você compra antes (ou logo depois) de se mudar: utensílios de cozinha, cama, banho, limpeza, eletrodomésticos básicos e móveis principais. Diferente do enxoval de bebê, o de casa é pensado por cômodo.",
    },
    {
      q: "Quantos itens tem um enxoval de casa nova completo?",
      a: "Entre 180 e 220 itens em média. A lista padrão do Zeelo traz +300 itens validados por +3.550 famílias, separados em 8 cômodos: cozinha, sala, quarto do casal, banheiro, lavanderia, varanda, home office e limpeza geral.",
    },
    {
      q: "Quanto tempo leva para montar o enxoval de casa nova?",
      a: "A lista fica pronta em menos de 3 minutos no Zeelo. A compra completa dos itens leva em média de 3 a 8 meses, dependendo do orçamento. Planejar cedo significa aproveitar mais promoções ao longo do caminho.",
    },
    {
      q: "Posso compartilhar a lista de enxoval com meu parceiro(a)?",
      a: "Sim. O Zeelo permite adicionar um usuário extra na mesma conta vocês montam a lista juntos, dividem as compras marcadas e acompanham o orçamento em tempo real.",
    },
    {
      q: "A lista de enxoval do Zeelo substitui o PDF ou a planilha?",
      a: "Substitui com vantagem: o PDF é estático, não avisa promoção nem calcula orçamento. A lista do Zeelo atualiza automaticamente, com alertas de promoção em tempo real, controle financeiro automático e colaboração em casal.",
    },
    {
      q: "Os itens sugeridos são seguros?",
      a: "Sim, nossa Inteligência Artificial busca os produtos em promoção que atendam critérios de compra e boas notas de avaliação. Ainda assim não temos vínculo direto com os produtos ou lojas sugeridas.",
    },
    {
      q: "Consigo acessar no celular?",
      a: "Sim, você pode acessar o Zeelo em qualquer dispositivo, seja computador, tablet ou celular.",
    },
    {
      q: "As promoções são atualizadas?",
      a: "O Zeelo atualiza promoções e cupons diversas vezes ao longo do dia, mesmo que você não veja a promoção no momento em que ela foi adicionada, ela continuará visível. Porém a disponibilidade depende do produto e loja.",
    },
    {
      q: "Consigo adicionar outras pessoas para acessar o app?",
      a: "Sim, você pode adicionar um usuário extra à sua conta, assim essa pessoa poderá te ajudar na montagem do enxoval como quiser.",
    },
    {
      q: "Consigo adicionar mais itens na lista de enxoval?",
      a: "Claro! Além dos itens já disponíveis, você pode adicionar quantos itens personalizados quiser à sua lista.",
    },
    {
      q: "Tenho garantia?",
      a: "Sim! Você tem 7 dias de garantia incondicional. Se não gostar, devolvemos 100% do seu dinheiro.",
    },
  ];

  return (
    <section id="duvidas" className="bg-white py-10 md:py-16 lg:py-[72px]">
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
                  className="w-full flex items-center justify-between gap-4 md:gap-14 py-5 md:py-6 cursor-pointer group"
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
                    open === i ? "max-h-[400px] opacity-100 pb-6" : "max-h-0 opacity-0"
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
          <CTAButton href={OFFER_LINK} className="w-full sm:w-auto sm:min-w-[320px]">
            COMPRAR AGORA
          </CTAButton>
        </AnimatedSection>
      </div>
    </section>
  );
}
