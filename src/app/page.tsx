import { Navbar } from "@/components/sections/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { ParaQuemSection } from "@/components/sections/para-quem-section";
import { ProblemSection } from "@/components/sections/problem-section";
import { ComoMontarSection } from "@/components/sections/como-montar-section";
import { ComparisonSection } from "@/components/sections/comparison-section";
import { ListaEnxovalSection } from "@/components/sections/lista-enxoval-section";
import { PraticalSection } from "@/components/sections/pratical-section";
import { SimplifySection } from "@/components/sections/simplify-section";
import { SocialProofSection } from "@/components/sections/social-proof-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { FAQSection } from "@/components/sections/faq-section";
import { Footer } from "@/components/sections/footer";

const OFFER_LINK = "https://pay.cakto.com.br/ktmjrjp_819342";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ParaQuemSection />
        {/* <ProblemSection /> */}
        <ComoMontarSection />
        <ComparisonSection />
        <ListaEnxovalSection />
        <PraticalSection />
        <SimplifySection />
        <SocialProofSection />
        <PricingSection />
        <FAQSection />
      </main>
      <Footer />

      {/* JSON-LD: Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Zeelo",
            url: "https://zeelo.site",
            logo: "https://zeelo.site/images/logo_hor-brand.png",
            sameAs: [],
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "customer support",
              availableLanguage: "Portuguese",
            },
          }),
        }}
      />

      {/* JSON-LD: SoftwareApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Zeelo — Organizador de Enxoval de Casa Nova",
            description:
              "Sistema para montar e organizar o enxoval de casa nova. Lista completa por cômodo, alertas de promoções em tempo real com IA, controle financeiro e montagem colaborativa em casal.",
            applicationCategory: "LifestyleApplication",
            operatingSystem: "Web, iOS, Android",
            inLanguage: "pt-BR",
            url: "https://zeelo.site",
            offers: [
              {
                "@type": "Offer",
                name: "Plano Mensal",
                price: "9.90",
                priceCurrency: "BRL",
                availability: "https://schema.org/InStock",
                url: "https://app.zeelo.site/register",
              },
              {
                "@type": "Offer",
                name: "Plano Anual",
                price: "64.90",
                priceCurrency: "BRL",
                availability: "https://schema.org/InStock",
                url: "https://app.zeelo.site/register",
                priceValidUntil: "2026-12-31",
              },
              {
                "@type": "Offer",
                name: "Plano Vitalício",
                price: "94.90",
                priceCurrency: "BRL",
                availability: "https://schema.org/InStock",
                url: "https://app.zeelo.site/register",
              },
            ],
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "3550",
              bestRating: "5",
              worstRating: "1",
            },
            review: [
              {
                "@type": "Review",
                author: { "@type": "Person", name: "Mariana S." },
                reviewRating: { "@type": "Rating", ratingValue: "5" },
                reviewBody:
                  "Estava usando uma planilha com os itens do enxoval, achava o máximo por não depender de lista impressa, mas esse app é surreal! Já peguei meu microondas e uns movéis pra sala, economizei mais de 300 reais do valor que tava planejando. Recomendo demais!",
              },
              {
                "@type": "Review",
                author: { "@type": "Person", name: "Rafael e Camila" },
                reviewRating: { "@type": "Rating", ratingValue: "5" },
                reviewBody:
                  "Usamos em conjunto — o controle financeiro nos ajudou a não sair do orçamento.",
              },
              {
                "@type": "Review",
                author: { "@type": "Person", name: "Fernanda L." },
                reviewRating: { "@type": "Rating", ratingValue: "5" },
                reviewBody:
                  "O Zeelo já vem com mais de 300 itens organizados por cômodo. Foi só marcar o que eu já tinha.",
              },
            ],
          }),
        }}
      />

      {/* JSON-LD: FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "O que é enxoval de casa nova?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Enxoval de casa nova é o conjunto de itens essenciais que você compra antes (ou logo depois) de se mudar: utensílios de cozinha, cama, banho, limpeza, eletrodomésticos básicos e móveis principais. Diferente do enxoval de bebê, o de casa é pensado por cômodo.",
                },
              },
              {
                "@type": "Question",
                name: "Quantos itens tem um enxoval de casa nova completo?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Entre 180 e 220 itens em média. A lista padrão do Zeelo traz +300 itens validados por +3.550 famílias, separados em 8 cômodos: cozinha, sala, quarto do casal, banheiro, lavanderia, varanda, home office e limpeza geral.",
                },
              },
              {
                "@type": "Question",
                name: "Quanto tempo leva para montar o enxoval de casa nova?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A lista fica pronta em menos de 30 minutos no Zeelo. A compra completa dos itens leva em média de 3 a 8 meses, dependendo do orçamento. Planejar cedo significa aproveitar mais promoções ao longo do caminho.",
                },
              },
              {
                "@type": "Question",
                name: "Posso compartilhar a lista de enxoval com meu parceiro(a)?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sim. O Zeelo permite adicionar um usuário extra na mesma conta vocês montam a lista juntos, dividem as compras marcadas e acompanham o orçamento em tempo real.",
                },
              },
              {
                "@type": "Question",
                name: "A lista de enxoval do Zeelo substitui o PDF ou a planilha?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Substitui com vantagem: o PDF é estático, não avisa promoção nem calcula orçamento. A lista do Zeelo atualiza automaticamente, com alertas de promoção em tempo real, controle financeiro automático e colaboração em casal.",
                },
              },
              {
                "@type": "Question",
                name: "Os itens sugeridos são seguros?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sim, nossa Inteligência Artificial busca os produtos em promoção que atendam critérios de compra e boas notas de avaliação. Ainda assim não temos vínculo direto com os produtos ou lojas sugeridas.",
                },
              },
              {
                "@type": "Question",
                name: "Consigo acessar no celular?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sim, você pode acessar o Zeelo em qualquer dispositivo, seja computador, tablet ou celular.",
                },
              },
              {
                "@type": "Question",
                name: "As promoções são atualizadas?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "O Zeelo atualiza promoções e cupons diversas vezes ao longo do dia, mesmo que você não veja a promoção no momento em que ela foi adicionada, ela continuará visível. Porém a disponibilidade depende do produto e loja.",
                },
              },
              {
                "@type": "Question",
                name: "Consigo adicionar outras pessoas para acessar o app?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sim, você pode adicionar um usuário extra à sua conta, assim essa pessoa poderá te ajudar na montagem do enxoval como quiser.",
                },
              },
              {
                "@type": "Question",
                name: "Consigo adicionar mais itens na lista de enxoval?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Claro! Além dos itens já disponíveis, você pode adicionar quantos itens personalizados quiser à sua lista.",
                },
              },
              {
                "@type": "Question",
                name: "Tenho garantia?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sim! Você tem 7 dias de garantia incondicional. Se não gostar, devolvemos 100% do seu dinheiro.",
                },
              },
            ],
          }),
        }}
      />

      {/* JSON-LD: HowTo — "Como montar a lista de enxoval" */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "Como montar a lista de enxoval de casa nova em 5 passos",
            description:
              "Fluxo guiado para montar sua lista de enxoval de casa nova em menos de 30 minutos, com priorização, orçamento e alertas de promoções.",
            totalTime: "PT30M",
            estimatedCost: {
              "@type": "MonetaryAmount",
              currency: "BRL",
              value: "8000",
            },
            supply: [
              { "@type": "HowToSupply", name: "Lista de cômodos da sua casa nova" },
              { "@type": "HowToSupply", name: "Orçamento estimado" },
            ],
            tool: [
              { "@type": "HowToTool", name: "Aplicativo Zeelo" },
            ],
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Liste os cômodos da sua casa nova",
                text: "Selecione no Zeelo os cômodos que a sua casa tem — cozinha, sala, quarto, banheiro, lavanderia, varanda, home office. A lista se adapta automaticamente aos espaços escolhidos.",
                url: "https://zeelo.site/#como-montar",
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Priorize essencial vs. desejável",
                text: "Marque o que já tem e classifique os itens entre essenciais (compra imediata) e desejáveis (podem esperar promoção). Isso protege seu orçamento.",
                url: "https://zeelo.site/#como-montar",
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Defina seu orçamento total",
                text: "Informe o teto de gasto. O Zeelo calcula em tempo real o quanto ainda falta, distribui o orçamento por cômodo e alerta se o enxoval vai estourar.",
                url: "https://zeelo.site/#como-montar",
              },
              {
                "@type": "HowToStep",
                position: 4,
                name: "Ative alertas de promoções",
                text: "Com um clique você passa a receber avisos 24/7 quando o item da sua lista de enxoval entra em promoção em lojas confiáveis.",
                url: "https://zeelo.site/#como-montar",
              },
              {
                "@type": "HowToStep",
                position: 5,
                name: "Acompanhe a evolução em casal",
                text: "Adicione seu parceiro(a) na conta. Vocês marcam o que já compraram, dividem tarefas e veem o progresso da casa nova ficar de pé juntos.",
                url: "https://zeelo.site/#como-montar",
              },
            ],
          }),
        }}
      />

      {/* JSON-LD: ItemList — Lista de enxoval por cômodo */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Lista de Enxoval de Casa Nova Completa",
            description:
              "Lista completa com 300 itens de enxoval de casa nova separados em 8 cômodos — cozinha, sala, quarto, banheiro, lavanderia, varanda, home office e limpeza.",
            numberOfItems: 200,
            itemListOrder: "https://schema.org/ItemListOrderAscending",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Cozinha", description: "61 itens — panelas, liquidificador, jogo de talheres, micro-ondas e mais." },
              { "@type": "ListItem", position: 2, name: "Sala de Estar", description: "16 itens — sofá, estante, TV, tapete, poltrona e mais." },
              { "@type": "ListItem", position: 3, name: "Quarto", description: "12" },
              { "@type": "ListItem", position: 4, name: "Banheiro", description: "18 itens — toalhas, tapete, cesto, porta-escovas, tapete antiderrapante e mais." },
              { "@type": "ListItem", position: 5, name: "Lavanderia", description: "24 itens — máquina de lavar, varal, cestos, produtos, tábua de passar e mais." },
              { "@type": "ListItem", position: 6, name: "Varanda / Área Externa", description: "14 itens — vaso, cadeira, churrasqueira, jogo de mesa e mais." },
              { "@type": "ListItem", position: 7, name: "Home Office", description: "20 itens — mesa, cadeira, luminária, organizadores e mais." },
            ],
          }),
        }}
      />

      {/* JSON-LD: BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Início", item: "https://zeelo.site" },
              { "@type": "ListItem", position: 2, name: "Lista de Enxoval de Casa Nova", item: "https://zeelo.site/#lista-enxoval" },
            ],
          }),
        }}
      />

      {/* JSON-LD: Product — libera snippet de preço */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Zeelo — Lista de Enxoval de Casa Nova",
            description:
              "Lista de enxoval de casa nova com +300 itens por cômodo, alertas de promoções em tempo real, controle financeiro e colaboração em casal.",
            brand: { "@type": "Brand", name: "Zeelo" },
            image: "https://zeelo.site/images/hero-screenshot.png",
            offers: {
              "@type": "AggregateOffer",
              lowPrice: "9.90",
              highPrice: "94.90",
              priceCurrency: "BRL",
              offerCount: 3,
              url: "https://zeelo.site#preco",
              availability: "https://schema.org/InStock",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "3550",
              bestRating: "5",
              worstRating: "1",
            },
          }),
        }}
      />
    </>
  );
}
