import { Hero } from "../components/Hero";
import Page2 from "./page2";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import Page3 from "./page3";
import Page4 from './page4' 
import Page5 from './page5'

gsap.registerPlugin(ScrollTrigger);

export function Home() {
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
      
    }, containerRef);

    return () => ctx.revert();
  }, []);


  return (
    <main  ref={containerRef as any} className="bg-[#FFFBF5]">
      <Hero/>
      <Page2/>
      <Page3/>
      <Page4/>
      <Page5/>
    
    </main>
  );
}
