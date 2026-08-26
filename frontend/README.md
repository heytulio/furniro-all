# Frontend — Furniro

Aplicação React + TypeScript criada com Vite para um e-commerce de móveis. Este é o frontend do Desafio 3 da Fase 2 do AWS FDE Node.js + React da Compass UOL AI/R.

---

<div align="center">

## 📑 Sumário / Table of Contents

**🇧🇷 [Português](#português)** &nbsp;•&nbsp; **🇺🇸 [English](#english)**

[Visão geral](#visão-geral) &nbsp;•&nbsp;
[Como usar](#como-usar) &nbsp;•&nbsp;
[Scripts](#scripts) &nbsp;•&nbsp;
[Rotas](#rotas) &nbsp;•&nbsp;
[Funcionalidades](#funcionalidades) &nbsp;•&nbsp;
[Arquitetura](#arquitetura) &nbsp;•&nbsp;
[Estrutura](#estrutura) &nbsp;•&nbsp;
[Autor](#autor)

[Overview](#overview-1) &nbsp;•&nbsp;
[Setup](#setup) &nbsp;•&nbsp;
[Scripts](#scripts-1) &nbsp;•&nbsp;
[Routes](#routes) &nbsp;•&nbsp;
[Features](#features) &nbsp;•&nbsp;
[Architecture](#architecture-1) &nbsp;•&nbsp;
[Directory structure](#directory-structure) &nbsp;•&nbsp;
[Author](#author-1)

</div>

---

## Português

### Visão geral

- React 19 + TypeScript
- Vite para bundling de desenvolvimento
- Tailwind CSS para estilos utilitários
- Zustand para estado persistente do carrinho
- React Router para navegação
- React Hook Form + Zod para formulários e validação
- react-hot-toast para notificações
- Axios para consumo da API

### Como usar

1. Instalar dependências:

```bash
cd frontend
npm install
```

2. Configurar variáveis de ambiente:

```bash
cp .env.example .env
```

Variáveis principais:

- `VITE_API_URL`: URL da API backend
- `VITE_CLOUDINARY_BASE_URL`: base pública das imagens

3. Executar localmente:

```bash
npm run dev
```

Acesse:

```txt
http://localhost:5173
```

### Scripts

- `npm run dev` — inicia o servidor Vite
- `npm run build` — compila para produção
- `npm run lint` — executa ESLint
- `npm run test` — executa testes com Vitest
- `npm run test:coverage` — executa testes com cobertura
- `npm run preview` — pré-visualiza o build

### Rotas

- `/` — Home
- `/shop` — Loja principal
- `/shop/:category` — Loja filtrada por categoria
- `/product/:id` — Produto por ID
- `/product/slug/:slug` — Produto por slug
- `/cart` — Carrinho
- `/login` — Login
- `/signup` — Cadastro
- `/profile` — Perfil (rota protegida)
- `/contact` — Contato (rota protegida)
- `/checkout` — Checkout (rota protegida)

### Funcionalidades

- **Header sticky** — fixo no topo durante o scroll, presente em todas as páginas
- **Carrinho persistente** — estado salvo no `localStorage` via Zustand
- **Cart Sidebar** — sidebar com lista de produtos, scroll interno, botões para Carrinho e Checkout, exclusão de itens
- **Autenticação JWT** — login e cadastro com cookies httpOnly, rotas protegidas via `ProtectedRoute`
- **Checkout** — formulário com React Hook Form + Zod, consulta de CEP via ViaCEP, seleção de pagamento, toast de confirmação
- **Contato** — formulário com validação nos campos obrigatórios, toast ao enviar
- **Perfil** — visualização e edição dos dados do usuário autenticado
- **Paginação e filtros** — paginação, filtro por categoria e ordenação na página de Shop
- **Galeria de produto** — galeria de imagens, tabs de detalhes, produtos relacionados
- **Skeletons** — estados de loading para melhor UX
- **Notificações** — feedback visual via react-hot-toast

### Arquitetura

#### Contexts

- `src/contexts/AuthContext.tsx` — provê estado de autenticação (login, logout, usuário atual)

#### Hooks

- `src/hooks/useProducts.ts` — busca produtos com paginação, filtro, ordenação e total
- `src/hooks/useProduct.ts` — busca produto por `id` ou `slug`
- `src/hooks/useLogin.ts` — lógica de login
- `src/hooks/useUpdateProfile.ts` — lógica de atualização de perfil
- `src/hooks/useGallery.ts` — controle da galeria de imagens
- `src/hooks/useProductVariant.ts` — seleção de cor/tamanho

#### Estado do carrinho

- `src/stores/cart.store.ts` — estado persistente do carrinho com Zustand, com ações para adicionar, remover, atualizar itens e calcular totais

#### Schemas de validação

- `src/schemas/authSchema.ts` — validação de login e cadastro
- `src/schemas/checkoutSchema.ts` — validação do formulário de checkout

#### Consumo de API

- `src/services/product.service.ts` — busca produtos e produto único com tratamento de erros e validação Zod
- `src/config/env.ts` — define URLs via `import.meta.env`

### Estrutura

```text
src/
├── App.tsx
├── main.tsx
├── layout.tsx
├── builders/
│   └── buildProductTabs.tsx
├── components/
│   ├── AlertMessage/
│   ├── Benefits/
│   ├── BillingDetails/
│   ├── BreadCrumb/
│   ├── Carousel/
│   ├── Cart/
│   ├── CartDrawer/
│   ├── Categories/
│   ├── ContactForm/
│   ├── ContactInfo/
│   ├── ContactTitle/
│   ├── Container/
│   ├── Footer/
│   ├── FormLogin/
│   ├── Header/
│   ├── Hero/
│   ├── IconLink/
│   ├── Mosaic/
│   ├── NotFound/
│   ├── OrderSummary/
│   ├── Pagination/
│   ├── ProductDetails/
│   ├── ProductGallery.tsx
│   ├── ProductGrid/
│   ├── ProductInfo/
│   ├── ProfileForm/
│   ├── ProfileHeader/
│   ├── ProtectedRoute.tsx
│   ├── RelatedProducts.tsx
│   ├── ScrollToTop/
│   ├── Shop/
│   ├── ShopToolBar/
│   ├── SignupForm/
│   ├── Skeletons/
│   └── Status/
├── config/
│   └── env.ts
├── constants/
├── contexts/
│   ├── AuthContext.tsx
│   ├── authContextValue.ts
│   └── useAuth.ts
├── errors/
├── hooks/
├── lib/
├── pages/
│   ├── Cart/
│   ├── Checkout/
│   ├── Contact/
│   ├── Home/
│   ├── Login/
│   ├── Profile/
│   ├── Shop/
│   ├── Signup/
│   └── SingleProduct/
├── schemas/
│   ├── authSchema.ts
│   └── checkoutSchema.ts
├── services/
│   └── product.service.ts
├── stores/
│   └── cart.store.ts
├── test/
├── types/
└── utils/
```

---

## English

### Overview

- React 19 + TypeScript
- Vite for development bundling
- Tailwind CSS for utility-first styling
- Zustand for persistent cart state
- React Router for navigation
- React Hook Form + Zod for forms and validation
- react-hot-toast for notifications
- Axios for API consumption

### Setup

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Configure environment variables:

```bash
cp .env.example .env
```

Main variables:

- `VITE_API_URL`: backend API URL
- `VITE_CLOUDINARY_BASE_URL`: public image base URL

3. Run locally:

```bash
npm run dev
```

Open:

```txt
http://localhost:5173
```

### Scripts

- `npm run dev` — start Vite development server
- `npm run build` — build production assets
- `npm run lint` — run ESLint
- `npm run test` — run tests with Vitest
- `npm run test:coverage` — run tests with coverage
- `npm run preview` — preview the production build

### Routes

- `/` — Home
- `/shop` — Shop main page
- `/shop/:category` — Shop filtered by category
- `/product/:id` — Product page by ID
- `/product/slug/:slug` — Product page by slug
- `/cart` — Cart
- `/login` — Login
- `/signup` — Signup
- `/profile` — Profile (protected route)
- `/contact` — Contact (protected route)
- `/checkout` — Checkout (protected route)

### Features

- **Sticky header** — fixed at the top during scroll, present on all pages
- **Persistent cart** — state saved to `localStorage` via Zustand
- **Cart Sidebar** — sidebar with product list, internal scroll, Cart and Checkout buttons, item removal
- **JWT authentication** — login and signup with httpOnly cookies, protected routes via `ProtectedRoute`
- **Checkout** — form with React Hook Form + Zod, CEP lookup via ViaCEP, payment selection, confirmation toast
- **Contact** — form with validation on required fields, toast on submit
- **Profile** — view and edit authenticated user data
- **Pagination and filters** — pagination, category filter, and sorting on the Shop page
- **Product gallery** — image gallery, detail tabs, related products
- **Skeletons** — loading states for better UX
- **Notifications** — visual feedback via react-hot-toast

### Architecture

#### Contexts

- `src/contexts/AuthContext.tsx` — provides authentication state (login, logout, current user)

#### Hooks

- `src/hooks/useProducts.ts` — fetches products with pagination, filters, sorting, and total count
- `src/hooks/useProduct.ts` — fetches one product by `id` or `slug`
- `src/hooks/useLogin.ts` — login logic
- `src/hooks/useUpdateProfile.ts` — profile update logic
- `src/hooks/useGallery.ts` — image gallery control
- `src/hooks/useProductVariant.ts` — color/size selection

#### Cart state

- `src/stores/cart.store.ts` — Zustand-based persistent cart state, with add, remove, update, and total-calculation actions

#### Validation schemas

- `src/schemas/authSchema.ts` — login and signup validation
- `src/schemas/checkoutSchema.ts` — checkout form validation

#### API consumption

- `src/services/product.service.ts` — fetches product lists and single products from the API, with error handling and Zod validation
- `src/config/env.ts` — defines base URLs from `import.meta.env`

### Directory structure

```text
src/
├── App.tsx
├── main.tsx
├── layout.tsx
├── builders/
│   └── buildProductTabs.tsx
├── components/
│   ├── AlertMessage/
│   ├── Benefits/
│   ├── BillingDetails/
│   ├── BreadCrumb/
│   ├── Carousel/
│   ├── Cart/
│   ├── CartDrawer/
│   ├── Categories/
│   ├── ContactForm/
│   ├── ContactInfo/
│   ├── ContactTitle/
│   ├── Container/
│   ├── Footer/
│   ├── FormLogin/
│   ├── Header/
│   ├── Hero/
│   ├── IconLink/
│   ├── Mosaic/
│   ├── NotFound/
│   ├── OrderSummary/
│   ├── Pagination/
│   ├── ProductDetails/
│   ├── ProductGallery.tsx
│   ├── ProductGrid/
│   ├── ProductInfo/
│   ├── ProfileForm/
│   ├── ProfileHeader/
│   ├── ProtectedRoute.tsx
│   ├── RelatedProducts.tsx
│   ├── ScrollToTop/
│   ├── Shop/
│   ├── ShopToolBar/
│   ├── SignupForm/
│   ├── Skeletons/
│   └── Status/
├── config/
│   └── env.ts
├── constants/
├── contexts/
│   ├── AuthContext.tsx
│   ├── authContextValue.ts
│   └── useAuth.ts
├── errors/
├── hooks/
├── lib/
├── pages/
│   ├── Cart/
│   ├── Checkout/
│   ├── Contact/
│   ├── Home/
│   ├── Login/
│   ├── Profile/
│   ├── Shop/
│   ├── Signup/
│   └── SingleProduct/
├── schemas/
│   ├── authSchema.ts
│   └── checkoutSchema.ts
├── services/
│   └── product.service.ts
├── stores/
│   └── cart.store.ts
├── test/
├── types/
└── utils/
```

## Author / Autor

- [Tulio Vasconcelos](https://github.com/heytulio)
