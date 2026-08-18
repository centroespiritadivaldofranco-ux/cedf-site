import { useCallback, useEffect, useState } from "react";

const supported = typeof window !== "undefined" && "speechSynthesis" in window;

function pickBestPortugueseVoice() {
  if (!supported) return null;
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

export function useSpeech() {
  const [speakingId, setSpeakingId] = useState(null);
  const [voice, setVoice] = useState(null);

  useEffect(() => {
    if (!supported) return;
    const updateVoice = () => setVoice(pickBestPortugueseVoice());
    updateVoice();
    window.speechSynthesis.addEventListener("voiceschanged", updateVoice);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", updateVoice);
  }, []);

  const speak = useCallback(
    (id, text) => {
      if (!supported) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = voice?.lang || "pt-BR";
      if (voice) utterance.voice = voice;
      utterance.rate = 0.95;
      utterance.onend = () => setSpeakingId((current) => (current === id ? null : current));
      utterance.onerror = () => setSpeakingId((current) => (current === id ? null : current));
      setSpeakingId(id);
      window.speechSynthesis.speak(utterance);
    },
    [voice]
  );

  const stop = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeakingId(null);
  }, []);

  useEffect(() => {
    if (!supported) return;
    return () => window.speechSynthesis.cancel();
  }, []);

  return { speakingId, speak, stop, supported };
}
