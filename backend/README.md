# Backend do site — cedf-site

API mínima para o site institucional. Por enquanto só cuida dos **pedidos de oração**
(`/api/oracoes`), enviados pelo formulário público em `/oracoes`.

## Como rodar na sua máquina

```bash
cd backend
cp .env.example .env
# Edite o .env: cole a DATABASE_URL de um banco PostgreSQL (Neon ou Supabase, grátis)
# e troque o ADMIN_TOKEN por uma string aleatória longa

npm install
npx prisma migrate dev --name inicial   # cria a tabela no banco
npm run dev                              # roda em http://localhost:3002
```

## Endpoints

| Método | Rota | Autenticação | O que faz |
|---|---|---|---|
| POST | `/api/oracoes` | pública (com limite de 5 pedidos/10min por IP) | Recebe `{ nomeCompleto, mensagem? }` e salva o pedido |
| GET | `/api/oracoes` | `Authorization: Bearer <ADMIN_TOKEN>` | Lista todos os pedidos, mais recentes primeiro |
| PATCH | `/api/oracoes/:id` | `Authorization: Bearer <ADMIN_TOKEN>` | Marca `{ atendido: true }` depois que o nome for incluído nos trabalhos |

Para ver os pedidos sem construir uma tela de admin ainda, dá pra chamar direto:

```bash
curl -H "Authorization: Bearer SEU_ADMIN_TOKEN" https://SEU-BACKEND/api/oracoes
```

Ou simplesmente abrir a tabela `PedidoOracao` direto no painel do Neon/Supabase.

## Publicando no Render (manual — não usa o Blueprint)

O `render.yaml` na raiz do projeto cuida só do site (frontend). O backend fica de
fora porque o Render está recusando `plan: free` para serviços web dentro de
Blueprints no momento (erro "no such plan free for service type web"), mesmo o
plano Free existindo normalmente. Solução: criar esse serviço manualmente, onde
a opção Free ainda aparece certinho.

1. No painel do Render: **New +** → **Web Service**
2. Conecte o repositório `cedf-site`
3. Preencha:
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install && npx prisma generate`
   - **Start Command**: `npx prisma migrate deploy && npm start`
   - **Instance Type**: **Free**
4. Em **Environment Variables**, adicione:
   - `DATABASE_URL` — a connection string do Neon
   - `ADMIN_TOKEN` — qualquer string longa e aleatória
   - `FRONTEND_ORIGIN` — `https://cedf.com.br,https://www.cedf.com.br`
   - `PORT` — `3002`
5. Crie o serviço. Quando terminar de subir, copie a URL pública dele (algo como
   `https://cedf-site-backend.onrender.com`) e atualize a variável `VITE_API_URL`
   do serviço do site (o que veio do `render.yaml`) com essa URL — depois faça um
   "Manual Deploy" no site pra ele reconstruir usando a URL certa.

No plano Free, o backend "dorme" depois de 15 minutos sem uso e demora uns
segundos pra acordar na primeira requisição seguinte — normal, não é erro.
