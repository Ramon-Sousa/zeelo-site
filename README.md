# Zeelo — Landing Page

> **Este projeto não está disponível para replicação.** Este repositório serve como estudo de caso técnico e de produto, documentando as decisões de engenharia, arquitetura e estratégia de conversão por trás da construção do Zeelo.

---

## O Produto

O [Zeelo](https://zeelo.site) é um planejador de enxoval para casais e pessoas se preparando para morar em um novo lar. Substitui planilhas genéricas e listas fragmentadas por uma plataforma com organização por cômodo, controle financeiro em tempo real e alertas automáticos de promoções nas maiores plataformas de e-commerce do Brasil — Mercado Livre, Shopee e Amazon.

Quem está montando uma casa nova precisa gerenciar dezenas de itens distribuídos por diferentes cômodos, acompanhar quanto já foi gasto, priorizar o que é essencial e ainda encontrar os melhores preços. Nenhuma ferramenta do mercado resolve os três ao mesmo tempo.

### Validação via MVP

O produto foi validado com uma planilha no Google Sheets antes de qualquer linha de código do app ser escrita. Usuários reais pagaram para ter acesso a uma versão manual e colaborativa — o que confirmou a disposição a pagar e revelou os comportamentos de uso que guiariam a arquitetura: quais cômodos eram priorizados, como casais dividiam a gestão da lista, quais itens ficavam pendentes por mais tempo. Esses padrões se traduziram diretamente na estrutura de dados (`items` com `room`, `priority`, `status`) e nos quatro passos do onboarding.

---

## Arquitetura Técnica

O ecossistema Zeelo é composto por três serviços independentes:

```
zeelo.site          → Landing Page (este repositório)
app.zeelo.site      → Aplicação principal
Buscador            → Serviço de scraping automatizado
```

### Landing Page (este repositório)

| Camada     | Tecnologia                                              |
| ---------- | ------------------------------------------------------- |
| Framework  | Next.js 15 (App Router)                                 |
| Linguagem  | TypeScript 5                                            |
| Estilo     | Tailwind CSS v4                                         |
| Animações  | Framer Motion 12, CSS transitions                       |
| 3D / WebGL | `@shadergradient/react`, `@react-three/fiber`, Three.js |
| Deploy     | Vercel                                                  |
| Analytics  | Google Tag Manager, GA4, Microsoft Clarity, Utmify      |

A LP vive em repositório separado do app — permite iterar no funil sem tocar na base de código da aplicação, mantém os bundles completamente isolados e usa versões mais recentes do Next.js enquanto o app roda em uma versão estabilizada.

### Aplicação Principal

- **Next.js 14 + TypeScript** com App Router — layouts aninhados, route groups por contexto (`(auth)`, `(dashboard)`, `(admin)`)
- **Supabase** como backend completo: Auth (email/magic link), Postgres com Row Level Security, webhooks para eventos de autenticação
- **SWR** para data fetching com deduplicação automática e revalidação em background
- **TanStack Table v8** para tabelas com sort, filter e paginação client-side
- **Recharts** para os painéis financeiros (distribuição por prioridade, progresso por cômodo, projeção de conclusão)
- **Web Push (VAPID)** com Service Worker para notificações push nativas no mobile
- **Cakto** como plataforma de pagamento — webhooks processados em `/api/webhooks/cakto` para provisão e revogação de acesso

### Pipeline de Promoções

O motor de busca automatizado de promoções divide responsabilidades entre dois serviços:

**Buscador** (Railway, cron a cada 30 minutos):

```
scripts/scrape.ts
    ├── scrapeShopee()       → Shopee Affiliate GraphQL API (HMAC-SHA256)
    ├── scrapeMercadoLivre() → API pública MLB (sem auth, paralelo por keyword)
    └── scrapeAmazon()       → HTML scraping + affiliate links
        ↓ Promise.allSettled (paralelo)
        ↓ dedup cross-platform (normalização de título, mantém maior desconto)
        ↓
appendDeals() → Google Sheets (aba YYYY-MM-DD, fuso São Paulo)
```

**App → `/api/deals`** (Vercel, sincronizado a cada 30 minutos):

```
Cache Supabase (TTL 10 min) → retorna se fresco
    ↓ cache miss
Promise.allSettled:
    ├── mercadolivre.ts   (API pública, sempre funciona)
    ├── shopee.ts         (GraphQL + auth SHA256, fallback mock)
    └── amazon.ts         (affiliate links)
        ↓
Upsert Supabase `promotions` (dedup por source + external_id)
        ↓
Dispatch push notifications (máx 5/rodada, dedup intraday)
```

### Integrações de Marketplace

**Mercado Livre**: API pública `api.mercadolibre.com` — sem autenticação obrigatória, retorna produtos reais com preço, imagem e link. Links enriquecidos com tag de afiliado via variável de ambiente. Fonte principal do feed.

**Shopee**: GraphQL via Shopee Affiliate API. A autenticação exige assinatura HMAC-SHA256 montada no header de cada request:

```
Authorization: SHA256 Credential={AppId}, Timestamp={ts}, Signature={sig}
sig = HMAC-SHA256(AppId + Timestamp + Payload + Secret)
```

Query `productOfferV2` retorna `itemId`, `productName`, `priceMin`, `priceMax`, `priceDiscountRate`, `offerLink` (link já afiliado), `imageUrl`, `ratingStar`. Fallback para mock quando credenciais ausentes.

**Amazon**: Sem Product Advertising API — affiliate search links diretos (`amazon.com.br/s?k={query}&tag={associate_tag}`). Escolha deliberada para evitar a burocracia de aprovação da PA-API na fase atual do produto.

### Notificações Push

Push nativo via Web Push VAPID com Service Worker em `public/sw.js`. Cada usuário que ativa as notificações tem sua subscription salva em `push_subscriptions` (RLS por usuário). O histórico fica em `notification_history` com retenção de 30 dias. Deduplicação por `source + external_id` previne notificações repetidas dentro da mesma janela diária.

### Controle de Acesso

Acesso ao app é gerenciado via `access_expires_at` na tabela `profiles`. O middleware do Next.js protege todas as rotas do dashboard. Quando o acesso expira, em vez de redirecionar para uma página de erro, o componente `PaymentPending` é renderizado inline sobre o layout — o usuário vê a interface com o CTA de renovação, sem perder contexto.

---

## Estratégia de Conversão

A landing page tem um objetivo único: levar o visitante a entender o produto antes de apresentar o preço. A estrutura de seções segue essa lógica — o problema é apresentado primeiro ("Você ainda faz isso?"), depois as funcionalidades com screenshots reais do app, depois os depoimentos, e só então o card de pricing.

Todos os CTAs da página — navbar, hero, seção de features — fazem scroll até `#preco`. O único ponto de saída para o checkout externo é o card de oferta. Isso evita que o visitante chegue ao checkout sem ter passado pela narrativa de valor.

Do ponto de vista de observabilidade, quatro ferramentas de analytics são carregadas com estratégia de prioridade explícita:

- **GTM + GA4** (`afterInteractive`): eventos de funil, pageviews, conversões
- **Microsoft Clarity** (`afterInteractive`): heatmaps e gravações de sessão para identificar onde usuários abandonam
- **Utmify** (`lazyOnload`): atribuição de campanhas pagas e rastreamento de parâmetros UTM

O carregamento `lazyOnload` do Utmify é deliberado — atribuição de tráfego não compete com recursos de render.

---

### Desafio: Deduplicação Cross-Platform em Tempo Real

Ao buscar o mesmo produto em três plataformas simultaneamente, o feed retornaria duplicatas com variações de título — "Jogo de cama casal 200 fios", "Kit cama casal 200 fios", "Cama Casal Jogo 200 Fios" são três representações do mesmo item. A solução foi uma normalização determinística de título (lowercase, trim, colapso de whitespace, remoção de stopwords) combinada com hash MD5 de `source + título normalizado + link` como `external_id`. Em caso de colisão entre plataformas, o registro com maior desconto é mantido. O feed chega limpo para o usuário mesmo com as três fontes rodando em `Promise.allSettled` paralelo.

Em média, o buscador encontra em média 350-500 itens com desconto superior a 14%. As categorias de busca incluem desde itens para montagem do enxoval até produtos para o dia-a-dia.

---

Para questões técnicas ou colaboração profissional: [linkedin.com/in/ramon-sousa-pereira/](https://www.linkedin.com/in/ramon-sousa-pereira/)
