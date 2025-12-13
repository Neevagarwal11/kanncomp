import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Page4() {
  // State management
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLeftHalf, setIsLeftHalf] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  // Refs for DOM elements and animations
  const carouselRef = useRef(null);
  const cursorRef = useRef(null);
  const autoPlayTimerRef = useRef(null);

  // Image data - Add your own images here
  const images = [
    "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1200&q=80",
    "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80",
    "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&q=80",
    "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&q=80",
  ];

  // Navigate to previous image
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Navigate to next image
  const goToNext = () => {
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
    
    // Update state based on mouse position
    setIsLeftHalf(x < centerX);

    // Animate custom cursor to follow mouse with GSAP
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
    setIsPaused(true); // Pause autoplay on hover
  };

  // Hide custom cursor on mouse leave
  const handleMouseLeave = () => {
    gsap.to(cursorRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.2,
      ease: "power2.in"
    });
    setIsPaused(false); // Resume autoplay
  };

  // Auto-play functionality - changes image every 5 seconds
  useEffect(() => {
    if (!isPaused) {
      autoPlayTimerRef.current = setInterval(() => {
        goToNext();
      }, 5000); // 5 seconds interval
    }

    // Cleanup interval on unmount or when paused
    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [isPaused, currentIndex]);

  // Animate image transitions with GSAP
  useEffect(() => {
    const images = document.querySelectorAll('.carousel-image');
    
    // Fade out all images first
    gsap.to(images, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.inOut"
    });

    // Fade in the current image
    gsap.to(images[currentIndex], {
      opacity: 1,
      duration: 0.5,
      delay: 0.2,
      ease: "power2.inOut"
    });
  }, [currentIndex]);

  return (
    <div className="h-screen w-full bg-gray-900 flex items-center justify-center overflow-hidden">
      {/* Main carousel container */}
      <div 
        ref={carouselRef}
        className="relative w-full h-full cursor-none"
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
            style={{ opacity: index === 0 ? 1 : 0 }}
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

        {/* Progress indicators at bottom */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-12 bg-white' 
                  : 'w-2 bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Image counter */}
        <div className="absolute top-8 right-8 text-white text-xl font-semibold bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
}

export default Page4;