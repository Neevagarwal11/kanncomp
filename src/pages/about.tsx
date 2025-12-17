import { useEffect, useRef } from "react";
import Abouthero from "./abouthero";
import Aboutpage2 from "./aboutpage2";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger);

function about() {


    const containerRef = useRef<HTMLElement | null>(null);
   // Hero to Page2 Parallax Effect
      useEffect(() => {
    const ctx = gsap.context(() => {
      const hero = ".hero-section";
      const heroBg = ".hero-bg";
      const heroContent = ".hero-content";

      // Parallax background: move bg slower than scroll
      gsap.to(heroBg, {
        yPercent: 50, // background moves down as user scrolls down
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top", // while hero scrolls out of view
          scrub: 0.3, // smooth scrub for buttery feel
        },
      });

      // Content: gently move up and fade as the hero leaves
      gsap.to(heroContent, {
        y: 40,
        opacity: 1,
        // ease: "power1.out",
        scrollTrigger: {
          trigger: hero,
          start: "center center",
          end: "bottom top",
          scrub: 0.3,
        },
      });

      // Optional: pin the hero for a tiny moment (gives cinematic transition)
      // Uncomment if you want a pinned effect:
      
      // ScrollTrigger.create({
      //   trigger: hero,
      //   start: "top top",
      //   end: "+=50",
      //   pin: true,
      //   pinSpacing: true,
      // });
      
    }, [containerRef]);

    return () => ctx.revert();
  }, []);


  return (
    <main ref={containerRef as any}>
    <Abouthero/>
    <Aboutpage2/>
    </main>
  );
}

export default about;
