import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const letters = [
  {
    id: 1,
    number: "01",
    label: "The beginning",
    title: "For the girl who became my favourite person",
    preview: "There are some things I never want to forget...",
    text: [
      "Some beginnings don't look important when they happen.",
      "But later, when you look back, you realise that one small moment changed everything.",
      "That's how I feel about us.",
    ],
  },
  {
    id: 2,
    number: "02",
    label: "Us",
    title: "For everything we've been through",
    preview: "From random conversations to real memories...",
    text: [
      "We've had beautiful days, silly fights, long conversations and moments where we simply enjoyed being together.",
      "And honestly, I wouldn't replace any of it.",
      "Because all of those little things became our story.",
    ],
  },
  {
    id: 3,
    number: "03",
    label: "Today",
    title: "For my birthday girl",
    preview: "Today, I just want you to know...",
    text: [
      "Today is your birthday, but I also feel lucky because I get to celebrate you.",
      "I hope this year brings you everything you're working for and everything your heart deserves.",
      "And I hope I get to be there for many more birthdays.",
    ],
  },
];

function LetterBox() {
  const sectionRef = useRef(null);
  const deskRef = useRef(null);

  const [activeLetter, setActiveLetter] = useState(null);

  useEffect(() => {
    if (!activeLetter) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeLetter]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      intro
        .from(".letters__eyebrow", {
          y: 25,
          opacity: 0,
          duration: 0.7,
        })
        .from(
          ".letters__title",
          {
            y: 55,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.35"
        )
        .from(
          ".letters__subtitle",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.5"
        )
        .from(
          ".letter-envelope",
          {
            y: 80,
            opacity: 0,
            rotation: (index) => index % 2 === 0 ? -8 : 8,
            duration: 0.9,
            stagger: 0.15,
            ease: "back.out(1.5)",
          },
          "-=0.3"
        );

      // Very subtle desk movement
      gsap.to(deskRef.current, {
        y: -8,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const openLetter = (letter) => {
    setActiveLetter(letter);
  };

  const closeLetter = () => {
    setActiveLetter(null);
  };

  const nextLetter = () => {
    if (!activeLetter) return;

    const currentIndex = letters.findIndex(
      (letter) => letter.id === activeLetter.id
    );

    const nextIndex = (currentIndex + 1) % letters.length;

    setActiveLetter(letters[nextIndex]);
  };

  const previousLetter = () => {
    if (!activeLetter) return;

    const currentIndex = letters.findIndex(
      (letter) => letter.id === activeLetter.id
    );

    const previousIndex =
      (currentIndex - 1 + letters.length) % letters.length;

    setActiveLetter(letters[previousIndex]);
  };

  return (
    <section className="letters" ref={sectionRef}>
      <div className="letters__intro">
        <p className="letters__eyebrow">
          Something I wanted to write
        </p>

        <h2 className="letters__title">
          Some things are
          <br />
          <span>better written.</span>
        </h2>

        <p className="letters__subtitle">
          I kept a few words here for you.
        </p>
      </div>

      <div className="letters__desk" ref={deskRef}>
        <div className="letters__paper-shadow" />

        <div className="letters__envelopes">
          {letters.map((letter, index) => (
            <button
              key={letter.id}
              type="button"
              className={`letter-envelope letter-envelope--${index + 1}`}
              onClick={() => openLetter(letter)}
              data-cursor="OPEN"
              aria-label={`Open letter ${letter.number}`}
            >
              <span className="letter-envelope__number">
                {letter.number}
              </span>

              <span className="letter-envelope__seal">
                ♥
              </span>

              <span className="letter-envelope__label">
                {letter.label}
              </span>

              <span className="letter-envelope__open">
                Open
              </span>
            </button>
          ))}
        </div>

        <div className="letters__desk-note">
          <span>for my</span>
          <strong>Sukku</strong>
          <span>♥</span>
        </div>
      </div>

      {activeLetter && (
        <div className="letter-reader">
          <div
            className="letter-reader__backdrop"
            onClick={closeLetter}
          />

          <div className="letter-reader__book">
            <button
              type="button"
              className="letter-reader__close"
              onClick={closeLetter}
              data-cursor="CLOSE"
              aria-label="Close letter"
            >
              ×
            </button>

            <div className="letter-reader__top">
              <span>
                LETTER {activeLetter.number}
              </span>

              <span>
                {activeLetter.label}
              </span>
            </div>

            <div className="letter-reader__content">
              <p className="letter-reader__hello">
                My bacha,
              </p>

              <h3>{activeLetter.title}</h3>

              <div className="letter-reader__text">
                {activeLetter.text.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="letter-reader__signature">
                <span>with love,</span>
                <strong>Abhi ♥</strong>
              </div>
            </div>

            <div className="letter-reader__navigation">
              <button
                type="button"
                onClick={previousLetter}
                data-cursor="BACK"
                aria-label="Previous letter"
              >
                ←
              </button>

              <span>
                {activeLetter.number} /{" "}
                {String(letters.length).padStart(2, "0")}
              </span>

              <button
                type="button"
                onClick={nextLetter}
                data-cursor="NEXT"
                aria-label="Next letter"
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default LetterBox;