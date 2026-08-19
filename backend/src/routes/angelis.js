import { Router } from "express";
import { getRecentPosts, saveInitialToken, getAuthorizeUrl, completeAuthorization } from "../services/instagram.js";

export const angelisRouter = Router();

function requireAdmin(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ error: "Não autorizado." });
  }
  next();
}

angelisRouter.get("/posts", async (req, res) => {
  try {
    const posts = await getRecentPosts();
    res.json(posts);
  } catch (err) {
    res.status(503).json({ error: err.message });
  }
});

// Uso único (ou sempre que reconectar): cole aqui o token gerado no Graph API
// Explorer. O backend troca por um token de longa duração e passa a renovar
// sozinho a partir daí.
angelisRouter.post("/token", requireAdmin, async (req, res) => {
  const rawToken = req.body?.token;
  if (!rawToken) {
    return res.status(400).json({ error: "Envie { token } no corpo da requisição." });
  }
  try {
    const { expiraEm } = await saveInitialToken(rawToken);
    res.json({ ok: true, expiraEm });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Abra essa URL no navegador (protegida pelo ADMIN_TOKEN via query, já que é
// um clique manual e não uma chamada de API) pra logar no Instagram e
// autorizar. Depois de autorizar, o Instagram redireciona pro /callback
// abaixo, que já guarda o token sozinho — sem precisar copiar/colar nada.
angelisRouter.get("/connect", (req, res) => {
  if (req.query.admin_token !== process.env.ADMIN_TOKEN) {
    return res.status(401).send("Não autorizado.");
  }
  const redirectUri = process.env.INSTAGRAM_REDIRECT_URI;
  res.redirect(getAuthorizeUrl(redirectUri));
});

angelisRouter.get("/callback", async (req, res) => {
  const rawUrl = req.originalUrl;
  console.log("[angelis/callback] URL bruta recebida:", rawUrl);
  console.log("[angelis/callback] query parseada:", JSON.stringify(req.query));

  if (req.query.error) {
    return res.status(400).send(`Autorização cancelada ou negada: ${req.query.error_description || req.query.error}`);
  }
  if (!req.query.code) {
    return res.status(400).send(`Nenhum código recebido do Instagram. [DEBUG] URL bruta: ${rawUrl}`);
  }
  const redirectUri = process.env.INSTAGRAM_REDIRECT_URI;
  // O Instagram costuma grudar "#_" no final do código — não faz parte do
  // valor de verdade e precisa ser removido antes de trocar pelo token.
  const code = String(req.query.code).replace(/#_$/, "");

  // MODO DEBUG TEMPORÁRIO: mostra o código sem gastar ele numa troca, pra
  // testar manualmente por fora e isolar a causa real do erro. Reverter pra
  // completeAuthorization(code, redirectUri) depois que resolvermos.
  res.send(`<pre>code=${code}\nredirect_uri=${redirectUri}\nclient_id=${process.env.INSTAGRAM_APP_ID}</pre>`);
});
