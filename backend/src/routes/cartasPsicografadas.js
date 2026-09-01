import { Router } from "express";
import { listarCartasPublicas } from "../services/cartasPsicografadas.service.js";

export const cartasPsicografadasRouter = Router();

cartasPsicografadasRouter.get("/", async (req, res) => {
  try {
    const cartas = await listarCartasPublicas();
    res.set("Cache-Control", "public, max-age=120");
    res.json(cartas);
  } catch (err) {
    console.error(err);
    res.status(502).json({ error: "Não foi possível carregar as cartas agora." });
  }
});
