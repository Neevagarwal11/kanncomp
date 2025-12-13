// src/pages/page2.tsx
import React, { useRef, type JSX } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { Dot, MapPin } from "lucide-react";
import iso from "../assets/iso-removebg-preview.png";
import since from "../assets/since2010.png";
import johnsonlogo from "../assets/Johnson-Lifts-LOGO-1024x576-removebg-preview.png";

export default function Page2(): JSX.Element {
  const ref = useRef<HTMLElement | null>(null);

  // Use section-local scroll progress. Adjust offsets to tune when progress maps to 0..1.
  // ["start end", "end start"] means: when top of target hits bottom of viewport -> 0,
  // and when bottom of target hits top of viewport -> 1 (full travel while the section is in view).
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) {
    return (
      <section ref={ref} className="h-screen bg-[#FFFBF5]">
        {/* top header */}
        <div className="w-full h-[10vh] flex flex-row justify-between">
          <div className="leftside h-full w-[20vw] flex p-4 justify-center flex-row ">
            <Dot className="animate-pulse" size={30} color="black" />
            <p>Featured</p>
          </div>

          <div className="rightside gap-6 w-[60vw] h-full flex items-start justify-end pr-22 p-1 flex-row">
            <div>
              <img src={iso} alt="ISO Certification" className="w-[3vw]" />
            </div>
            <div>
              <img src={since} alt="Since 2010" className="w-[3vw] scale-220 " />
            </div>
            <div className="flex gap-2 p-3 font-[secondary] items-center">
              <MapPin />
              <p>Sri Krishna Nagar,Madhavaram</p>
            </div>
          </div>
        </div>

        <div className="w-full  flex flex-col">
          <div className=" text-6xl flex items-center justify-center h-[30vh] font-[primary]">
            Trusted by
          </div>

          <div className="johnsonimgcontainer flex items-center justify-center py-12">
            <img src={johnsonlogo} alt="Johnson logo" className="johnsonimg w-[20vw] max-w-[220px] object-contain" />
          </div>

          <div className="clientpara px-6 py-8 max-w-3xl mx-auto">
            <p className="text-base text-slate-700 leading-7">
              We partner with leading engineering and construction firms to deliver high-precision,
              durable steel structures. Our approach blends modern fabrication techniques with
              time-tested engineering to ensure projects are delivered on schedule and built to last.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Map scroll progress to opacity and translate values
  // image: y from -80 -> 0, opacity from 0 -> 1
  const imageY = useTransform(scrollYProgress, [0, 1], [-40, 30]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 0.8, 1]);

  // paragraph: y from 80 -> 0, opacity from 0 -> 1 (starts slightly later)
  const paraY = useTransform(scrollYProgress, [0, 1], [50, -20]);
  const paraOpacity = useTransform(scrollYProgress, [0.15, 0.5, 1], [0, 1, 1]);

  // Smooth the transforms with a spring to emulate GSAP's scrub smoothing
  const smoothImageY = useSpring(imageY, { stiffness: 100, damping: 20 });
  const smoothImageOpacity = useSpring(imageOpacity, { stiffness: 150, damping: 25 });

  const smoothParaY = useSpring(paraY, { stiffness: 200, damping: 30 });
  const smoothParaOpacity = useSpring(paraOpacity, { stiffness: 150, damping: 25 });

  return (
    <section ref={ref} className="h-screen bg-[#FFFBF5]">
      {/* top header */}
      <div className="w-full h-[10vh]  flex flex-col lg:flex-row justify-between">
        <div className="leftside lg:h-full h-[20%] w-full justify-center lg:w-[20vw] flex p-1 lg:p-4  lg:justify-center flex-row ">
          <Dot className="animate-pulse" size={30} color="black" />
          <p>Featured</p>
        </div>

        <div className="rightside gap-2 lg:gap-6 w-full lg:w-[60vw] h-[80%] lg:h-full  flex items-center justify-center lg:items-start  lg:justify-end lg:pr-22 lg:py-3 flex-row">
          <div>
            <img src={iso} alt="ISO Certification" className="lg:w-[3vw] md:w-[8vw] w-[12vw]" />
          </div>
          <div>
            <img src={since} alt="Since 2010" className="w-[12vw] lg:w-[3vw] md:w-[8vw] scale-220 " />
          </div>
          <div className="flex gap-1 lg:gap-2  p-3 font-[secondary] items-center">
            <MapPin className="scale-80" />
            <p className="text-xs">Sri Krishna Nagar,Madhavaram</p>
          </div>
        </div>
      </div>

      {/* content */}
      <div className="w-full  flex flex-col">
        <div className="text-4xl lg:text-6xl uppercase flex font-medium items-center justify-center h-[20vh] font-[primary]">
          Trusted by
        </div>

        {/* IMAGE: bind style to motion values (top -> down with scrub) */}
        <motion.div
          className="johnsonimgcontainer  flex items-center justify-center will-change-transform"
          style={{ y: smoothImageY, opacity: smoothImageOpacity }}
        >
          <motion.img
            src={johnsonlogo}
            alt="Johnson logo"
            className="johnsonimg  lg:w-[20vw] max-w-[220px] object-contain"
            // subtle hover microinteraction (does not fight scroll-driven style)
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </motion.div>

        {/* PARAGRAPH: opposite direction (bottom -> up) */}
        <motion.div
          className="clientpara px-4 lg:px-6 max-w-3xl mx-auto will-change-transform"
          style={{ y: smoothParaY, opacity: smoothParaOpacity }}
        >
          <p className="text-base text-slate-700 text-center px-8 leading-7">
            We partner with leading engineering and construction firms to deliver high-precision,
            durable steel structures. Our approach blends modern fabrication techniques with
            time-tested engineering to ensure projects are delivered on schedule and built to last.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
