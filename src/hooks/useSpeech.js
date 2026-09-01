import { useCallback, useEffect, useRef, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3002";
const browserTtsSupported = typeof window !== "undefined" && "speechSynthesis" in window;

function pickBestPortugueseVoice() {
  if (!browserTtsSupported) return null;
  const voices = window.speechSynthesis.getVoices();
  const ptVoices = voices.filter((v) => v.lang?.toLowerCase().startsWith("pt"));
  if (ptVoices.length === 0) return null;

  const byPreference = [...ptVoices].sort((a, b) => {
    const score = (v) => {
      let s = 0;
      if (v.lang.toLowerCase() === "pt-br") s += 4;
      if (/enhanced|premium|natural|neural/i.test(v.name)) s += 3;
      if (/google/i.test(v.name)) s += 1;
      if (v.localService) s += 1;
      return s;
    };
    return score(b) - score(a);
  });

  return byPreference[0];
}

function speakWithBrowser(text, onEnd) {
  if (!browserTtsSupported) return false;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  const voice = pickBestPortugueseVoice();
  utterance.lang = voice?.lang || "pt-BR";
  if (voice) utterance.voice = voice;
  utterance.rate = 0.95;
  utterance.onend = onEnd;
  utterance.onerror = onEnd;
  window.speechSynthesis.speak(utterance);
  return true;
}

export function useSpeech() {
  const [speakingId, setSpeakingId] = useState(null);
  const [loadingId, setLoadingId] = useState(null);
  const audioRef = useRef(null);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (browserTtsSupported) window.speechSynthesis.cancel();
    setSpeakingId(null);
    setLoadingId(null);
  }, []);

  const speak = useCallback(
    async (id, text, voiceName) => {
      stop();
      setLoadingId(id);

      try {
        const response = await fetch(`${API_URL}/api/tts`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, text, voiceName }),
        });
        if (!response.ok) throw new Error("Falha ao gerar áudio");

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audioRef.current = audio;

        const finish = () => {
          URL.revokeObjectURL(url);
          setSpeakingId((current) => (current === id ? null : current));
          if (audioRef.current === audio) audioRef.current = null;
        };
        audio.onended = finish;
        audio.onerror = finish;

        setLoadingId(null);
        setSpeakingId(id);
        await audio.play();
      } catch {
        setLoadingId(null);
        const started = speakWithBrowser(text, () =>
          setSpeakingId((current) => (current === id ? null : current))
        );
        setSpeakingId(started ? id : null);
      }
    },
    [stop]
  );

  useEffect(() => stop, [stop]);

  return { speakingId, loadingId, speak, stop, supported: true };
}
