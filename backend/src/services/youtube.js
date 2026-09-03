const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || "UCZ6iA0tn4mT3OegGDnfn2aw";
// O feed RSS do YouTube é público e não precisa de API key/OAuth — só aceita
// o channel_id (UC...), não o @handle.
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

let cachedVideo = null;
let cachedAt = 0;
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutos

function extractTag(xml, tag) {
  const match = xml.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
  return match ? match[1] : null;
}

function decodeEntities(text) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

export async function getLatestVideo() {
  if (cachedAt && Date.now() - cachedAt < CACHE_TTL_MS) {
    return cachedVideo;
  }

  const res = await fetch(FEED_URL);
  if (!res.ok) {
    throw new Error("Não foi possível buscar os vídeos do YouTube.");
  }

  const xml = await res.text();
  const entryMatch = xml.match(/<entry>([\s\S]*?)<\/entry>/);
  const entry = entryMatch?.[1];

  cachedVideo = entry
    ? {
        videoId: extractTag(entry, "yt:videoId"),
        title: decodeEntities(extractTag(entry, "title") || ""),
        publishedAt: extractTag(entry, "published"),
      }
    : null;
  cachedAt = Date.now();
  return cachedVideo;
}
