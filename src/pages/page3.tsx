import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import powerpress from '../assets/power press.jpg'
import welding from '../assets/co2-welding-machine.jpg'
import drilling from '../assets/drilling.jpg'
import cutting from '../assets/cutting.avif'
import factoryext from '../assets/factoryshed.jpg'
gsap.registerPlugin(ScrollTrigger);

function Page3() {
  const galleryRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const photos = gsap.utils.toArray(".photo") as Element[];
      const leftSections = gsap.utils.toArray(".left-section") as Element[];
      
      // Set initial state - IMPORTANT: Only set once, not in a loop
      gsap.set('.rightblock', {
        width: "100vw",
        height: "100vh",
      });

      gsap.set('.left', {
        width: "0vw",
        opacity: 0,
      });

      // Set initial position for all photos
      photos.forEach((photo, index) => {        
        gsap.set(photo, { 
          yPercent: index * 100,
          objectFit:"cover"
        });
      });

      // Set initial opacity for left sections
        leftSections.forEach((section, index) => {
        gsap.set(section, { 
          opacity: 0,
          // border:"2px solid red",
          yPercent: index*90 // Start from bottom
          // yPercent: 60 *index// Start from bottom
        });
      });
      // STEP 1: Pin the right block for the entire gallery
      ScrollTrigger.create({
        trigger: ".gallery",
        start: "top top",
        end: "bottom bottom",
        pin: ".rightblock",
        pinSpacing: false,
        markers: false,
        onLeave: () => {
          // Reset transforms when leaving to prevent zoom/shift
          gsap.set('.rightblock', { x:"17vw" , width:"50vw"});
        },
        onEnterBack: () => {
          // Reapply pin state when scrolling back
          gsap.set('.rightblock', { x: '50vw', width: '50vw' });
        }
      });

      // STEP 2: Intro animation - transition from full-width to split view
      const introTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".gallery",
          start: "top top",
          end: "25% top",
          scrub: 1,
          markers: false,
        }
      });

      introTimeline
        .to('.rightblock', {
          width: '50vw',
          x: '50vw',
          duration: 2,
          objectFit:"cover"
        }, 0)
        .to(photos[0], {
          x: 0,
          duration: 2,
        }, 0)
        .to('.left', {
          width: '50vw',
          opacity: 1,
          duration: 2,
        },1);

      // STEP 3: Animate left sections opacity on scroll
      const mainTextTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".gallery",
          start: "28% top",
          end: "bottom bottom",
          scrub: 1,
          // markers: true,
        }
      });

      leftSections.forEach((section, index) => {
        if (index === 0) {
          // First text: fades out and slides up
          mainTextTimeline.to(section, {
            opacity: 0,
            yPercent: 100,
            duration: 0.5,
            // transition:'2s',
            ease: "power2.out"

          }, 0);
        } else if (index < leftSections.length - 1) {
          // Middle texts: fade in and slide up, then fade out and continue sliding
          mainTextTimeline
            .to(section, {
              opacity: 1,
              yPercent: 88,
              duration:0.3,
             ease: "power2.out"

            },  index  - 0.5)
            .to(section, {
              opacity: 1,
              // delay:'2s',
              yPercent: 0,
              duration:1,
              ease: "power2.out"
            }, index + 0.8);
        } else {
          // Last text: only fades in and slides up
          mainTextTimeline.to(section, {
            opacity: 1,
            yPercent: 0,
            duration: 0.5,
            ease: "power2.inOut"
          }, index - 0);
        }
      });

      // STEP 4: Create main timeline for image transitions
      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".gallery",
          start: "10% top",
          end: "bottom bottom",
          scrub: 1,
          // markers: true,
        }
      });

      // Animate each photo sequentially
      photos.forEach((photo, index) => {
        if (index === 0) {
          // First image: stays visible, then slides up
          mainTimeline.to(photo, {
            yPercent: 0,
            duration: 1,
            ease: "none"
          }, 0);
        } else if (index < photos.length - 1) {
          // Middle images: slide in from bottom (100 -> 0), then slide out to top (0 -> -100)
          mainTimeline
            .to(photo, {
              yPercent: 0,
              duration: 1,
              ease: "none"
            }, index + 0)
            .to(photo, {
              yPercent: 0,
              duration: 1,
              ease: "none"
            }, index + 1);
        } else {
          // Last image: only slides in from bottom
          mainTimeline.to(photo, {
            yPercent: 0,
            duration: 1,
            ease: "none",
            onComplete: () => {
              gsap.set(photo, { xPercent:0 ,yPercent: 0 });
            }
          }, index - 0);
        }
      });

    }, galleryRef);

    return () => ctx.revert();
  }, []);

  const content = [
    { title: "", subtitle: "" },
    { title: "Power Press", subtitle: "Our precision power press lineup—150-ton, 80-ton, and 40-ton—delivers high-force metal forming accuracy, enabling reliable fabrication of complex components with consistent strength, durability, and production efficiency." },
    { title: "CO2 Welding", subtitle: "Our advanced CO₂ welding machines ensure clean, strong, and distortion-free joints, delivering superior weld integrity for structural steel fabrication across diverse industrial applications and demanding production environments." },
    { title: "Drilling Machine", subtitle: "Our high-precision drilling machines provide accurate hole-making in varied steel thicknesses, supporting fast, consistent fabrication workflows and ensuring dependable alignment and structural performance in every project." },
    { title: "Cutting Machine", subtitle: "Our high-precision drilling machines provide accurate hole-making in varied steel thicknesses, supporting fast, consistent fabrication workflows and ensuring dependable alignment and structural performance in every project." },
  ];

  const images = [
    factoryext,
    powerpress,
    welding,
    drilling,
    cutting
  ];

  return (
    <div ref={galleryRef}>
      <div className="gallery flex overflow-hidden gap-0">
        <div className="left w-0 relative bg-[#FFFBF5] pt-[10vh]">
          {content.map((item, index) => (
            <div
              key={index}
              className="left-section h-screen flex flex-col pl-6 justify-center items-start gap-10"
            >
              <h1 className="text-8xl font-[primary] uppercase text-[#0A1A2F] mb-4">
                {item.title}
              </h1>
              <p className="font-[light] max-w-[30vw] text-md px-3 text-[#352E2E]">{item.subtitle}</p>
            </div>
          ))}
        </div>

        <div className="rightblock overflow-hidden w-full h-screen relative will-change-transform">
          {images.map((src, index) => (
            <div
              key={index}
              className="photo absolute top-0 left-0 w-full h-full"
            >
              <img
                src={src}
                alt={content[index]?.title || "Image"}
                className=" w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page3;