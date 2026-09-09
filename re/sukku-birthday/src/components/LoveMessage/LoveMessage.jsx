import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function LoveMessage() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray(".love-message__line");

      gsap.fromTo(
        lines,
        {
          opacity: 0.15,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.35,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".love-message__signature",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 55%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="love-message" ref={sectionRef}>
      <div className="love-message__inner">
        <p className="love-message__eyebrow">
          A little something from me <span style={{ marginLeft: '4px' }}>♥</span>
        </p>

        <div className="love-message__text">
          <p className="love-message__line">
            If I had to describe what you mean to me,
          </p>

          <p className="love-message__line">
            I probably wouldn&apos;t find the right words.
          </p>

          <p className="love-message__line">
            So instead, I&apos;ll just say thank you.
          </p>

          <p className="love-message__line">
            Thank you for being there,
          </p>

          <p className="love-message__line">
            for every laugh, every conversation,
          </p>

          <p className="love-message__line">
            and every little moment that became
          </p>

          <p className="love-message__line">
            a beautiful memory.
          </p>
        </div>

        <p className="love-message__signature">
          with love, Abhi <span>♥</span>
        </p>
      </div>
    </section>
  );
}

export default LoveMessage;
