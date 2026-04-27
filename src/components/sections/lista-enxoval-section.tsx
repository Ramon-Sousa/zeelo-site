"use client";

import { AnimatedSection } from "@/components/ui/animated-section";
import { TagBadge } from "@/components/ui/tag-badge";

export function ListaEnxovalSection() {
  const categories = [
    {
      name: "Cozinha",
      count: 131,
      examples: ["Geladeira e Cooktop", "Filtro de Água", "Air Fryer"],
      accent: "#EA7300",
    },
    {
      name: "Quarto",
      count: 24,
      examples: ["Cama e Colchão", "Edredon e Lençóis", "Travesseiros"],
      accent: "#EA7300",
    },
    {
      name: "Banheiro",
      count: 27,
      examples: ["Chuveiro e Ducha", "Espelho com Armário", "Toalhas de Banho"],
      accent: "#EA7300",
    },
    {
      name: "Sala de Estar",
      count: 17,
      examples: ["Sofá e Televisão", "Tapete e Almofadas", "Painel para TV"],
      accent: "#EA7300",
    },
    {
      name: "Área de Serviço",
      count: 30,
      examples: ["Máquina de Lavar", "Aspirador de Pó", "Ferro e Tábua"],
      accent: "#EA7300",
    },
    {
      name: "Escritório",
      count: 12,
      examples: ["Cadeira Presidente", "Mesa Escrivaninha", "Suporte Notebook"],
      accent: "#EA7300",
    },
    {
      name: "Essenciais",
      count: 14,
      examples: ["Ferramentas", "Tranca Digital", "Extensão e Adaptadores"],
      accent: "#EA7300",
    },
  ];

  return (
    <section
      id="lista-enxoval"
      aria-labelledby="lista-enxoval-heading"
      className="bg-bg-gray py-10 md:py-24 border-y border-border"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-24 xl:px-32">
        <AnimatedSection className="flex flex-col items-center text-center mb-8 md:mb-20">
          <TagBadge variant="pink">Enxoval Completo</TagBadge>
          <h2
            id="lista-enxoval-heading"
            className="font-heading font-bold text-[#121212] text-[28px] sm:text-4xl md:text-5xl leading-[1.15] mt-6 max-w-[850px] tracking-tight"
          >
            O Zeelo lembra de tudo, para você não se preocupar com nada
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {categories.map((cat, i) => (
            <AnimatedSection key={cat.name} delay={i * 50} className="flex h-full">
              <article className="group relative w-full bg-white rounded-2xl border border-border p-5 md:p-7 transition-all duration-300 hover:border-primary flex flex-col h-full overflow-hidden">
                {/* Barra de cor sutil no topo do card */}
                <div 
                  className="absolute top-0 left-0 w-full h-1.5" 
                  style={{ backgroundColor: cat.accent }}
                />
                
                <div className="flex flex-col mb-6">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="font-heading font-bold text-[#121212] text-lg md:text-xl tracking-tight">
                      {cat.name}
                    </h3>
                    <span
                      className="font-mono font-bold text-[11px] uppercase tracking-wider px-2 py-1 rounded-md"
                      style={{ backgroundColor: `${cat.accent}12`, color: cat.accent }}
                    >
                      {cat.count} itens
                    </span>
                  </div>
                </div>

                <ul className="flex flex-col gap-3 flex-grow" role="list">
                  {cat.examples.map((ex) => (
                    <li
                      key={ex}
                      className="font-body font-normal text-text-body text-sm md:text-[15px] flex items-start gap-3"
                    >
                      <svg 
                        className="w-4 h-4 mt-0.5 shrink-0" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        style={{ color: cat.accent }}
                      >
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {ex}
                    </li>
                  ))}
                  <li className="font-body italic text-text-body/60 text-xs mt-2 border-t border-border pt-3">
                    ... e mais {cat.count - 3} itens
                  </li>
                </ul>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
