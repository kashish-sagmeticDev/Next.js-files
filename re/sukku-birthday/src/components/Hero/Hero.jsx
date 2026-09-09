import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

function Hero() {
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: 0.2,
      });

      tl.from(".hero-eyebrow", {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "power3.out",
      })
        .from(
          ".hero-title-line",
          {
            opacity: 0,
            y: 80,
            stagger: 0.12,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.3"
        )
        .from(
          ".hero-description",
          {
            opacity: 0,
            y: 20,
            duration: 0.7,
          },
          "-=0.5"
        )
        .from(
          ".hero-photo",
          {
            opacity: 0,
            scale: 0.85,
            rotation: -5,
            duration: 1.2,
            ease: "back.out(1.4)",
          },
          "-=0.5"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero">
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">
            Today is all about you
          </p>

          <h1 className="hero-title">
            <span className="hero-title-line">
              Happy Birthday,
            </span>

            <span className="hero-title-line hero-name">
              Sukku <span>♥</span>
            </span>
          </h1>

          <p className="hero-description">
            A little corner of the internet,
            <br />
            made just for you.
          </p>

          <div className="hero-actions">
            <button className="hero-button interactive">
              Scroll with me ↓
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="photo-decoration" />

          <div className="hero-photo">
            <div className="photo-placeholder">
              <span>Your photo</span>
            </div>

            <p>my favourite person ♡</p>
          </div>
        </div>
      </div>

      <div className="hero-scroll">
        <span>Scroll to begin</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}

export default Hero;