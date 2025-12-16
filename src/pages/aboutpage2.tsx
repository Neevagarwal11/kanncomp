// src/pages/page2.tsx
import React, { useRef, type JSX } from "react";
import { useScroll, useReducedMotion, useTransform, useSpring } from "framer-motion";
import Aboutusimg from '../components/aboutus'
import Page4 from "../pages/page4";
import { Dot } from "lucide-react";



export default function Aboutpage2(): JSX.Element {
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
    <section ref={ref} className="bg-[#FFFBF5]">
      {/* top header */}
      <Page4/>     

      <div className=" values-container px-14 mt-10">

        <div className=" border-[#352E2E] flex flex-col lg:flex-row  border-t h-full text-[#352E2E]">

          <div className="left lg:h-full flex items-start flex-row w-full lg:w-1/2 py-6 lg:p-12">
            <div className="flex flex-row  items-center">
            <Dot className="scale-125 "/>
            <h1 className="uppercase font-[medium]  text-xl">OUR VALUES</h1>
            </div>
          </div>

          <div className="right w-full lg:w-1/2  lg:p-12">

          <div className=" flex gap-4 text-[#352E2E] pb-8 border-b border-[#352E2E] font-[medium]  flex-col">
            <h3 className="font-semibold">INTEGRITY</h3>
            <p className="tracking-tight font-[light] font-[600] text-md">We uphold uncompromising standards in materials, workmanship, and delivery, building long-term trust through consistent quality, transparency, and accountability in every project we execute.</p>
          </div>

          <div className=" flex gap-4 text-[#352E2E] pb-8 pt-8 border-b border-[#352E2E] font-[medium]  flex-col">
            <h3 className="font-semibold">PRECISION</h3>
            <p className="tracking-tight font-[light] font-[600] text-md">We apply engineering expertise and disciplined fabrication processes to transform raw steel into accurate, reliable components that perform seamlessly within demanding industrial environments.</p>
          </div>

          <div className=" flex gap-4 text-[#352E2E] pb-8 pt-8 font-[medium]  flex-col">
            <h3 className="font-semibold">RELIABILITY</h3>
            <p className="tracking-tight font-[light] font-[600] text-md">We align deeply with our clients’ operational requirements, ensuring dependable production, on-time delivery, and solutions that support efficiency, safety, and long-term performance.</p>
          </div>

          </div>



        </div>

      </div>


    </section>
  );
}
