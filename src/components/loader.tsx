import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import kci from "../assets/kcilogo.png";
import loader from "../assets/loader.png";
import React from "react";

// ============================================
// 1. ASSET PRELOADER UTILITY
// ============================================

interface PreloadAssets {
  images: string[];
  fonts?: string[];
}

const preloadAssets = (assets: PreloadAssets): Promise<number>[] => {
  const promises: Promise<number>[] = [];

  // Preload images
  assets.images.forEach((src) => {
    promises.push(
      new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(1);
        img.onerror = () => resolve(1); // Still resolve on error to prevent blocking
        img.src = src;
      })
    );
  });

  // Preload fonts (if specified)
  if (assets.fonts) {
    assets.fonts.forEach((fontFamily) => {
      promises.push(
        document.fonts.ready.then(() => {
          // Check if font is loaded
          return document.fonts.check(`1em ${fontFamily}`) ? 1 : 1;
        })
      );
    });
  }

  return promises;
};

// ============================================
// 2. CIRCULAR LOADER SVG COMPONENT
// ============================================

const CircularLoader: React.FC<{ progress: number }> = ({ progress }) => {
  const circleRef = useRef<SVGCircleElement>(null);
  const circleImgRef = useRef<HTMLImageElement>(null);
  const radius = 80;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    gsap.to(circleImgRef.current, {
      rotate: 360, // 0–360°
      duration: 5,
      ease: "power2.out",
    });
  }, [progress, circumference]);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <img
        ref={circleImgRef}
        src={loader} // your circular image
        alt="Kanncomp Loader"
        className="w-[170px] h-[170px] object-contain"
      />
    </div>
  );
};

// ============================================
// 3. MAIN LOADER COMPONENT
// ============================================

interface LoaderProps {
  assets: PreloadAssets;
  onComplete: () => void;
  isRouteTransition?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
  assets,
  onComplete,
  isRouteTransition = false,
}) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLDivElement>(null);
  const loadingTextRef = useRef<HTMLDivElement>(null);
  const centerContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //   Locking Scroll
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    // Entrance animation
    const tl = gsap.timeline();

    if (!isRouteTransition) {
      // Initial load - fade in from black
      tl.from(loaderRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
      })
        .from(
          centerContentRef.current,
          {
            scale: 0.8,
            opacity: 0,
            duration: 0.6,
            ease: "expo.out",
          },
          "-=0.2"
        )
        .from(
          loadingTextRef.current,
          {
            x: -30,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          progressTextRef.current,
          {
            x: 30,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.8"
        );
    } else {
      // Route transition - quick fade in
      tl.from(loaderRef.current, {
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    }

    // Start loading assets
    const loadAssets = async () => {
      const preloadPromises = preloadAssets(assets);
      const totalAssets = preloadPromises.length;
      let loadedAssets = 0;

      // Minimum loading time (for smooth animation)
      const minLoadTime = isRouteTransition ? 800 : 2000;
      const startTime = Date.now();

      // Track individual asset loading
      preloadPromises.forEach((promise) => {
        promise.then(() => {
          loadedAssets++;
          const actualProgress = (loadedAssets / totalAssets) * 100;

          // Smooth progress update with GSAP
          gsap.to(
            { value: progress },
            {
              value: actualProgress,
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
              onUpdate: function () {
                setProgress(Math.round(this.targets()[0].value));
              },
            }
          );
        });
      });

      // Wait for all assets
      await Promise.all(preloadPromises);

      // Ensure minimum load time has passed
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < minLoadTime) {
        await new Promise((resolve) =>
          setTimeout(resolve, minLoadTime - elapsedTime)
        );
      }

      // Ensure we hit 100%
      gsap.to(
        { value: progress },
        {
          value: 100,
          duration: 0.3,
          ease: "power2.out",
          onUpdate: function () {
            setProgress(Math.round(this.targets()[0].value));
          },
          onComplete: () => {
            // Start exit animation after brief pause
            setTimeout(() => {
              exitAnimation();
            }, 300);
          },
        }
      );
    };

    loadAssets();

    return () => {
      // UNLOCK SCROLL
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";

      window.scrollTo(0, scrollY);
    };
  }, []);

  const exitAnimation = () => {
    setIsExiting(true);

    // Exit animation - slide up
    const exitTl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    exitTl
      .to([loadingTextRef.current, progressTextRef.current], {
        opacity: 1,
        y: -20,
        duration: 0.4,
        ease: "power2.in",
      })
      .to(
        centerContentRef.current,
        {
          scale: 0.8,
          opacity: 0,
          duration: 0.7,
          ease: "power2.in",
        },
        "-=0.2"
      )
      .to(
        loaderRef.current,
        {
          yPercent: -100,
          duration: 1.2,
          opacity: 1,
          ease: "power3.inOut",
        },
        "-=0.3"
      );
  };

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] bg-[#FFFBF5] flex  items-center justify-center"
      style={{ pointerEvents: isExiting ? "none" : "all" }}
    >
      {/* Left Side - Loading Text */}
      <div
        ref={loadingTextRef}
        className="absolute top-1/4 lg:left-8 md:left-16 lg:top-1/2 -translate-y-1/2"
      >
        <div className="text-[#3B2E34] text-sm md:text-base tracking-[0.3em] font-light uppercase">
          LOADING
        </div>
      </div>

      {/* Center - Logo & Circular Loader */}
      <div
        ref={centerContentRef}
        className="relative w-48 h-48 md:w-64 md:h-64"
      >
        <CircularLoader progress={progress} />

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Logo placeholder - replace with actual SVG logo */}
          <div className="w-16 h-16 bg-white/10 rounded-sm flex items-center justify-center">
            <div className="text-[#3B2E34] text-2xl font-bold">
              <img src={kci} alt="" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Progress Percentage */}
      <div
        ref={progressTextRef}
        className="absolute top-4/5 xs:bottom-1/4  lg:right-8 md:right-16 lg:top-1/2 -translate-y-1/2"
      >
        <div className="text-[#3B2E34] text-xl md:text-lg font-[light] tabular-nums">
          {progress}%
        </div>
      </div>
    </div>
  );
};

// ============================================
// 4. LOADER PROVIDER FOR REACT ROUTER
// ============================================

interface LoaderContextType {
  showLoader: (assets: PreloadAssets) => Promise<void>;
}

const LoaderContext = React.createContext<LoaderContextType | null>(null);

export const useLoader = () => {
  const context = React.useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoader must be used within LoaderProvider");
  }
  return context;
};

export const LoaderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentAssets, setCurrentAssets] = useState<PreloadAssets>({
    images: [],
  });
  const [isRouteTransition, setIsRouteTransition] = useState(false);

  const showLoader = (assets: PreloadAssets): Promise<void> => {
    return new Promise((resolve) => {
      setCurrentAssets(assets);
      setIsRouteTransition(true);
      setIsLoading(true);

      // Store resolve function to call when loader completes
      (window as any).__loaderResolve = resolve;
    });
  };

  const handleLoaderComplete = () => {
    setIsLoading(false);
    if ((window as any).__loaderResolve) {
      (window as any).__loaderResolve();
      delete (window as any).__loaderResolve;
    }
  };

  return (
    <LoaderContext.Provider value={{ showLoader }}>
      {isLoading && (
        <Loader
          assets={currentAssets}
          onComplete={handleLoaderComplete}
          isRouteTransition={isRouteTransition}
        />
      )}
      {children}
    </LoaderContext.Provider>
  );
};
