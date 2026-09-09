import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import heroImage from "../../assets/photos/hero.jpg";

function Hero() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const photoRef = useRef(null);
  const scrollRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .fromTo(
          ".hero__eyebrow",
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          }
        )
        .fromTo(
          ".hero__title-line",
          {
            opacity: 0,
            y: 80,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.12,
          },
          "-=0.3"
        )
        .fromTo(
          ".hero__description",
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          "-=0.4"
        )
        .fromTo(
          photoRef.current,
          {
            opacity: 0,
            scale: 0.88,
            y: 40,
            rotation: -4,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            rotation: 0,
            duration: 1.1,
          },
          "-=0.6"
        )
        .fromTo(
          scrollRef.current,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.6,
          },
          "-=0.3"
        );

      // Very subtle photo movement
      gsap.to(photoRef.current, {
        y: -10,
        rotation: 1.5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Scroll indicator
      gsap.to(".hero__scroll-dot", {
        y: 12,
        duration: 1.3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={sectionRef}>
      <div className="hero__content" ref={contentRef}>
        <p className="hero__eyebrow">
          A little something for you
        </p>

        <h1 className="hero__title">
          <span className="hero__title-line">Happy Birthday,</span>
          <span className="hero__title-line hero__title-name">
            Sukku <span>♥</span>
          </span>
        </h1>

        <p className="hero__description">
          Today is about you,
          <br />
          but I couldn&apos;t let the day pass
          without telling you how special you are.
        </p>
      </div>

      <div className="hero__photo-wrap">
        <div className="hero__photo" ref={photoRef}>
          <img
            src={heroImage}
            alt="Sukku"
            data-cursor="VIEW"
          />
        </div>
      </div>

      <div className="hero__scroll" ref={scrollRef}>
        <span>Scroll with me</span>

        <div className="hero__scroll-line">
          <span className="hero__scroll-dot" />
        </div>
      </div>
    </section>
  );
}

export default Hero;