# Backend do site — cedf-site

API mínima para o site institucional. Cuida dos **pedidos de oração**
(`/api/oracoes`), enviados pelo formulário público em `/oracoes`, e da
**leitura em voz alta das cartas psicografadas** (`/api/tts`), usada na
página `/psicografias`.

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
| POST | `/api/tts` | pública (com limite de 60 pedidos/10min por IP) | Recebe `{ id, text, voiceName? }` e devolve o áudio (MP3) da leitura em voz alta |

## Configurando a leitura em voz alta (Google Cloud Text-to-Speech)

A página `/psicografias` tem um botão "Ouvir" em cada carta. Ele chama
`POST /api/tts`, que gera o áudio usando as vozes **Neural2** do Google Cloud
(bem mais naturais que a voz robótica padrão do navegador). Sem a chave
configurada, o site continua funcionando normalmente — o botão cai
automaticamente para a voz do navegador como reserva.

A camada gratuita do Google Cloud TTS cobre **1 milhão de caracteres/mês**
nas vozes Neural2 (permanente, não é só teste de 12 meses) — na prática,
suficiente para manter essa funcionalidade sem custo.

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/) e crie
   um projeto novo (ou use um existente). É pedido um cartão de crédito no
   cadastro da conta, mas você não é cobrado enquanto ficar dentro da cota
   gratuita mensal.
2. No menu, vá em **APIs e serviços → Biblioteca**, busque por
   **"Cloud Text-to-Speech API"** e clique em **Ativar**.
3. Vá em **APIs e serviços → Credenciais → Criar credenciais → Chave de API**.
4. (Recomendado) Clique na chave criada e em **Restringir chave**, marcando
   apenas a **Cloud Text-to-Speech API** — assim, mesmo que a chave vaze, ela
   não serve para mais nada.
5. Copie a chave gerada e cole em `GOOGLE_TTS_API_KEY` no `.env` (local) e nas
   **Environment Variables** do serviço backend no Render (produção).
6. Reinicie o backend (`npm run dev` local, ou "Manual Deploy" no Render). O
   botão "Ouvir" já passa a usar a voz Neural2 na próxima leitura.

O áudio de cada carta é gerado uma vez e guardado em cache na memória do
servidor (`backend/src/services/googleTts.service.js`) enquanto o processo
estiver no ar, para não gastar cota gerando a mesma carta repetidamente.
Como o backend roda no plano Free do Render, esse cache reseta sempre que o
serviço "dorme" e acorda de novo — o custo disso é só uma geração extra na
primeira audição depois de um período ocioso, não afeta a cota mensal de
forma relevante.

Por padrão a voz usada é `pt-BR-Neural2-A` (feminina). As outras vozes
disponíveis são `pt-BR-Neural2-B` (masculina) e `pt-BR-Neural2-C` (feminina)
— para trocar, passe `voiceName` no corpo da requisição a partir do frontend.

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
   - `GOOGLE_TTS_API_KEY` — opcional, veja "Configurando a leitura em voz alta" abaixo
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
