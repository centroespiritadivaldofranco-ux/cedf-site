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
  if (req.query.error) {
    return res.status(400).send(`Autorização cancelada ou negada: ${req.query.error_description || req.query.error}`);
  }
  if (!req.query.code) {
    return res.status(400).send("Nenhum código recebido do Instagram.");
  }
  try {
    const redirectUri = process.env.INSTAGRAM_REDIRECT_URI;
    // O Instagram costuma grudar "#_" no final do código — não faz parte do
    // valor de verdade e precisa ser removido antes de trocar pelo token.
    const code = req.query.code.replace(/#_$/, "");
    const { expiraEm } = await completeAuthorization(code, redirectUri);
    res.send(
      `<html><body style="font-family: sans-serif; padding: 40px; text-align: center;">
        <h1>Instagram conectado! ✅</h1>
        <p>O token foi salvo e vai se renovar sozinho até ${new Date(expiraEm).toLocaleDateString("pt-BR")}.</p>
        <p>Pode fechar essa aba e conferir a galeria no site.</p>
      </body></html>`
    );
  } catch (err) {
    res.status(500).send(`Erro ao conectar: ${err.message}`);
  }
});
