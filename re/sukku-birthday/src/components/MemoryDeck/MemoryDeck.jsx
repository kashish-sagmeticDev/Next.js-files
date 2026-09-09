import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-cards";

import { memories } from "../../data/memories";

gsap.registerPlugin(ScrollTrigger);

function MemoryDeck() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".memory-heading > *", {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".memory-heading",
          start: "top 80%",
        },
      });

      gsap.from(".memory-deck-wrapper", {
        opacity: 0,
        scale: 0.9,
        y: 80,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".memory-deck-wrapper",
          start: "top 80%",
        },
      });

      gsap.from(".memory-info", {
        opacity: 0,
        x: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".memory-info",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="memory-section"
    >
      <div className="memory-heading">
        <span className="eyebrow">
          Little pieces of us
        </span>

        <h2>
          10 moments,
          <br />
          <em>one story.</em>
        </h2>

        <p>
          Some memories are ordinary.
          <br />
          Until you realize how special they became.
        </p>
      </div>

      <div className="memory-layout">

        <div className="memory-deck-wrapper">
          <Swiper
            effect="cards"
            grabCursor={true}
            modules={[EffectCards]}
            className="memory-swiper"
            cardsEffect={{
              perSlideOffset: 10,
              perSlideRotate: 2,
              rotate: true,
              slideShadows: false,
            }}
          >
            {memories.map((memory) => (
              <SwiperSlide key={memory.id}>
                <div className="memory-card">

                  <div className="memory-image">
                    <img
                      src={memory.image}
                      alt={memory.title}
                    />

                    <span className="memory-number">
                      {String(memory.id).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="memory-card-info">
                    <span className="memory-date">
                      {memory.date}
                    </span>

                    <h3>
                      {memory.title}
                    </h3>

                    <p>
                      {memory.text}
                    </p>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="deck-instruction">
            <span>←</span>
            Drag / swipe the cards
            <span>→</span>
          </div>
        </div>

        <div className="memory-info">

          <span className="memory-side-label">
            MEMORY DECK
          </span>

          <div className="memory-side-line" />

          <p>
            Ten little chapters.
            <br />
            Ten reasons to smile.
          </p>

          <p>
            And probably a hundred
            more memories waiting
            to be made.
          </p>

          <div className="memory-heart">
            ♥
          </div>

        </div>

      </div>
    </section>
  );
}

export default MemoryDeck;