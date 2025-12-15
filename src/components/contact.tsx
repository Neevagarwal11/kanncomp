import React, { useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";

function Contact() {
  const boxRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const item = itemRef.current;

    if (!box || !item) return;

    const handleEnter = () => {
      gsap.to(item, {
        xPercent: 20,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const handleLeave = () => {
      gsap.to(item, {
        xPercent: 0,
        duration: 0.5,
        ease: "power2.inOut",
      });
    };

    box.addEventListener("mouseenter", handleEnter);
    box.addEventListener("mouseleave", handleLeave);

    return () => {
      box.removeEventListener("mouseenter", handleEnter);
      box.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div className="contact-container h-[60vh] w-full flex flex-col px-6 lg:px-12">
      <div
        ref={boxRef}
        className="getintouch cursor-pointer border-t-1 border-t-[#352E2E] border-b-[#352E2E] flex  flex-row justify-between border-b-1 h-[10vh] lg:h-[15vh]"
      >
        <div className="text text-2xl lg:text-4xl font-[primary] uppercase flex h-full items-center">
          <h2>Get Your project On The Boards</h2>
        </div>

        <div
          ref={itemRef}
          className="right-icon flex items-center w-[10vw] justify-center"
        >
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

      <div className="contact-container text-[#352E2E] py-4  lg:p-12 grid grid-cols-2 lg:flex flex-col lg:flex-row w-full h-full">

        <div className=" order-3 lg:order-1 ">
          <div className=" flex flex-col gap-4 px-0 lg:px-4  lg:gap-6">
            <h5 className="font-[medium] uppercase text-sm">Sanjeev Agarwal</h5>

            <div className="flex text-sm flex-row font-[light] items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#352E2E"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-smartphone-icon lucide-smartphone"
              >
                <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                <path d="M12 18h.01" />
              </svg>
              <p>9543712343 | 9360168892</p>
            </div>

            <div className="flex flex-row hover:underline text-sm items-center font-[light] gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#352E2E"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-mail-icon lucide-mail"
              >
                <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                <rect x="2" y="4" width="20" height="16" rx="2" />
              </svg>

              <a
                href="https://mail.google.com/mail/?view=cm&to=agarwalsanjeev7610.gmail.com"
                target="_blank"
              >
                <p>agarwalsanjeev7610@gmail.com</p>
              </a>
            </div>
          </div>
        </div>

        <div className=" lg:order-2 ">
          <div className=" flex flex-col gap-4 px-0 lg:px-4 lg:gap-6 text-[#2a2525]">
            <h5 className="uppercase font-[medium] text-sm">
              General INQUIRES
            </h5>

            <a
              href="https://mail.google.com/mail/?view=cm&to=kanncomp@yahoo.co.in.gmail.com"
              target="_blank"
            >
              <p className="hover:underline font-[light] text-sm">
                kanncomp@yahoo.co.in
              </p>
            </a>

            <div className="address font-[light] w-[40vw] lg:w-[20vw] text-sm">
              Old No. 38, New No. 52, Sri Krishna Nagar, 2nd Extention,
              Madhavaram, Chennai - 600060
            </div>
          </div>
        </div>

        <div className=" order-2 w-[40vw] h-[20vh] lg:h-[30vh]  lg:w-[20vw] lg:order-3">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3884.913059157677!2d80.222005!3d13.167881500000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526604a2d8738f%3A0x6898f4c861b168cc!2sKannith!5e0!3m2!1sen!2sin!4v1765815577832!5m2!1sen!2sin"
            width="100%"
            height="100%"
            className="border:0 "
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

      </div>
    </div>
  );
}

export default Contact;
