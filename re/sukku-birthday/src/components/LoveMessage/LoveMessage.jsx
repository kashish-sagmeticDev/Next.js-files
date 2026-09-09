import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function LoveMessage() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray(".love-line");

      gsap.fromTo(
        lines,
        {
          opacity: 0.12,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.18,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".love-message-content",
            start: "top 75%",
            end: "bottom 45%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        ".love-small-heart",
        {
          scale: 0,
          rotation: -45,
        },
        {
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: ".love-message-content",
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="love-message-section"
    >
      <div className="love-message-inner">

        <div className="love-message-heading">
          <span className="eyebrow">
            A little something from me
          </span>

          <div className="love-small-heart">
            ♥
          </div>
        </div>

        <div className="love-message-content">
          <p className="love-line">
            If I had to describe what you mean to me,
          </p>

          <p className="love-line serif">
            I probably wouldn't find the right words.
          </p>

          <p className="love-line">
            So instead, I'll just say thank you.
          </p>

          <p className="love-line">
            Thank you for being there,
          </p>

          <p className="love-line serif">
            for every laugh, every conversation,
          </p>

          <p className="love-line">
            and every little moment that became
          </p>

          <p className="love-line serif love-highlight">
            a beautiful memory.
          </p>
        </div>

        <div className="love-message-signature">
          <span>with love,</span>
          <strong>Abhi ♥</strong>
        </div>

      </div>
    </section>
  );
}

export default LoveMessage;