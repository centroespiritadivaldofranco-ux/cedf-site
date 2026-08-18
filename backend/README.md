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

## Conectando o Instagram do Ângelis

Pré-requisito: o @angelisrefeitorio precisa ser conta profissional (já é) **e**
estar vinculado a uma Página do Facebook (Instagram → Configurações → Central
de Contas).

1. Acesse [developers.facebook.com](https://developers.facebook.com/) → **My Apps** → **Create App**
   - Tipo de app: **Business**
   - Nome: qualquer um (ex: "CEDF Site")
2. No painel do app, adicione o produto **Instagram Graph API** (Add Product → Instagram)
3. Em **App Settings → Basic**, copie o **App Secret** — essa é a variável
   `INSTAGRAM_APP_SECRET` que você vai colar no Render (serviço do backend)
4. Vá em **Tools → Graph API Explorer**:
   - Selecione o app criado
   - Em "User or Page", escolha a Página do Facebook vinculada ao Ângelis
   - Em permissões, adicione `instagram_basic` e `pages_show_list`
   - Clique **Generate Access Token** e faça login/autorize quando pedir
   - Copie o token gerado (é de curta duração, ~1h — tudo bem, o backend troca
     por um de 60 dias automaticamente no próximo passo)
5. Com o backend já publicado no Render, envie esse token pra ele guardar:

   ```bash
   curl -X POST https://SEU-BACKEND.onrender.com/api/angelis/token \
     -H "Authorization: Bearer SEU_ADMIN_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"token":"COLE_O_TOKEN_AQUI"}'
   ```

   Se dar certo, responde `{"ok":true,"expiraEm":"..."}`. A partir daí o
   backend renova sozinho a cada vez que o token estiver perto de vencer — não
   precisa repetir esse passo, a não ser que o token realmente expire (só
   aconteceria se o site ficasse muito tempo sem receber nenhuma visita, já
   que a renovação acontece a cada busca de posts).

6. Teste: `GET /api/angelis/posts` deve retornar os posts recentes em JSON.
