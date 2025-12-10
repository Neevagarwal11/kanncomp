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
      
      // Set initial opacity for left sections
      leftSections.forEach((section) => {
        gsap.set(section, { opacity: 0 });
      });

      // Animate left sections opacity on scroll
      leftSections.forEach((section, index) => {
        gsap.to(section,  {
          border:"2px solid red",
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: "center center",
            end: "center center",
            pin :".left",
            scrub: 1,
            markers: true,
          }
        });

        // Fade out when leaving
        gsap.to(section, {
          opacity: 0,
          scrollTrigger: {
            trigger: section,
            start: "bottom center",
            end: "bottom center",
            scrub: 1,
            markers: true,
          }
        });
      });

      // Create a main timeline for all images
      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".gallery",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          markers: false,
        }
      });

      // Animate each photo sequentially
      photos.forEach((photo, index) => {
        // Set initial position
        gsap.set(photo, { yPercent: index * 100 });

        if (index > 0) {
          // Slide current image up from bottom to center
          mainTimeline.to(photo, {
            yPercent: 0,
            duration: 1,
            ease: "none"
          }, index - 0.5);
        }

        if (index < photos.length - 1) {
          // Slide current image from center to top
          mainTimeline.to(photo, {
            yPercent: 0,
            duration: 1,
            ease: "none"
          }, index + 0.5);
        }
      });

      // Pin the right block
      ScrollTrigger.create({
        trigger: ".gallery",
        start: "top top",
        end: "bottom bottom",
        pin: ".rightblock",
        pinSpacing: false,
        markers: false,
      });
    }, galleryRef);

    return () => ctx.revert();
  }, []);

  const content = [
    { title: "Power Press", subtitle: "High-precision metal forming equipment" },
    { title: "CO2 Welding", subtitle: "Advanced welding technology" },
    { title: "Drilling Machine", subtitle: "Precision drilling solutions" },
  ];

  const images = [
    "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
    "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80",
    "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
  ];

  return (
    <div ref={galleryRef}>
      <div className="gallery flex">
        <div className="left w-1/2 bg-gray-50">
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

        <div className="rightblock w-1/2 h-screen relative overflow-hidden">
          {images.map((src, index) => (
            <div
              key={index}
              className="photo absolute top-0 left-0 w-full h-full"
            >
              <img
                src={src}
                alt={content[index].title}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page3;