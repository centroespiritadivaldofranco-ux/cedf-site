import { Router } from "express";
import { getLatestVideo } from "../services/youtube.js";

export const youtubeRouter = Router();

youtubeRouter.get("/latest", async (req, res) => {
  try {
    const video = await getLatestVideo();
    res.json(video);
  } catch (err) {
    res.status(503).json({ error: err.message });
  }
});
