import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after the page has loaded
    const refresh = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("load", refresh);

    // Also refresh after images have had time to affect layout
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      window.removeEventListener("load", refresh);
      clearTimeout(refreshTimer);

      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return null;
}

export default useLenis;