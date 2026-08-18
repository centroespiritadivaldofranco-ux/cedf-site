import { Router } from "express";
import { getRecentPosts, saveInitialToken } from "../services/instagram.js";

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
