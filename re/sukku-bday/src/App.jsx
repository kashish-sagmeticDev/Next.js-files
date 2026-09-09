import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const memories = [
  {
    image: "/assets/photos/photo1.jpg",
    title: "The beginning",
    text: "Some moments become special without us even realizing it at that time.",
  },
  {
    image: "/assets/photos/photo2.jpg",
    title: "Us",
    text: "From random conversations to memories that I never want to forget.",
  },
  {
    image: "/assets/photos/photo3.jpg",
    title: "That smile",
    text: "One of those little things that can instantly make my day better.",
  },
  {
    image: "/assets/photos/photo4.jpg",
    title: "Together",
    text: "Every place feels a little more special when ap is with me.",
  },
  {
    image: "/assets/photos/photo5.jpg",
    title: "Our memories",
    text: "Some memories don't need a special occasion. They are special simply because they are ours.",
  },
  {
    image: "/assets/photos/photo6.jpg",
    title: "Little moments",
    text: "The small things are still some of my favourite things about us.",
  },
  {
    image: "/assets/photos/photo7.jpg",
    title: "My favourite person",
    text: "Somewhere along the way, ap became such an important part of my life.",
  },
  {
    image: "/assets/photos/photo8.jpg",
    title: "More memories",
    text: "And somehow, every new memory makes me want to make more with ap.",
  },
  {
    image: "/assets/photos/photo9.jpg",
    title: "Always us",
    text: "Through good days, bad days, fights and smiles, we are still here.",
  },
  {
    image: "/assets/photos/photo10.jpg",
    title: "My Sukku",
    text: "A small collection of memories, but a very big place in my heart.",
  },
];

const timeline = [
  {
    date: "Our Beginning",
    title: "When it all started",
    text: "From our first conversations to slowly becoming a part of each other's lives.",
  },
  {
    date: "14–17 March 2025",
    title: "Those four days",
    text: "The first time we stayed together. So many little moments, conversations and memories that still feel special.",
  },
  {
    date: "16 June – 28 July 2025",
    title: "Mohali days",
    text: "The distance became just a few kilometres. Park visits, 3B2, temples, food, walks and so many everyday memories.",
  },
  {
    date: "23–29 October 2025",
    title: "Birthday week",
    text: "A whole week together, cooking, pooja, movies, little fights, laughter and moments that felt like our future.",
  },
  {
    date: "2 February 2026",
    title: "One year of us",
    text: "One year officially. A year full of learning, understanding, growing and loving each other.",
  },
];

const specialMoments = [
  "Our first meeting",
  "Those four days together",
  "3B2 walks & food",
  "Our first movie date 😂",
  "Cooking together",
  "Daily pooja together",
  "Late-night conversations",
  "Your birthday week",
];

const letters = [
  {
    number: "01",
    title: "The first letter",
    subtitle: "Where everything started to feel real",
    text: `Some feelings are difficult to explain on a call or a text, so I wrote them down. 

Our first meeting, our conversations, getting closer and all those little moments became memories that I still carry with me.

I don't think I knew then how important ap would become in my life.`,
  },
  {
    number: "02",
    title: "Four days with you",
    subtitle: "14–17 March 2025",
    text: `Those four days were different from anything I had experienced before.

Watching Shin Chan together, eating together, talking for hours, being close to ap and simply having ap around made everything feel so special.

I still remember how nervous and happy I was.`,
  },
  {
    number: "03",
    title: "A year of us",
    subtitle: "Two people, one journey",
    text: `One year sounds like a simple number, but for me it holds so many memories.

We laughed, fought, got angry, understood each other, learned from our mistakes and still chose each other.

And honestly, I don't want this journey to stop at one year.`,
  },
];

