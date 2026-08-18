import { useEffect, useRef } from "react";

let scriptPromise = null;

function loadInstagramScript() {
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve) => {
    if (window.instgrm) {
      resolve(window.instgrm);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = () => resolve(window.instgrm);
    document.body.appendChild(script);
  });
  return scriptPromise;
}

export default function InstagramEmbed({ url }) {
  const containerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    loadInstagramScript().then((instgrm) => {
      if (!cancelled && instgrm) instgrm.Embeds.process();
    });
    return () => {
      cancelled = true;
    };
  }, [url]);

  return (
    <div ref={containerRef} className="flex min-h-[500px] justify-center [&_iframe]:!min-h-[500px]">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{ background: "#FFF", border: 0, borderRadius: 0, margin: 0, maxWidth: 400, minWidth: 280, width: "100%", minHeight: 500 }}
      />
    </div>
  );
}
