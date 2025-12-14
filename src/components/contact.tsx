import React, {useRef , useEffect } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";

function Contact() {
  const boxRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);


  useEffect(() => {

  const box = boxRef.current;
  const item = itemRef.current;

  if (!box || !item) return;

  const handleEnter = () =>{
    gsap.to(item , {
      xPercent:20,
      duration:0.5,
      ease:"power2.out"
    })
  }

  const handleLeave = () =>{
    gsap.to(item , {
      xPercent:0,
      duration:0.5,
      ease:"power2.inOut"
    })
  }


  box.addEventListener("mouseenter" , handleEnter)
  box.addEventListener("mouseleave" , handleLeave)

  return () =>{
    box.removeEventListener("mouseenter" , handleEnter)
    box.removeEventListener("mouseleave" , handleLeave)
  }


  


  },[]);

  return (
    <div className="contact-container h-[60vh] w-full flex flex-col px-12">
      <div ref={boxRef} className="getintouch cursor-pointer border-t-1 border-t-[#352E2E] border-b-[#352E2E] flex  flex-row justify-between border-b-1 h-[15vh]">
        <div className="text text-4xl font-[primary] uppercase flex h-full items-center">
          <h2>Get Your project On The Boards</h2>
        </div>

        <div ref={itemRef} className="right-icon flex items-center w-[10vw] justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="90"
            height="90"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#352E2E"
            stroke-width="0.41951219512195122"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-arrow-right-icon lucide-arrow-right"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Contact;
