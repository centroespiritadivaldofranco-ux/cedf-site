import { Router } from "express";
import rateLimit from "express-rate-limit";
import { synthesizeSpeech, AVAILABLE_VOICES } from "../services/googleTts.service.js";

export const ttsRouter = Router();

const ttsLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Muitos pedidos de áudio em pouco tempo. Tente novamente em alguns minutos." },
});

const MAX_TEXT_LENGTH = 20000;

ttsRouter.post("/", ttsLimiter, async (req, res) => {
  const id = String(req.body?.id ?? "").trim();
  const text = String(req.body?.text ?? "").trim();
  const voiceName = req.body?.voiceName;

  if (!id) {
    return res.status(400).json({ error: "Informe o id do conteúdo a ser lido." });
  }
  if (!text) {
    return res.status(400).json({ error: "Informe o texto a ser lido." });
  }
  if (text.length > MAX_TEXT_LENGTH) {
    return res.status(400).json({ error: "Texto longo demais para conversão em áudio." });
  }
  if (voiceName && !AVAILABLE_VOICES.has(voiceName)) {
    return res.status(400).json({ error: "Voz inválida." });
  }

  try {
    const audio = await synthesizeSpeech({ cacheKey: id, text, voiceName });
    res.set({
      "Content-Type": "audio/mpeg",
      "Cache-Control": "public, max-age=86400",
    });
    res.send(audio);
  } catch (err) {
    console.error(err);
    res.status(502).json({ error: "Não foi possível gerar o áudio agora." });
  }
});
