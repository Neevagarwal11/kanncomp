// src/hooks/useLenis.ts
import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function useLenis(options?: ConstructorParameters<typeof Lenis>[0]) {
  // store the instance in a ref so we can access methods if needed
  const lenisRef = useRef<InstanceType<typeof Lenis> | null>(null);

  useEffect(() => {
    // only run on client
    if (typeof window === "undefined") return;

    // create lenis instance (you can pass options)
    // If you set autoRaf: true, lenis will hook its own RAF internally.
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => 1 - Math.pow(1 - t, 3), // example easing
      // smoothTouch: true,
      // merge any user options
      ...(options || {}),
    });

    lenisRef.current = lenis;

    // If autoRaf is NOT enabled, we need to call lenis.raf on each frame
    if (!((options && (options as any).autoRaf) || (lenis as any).autoRaf)) {
      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    // cleanup on unmount
    return () => {
      // destroy lenis instance and remove listeners
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [options]);

  return lenisRef;
}