function App() {
  const cursorRef = useRef(null);
  const cursorHeartRef = useRef(null);
  const audioRef = useRef(null);

  const [musicPlaying, setMusicPlaying] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const heart = cursorHeartRef.current;

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out",
      });

      gsap.to(heart, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.35,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);

    const ctx = gsap.context(() => {
      gsap.from(".hero-content > *", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.utils.toArray(".reveal").forEach((element) => {
        gsap.from(element, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
          },
        });
      });

      gsap.utils.toArray(".memory-card").forEach((card, index) => {
        gsap.from(card, {
          y: 70,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
          },
        });
      });

      gsap.to(".floating-heart", {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.4,
      });

      gsap.to(".hero-photo", {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      ctx.revert();
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (musicPlaying) {
      audioRef.current.pause();
      setMusicPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setMusicPlaying(true))
        .catch(() => {
          alert("Please add your song as /public/assets/song.mp3");
        });
    }
  };

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={cursorHeartRef} className="cursor-heart">
        ♥
      </div>

      <audio ref={audioRef} loop>
        <source src="/assets/song.mp3" type="audio/mpeg" />
      </audio>

      <button className="music-button" onClick={toggleMusic}>
        {musicPlaying ? "⏸ Pause our song" : "🎵 Play our song"}
      </button>

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-hearts">
            <span className="floating-heart">♡</span>
            <span className="floating-heart">♥</span>
            <span className="floating-heart">♡</span>
            <span className="floating-heart">♥</span>
          </div>

          <div className="hero-content">
            <p className="small-label">A little something for you</p>

            <h1>
              Happy Birthday,
              <br />
              <span>Sukku</span> ❤️
            </h1>

            <p className="hero-description">
              I could have just wished you Happy Birthday...
              <br />
              but you deserve a little more than that.
            </p>

            <a href="#story" className="start-button">
              Come, let's go back to our memories ↓
            </a>
          </div>

          <div className="hero-photo">
            <img src="/assets/photos/photo1.jpg" alt="Sukku" />
          </div>
        </section>

        {/* LOVE MESSAGE */}
        <section className="love-section reveal">
          <p className="section-label">A few words for you</p>

          <h2>
            Ap are not just a part of my life,
            <br />
            <span>ap are one of my favourite parts of it.</span>
          </h2>

          <p className="love-text">
            I don't always know how to express everything properly,
            but I hope ap know how much ap mean to me. From our random
            conversations to the memories we made together, I wouldn't
            change the journey that brought us here.
          </p>
        </section>

        {/* STORY */}
        <section id="story" className="story-section">
          <div className="section-heading reveal">
            <p className="section-label">Our little timeline</p>
            <h2>Look how far we've come. 🫶</h2>
          </div>

          <div className="timeline">
            {timeline.map((item, index) => (
              <div className="timeline-item reveal" key={index}>
                <div className="timeline-dot">♥</div>

                <div className="timeline-card">
                  <span>{item.date}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MEMORIES */}
        <section className="memories-section">
          <div className="section-heading reveal">
            <p className="section-label">10 little pieces of us</p>
            <h2>Memories I want to keep forever. 📸</h2>
          </div>

          <div className="memory-grid">
            {memories.map((memory, index) => (
              <article className="memory-card" key={index}>
                <div className="memory-image">
                  <img src={memory.image} alt={memory.title} />
                  <span className="memory-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="memory-content">
                  <h3>{memory.title}</h3>
                  <p>{memory.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* SPECIAL MOMENTS */}
        <section className="special-section">
          <div className="section-heading reveal">
            <p className="section-label">The little things</p>
            <h2>Some moments deserve their own place. ❤️</h2>
          </div>

          <div className="special-grid">
            {specialMoments.map((moment, index) => (
              <div className="special-card reveal" key={index}>
                <span>0{index + 1}</span>
                <p>{moment}</p>
                <b>♥</b>
              </div>
            ))}
          </div>
        </section>

        {/* LETTERS */}
        <section className="letters-section">
          <div className="section-heading reveal">
            <p className="section-label">Things I wrote for you</p>
            <h2>Some feelings are easier to write. 💌</h2>
            <p>
              You already know I have written quite a few things for you.
              Here are a few pieces of that journey.
            </p>
          </div>

          <div className="letters-grid">
            {letters.map((letter, index) => (
              <button
                className="letter-card reveal"
                key={index}
                onClick={() => setSelectedLetter(letter)}
              >
                <span className="letter-number">{letter.number}</span>
                <div className="letter-icon">💌</div>

                <h3>{letter.title}</h3>
                <p>{letter.subtitle}</p>

                <span className="read-letter">Open letter →</span>
              </button>
            ))}
          </div>
        </section>

        {/* BIRTHDAY */}
        <section className="birthday-section">
          <div className="birthday-inner reveal">
            <div className="birthday-decoration">✦</div>

            <p className="section-label">And finally...</p>

            <h2>
              Happy Birthday,
              <br />
              <span>meri Sukku ❤️</span>
            </h2>

            <p>
              I hope this year brings ap lots of happiness, peace,
              success and everything ap are working for.
            </p>

            <p>
              Keep smiling, keep dancing, keep being the Sukku I know.
              And yes... keep annoying me too. 😅❤️
            </p>

            <div className="birthday-heart">♡</div>
          </div>
        </section>

        {/* END */}
        <footer className="footer">
          <p>Made with lots of love,</p>
          <h3>Abhi ❤️</h3>
          <small>For my Sukku</small>
        </footer>
      </main>

      {/* LETTER MODAL */}
      {selectedLetter && (
        <div
          className="letter-modal"
          onClick={() => setSelectedLetter(null)}
        >
          <div
            className="letter-paper"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-letter"
              onClick={() => setSelectedLetter(null)}
            >
              ×
            </button>

            <span>{selectedLetter.number}</span>
            <h2>{selectedLetter.title}</h2>
            <p className="letter-subtitle">
              {selectedLetter.subtitle}
            </p>

            <div className="letter-body">
              {selectedLetter.text.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="letter-signature">
              Apka Abhi ❤️
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;