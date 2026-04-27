"use client";

import { AnimatedSection } from "@/components/ui/animated-section";
import { TagBadge } from "@/components/ui/tag-badge";

export function ComparisonSection() {
  const rows: { feature: string; zeelo: boolean; old: boolean }[] = [
    { feature: "Lista de enxoval completa", zeelo: true, old: true },
    { feature: "Separação de itens por cômodos", zeelo: true, old: true },
    { feature: "Filtro por prioridade", zeelo: true, old: false },
    { feature: "Estimativa de gasto total", zeelo: true, old: false },
    { feature: "Guia de montagem e marcas", zeelo: true, old: false },
    { feature: "Notificações de promoções em tempo real", zeelo: true, old: false },
    { feature: "Controle financeiro automático", zeelo: true, old: false },
    { feature: "Acompanhamento de evolução do enxoval", zeelo: true, old: false },
    { feature: "Quadro dos sonhos e painel de referências", zeelo: true, old: false },
    { feature: "Acessível a qualquer momento", zeelo: true, old: false },
  ];

  const CheckIcon = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="mx-auto" aria-hidden="true">
      <circle cx="11" cy="11" r="11" fill="#A62C2C" />
      <path d="M6.5 11.5L9.5 14.5L15.5 8.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const CrossIcon = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="mx-auto" aria-hidden="true">
      <circle cx="11" cy="11" r="11" fill="#f0f0f0" />
      <path d="M14.5 7.5L7.5 14.5M7.5 7.5L14.5 14.5" stroke="#ccc" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );

  return (
    <section
      aria-labelledby="comparacao-heading"
      className="bg-white py-10 md:py-16 lg:py-[72px] border-t border-border"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-24 xl:px-32">
        <AnimatedSection className="text-center mb-8 md:mb-12">
          <TagBadge variant="gold">Compare</TagBadge>
          <h2 id="comparacao-heading" className="font-heading font-bold text-[#121212] text-[28px] sm:text-[36px] md:text-[48px] leading-[1.27] mt-5">
            Por que o Zeelo é a escolha mais inteligente
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="overflow-x-auto rounded-[12px] border border-border">
            <table
              className="w-full min-w-[480px]"
              role="table"
              aria-label="Comparação entre Zeelo e lista impressa"
            >
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="text-left font-body font-medium text-text-body/70 text-[13px] md:text-sm px-4 md:px-8 py-3 md:py-4 bg-bg-gray border-b border-border w-[52%]"
                  >
                    Recurso
                  </th>
                 
                  <th
                    scope="col"
                    className="font-body font-medium text-text-body/50 text-[13px] md:text-sm px-2 md:px-8 py-3 md:py-4 bg-bg-gray border-b border-border text-center w-[24%]"
                  >
                    Lista impressa/PDF
                  </th>
                   <th
                    scope="col"
                    className="font-heading font-bold text-[13px] md:text-[15px] px-2 md:px-8 py-3 md:py-4 border-b border-border text-center w-[24%]"
                    style={{ backgroundColor: "#FFF5F5", color: "#A62C2C" }}
                  >
                    <span className="flex items-center justify-center gap-1.5">
                      Zeelo
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={`border-b border-border last:border-b-0 transition-colors duration-150 hover:bg-[#FAFAFA] bg-white`}
                  >
                    <td className="font-body font-light text-text-body text-[13px] md:text-[15px] px-4 md:px-8 py-3 md:py-4">
                      {row.feature}
                    </td>
                   
                    <td
                      className="text-center px-2 md:px-8 py-3 md:py-4 bg-white"
                      aria-label={row.old ? "Lista: sim" : "Lista: não"}
                    >
                      {row.old ? <CheckIcon /> : <CrossIcon />}
                    </td>
                     <td
                      className="text-center px-2 md:px-8 py-3 md:py-4"
                      style={{ backgroundColor: "#FFF5F5" }}
                      aria-label={row.zeelo ? "Zeelo: sim" : "Zeelo: não"}
                    >
                      {row.zeelo ? <CheckIcon /> : <CrossIcon />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
