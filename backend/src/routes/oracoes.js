import { Router } from "express";
import rateLimit from "express-rate-limit";
import { prisma } from "../prisma.js";

export const oracoesRouter = Router();

const submitLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Muitos pedidos em pouco tempo. Tente novamente em alguns minutos." },
});

function requireAdmin(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ error: "Não autorizado." });
  }
  next();
}

oracoesRouter.post("/", submitLimiter, async (req, res) => {
  const nomeCompleto = String(req.body?.nomeCompleto ?? "").trim();
  const mensagem = req.body?.mensagem ? String(req.body.mensagem).trim() : null;

  if (nomeCompleto.length < 3 || nomeCompleto.length > 120) {
    return res.status(400).json({ error: "Informe o nome completo (entre 3 e 120 caracteres)." });
  }
  if (mensagem && mensagem.length > 1000) {
    return res.status(400).json({ error: "A mensagem pode ter no máximo 1000 caracteres." });
  }

  const pedido = await prisma.pedidoOracao.create({
    data: { nomeCompleto, mensagem: mensagem || null },
  });

  res.status(201).json({ id: pedido.id });
});

oracoesRouter.get("/", requireAdmin, async (req, res) => {
  const pedidos = await prisma.pedidoOracao.findMany({
    orderBy: { criadoEm: "desc" },
  });
  res.json(pedidos);
});

oracoesRouter.patch("/:id", requireAdmin, async (req, res) => {
  const atendido = Boolean(req.body?.atendido);
  const pedido = await prisma.pedidoOracao.update({
    where: { id: req.params.id },
    data: { atendido },
  });
  res.json(pedido);
});
