import { prisma } from "../prisma.js";

const TOKEN_ID = "angelis";
const REFRESH_MARGIN_MS = 5 * 24 * 60 * 60 * 1000; // renova se faltar menos de 5 dias

let cachedPosts = null;
let cachedAt = 0;
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutos

async function getStoredToken() {
  return prisma.instagramToken.findUnique({ where: { id: TOKEN_ID } });
}

// Mesma URL que a própria Meta gera no painel do app ("URL incorporado" em
// "Configurar o login da empresa no Instagram") — força reautenticação e
// pede o conjunto completo de permissões que o app declarou como
// obrigatórias. Só usamos instagram_business_basic de fato, mas pedir menos
// que o app declarou como obrigatório pode ter sido a causa da divergência.
export function getAuthorizeUrl(redirectUri) {
  const url = new URL("https://www.instagram.com/oauth/authorize");
  url.searchParams.set("force_reauth", "true");
  url.searchParams.set("client_id", process.env.INSTAGRAM_APP_ID);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set(
    "scope",
    "instagram_business_basic,instagram_business_manage_messages,instagram_business_manage_comments,instagram_business_content_publish,instagram_business_manage_insights"
  );
  return url.toString();
}

// Troca o "code" recebido no callback do OAuth por um token de curta duração.
// A documentação oficial da Meta manda esse POST como multipart/form-data
// (o exemplo deles usa `curl -F`, não `-d`) — por isso FormData aqui, não
// URLSearchParams. Não define Content-Type manualmente: o fetch monta o
// boundary do multipart sozinho quando o body é um FormData.
async function exchangeCodeForToken(code, redirectUri) {
  const body = new FormData();
  body.set("client_id", process.env.INSTAGRAM_APP_ID);
  body.set("client_secret", process.env.INSTAGRAM_APP_SECRET);
  body.set("grant_type", "authorization_code");
  body.set("redirect_uri", redirectUri);
  body.set("code", code);

  const res = await fetch("https://api.instagram.com/oauth/access_token", {
    method: "POST",
    body,
  });
  const data = await res.json();
  if (!res.ok) {
    const debugInfo = `redirect_uri usado: ${redirectUri} | client_id usado: ${process.env.INSTAGRAM_APP_ID} | resposta do Instagram: ${JSON.stringify(data)}`;
    throw new Error(`${data.error_message || "Não foi possível autorizar com o Instagram."} — [DEBUG] ${debugInfo}`);
  }
  return data.access_token;
}

// Fluxo completo do callback: troca o code por um token curto, depois troca
// esse token curto por um de longa duração (60 dias) e guarda no banco.
export async function completeAuthorization(code, redirectUri) {
  const shortLivedToken = await exchangeCodeForToken(code, redirectUri);
  return saveInitialToken(shortLivedToken);
}

// Recebe um token novo (curto ou longo prazo) vindo do Graph API Explorer,
// troca por um token de longa duração (60 dias) e guarda no banco.
export async function saveInitialToken(rawToken) {
  const url = new URL("https://graph.instagram.com/access_token");
  url.searchParams.set("grant_type", "ig_exchange_token");
  url.searchParams.set("client_secret", process.env.INSTAGRAM_APP_SECRET);
  url.searchParams.set("access_token", rawToken);

  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error?.message || "Não foi possível trocar o token com o Instagram.");
  }

  const expiraEm = new Date(Date.now() + data.expires_in * 1000);
  await prisma.instagramToken.upsert({
    where: { id: TOKEN_ID },
    create: { id: TOKEN_ID, accessToken: data.access_token, expiraEm },
    update: { accessToken: data.access_token, expiraEm },
  });
  cachedPosts = null;
  return { expiraEm };
}

async function refreshIfNeeded(token) {
  const msUntilExpiry = token.expiraEm.getTime() - Date.now();
  if (msUntilExpiry > REFRESH_MARGIN_MS) return token.accessToken;

  const url = new URL("https://graph.instagram.com/refresh_access_token");
  url.searchParams.set("grant_type", "ig_refresh_token");
  url.searchParams.set("access_token", token.accessToken);

  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    // Token pode ter expirado de verdade (>60 dias sem renovar) — precisa gerar um novo manualmente.
    throw new Error(data.error?.message || "Token do Instagram expirou e precisa ser reconectado.");
  }

  const expiraEm = new Date(Date.now() + data.expires_in * 1000);
  await prisma.instagramToken.update({
    where: { id: TOKEN_ID },
    data: { accessToken: data.access_token, expiraEm },
  });
  return data.access_token;
}

export async function getRecentPosts(limit = 6) {
  if (cachedPosts && Date.now() - cachedAt < CACHE_TTL_MS) {
    return cachedPosts;
  }

  const token = await getStoredToken();
  if (!token) {
    throw new Error("Instagram ainda não conectado.");
  }

  const accessToken = await refreshIfNeeded(token);

  const url = new URL("https://graph.instagram.com/me/media");
  url.searchParams.set("fields", "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp");
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("access_token", accessToken);

  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error?.message || "Não foi possível buscar os posts do Instagram.");
  }

  cachedPosts = data.data || [];
  cachedAt = Date.now();
  return cachedPosts;
}
