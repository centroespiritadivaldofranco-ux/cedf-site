import { useCallback, useRef } from "react";

// Callback ref (not useEffect) so it reconnects whenever the underlying DOM
// node actually changes — including when a Reveal's host tag changes (e.g.
// a form swapping to a div on submit), which an effect with [] deps misses.
export function useReveal() {
  const observerRef = useRef(null);

  const ref = useCallback((node) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-visible");
          observer.unobserve(node);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    observerRef.current = observer;
  }, []);

  return ref;
}
