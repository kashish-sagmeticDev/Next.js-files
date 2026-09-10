import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const moments = [
  {
    id: 1,
    icon: "🎬",
    label: "Movie Days",
    title: "Our little movie moments",
    text: "Somewhere between the screen, snacks and random conversations, another memory was created.",
    position: "moment-one",
  },
  {
    id: 2,
    icon: "🍦",
    label: "Favourite Things",
    title: "The little things",
    text: "Sometimes happiness is just good food, a favourite ice cream and the right person beside you.",
    position: "moment-two",
  },
  {
    id: 3,
    icon: "🌧️",
    label: "Rain",
    title: "That rainy day",
    text: "Not every memorable day needs a plan. Sometimes the weather writes the story for us.",
    position: "moment-three",
  },
  {
    id: 4,
    icon: "🏠",
    label: "Together",
    title: "The days at home",
    text: "Cooking, talking, watching something until late and doing absolutely ordinary things together.",
    position: "moment-four",
  },
  {
    id: 5,
    icon: "📸",
    label: "Photos",
    title: "Too many pictures",
    text: "Because apparently one photo is never enough when the moment feels this good.",
    position: "moment-five",
  },
  {
    id: 6,
    icon: "❤️",
    label: "Us",
    title: "Just us",
    text: "The best part of every memory is simply having you in it.",
    position: "moment-six",
  },
];

function SpecialMoments() {
  const sectionRef = useRef(null);
  const [activeMoment, setActiveMoment] = useState(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".moments-heading > *", {
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".moments-heading",
          start: "top 80%",
        },
      });

      gsap.from(".moment-item", {
        opacity: 0,
        scale: 0.5,
        y: 50,
        stagger: 0.12,
        duration: 0.8,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ".moments-space",
          start: "top 75%",
        },
      });

      gsap.to(".moment-orbit", {
        rotation: 360,
        duration: 40,
        repeat: -1,
        ease: "none",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const openMoment = (moment) => {
    setActiveMoment(moment);
  };

  const closeMoment = () => {
    setActiveMoment(null);
  };

  return (
    <section
      ref={sectionRef}
      className="moments-section"
    >
      <div className="moments-heading">
        <span className="eyebrow">
          The little things
        </span>

        <h2>
          Special <em>moments.</em>
        </h2>

        <p>
          Not every memory needs a date.
          <br />
          Some are just feelings.
        </p>
      </div>

      <div className="moments-space">

        <div className="moment-orbit orbit-one" />
        <div className="moment-orbit orbit-two" />

        <div className="moment-center">
          <span>our</span>
          <strong>little world</strong>
          <div>♥</div>
        </div>

        {moments.map((moment) => (
          <button
            key={moment.id}
            className={`moment-item ${moment.position} interactive`}
            onClick={() => openMoment(moment)}
          >
            <span className="moment-icon">
              {moment.icon}
            </span>

            <span className="moment-label">
              {moment.label}
            </span>
          </button>
        ))}
      </div>

      {activeMoment && (
        <div
          className="moment-modal"
          onClick={closeMoment}
        >
          <div
            className="moment-modal-card"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="moment-close interactive"
              onClick={closeMoment}
              aria-label="Close"
            >
              ×
            </button>

            <span className="eyebrow">
              {activeMoment.label}
            </span>

            <div className="moment-modal-icon">
              {activeMoment.icon}
            </div>

            <h3>
              {activeMoment.title}
            </h3>

            <p>
              {activeMoment.text}
            </p>

            <span className="moment-modal-heart">
              ♥
            </span>
          </div>
        </div>
      )}
    </section>
  );
}

export default SpecialMoments;