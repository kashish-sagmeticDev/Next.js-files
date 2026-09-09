import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Ending() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const heartRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );

      gsap.to(heartRef.current, {
        scale: 1.12,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="ending" ref={sectionRef}>
      <div className="ending__content" ref={contentRef}>
        <div className="ending__heart" ref={heartRef}>
          ♥
        </div>

        <p className="ending__small">
          And this is not the end...
        </p>

        <h2>
          Happy Birthday,
          <br />
          Sukku.
        </h2>

        <p className="ending__message">
          Here&apos;s to everything we have lived,
          <br />
          and everything we haven&apos;t lived yet.
        </p>

        <div className="ending__line" />

        <p className="ending__signature">
          made with love by Abhi ❤️
        </p>
      </div>
    </section>
  );
}

export default Ending;