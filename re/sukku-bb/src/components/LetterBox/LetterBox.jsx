import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const letters = [
    {
        id: 1,
        label: "A little note",
        title: "For you",
        text: `There are some things that are difficult to say in a normal conversation.

So I thought I would write them down instead.

You are one of the most beautiful parts of my life, and I hope you always know how special you are to me.`,
    },

    {
        id: 2,
        label: "A memory",
        title: "Remember this?",
        text: `Sometimes I randomly remember the smallest moments we have shared.

A conversation, a laugh, a walk, or simply sitting together.

Those little things are the memories I want to keep forever.`,
    },

    {
        id: 3,
        label: "A promise",
        title: "One thing I know",
        text: `Life will change and we will grow, but I hope we always keep finding our way back to each other.

Whatever comes next, I want to make more memories with you.`,
    },
];

function LetterBox() {
    const sectionRef = useRef(null);

    const [activeLetter, setActiveLetter] = useState(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".letters-heading > *", {
                opacity: 0,
                y: 50,
                stagger: 0.15,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".letters-heading",
                    start: "top 80%",
                },
            });

            gsap.from(".letter-envelope", {
                opacity: 0,
                y: 80,
                rotation: 3,
                stagger: 0.15,
                duration: 1,
                ease: "back.out(1.3)",
                scrollTrigger: {
                    trigger: ".letters-grid",
                    start: "top 80%",
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const openLetter = (letter) => {
        setActiveLetter(letter);
    };

    const closeLetter = () => {
        setActiveLetter(null);
    };

    return (
        <section
            ref={sectionRef}
            className="letters-section"
        >
            <div className="letters-heading">
                <span className="eyebrow">
                    Words I wanted you to have
                </span>

                <h2>
                    A few <em>letters.</em>
                </h2>

                <p>
                    Some things deserve more than a text message.
                    <br />
                    So I left them here for you.
                </p>
            </div>

            <div className="letters-grid">
                {letters.map((letter, index) => (
                    <button
                        key={letter.id}
                        className={`letter-envelope envelope-${index + 1} interactive`}
                        onClick={() => openLetter(letter)}
                    >
                        <div className="envelope-back">
                            <span className="envelope-number">
                                {String(letter.id).padStart(2, "0")}
                            </span>

                            <div className="envelope-flap" />

                            <div className="envelope-heart">
                                ♥
                            </div>
                        </div>

                        <div className="envelope-label">
                            <span>{letter.label}</span>
                            <strong>Open me</strong>
                        </div>
                    </button>
                ))}
            </div>

            <div className="letters-footer">
                <span>Three little envelopes</span>
                <span>♥</span>
            </div>

            {activeLetter && (
                <div
                    className="letter-overlay"
                    onClick={closeLetter}
                >
                    <div
                        className="letter-paper"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            className="letter-close interactive"
                            onClick={closeLetter}
                            aria-label="Close letter"
                        >
                            ×
                        </button>

                        <div className="letter-paper-top">
                            <span>
                                {activeLetter.label}
                            </span>

                            <span>
                                ♥
                            </span>
                        </div>

                        <h3>
                            {activeLetter.title}
                        </h3>

                        <div className="letter-divider" />

                        <p>
                            {activeLetter.text}
                        </p>

                        <div className="letter-signature">
                            With love,
                            <strong>Abhi ♥</strong>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default LetterBox;