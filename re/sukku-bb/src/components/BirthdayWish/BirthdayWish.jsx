import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function BirthdayWish() {
  const sectionRef = useRef(null);
  const flameRef = useRef(null);
  const wishRef = useRef(null);
  const glowRef = useRef(null);

  const [blown, setBlown] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".birthday-heading > *", {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".birthday-heading",
          start: "top 80%",
        },
      });

      gsap.from(".birthday-cake", {
        opacity: 0,
        y: 80,
        scale: 0.8,
        duration: 1.1,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: ".birthday-stage",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const blowCandle = () => {
    if (blown) return;

    setBlown(true);

    const tl = gsap.timeline();

    tl.to(flameRef.current, {
      scale: 0,
      opacity: 0,
      y: -20,
      duration: 0.35,
      ease: "power2.in",
    })
      .to(
        glowRef.current,
        {
          scale: 0,
          opacity: 0,
          duration: 0.3,
        },
        "<"
      )
      .fromTo(
        wishRef.current,
        {
          opacity: 0,
          y: 40,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
        }
      );
  };

  return (
    <section
      ref={sectionRef}
      className="birthday-section"
    >
      <div className="birthday-heading">
        <span className="eyebrow">
          Before you leave
        </span>

        <h2>
          One little
          <br />
          <em>wish.</em>
        </h2>

        <p>
          I could write a hundred things here.
          <br />
          But there's really only one thing I wish for you.
        </p>
      </div>

      <div className="birthday-stage">

        <div className="birthday-cake">

          <div className="cake-candle">

            <div
              ref={glowRef}
              className="candle-glow"
            />

            <button
              ref={flameRef}
              className="candle-flame interactive"
              onClick={blowCandle}
              aria-label="Blow out candle"
            >
              <span />
            </button>

            <div className="candle-stick" />
          </div>

          <div className="cake-top">
            <span>♥</span>
            <span>♥</span>
            <span>♥</span>
          </div>

          <div className="cake-body">
            <div className="cake-line" />
            <div className="cake-line" />
          </div>

          <div className="cake-plate" />

        </div>

        <p className="candle-instruction">
          {blown
            ? "Make your own wish too ♥"
            : "Click the flame"}
        </p>

        <div
          ref={wishRef}
          className="birthday-wish"
        >
          <span className="eyebrow">
            My wish for you
          </span>

          <h3>
            I hope life gives you
            <br />
            <em>everything you deserve.</em>
          </h3>

          <p>
            I hope you keep smiling,
            keep dreaming, keep growing,
            and keep being the wonderful person
            you are.
          </p>

          <div className="wish-heart">
            ♥
          </div>

          <span className="wish-signature">
            Happy Birthday, Sukku.
          </span>
        </div>

      </div>
    </section>
  );
}

export default BirthdayWish;