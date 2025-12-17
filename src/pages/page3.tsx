import  { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import powerpress from '../assets/power press.jpg'
import welding from '../assets/co2-welding-machine.jpg'
import drilling from '../assets/drilling.jpg'
import cutting from '../assets/cutting.avif'
import factoryext from '../assets/factoryshed.jpg'

gsap.registerPlugin(ScrollTrigger);

function Page3() {
const galleryRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size and update isMobile state
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // 1024px is lg breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Only run GSAP animations on desktop/laptop screens
    if (isMobile) return;

    let ctx = gsap.context(() => {
const photos = gsap.utils.toArray<HTMLElement>(".photo");
const leftSections = gsap.utils.toArray<HTMLElement>(".left-section");
      
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
        });
      });

      // Set initial opacity for left sections
      leftSections.forEach((section, index) => {
        gsap.set(section, { 
          opacity: 0,
          yPercent: index * 90
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
          gsap.set('.rightblock', { x:"17vw" , width:"50vw"});
        },
        onEnterBack: () => {
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
        }, 0)
        .to(photos[0], {
          x: 0,
          duration: 2,
        }, 0)
        .to('.left', {
          width: '50vw',
          opacity: 1,
          duration: 2,
        }, 1);

      // STEP 3: Animate left sections opacity on scroll
      const mainTextTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".gallery",
          start: "28% top",
          end: "bottom bottom",
          scrub: 1,
        }
      });

      leftSections.forEach((section, index) => {
        if (index === 0) {
          mainTextTimeline.to(section, {
            opacity: 0,
            yPercent: 100,
            duration: 0.5,
            ease: "power2.out"
          }, 0);
        } else if (index < leftSections.length - 1) {
          mainTextTimeline
            .to(section, {
              opacity: 1,
              yPercent: 88,
              duration: 0.3,
              ease: "power2.out"
            }, index - 0.5)
            .to(section, {
              opacity: 1,
              yPercent: 0,
              duration: 1,
              ease: "power2.out"
            }, index + 0.8);
        } else {
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
        }
      });

      photos.forEach((photo, index) => {
        if (index === 0) {
          mainTimeline.to(photo, {
            yPercent: 0,
            duration: 1,
            ease: "none"
          }, 0);
        } else if (index < photos.length - 1) {
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
          mainTimeline.to(photo, {
            yPercent: 0,
            duration: 1,
            ease: "none",
            onComplete: () => {
              gsap.set(photo, { xPercent: 0, yPercent: 0 });
            }
          }, index - 0);
        }
      });

    }, galleryRef);

    return () => ctx.revert();
  }, [isMobile]);

  const content = [
    { title: "", subtitle: "" },
    { title: "Power Press", subtitle: "Our precision power press lineup—150-ton, 80-ton, and 40-ton—delivers high-force metal forming accuracy, enabling reliable fabrication of complex components with consistent strength, durability, and production efficiency." },
    { title: "CO2 Welding", subtitle: "Our advanced CO₂ welding machines ensure clean, strong, and distortion-free joints, delivering superior weld integrity for structural steel fabrication across diverse industrial applications and demanding production environments." },
    { title: "Drilling Machine", subtitle: "Our high-precision drilling machines provide accurate hole-making in varied steel thicknesses, supporting fast, consistent fabrication workflows and ensuring dependable alignment and structural performance in every project." },
    { title: "Cutting Machine", subtitle: "Our high-precision cutting machines provide accurate hole-making in varied steel thicknesses, supporting fast, consistent fabrication workflows and ensuring dependable alignment and structural performance in every project." },
  ];

  const images = [
    factoryext,
    powerpress,
    welding,
    drilling,
    cutting
  ];

  // Mobile view - Simple vertical scroll layout
  if (isMobile) {
    return (
      <div className="w-full bg-[#FFFBF5]">
        {content.map((item, index) => (
          index > 0 && ( // Skip first empty item
            <div key={index} className="min-h-screen  flex flex-col">
              {/* Image section */}
              <div className="w-full flex justify-center items-center h-[50vh]  md:h-[60vh]">
                <img
                  src={images[index]}
                  alt={item.title}
                  loading="lazy"
                  className="w-[95%] rounded-md h-full object-cover"
                />
              </div>
              
              {/* Content section */}
              <div className="flex-1 flex flex-col justify-start py-8 px-6 items-start   md:p-10">
                <h1 className="text-5xl md:text-5xl font-[primary] uppercase text-[#352E2E] mb-8 md:mb-6">
                  {item.title}
                </h1>
                <p className="text-sm md:text-base font-[light] text-[#352E2E] leading-tight">
                  {item.subtitle}
                </p>
              </div>
            </div>
          )
        ))}
      </div>
    );
  }

  // Desktop view - GSAP animated layout
  return (
    <div ref={galleryRef}>
      <div className="gallery flex flex-col lg:flex-row overflow-hidden gap-0">
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
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page3;