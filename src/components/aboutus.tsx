import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import office from '../assets/Office.jpg'
import factoryint from '../assets/factoryint.jpg'
import factoryshed from '../assets/factoryshed.jpg'
import office2 from '../assets/office2.jpg'


gsap.registerPlugin(ScrollTrigger);

function Page4() {
  // State management
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLeftHalf, setIsLeftHalf] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState('next');
  const [isDesktop, setIsDesktop] = useState(false);
  
  // Refs for DOM elements and animations
  const carouselRef = useRef(null);
  const cursorRef = useRef(null);
  const autoPlayTimerRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const mainContainerRef = useRef(null);
  const revealOverlayRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Image data
  const images = [
    office,
    factoryint,
    factoryshed,
    office2
  ];

  // Detect if device is desktop (non-touch) and screen size
  useEffect(() => {
    const checkDesktop = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isLargeScreen = window.innerWidth >= 1024; // lg breakpoint
      setIsDesktop(!hasTouch && isLargeScreen);
    };

    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // ScrollTrigger reveal animation - ONLY for desktop
  useEffect(() => {
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      gsap.set(revealOverlayRef.current, {
        yPercent: 0,
      });

      gsap.to(revealOverlayRef.current, {
        yPercent: -100,
        duration: 5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: mainContainerRef.current,
          start: "top 70%",
          scrub: 1,
          end: "top 10%",
        }
      });
    }, mainContainerRef);

    return () => ctx.revert();
  }, [isDesktop]);

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

  // Handle click - ONLY for desktop
  const handleClick = () => {
    if (!isDesktop) return;
    if (isLeftHalf) {
      goToPrevious();
    } else {
      goToNext();
    }
  };

  // Track mouse position - ONLY for desktop
  const handleMouseMove = (e) => {
    if (!isDesktop) return;
    
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

  // Show custom cursor - ONLY for desktop
  const handleMouseEnter = () => {
    if (!isDesktop) return;
    
    gsap.to(cursorRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: "back.out(1.7)"
    });
    setIsPaused(true);
  };

  // Hide custom cursor - ONLY for desktop
  const handleMouseLeave = () => {
    if (!isDesktop) return;
    
    gsap.to(cursorRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.2,
      ease: "power2.in"
    });
    setIsPaused(false);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        // Swiped left - go to next
        goToNext();
      } else {
        // Swiped right - go to previous
        goToPrevious();
      }
    }
  };

  // Auto-play functionality
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

  // Animate image transitions
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
      className="maincontainer w-full lg:min-h-[105vh] min-h-[65vh] bg-[#FFFBF5] flex flex-col items-center justify-between overflow-hidden relative"
    >
      {/* Carousel container */}
      <div className="relative w-full lg:h-screen h-[60vh] ">
        <div 
          ref={carouselRef}
          className={`relative w-full h-full overflow-hidden ${isDesktop ? 'cursor-none' : ''}`}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Image stack */}
          {images.map((src, index) => (
            <div
              key={index}
              className="carousel-image absolute inset-0 w-full h-full"
              style={{ opacity: 0 }}
            >
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                loading='lazy'
                className="w-full h-full object-cover"
              />
            </div>
          ))}

          {/* Custom cursor - ONLY shown on desktop */}
          {isDesktop && (
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
              <div className="bg-white rounded-full p-3 md:p-4 shadow-2xl">
                {isLeftHalf ? (
                  <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-gray-900" />
                ) : (
                  <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-gray-900" />
                )}
              </div>
            </div>
          )}

         
        </div>

        {/* Reveal overlay - ONLY for desktop */}
        {isDesktop && (
          <div 
            ref={revealOverlayRef}
            className="absolute inset-0 w-full h-full bg-[#FFFBF5] pointer-events-none z-10"
            style={{ transformOrigin: 'top' }}
          />
        )}

        {/* Image counter positioned outside carousel at bottom */}
        <div className="relative  bg-[#FFFBF5] justify-between px-2 w-full flex text-[#544D4D] text-sm item-center font-bold py-4">
          <div className='font-[light]'>
            <h5>Kanncomp India Pvt Ltd.</h5>
          </div>

          <div className='font-[light]'>
            <span>{String(currentIndex + 1).padStart(2, '0')}</span>
            <span> / {String(images.length).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Swipe indicator for mobile - shows on first load */}
        {!isDesktop && currentIndex === 0 && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full text-sm animate-pulse">
            ← Swipe to navigate →
          </div>
        )}
      </div>
    </div>
  );
}

export default Page4;