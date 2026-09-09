import { useEffect, useRef } from "react";
import gsap from "gsap";

function CustomCursor() {
  const dotRef = useRef(null);
  const followerRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    // Disable custom cursor on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const dot = dotRef.current;
    const follower = followerRef.current;
    const label = labelRef.current;

    const moveCursor = (event) => {
      gsap.to(dot, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.08,
        ease: "power2.out",
      });

      gsap.to(follower, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.45,
        ease: "power3.out",
      });
    };

    const handleEnter = (event) => {
      const target = event.currentTarget;

      const cursorText =
        target.dataset.cursor ||
        (target.tagName === "IMG" ? "VIEW" : "OPEN");

      label.textContent = cursorText;

      gsap.to(follower, {
        width: 82,
        height: 82,
        duration: 0.3,
        ease: "power3.out",
      });

      gsap.to(dot, {
        scale: 0,
        duration: 0.2,
      });

      gsap.to(label, {
        opacity: 1,
        scale: 1,
        duration: 0.25,
        ease: "power3.out",
      });
    };

    const handleLeave = () => {
      gsap.to(follower, {
        width: 38,
        height: 38,
        duration: 0.3,
        ease: "power3.out",
      });

      gsap.to(dot, {
        scale: 1,
        duration: 0.2,
      });

      gsap.to(label, {
        opacity: 0,
        scale: 0.8,
        duration: 0.2,
      });
    };

    window.addEventListener("mousemove", moveCursor);

    const interactiveElements = document.querySelectorAll(
      "button, a, [data-cursor], .interactive"
    );

    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", handleEnter);
      element.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);

      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleEnter);
        element.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />

      <div className="cursor-follower" ref={followerRef}>
        <span ref={labelRef} />
      </div>
    </>
  );
}

export default CustomCursor;