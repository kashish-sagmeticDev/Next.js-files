import OpeningCurtain from "./components/OpeningCurtain/OpeningCurtain";
import CustomCursor from "./components/CustomCursor/CustomCursor";
import FloatingHearts from "./components/FloatingHearts/FloatingHearts";
import Hero from "./components/Hero/Hero";
import MusicPlayer from "./components/ MusicPlayer/MusicPlayer";
import LoveMessage from "./components/LoveMessage/LoveMessage";
import StoryTimeline from "./components/StoryTimeline/StoryTimeline";
import MemoryDeck from "./components/MemoryDeck/MemoryDeck";
import SpecialMoments from "./components/SpecialMoments/SpecialMoments";
import LetterBox from "./components/LetterBox/LetterBox";
import BirthdayWish from "./components/BirthdayWish/BirthdayWish";
import { memories } from "./data/memories";

function App() {
  return (
    <div className="app">
      <CustomCursor />

      <FloatingHearts />

      <OpeningCurtain />

      <main>
        <Hero />

        <section className="memories" aria-labelledby="memories-title">
          <p className="eyebrow">Our little story</p>
          <h2 id="memories-title" className="memories-title">
            Moments worth keeping
          </h2>

          <div className="memories-grid">
            {memories.slice(0, 6).map((memory) => (
              <article className="memory-card" key={memory.id}>
                <p className="memory-date">{memory.date}</p>
                <h3>{memory.title}</h3>
                <p>{memory.text}</p>
              </article>
            ))}
          </div>
        </section>

        <LoveMessage />

        <StoryTimeline />

        <MemoryDeck />

        <SpecialMoments />

        <LetterBox />

         <BirthdayWish />
      </main>

      <MusicPlayer />
    </div>
  );
}

export default App;