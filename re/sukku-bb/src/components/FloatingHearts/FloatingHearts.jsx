import { useEffect, useRef } from "react";
import gsap from "gsap";

const hearts = Array.from({ length: 18 });

function FloatingHearts() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    const elements = container.querySelectorAll(".floating-heart");

    elements.forEach((heart, index) => {
      gsap.set(heart, {
        left: `${Math.random() * 100}%`,
        top: `${70 + Math.random() * 40}%`,
        scale: 0.5 + Math.random() * 0.7,
        opacity: 0.15 + Math.random() * 0.3,
      });

      gsap.to(heart, {
        y: `-${window.innerHeight + 300}`,
        x: `random(-80, 80)`,
        rotation: `random(-30, 30)`,
        duration: 10 + Math.random() * 12,
        delay: index * 0.7,
        repeat: -1,
        ease: "none",
      });
    });

    return () => {
      gsap.killTweensOf(elements);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="floating-hearts"
      aria-hidden="true"
    >
      {hearts.map((_, index) => (
        <span key={index} className="floating-heart">
          ♥
        </span>
      ))}
    </div>
  );
}

export default FloatingHearts;