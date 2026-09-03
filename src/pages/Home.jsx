import Hero from "../components/Hero";
import Sobre from "../components/Sobre";
import Atividades from "../components/Atividades";
import Angelis from "../components/Angelis";
import YoutubeLatest from "../components/YoutubeLatest";
import FrasesMarquee from "../components/FrasesMarquee";
import Localizacao from "../components/Localizacao";

export default function Home() {
  return (
    <main>
      <Hero />
      <Sobre />
      <Angelis />
      <Atividades />
      <YoutubeLatest />
      <FrasesMarquee />
      <Localizacao />
    </main>
  );
}
