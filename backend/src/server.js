import "dotenv/config";
import express from "express";
import cors from "cors";
import { oracoesRouter } from "./routes/oracoes.js";
import { angelisRouter } from "./routes/angelis.js";
import { ttsRouter } from "./routes/tts.js";
import { cartasPsicografadasRouter } from "./routes/cartasPsicografadas.js";

const app = express();

const allowedOrigins = (process.env.FRONTEND_ORIGIN || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins.length ? allowedOrigins : true,
  })
);
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ ok: true }));
app.use("/api/oracoes", oracoesRouter);
app.use("/api/angelis", angelisRouter);
app.use("/api/tts", ttsRouter);
app.use("/api/cartas-psicografadas", cartasPsicografadasRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Erro interno." });
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`cedf-site backend rodando em http://localhost:${port}`);
});
