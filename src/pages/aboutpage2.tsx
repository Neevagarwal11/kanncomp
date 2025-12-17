// src/pages/page2.tsx
import React, { useRef, type JSX } from "react";
import { useScroll, useReducedMotion, useTransform, useSpring } from "framer-motion";
import Aboutusimg from '../components/aboutus'
import Page4 from "../pages/page4";
import { Dot } from "lucide-react";
import Contact from '../components/contact'


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

  return (
    <section ref={ref} className="bg-[#FFFBF5]">

      {/* Image and para */}
      <Page4/>     

      {/* Values */}
      <div className=" values-container px-8 lg:px-12 mt-10">

        <div className=" border-[#352E2E] flex flex-col lg:flex-row px-4  border-t h-full text-[#352E2E]">

          <div className="left lg:h-full flex items-start flex-row w-full lg:w-1/2 py-6 lg:p-12">
            <div className="flex flex-row  items-center">
            <Dot className="scale-125 "/>
            <h1 className="uppercase font-[medium]  text-lg">OUR VALUES</h1>
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



{/* Our Team */}
      <div className=" values-container pb-42 px-8 lg:px-12  mt-10">

        <div className=" border-[#352E2E] flex flex-col lg:flex-row px-6  border-t h-full text-[#352E2E]">

          <div className="left lg:h-full flex items-start flex-row w-full lg:w-1/2 py-6 lg:p-12">
            <div className="flex flex-row  items-center">
            <Dot className="scale-125 "/>
            <h1 className="uppercase font-[medium]  text-lg font-[500]">OUR team</h1>
            </div>
          </div>

          <div className="right flex flex-col gap-8 w-full lg:w-1/2  lg:p-12">

          <div className=" flex gap-4 text-[#352E2E] items-center pb-8 border-b border-[#352E2E] font-[medium]  flex-row">
            <h3 className="font-bold font-[light] uppercase">Sanjeev Agarwal</h3>
            <h5 className="uppercase font-medium text-xs">partner</h5>
          </div>

          <div className=" flex gap-4 text-[#352E2E] items-center pb-8 border-b border-[#352E2E] font-[medium]  flex-row">
            <h3 className="font-bold font-[light] uppercase">Rashmi Agarwal</h3>
            <h5 className="uppercase font-medium text-xs">partner</h5>
          </div>

          

          </div>



        </div>

      </div>

      <Contact/>


    </section>
  );
}
