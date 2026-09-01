const CACHE_TTL_MS = 5 * 60 * 1000;
let cache = { data: null, expiresAt: 0 };

function excerptFrom(text, max = 160) {
  const clean = text.trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, max).trim() + "…";
}

function mapCarta(c) {
  const category = c.destinatario ? "pessoa" : "mentor";
  const name = c.destinatario || c.autorEspiritual || c.titulo;
  return {
    id: c.id,
    name,
    category,
    date: c.dataRecebimento ? c.dataRecebimento.slice(0, 10) : null,
    excerpt: excerptFrom(c.conteudo),
    content: c.conteudo,
  };
}

export async function listarCartasPublicas() {
  if (cache.data && cache.expiresAt > Date.now()) {
    return cache.data;
  }

  const baseUrl = process.env.TESOURARIA_API_URL;
  if (!baseUrl) {
    throw new Error("TESOURARIA_API_URL não configurada no backend.");
  }

  const response = await fetch(`${baseUrl}/api/cartas-psicografadas/publicas`);
  if (!response.ok) {
    throw new Error(`Tesouraria respondeu ${response.status} ao listar cartas públicas.`);
  }

  const cartas = await response.json();
  const mapped = cartas.map(mapCarta);

  cache = { data: mapped, expiresAt: Date.now() + CACHE_TTL_MS };
  return mapped;
}
