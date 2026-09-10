import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    date: "21 JULY 2021",
    title: "Where it all started",
    description:
      "Sometimes you don't realize that a small moment is going to become the beginning of something important.",
    number: "01",
  },

  {
    date: "29 OCTOBER 2024",
    title: "Finding our way back",
    description:
      "After all that time, somehow our paths crossed again.",
    number: "02",
  },

  {
    date: "02 FEBRUARY 2025",
    title: "Our story officially began",
    description:
      "A date that turned a beautiful connection into something more.",
    number: "03",
  },

  {
    date: "16 JUNE 2025",
    title: "200 KM became 3 KM",
    description:
      "Suddenly the distance wasn't 200 kilometres anymore. You were just a few kilometres away.",
    number: "04",
  },

  {
    date: "23 OCTOBER 2025",
    title: "Birthday week",
    description:
      "A week filled with little moments, laughter, food, conversations and memories.",
    number: "05",
  },

  {
    date: "27 OCTOBER 2025",
    title: "Your special day",
    description:
      "Your birthday, but somehow it felt like a celebration for me too.",
    number: "06",
  },

  {
    date: "29 OCTOBER 2025",
    title: "Until the next memory",
    description:
      "Another goodbye, but definitely not the end of our story.",
    number: "07",
  },
];

function StoryTimeline() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".timeline-item");

      items.forEach((item) => {
        const content = item.querySelector(".timeline-content");
        const dot = item.querySelector(".timeline-dot");
        const number = item.querySelector(".timeline-number");

        gsap.fromTo(
          content,
          {
            opacity: 0,
            y: 80,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 75%",
              end: "top 40%",
              scrub: 1,
            },
          }
        );

        gsap.fromTo(
          dot,
          {
            scale: 0,
          },
          {
            scale: 1,
            duration: 0.6,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: item,
              start: "top 75%",
            },
          }
        );

        gsap.fromTo(
          number,
          {
            opacity: 0,
            x: -20,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: item,
              start: "top 75%",
            },
          }
        );
      });

      gsap.fromTo(
        ".timeline-line-progress",
        {
          scaleY: 0,
        },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: ".timeline-track",
            start: "top 65%",
            end: "bottom 65%",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="story-section"
    >
      <div className="story-header">
        <span className="eyebrow">The chapters so far</span>

        <h2 className="story-title">
          Our <em>story</em>
        </h2>

        <p>
          A few dates.
          <br />
          A lot of memories.
        </p>
      </div>

      <div className="timeline-track">
        <div className="timeline-line" />
        <div className="timeline-line-progress" />

        {timelineData.map((item, index) => (
          <div
            className={`timeline-item ${
              index % 2 === 0 ? "timeline-left" : "timeline-right"
            }`}
            key={item.number}
          >
            <div className="timeline-number">
              {item.number}
            </div>

            <div className="timeline-dot">
              <span />
            </div>

            <div className="timeline-content">
              <span className="timeline-date">
                {item.date}
              </span>

              <h3>{item.title}</h3>

              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="story-end">
        <span>And this is only the beginning...</span>
        <div>♥</div>
      </div>
    </section>
  );
}

export default StoryTimeline;