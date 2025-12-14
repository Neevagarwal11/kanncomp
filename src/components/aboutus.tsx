import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import office from '../assets/Office.jpg'
import factoryint from '../assets/factoryint.jpg'
import factoryshed from '../assets/factoryshed.jpg'

gsap.registerPlugin(ScrollTrigger);

function Page4() {
  // State management
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLeftHalf, setIsLeftHalf] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState('next'); // Track slide direction
  
  // Refs for DOM elements and animations
  const carouselRef = useRef(null);
  const cursorRef = useRef(null);
  const autoPlayTimerRef = useRef(null);
  const isAnimatingRef = useRef(false); // Prevent multiple clicks during animation
  const mainContainerRef = useRef(null);
  const revealOverlayRef = useRef(null);

  // Image data - Same images as provided
  const images = [
    office,
    factoryint,
    factoryshed
  ];

  // ScrollTrigger parallax reveal animation - overlay slides up to reveal carousel
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state - overlay covers the carousel completely
      gsap.set(revealOverlayRef.current, {
        yPercent: 0, // Starts covering the carousel
      });

      // Create ScrollTrigger that slides the overlay up
      gsap.to(revealOverlayRef.current, {
        yPercent: -100, // Slides up completely, revealing carousel
        duration:5,
        ease:"power2.out",
        scrollTrigger: {
          trigger: mainContainerRef.current,
          start: "top 70%", // Start when section enters viewport
          scrub:1,
          end: "top 110%", // End when section reaches top
        //   markers: true,
        }
      });
    }, mainContainerRef);

    return () => ctx.revert();
  }, []);

  // Navigate to previous image
  const goToPrevious = () => {
    if (isAnimatingRef.current) return;
    setDirection('prev');
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Navigate to next image
  const goToNext = () => {
    if (isAnimatingRef.current) return;
    setDirection('next');
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Handle click based on cursor position
  const handleClick = () => {
    if (isLeftHalf) {
      goToPrevious();
    } else {
      goToNext();
    }
  };

  // Track mouse position to determine left/right half
  const handleMouseMove = (e) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const rect = carousel.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const centerX = rect.width / 2;
    
    setIsLeftHalf(x < centerX);

    gsap.to(cursorRef.current, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  // Show custom cursor on mouse enter
  const handleMouseEnter = () => {
    gsap.to(cursorRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: "back.out(1.7)"
    });
    setIsPaused(true);
  };

  // Hide custom cursor on mouse leave
  const handleMouseLeave = () => {
    gsap.to(cursorRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.2,
      ease: "power2.in"
    });
    setIsPaused(false);
  };

  // Auto-play functionality - changes image every 5 seconds
  useEffect(() => {
    if (!isPaused) {
      autoPlayTimerRef.current = setInterval(() => {
        goToNext();
      }, 5000);
    }

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [isPaused, currentIndex]);

  // Animate image transitions with slide effect based on direction
  useEffect(() => {
    const imageElements = document.querySelectorAll('.carousel-image');
    const currentImage = imageElements[currentIndex];
    
    isAnimatingRef.current = true;

    gsap.set(imageElements, { 
      opacity: 0,
      xPercent: 0 
    });

    if (direction === 'next') {
      gsap.set(currentImage, { 
        xPercent: 100,
        opacity: 1 
      });

      const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
      const prevImage = imageElements[prevIndex];
      
      gsap.set(prevImage, { 
        xPercent: 0,
        opacity: 1 
      });

      gsap.to(prevImage, {
        xPercent: -100,
        duration: 0.8,
        ease: "power2.inOut"
      });

      gsap.to(currentImage, {
        xPercent: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          isAnimatingRef.current = false;
        }
      });

    } else {
      gsap.set(currentImage, { 
        xPercent: -100,
        opacity: 1 
      });

      const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
      const nextImage = imageElements[nextIndex];
      
      gsap.set(nextImage, { 
        xPercent: 0,
        opacity: 1 
      });

      gsap.to(nextImage, {
        xPercent: 100,
        duration: 0.8,
        ease: "power2.inOut"
      });

      gsap.to(currentImage, {
        xPercent: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          isAnimatingRef.current = false;
        }
      });
    }
  }, [currentIndex, direction]);

  return (
    <div 
      ref={mainContainerRef}
      className="maincontainer w-full min-h-screen bg-[#FFFBF5] flex flex-col items-center justify-center overflow-hidden relative"
    >
      {/* Carousel container - stays in place */}
      <div className="relative w-full">
        <div 
          ref={carouselRef}
          className="relative w-full h-screen cursor-none overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        >
          {/* Image stack - all images positioned absolutely */}
          {images.map((src, index) => (
            <div
              key={index}
              className="carousel-image absolute inset-0 w-full h-full"
              style={{ opacity: 0 }}
            >
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}

          {/* Custom cursor that follows mouse */}
          <div
            ref={cursorRef}
            className="fixed pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2"
            style={{ 
              scale: 0, 
              opacity: 0,
              top: 0,
              left: 0
            }}
          >
            <div className="bg-white rounded-full p-4 shadow-2xl">
              {isLeftHalf ? (
                <ChevronLeft className="w-8 h-8 text-gray-900" />
              ) : (
                <ChevronRight className="w-8 h-8 text-gray-900" />
              )}
            </div>
          </div>
        </div>

        {/* Reveal overlay - slides up to reveal the carousel underneath */}
        <div 
          ref={revealOverlayRef}
          className="absolute inset-0 w-full h-full bg-[#FFFBF5] pointer-events-none z-10"
          style={{ transformOrigin: 'top' }}
        />

        {/* Image counter positioned outside carousel at bottom */}
        <div className="relative bg-[#FFFBF5] justify-between px-2 w-full flex text-[#544D4D] text-sm item-center font-bold py-4">
          <div className='font-[light]'>
            <h5>Kanncomp India Pvt Ltd.</h5>
          </div>

          <div className='font-[light]'>
            <span>{String(currentIndex + 1).padStart(2, '0')}</span>
            <span> / {String(images.length).padStart(2, '0')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page4;