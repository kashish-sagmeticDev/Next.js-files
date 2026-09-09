import { useEffect, useRef } from "react";
import gsap from "gsap";

function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    const moveCursor = (event) => {
      gsap.to(cursor, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.08,
        ease: "power2.out",
      });

      gsap.to(follower, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.35,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);

    const interactiveElements = document.querySelectorAll(
      "button, a, .interactive"
    );

    const enter = () => {
      gsap.to(follower, {
        scale: 1.8,
        opacity: 0.35,
        duration: 0.25,
      });
    };

    const leave = () => {
      gsap.to(follower, {
        scale: 1,
        opacity: 0.2,
        duration: 0.25,
      });
    };

    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", enter);
      element.addEventListener("mouseleave", leave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);

      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", enter);
        element.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor-dot" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  );
}

export default CustomCursor;