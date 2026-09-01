# Desafio 3 — Furniro (AWS FDE Node.js + React)

Este repositório contém o Desafio 3 da Fase 2 do programa AWS FDE Node.js + React da Compass UOL AI/R. O projeto inclui duas partes principais:

- `backend/` — API RESTful em Node.js, Express, TypeScript e Prisma
- `frontend/` — aplicação React + TypeScript com Vite, Tailwind

---

<div align="center">

## 📑 Sumário / Table of Contents

**🇧🇷 [Português](#português)** &nbsp;•&nbsp; **🇺🇸 [English](#english)**

[Visão geral](#visão-geral) &nbsp;•&nbsp;
[Backend](#backend) &nbsp;•&nbsp;
[Frontend](#frontend) &nbsp;•&nbsp;
[Arquitetura](#arquitetura) &nbsp;•&nbsp;
[Autor](#autor)

[Overview](#overview) &nbsp;•&nbsp;
[Backend](#backend-1) &nbsp;•&nbsp;
[Frontend](#frontend-1) &nbsp;•&nbsp;
[Architecture](#architecture) &nbsp;•&nbsp;
[Author](#author)

</div>

---

## Português

## Visão geral

O desafio consiste em uma API backend e um frontend conectado, construídos para um e-commerce de móveis. O backend usa SQLite via Prisma, autenticação JWT com cookies httpOnly e Redis para revogação de tokens. O frontend consome dados pela API, implementa autenticação, carrinho persistente e checkout.

## Backend

### Como rodar

**Pré-requisito:** Redis rodando localmente ou via Docker Compose (abaixo).

#### Com Docker Compose (recomendado)

```bash
cd backend
npm install
cp .env.example .env
npm run db:migrate
npm run db:seed
docker compose up -d
```

#### Sem Docker (Redis local)

```bash
cd backend
npm install
cp .env.example .env
npm run db:migrate
npm run db:seed
npm run dev
```

> O Redis é necessário para a blacklist de tokens JWT (logout e verificação de sessão). Sem ele, os endpoints de autenticação não funcionarão. Consulte `backend/README.md` para mais detalhes.

A API ficará disponível em:

```txt
http://localhost:3000
```

### Principais endpoints

**Produtos:**

- `GET /products` — lista com paginação, filtro por categoria e ordenação
- `GET /products/:id` — busca por id
- `GET /products/slug/:slug` — busca por slug
- `POST /products` — cria um produto
- `PUT /products/:id` — atualiza um produto
- `DELETE /products/:id` — remove um produto

**Autenticação:**

- `POST /auth/register` — cadastro de novo usuário
- `POST /auth/login` — autenticação e geração de JWT (cookie httpOnly)
- `POST /auth/logout` — revogação do token e limpeza do cookie
- `GET /auth/me` — retorna o perfil do usuário autenticado
- `PATCH /auth/me` — atualiza o perfil do usuário autenticado

O endpoint `GET /products` suporta filtros e paginação por meio de query params como `category`, `_page`, `_limit`, `_sort` e `_order`.

## Frontend

### Como rodar

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

A aplicação ficará disponível em:

```txt
http://localhost:5173
```

### Como rodar os testes e observar a cobertura

```bash
npm run test:coverage
```

### Principais rotas

- `/` — Home
- `/shop` — Loja
- `/shop/:category` — Loja por categoria
- `/product/:id` — Produto por ID
- `/product/slug/:slug` — Produto por slug
- `/cart` — Carrinho
- `/login` — Login
- `/signup` — Cadastro
- `/profile` — Perfil (rota protegida)
- `/contact` — Contato (rota protegida)
- `/checkout` — Checkout (rota protegida)

## Arquitetura

### Backend

Organizado em camadas para facilitar a manutenção:

- `src/controllers`
- `src/services`
- `src/repositories`
- `src/routes`
- `src/factories`
- `src/model`
- `src/schemas`
- `src/middlewares`
- `src/exceptions`

### Frontend

Principais pastas:

- `src/components`
- `src/contexts`
- `src/hooks`
- `src/schemas`
- `src/services`
- `src/stores`
- `src/config`
- `src/types`
- `src/utils`

## Autor

- [Tulio Vasconcelos](https://github.com/heytulio)

---

## English

## Overview

This challenge consists of a backend API and a connected frontend built for a furniture e-commerce. The backend uses SQLite via Prisma, JWT authentication with httpOnly cookies, and Redis for token revocation. The frontend consumes data from the API, implementing authentication, persistent cart, and checkout.

## Backend

### How to run

**Prerequisite:** Redis running locally or via Docker Compose (below).

#### With Docker Compose (recommended)

```bash
cd backend
npm install
cp .env.example .env
npm run db:migrate
npm run db:seed
docker compose up -d
```

#### Without Docker (local Redis)

```bash
cd backend
npm install
cp .env.example .env
npm run db:migrate
npm run db:seed
npm run dev
```

> Redis is required for the JWT token blacklist (logout and session verification). Without it, the authentication endpoints will not work. See `backend/README.md` for details.

The API will be available at:

```txt
http://localhost:3000
```

### Main endpoints

**Products:**

- `GET /products` — lists products with pagination, category filtering, and sorting
- `GET /products/:id` — fetches a product by id
- `GET /products/slug/:slug` — fetches a product by slug
- `POST /products` — creates a product
- `PUT /products/:id` — updates a product
- `DELETE /products/:id` — deletes a product

**Authentication:**

- `POST /auth/register` — registers a new user
- `POST /auth/login` — authenticates and issues a JWT (httpOnly cookie)
- `POST /auth/logout` — revokes the token and clears the cookie
- `GET /auth/me` — returns the authenticated user's profile
- `PATCH /auth/me` — updates the authenticated user's profile

The `GET /products` endpoint supports filtering and pagination through query params such as `category`, `_page`, `_limit`, `_sort`, and `_order`.

## Frontend

### How to run

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The application will be available at:

```txt
http://localhost:5173
```

### How to run tests and see coverage

```bash
npm run test:coverage
```

### Main routes

- `/` — Home
- `/shop` — Shop
- `/shop/:category` — Shop by category
- `/product/:id` — Product by ID
- `/product/slug/:slug` — Product by slug
- `/cart` — Cart
- `/login` — Login
- `/signup` — Signup
- `/profile` — Profile (protected route)
- `/contact` — Contact (protected route)
- `/checkout` — Checkout (protected route)

## Architecture

### Backend

Organized in layers for maintainability:

- `src/controllers`
- `src/services`
- `src/repositories`
- `src/routes`
- `src/factories`
- `src/model`
- `src/schemas`
- `src/middlewares`
- `src/exceptions`

### Frontend

Main folders:

- `src/components`
- `src/contexts`
- `src/hooks`
- `src/schemas`
- `src/services`
- `src/stores`
- `src/config`
- `src/types`
- `src/utils`

## Author

- [Tulio Vasconcelos](https://github.com/heytulio)
