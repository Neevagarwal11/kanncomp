import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Page3() {
  const galleryRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const photos = gsap.utils.toArray(".photo");
      const leftSections = gsap.utils.toArray(".left-section");
      
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
          // yPercent: index*100 // Start from bottom
          yPercent: 60 *index// Start from bottom
        });
      });
      // STEP 1: Pin the right block for the entire gallery
      ScrollTrigger.create({
        trigger: ".gallery",
        start: "top top",
        end: "bottom bottom",
        pin: ".rightblock",
        // pinSpacing: true,
        markers: false,
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
          start: "25% top",
          end: "bottom bottom",
          scrub: 1,
          markers: true,
          pin:"left-section h1"
        }
      });

      leftSections.forEach((section, index) => {
        if (index === 0) {
          // First text: fades out and slides up
          mainTextTimeline.to(section, {
            opacity: 0,
            yPercent: -150,
            duration: 0.8,
            // transition:'2s',
            ease: "none"
          }, 0.5);
        } else if (index < leftSections.length - 1) {
          // Middle texts: fade in and slide up, then fade out and continue sliding
          mainTextTimeline
            .to(section, {
              opacity: 1,
              yPercent: 60,
              duration:0.5,
            }, index + 0)
            .to(section, {
              opacity: 0,
              yPercent: 60,
              duration: 0,
              transitionDelay:"0.1s",
              ease:"none"
            }, index + 1);
        } else {
          // Last text: only fades in and slides up
          mainTextTimeline.to(section, {
            opacity: 1,
            yPercent: 0,
            duration: 1,
          }, index - 0.5);
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
          }, index - 0);
        }
      });

    }, galleryRef);

    return () => ctx.revert();
  }, []);

  const content = [
    { title: "", subtitle: "" },
    { title: "Power Press", subtitle: "High-precision metal forming equipment" },
    { title: "CO2 Welding", subtitle: "Advanced welding technology" },
    { title: "Drilling Machine", subtitle: "Precision drilling solutions" },
  ];

  const images = [
    "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1200&q=80",
    "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
    "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80",
    "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
  ];

  return (
    <div ref={galleryRef}>
      <div className="gallery flex overflow-hidden">
        <div className="left w-0 relative bg-gray-50 pt-[10vh]">
          {content.map((item, index) => (
            <div
              key={index}
              className="left-section h-screen flex flex-col justify-center items-center px-12"
            >
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                {item.title}
              </h1>
              <p className="text-xl text-gray-600">{item.subtitle}</p>
            </div>
          ))}
        </div>

        <div className="rightblock overflow-hidden w-full h-screen relative overflow-hidden">
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