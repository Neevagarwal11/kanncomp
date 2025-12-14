import React, { useEffect } from 'react'
import Aboutusimg from '../components/aboutus'
import { Dot } from "lucide-react";
import gsap from 'gsap';

function page4() {


  return (
    <div className='p4container  py-[30vh] bg-[#FFFBF5]  flex flex-row px-16 gap-4'>

        <div className='imgcontainer object-cover overflow-hidden  w-[60vw]'>
            <Aboutusimg/>
        </div>

        <div className='paracontainer items-start pl-20 justify-center  gap-4 flex flex-col w-[30vw]'>

            <div className='header flex flex-row font-[light] '>
                <Dot/>
                <h4 className='font-[secondary]'>About Us</h4>
            </div>

            <div className='para w-[100%] font-[light]'>
                <p>Kanncomp India is a trusted name in precision steel fabrication, specializing in MS and HRPO steel components for diverse industrial applications. For over 15 years, we have been a reliable manufacturing partner to Johnson Lifts and Elevators, consistently delivering high-quality fabricated parts with unmatched accuracy and timely execution. Our facility is equipped with a robust range of machinery, including 150-ton, 80-ton, and 40-ton power press units, three CO₂ welding machines, two precision drilling machines, and a dedicated chain-saw cutting system. In addition to fabrication, we offer professional finishing services with enamel or matte black paint to ensure durable, production-ready components. With more than 13 years of continuous trust from Johnson Lifts, we remain committed to quality, reliability, and excellence in every project we undertake.</p>

            </div>

        </div>
        
    </div>
  )
}

export default page4