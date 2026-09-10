import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

function OpeningCurtain() {
  const [opened, setOpened] = useState(false);

  const overlayRef = useRef(null);
  const leftCurtainRef = useRef(null);
  const rightCurtainRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline();

    tl.fromTo(
      contentRef.current,
      {
        opacity: 0,
        y: 25,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
      }
    );

    return () => {
      document.body.style.overflow = "";
      tl.kill();
    };
  }, []);

  const openWebsite = () => {
    if (opened) return;

    setOpened(true);

    const tl = gsap.timeline({
      onComplete: () => {
        if (overlayRef.current) {
          overlayRef.current.style.display = "none";
        }

        document.body.style.overflow = "";
      },
    });

    tl.to(contentRef.current, {
      opacity: 0,
      y: -30,
      duration: 0.45,
      ease: "power2.in",
    })
      .to(
        leftCurtainRef.current,
        {
          xPercent: -100,
          duration: 1.4,
          ease: "power4.inOut",
        },
        "-=0.1"
      )
      .to(
        rightCurtainRef.current,
        {
          xPercent: 100,
          duration: 1.4,
          ease: "power4.inOut",
        },
        "<"
      )
      .to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.5,
        },
        "-=0.3"
      );
  };

  return (
    <div ref={overlayRef} className="opening">
      <div ref={leftCurtainRef} className="curtain curtain-left" />
      <div ref={rightCurtainRef} className="curtain curtain-right" />

      <div ref={contentRef} className="opening-content">
        <p className="eyebrow">For someone very special</p>

        <h1 className="opening-title">
          Something
          <br />
          <em>special</em> is waiting...
        </h1>

        <p className="opening-subtitle">
          I made a little something for you.
        </p>

        <button
          className="open-button interactive"
          onClick={openWebsite}
        >
          <span>Click to open</span>
          <span className="button-heart">♥</span>
        </button>
      </div>
    </div>
  );
}

export default OpeningCurtain;