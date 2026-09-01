const GOOGLE_TTS_URL = "https://texttospeech.googleapis.com/v1/text:synthesize";
const MAX_CHUNK_CHARS = 4500;

export const DEFAULT_VOICE = "pt-BR-Neural2-A";
export const AVAILABLE_VOICES = new Set([
  "pt-BR-Neural2-A", // feminina
  "pt-BR-Neural2-B", // masculina
  "pt-BR-Neural2-C", // feminina
  "pt-BR-Wavenet-A", // feminina
  "pt-BR-Wavenet-B", // masculina
  "pt-BR-Wavenet-C", // feminina
]);

const audioCache = new Map();

function splitIntoChunks(text) {
  const sentences = text.split(/(?<=[.!?])\s+/);
  const chunks = [];
  let current = "";

  for (const sentence of sentences) {
    if ((current + " " + sentence).trim().length > MAX_CHUNK_CHARS) {
      if (current) chunks.push(current.trim());
      current = sentence;
    } else {
      current = (current + " " + sentence).trim();
    }
  }
  if (current) chunks.push(current.trim());
  return chunks;
}

async function synthesizeChunk(text, voiceName, apiKey) {
  const response = await fetch(`${GOOGLE_TTS_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      input: { text },
      voice: { languageCode: "pt-BR", name: voiceName },
      audioConfig: { audioEncoding: "MP3", speakingRate: 0.98 },
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Google TTS falhou (${response.status}): ${detail}`);
  }

  const { audioContent } = await response.json();
  return Buffer.from(audioContent, "base64");
}

export async function synthesizeSpeech({ cacheKey, text, voiceName }) {
  const apiKey = process.env.GOOGLE_TTS_API_KEY;
  if (!apiKey) {
    throw new Error("GOOGLE_TTS_API_KEY não configurada no backend.");
  }

  const voice = AVAILABLE_VOICES.has(voiceName) ? voiceName : DEFAULT_VOICE;
  const key = `${voice}::${cacheKey}`;

  const cached = audioCache.get(key);
  if (cached) return cached;

  const chunks = splitIntoChunks(text);
  const buffers = [];
  for (const chunk of chunks) {
    buffers.push(await synthesizeChunk(chunk, voice, apiKey));
  }
  const audio = Buffer.concat(buffers);

  audioCache.set(key, audio);
  return audio;
}
