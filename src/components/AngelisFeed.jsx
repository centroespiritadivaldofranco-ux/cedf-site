import { useEffect, useState } from "react";
import Reveal from "./Reveal";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3002";

export default function AngelisFeed() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`${API_URL}/api/angelis/posts`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (!cancelled) setPosts(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!cancelled) setPosts([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Instagram ainda não conectado (ou sem posts) — não mostra nada, sem quebrar o layout.
  if (!posts || posts.length === 0) return null;

  return (
    <Reveal delay={120} className="mt-16 border-t border-navy-950/15 pt-16">
      <p className="text-center text-xs font-bold uppercase tracking-wide text-navy-950/70">
        Direto do @angelisrefeitorio
      </p>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {posts.slice(0, 6).map((post) => (
          <a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noreferrer"
            className="group block aspect-square overflow-hidden bg-navy-950/10"
          >
            <img
              src={post.media_type === "VIDEO" ? post.thumbnail_url : post.media_url}
              alt={post.caption?.slice(0, 80) || "Post do Ângelis no Instagram"}
              className="h-full w-full object-cover transition group-hover:scale-105"
              loading="lazy"
            />
          </a>
        ))}
      </div>
    </Reveal>
  );
}
