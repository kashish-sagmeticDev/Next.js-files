import { useLayoutEffect, useRef, useState } from "react";
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
  const swiperRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".memory__eyebrow",
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".memory__title",
        {
          opacity: 0,
          y: 45,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".memory__deck-area",
        {
          opacity: 0,
          y: 50,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".memory__deck-area",
            start: "top 80%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSwiper = (swiper) => {
    swiperRef.current = swiper;
    setActiveIndex(swiper.activeIndex);
  };

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  const goPrevious = () => {
    swiperRef.current?.slidePrev();
  };

  const goNext = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <section className="memory" ref={sectionRef}>
      <div className="memory__intro">
        <p className="memory__eyebrow">
          A few of my favourite memories
        </p>

        <h2 className="memory__title">
          Ten little pieces
          <br />
          <span>of us.</span>
        </h2>

        <p className="memory__hint">
          Swipe, drag or use the arrows
        </p>
      </div>

      <div className="memory__deck-area">
        <Swiper
          modules={[EffectCards]}
          effect="cards"
          grabCursor={true}
          slidesPerView={1}
          centeredSlides={true}
          onSwiper={handleSwiper}
          onSlideChange={handleSlideChange}
          className="memory__swiper"
          cardsEffect={{
            perSlideOffset: 8,
            perSlideRotate: 2,
            rotate: true,
            slideShadows: false,
          }}
        >
          {memories.map((memory) => (
            <SwiperSlide key={memory.id}>
              <article className="memory-card">
                <div className="memory-card__image">
                  <img
                    src={memory.image}
                    alt={memory.title}
                    data-cursor="VIEW"
                  />
                </div>

                <div className="memory-card__content">
                  <p className="memory-card__date">
                    {memory.date}
                  </p>

                  <h3>{memory.title}</h3>

                  <p>{memory.text}</p>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation */}
        <div className="memory__navigation">
          <button
            type="button"
            className="memory__arrow"
            onClick={goPrevious}
            disabled={activeIndex === 0}
            data-cursor="BACK"
            aria-label="Previous memory"
          >
            ←
          </button>

          <div className="memory__counter">
            <span>
              {String(activeIndex + 1).padStart(2, "0")}
            </span>

            <i>/</i>

            <span>
              {String(memories.length).padStart(2, "0")}
            </span>
          </div>

          <button
            type="button"
            className="memory__arrow"
            onClick={goNext}
            disabled={activeIndex === memories.length - 1}
            data-cursor="NEXT"
            aria-label="Next memory"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}

export default MemoryDeck;