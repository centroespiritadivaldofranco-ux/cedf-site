const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || "UCZ6iA0tn4mT3OegGDnfn2aw";
// A playlist de uploads de um canal é sempre o próprio ID do canal trocando o
// prefixo "UC" por "UU" — evita uma chamada extra só pra descobrir esse ID.
const UPLOADS_PLAYLIST_ID = `UU${CHANNEL_ID.slice(2)}`;

let cachedVideo = null;
let cachedAt = 0;
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutos

export async function getLatestVideo() {
  if (cachedAt && Date.now() - cachedAt < CACHE_TTL_MS) {
    return cachedVideo;
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    throw new Error("YouTube ainda não configurado.");
  }

  const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
  url.searchParams.set("part", "snippet");
  url.searchParams.set("playlistId", UPLOADS_PLAYLIST_ID);
  url.searchParams.set("maxResults", "1");
  url.searchParams.set("key", apiKey);

  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error?.message || "Não foi possível buscar o vídeo mais recente do YouTube.");
  }

  const item = data.items?.[0];
  cachedVideo = item
    ? {
        videoId: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        publishedAt: item.snippet.publishedAt,
      }
    : null;
  cachedAt = Date.now();
  return cachedVideo;
}
