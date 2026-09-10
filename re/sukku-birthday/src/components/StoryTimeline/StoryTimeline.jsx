import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const timeline = [
  {
    date: "21 JUL 2021",
    title: "The first little connection",
    text: "A small beginning that neither of us knew would become such an important part of our story.",
  },
  {
    date: "29 OCT 2024",
    title: "Finding each other again",
    text: "After all that time, somehow our paths crossed again.",
  },
  {
    date: "02 FEB 2025",
    title: "Us",
    text: "The day our story officially became ours.",
    special: true,
  },
  {
    date: "16 JUN 2025",
    title: "200 KM → 3 KM",
    text: "Summer training brought you so much closer. From being far away to having you just a few kilometres from me.",
    distance: true,
  },
  {
    date: "23 OCT 2025",
    title: "Birthday week",
    text: "A whole week of little moments, staying together, cooking, talking, laughing and making memories.",
  },
  {
    date: "27 OCT 2025",
    title: "Your birthday",
    text: "A day I wanted to make as special as you are.",
    special: true,
  },
  {
    date: "29 OCT 2025",
    title: "Until the next memory",
    text: "Another goodbye, but definitely not the end of our story.",
  },
];

function StoryTimeline() {
  const sectionRef = useRef(null);
  const progressRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".story__eyebrow",
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
        ".story__title",
        {
          opacity: 0,
          y: 45,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".story__item",
        {
          opacity: 0,
          y: 45,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".story__timeline",
            start: "top 75%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        progressRef.current,
        {
          height: "0%",
        },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: ".story__timeline",
            start: "top 65%",
            end: "bottom 70%",
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="story" ref={sectionRef}>
      <div className="story__intro">
        <p className="story__eyebrow">Our story</p>

        <h2 className="story__title">
          Some dates become
          <br />
          <span>memories.</span>
        </h2>
      </div>

      <div className="story__timeline">
        <div className="story__line">
          <div className="story__progress" ref={progressRef} />
        </div>

        {timeline.map((item, index) => (
          <article
            className={`story__item ${
              index % 2 === 0
                ? "story__item--left"
                : "story__item--right"
            }`}
            key={item.date}
          >
            <div className="story__dot">
              <span />
            </div>

            <div className="story__card">
              <p className="story__date">{item.date}</p>

              <h3>{item.title}</h3>

              <p className="story__text">{item.text}</p>

              {item.distance && (
                <div className="story__distance">
                  <strong>200 KM</strong>
                  <span>→</span>
                  <strong>3 KM</strong>
                </div>
              )}

              {item.special && (
                <span className="story__heart">♥</span>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default StoryTimeline;