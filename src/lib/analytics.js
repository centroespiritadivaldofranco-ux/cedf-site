// Google Analytics (GA4). Só carrega se VITE_GA_MEASUREMENT_ID estiver definido
// (fica ausente em desenvolvimento local, então nada é enviado ao rodar localmente).
//
// Como o app é uma SPA (rotas trocam sem recarregar a página), o pageview inicial
// do gtag não é suficiente — registrarPageview() é chamado a cada troca de rota
// pelo hook em src/hooks/useAnalyticsPageview.js.

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export function iniciarAnalytics() {
  if (!MEASUREMENT_ID || typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  // send_page_view: false — cada navegação é reportada manualmente via registrarPageview(),
  // evitando pageview duplicado no carregamento inicial.
  window.gtag("config", MEASUREMENT_ID, { send_page_view: false });

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=" + MEASUREMENT_ID;
  document.head.appendChild(script);
}

export function registrarPageview(caminho) {
  if (!MEASUREMENT_ID || typeof window.gtag !== "function") return;
  window.gtag("event", "page_view", {
    page_path: caminho,
    page_location: window.location.href,
    page_title: document.title,
  });
}
