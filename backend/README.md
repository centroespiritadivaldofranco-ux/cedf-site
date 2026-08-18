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

Pré-requisito: o @angelisrefeitorio precisa ser conta profissional (já é).
**Não precisa de Página do Facebook** — esse é o método novo da Meta
("Instagram API with Instagram Login"), que loga direto com a conta do
Instagram. Se você tentou pelo Graph API Explorer com permissões tipo
`pages_show_list` e caiu em erro de "Invalid Scopes", é porque aquele é o
método antigo — pode ignorar e seguir por aqui.

1. Acesse [developers.facebook.com](https://developers.facebook.com/) → **My Apps** → **Create App**
   - Tipo de app: **Business**
2. No painel do app, adicione o produto **Instagram** → escolha
   **"API setup with Instagram login"** (não "with Facebook Login")
3. Nessa página do produto, em **"3. Set up Instagram business login" → Business login settings**:
   - Em **"OAuth redirect URIs"**, cadastre exatamente:
     `https://SEU-BACKEND.onrender.com/api/angelis/callback`
     (troque pelo endereço real do seu backend no Render)
4. Em **App Settings → Basic**, copie o **App ID** e o **App Secret**
5. No Render, no serviço do backend, adicione essas variáveis de ambiente:
   - `INSTAGRAM_APP_ID` — o App ID do passo 4
   - `INSTAGRAM_APP_SECRET` — o App Secret do passo 4
   - `INSTAGRAM_REDIRECT_URI` — a mesma URL cadastrada no passo 3
6. Com o backend no ar, abra no navegador (troque os dois valores):

   ```
   https://SEU-BACKEND.onrender.com/api/angelis/connect?admin_token=SEU_ADMIN_TOKEN
   ```

   Isso leva direto pra tela de login do Instagram. Loga como
   @angelisrefeitorio (ou quem tiver acesso) e autoriza. O Instagram
   redireciona de volta sozinho, e a página final confirma "Instagram
   conectado!" — nada pra copiar ou colar.

7. A partir daí, o backend renova o token sozinho antes de vencer (a cada 60
   dias). Só repete o passo 6 se o token realmente expirar (só aconteceria se
   o site ficasse muito tempo sem nenhuma visita).

8. Teste: `GET /api/angelis/posts` deve retornar os posts recentes em JSON.

Se preferir gerar o token manualmente (Graph API Explorer, método antigo, com
Página do Facebook vinculada), o endpoint `POST /api/angelis/token` continua
disponível como alternativa — veja o código em `src/routes/angelis.js`.
