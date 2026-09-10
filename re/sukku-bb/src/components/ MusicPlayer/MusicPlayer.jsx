import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

function MusicPlayer() {
  const audioRef = useRef(null);
  const panelRef = useRef(null);
  const visualRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioError, setAudioError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);

      if (!audio.duration) return;

      setDuration(audio.duration);
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    };

    const handleError = () => {
      setPlaying(false);
      setAudioError(true);
    };

    audio.addEventListener("loadedmetadata", handleMetadata);
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("loadedmetadata", handleMetadata);
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  useEffect(() => {
    if (!visualRef.current) return;

    if (playing) {
      gsap.to(visualRef.current, {
        scale: 1.08,
        rotation: 360,
        duration: 8,
        repeat: -1,
        ease: "none",
      });
    } else {
      gsap.killTweensOf(visualRef.current);

      gsap.to(visualRef.current, {
        scale: 1,
        rotation: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [playing]);

  const toggleMusic = async () => {
    const audio = audioRef.current;

    if (!audio || audioError) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    try {
      await audio.play();
      setPlaying(true);
    } catch (error) {
      console.error(
        "Music could not start:",
        error
      );
    }
  };

  const openMusic = () => {
    setOpen(true);

    requestAnimationFrame(() => {
      gsap.fromTo(
        panelRef.current,
        {
          opacity: 0,
          y: 60,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
        }
      );
    });
  };

  const closeMusic = () => {
    gsap.to(panelRef.current, {
      opacity: 0,
      y: 40,
      scale: 0.96,
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => {
        setOpen(false);
      },
    });
  };

  const handleProgressClick = (event) => {
    const audio = audioRef.current;

    if (!audio || !duration) return;

    const rect =
      event.currentTarget.getBoundingClientRect();

    const clickPosition =
      event.clientX - rect.left;

    const percentage =
      clickPosition / rect.width;

    audio.currentTime = percentage * duration;

    setCurrentTime(audio.currentTime);
    setProgress(percentage * 100);
  };

  const formatTime = (time) => {
    if (!time || Number.isNaN(time)) {
      return "0:00";
    }

    const minutes = Math.floor(time / 60);

    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");

    return `${minutes}:${seconds}`;
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/our-song.mp3"
        preload="metadata"
      />

      {/* Floating button */}

      <button
        className={`music-player ${
          playing ? "is-playing" : ""
        }`}
        onClick={openMusic}
      >
        <span className="music-icon">
          {playing ? "♫" : "♪"}
        </span>

        <span>
          {playing
            ? "Our song is playing"
            : "Play our song"}
        </span>
      </button>

      {/* Music panel */}

      {open && (
        <div
          className="music-overlay"
          onClick={closeMusic}
        >
          <div
            ref={panelRef}
            className="music-panel"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              className="music-close interactive"
              onClick={closeMusic}
            >
              ×
            </button>

            <div className="music-panel-content">

              <span className="eyebrow">
                A little soundtrack
              </span>

              <div
                ref={visualRef}
                className={`music-disc ${
                  playing ? "playing" : ""
                }`}
              >
                <div className="music-disc-inner">
                  <span>♥</span>
                </div>
              </div>

              <h2>
                Our <em>song.</em>
              </h2>

              <p className="music-description">
                {audioError
                  ? "Add a valid MP3 at public/music/our-song.mp3 to play this song."
                  : "A little song that can always remind me of you."}
              </p>

              <div className="music-progress-area">

                <div
                  className="music-progress"
                  onClick={handleProgressClick}
                >
                  <div
                    className="music-progress-filled"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>

                <div className="music-times">
                  <span>
                    {formatTime(
                      currentTime
                    )}
                  </span>

                  <span>
                    {formatTime(
                      duration
                    )}
                  </span>
                </div>

              </div>

              <button
                className="music-main-button interactive"
                onClick={toggleMusic}
              >
                <span>
                  {playing ? "❚❚" : "▶"}
                </span>

                <span>
                  {playing
                    ? "Pause"
                    : "Play our song"}
                </span>
              </button>

            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MusicPlayer;