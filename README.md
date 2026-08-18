# Site institucional — Centro Espírita Divaldo Franco

Site público do CEDF (João Pessoa/PB): apresentação da Casa, atividades,
Projeto Ângelis, psicografias e pedidos de Prece Coletiva.

- **Site no ar:** https://cedf.com.br
- **Repositório:** https://github.com/centroespiritadivaldofranco-ux/cedf-site

## Stack

- **Frontend:** React + Vite + Tailwind CSS, publicado como site estático no Render
- **Backend:** Node/Express + Prisma, publicado como Web Service no Render
- **Banco de dados:** PostgreSQL (Neon)

## Estrutura

```
cedf-site/
  src/            → frontend (páginas em src/pages, componentes em src/components)
  public/         → imagens, logo, favicon
  backend/        → API (ver backend/README.md para detalhes)
  render.yaml     → configuração de deploy do site (Blueprint do Render)
```

## Rodando localmente

**Frontend:**
```bash
cp .env.example .env.local   # já aponta pro backend local, não precisa mudar nada
npm install
npm run dev                   # abre em http://localhost:5183 (ver vite.config.js)
```

**Backend:** siga as instruções em [`backend/README.md`](backend/README.md).

Pra funcionar por completo em ambiente local, os dois (frontend e backend)
precisam estar rodando ao mesmo tempo.

## Páginas do site

| Rota | O que é |
|---|---|
| `/` | Home — hero, sobre, atividades, Ângelis, localização |
| `/psicografias` | Busca de cartas psicografadas por nome, com leitor de voz |
| `/oracoes` | Formulário de Prece Coletiva (grava no banco via backend) |

## Onde mexer no conteúdo

A maior parte dos textos (atividades, horários, endereço, frases, dados do
Ângelis) fica centralizada em [`src/data/content.js`](src/data/content.js) —
dá pra editar sem mexer nos componentes React. As cartas de psicografia ficam
em [`src/data/psicografias.js`](src/data/psicografias.js).

## Deploy

O projeto está publicado no **Render**:
- **Site** (`cedf-site`): criado via Blueprint (`render.yaml` na raiz) — atualiza sozinho a cada push na branch `main`
- **Backend** (`cedf-site-backend`): criado manualmente (não pelo Blueprint — ver o motivo em `backend/README.md`) — também atualiza sozinho a cada push

Banco de dados: **Neon** (PostgreSQL). Domínio: **cedf.com.br**, registrado na
Registro.br, com DNS apontando pro Render (A record na raiz, CNAME no `www`).

### Variáveis de ambiente em produção

**Site** (Render → `cedf-site` → Environment):
- `VITE_API_URL` — URL pública do backend (ex: `https://cedf-site-backend.onrender.com`)

**Backend** (Render → `cedf-site-backend` → Environment) — veja a lista
completa e como obter cada uma em [`backend/.env.example`](backend/.env.example)
e [`backend/README.md`](backend/README.md).

## Contas usadas nesse projeto

- **GitHub:** `centroespiritadivaldofranco-ux`
- **Render:** conta do CEDF (mesma usada pelo `cedf-tesouraria`)
- **Neon:** conta do CEDF (banco separado do `cedf-tesouraria`)
- **Domínio:** Registro.br
- **Meta for Developers:** app "Site CEDF com Angelis", pra integração com o
  Instagram do @angelisrefeitorio (ver `backend/README.md`)
