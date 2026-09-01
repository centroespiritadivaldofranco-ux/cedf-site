import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3002";

export function useCartasPsicografadas() {
  const [cartas, setCartas] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  useEffect(() => {
    let cancelled = false;

    fetch(`${API_URL}/api/cartas-psicografadas`)
      .then((res) => {
        if (!res.ok) throw new Error("Falha ao carregar cartas");
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        setCartas(data);
        setStatus("ready");
      })
      .catch(() => {
        if (cancelled) return;
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { cartas, status };
}
