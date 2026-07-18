import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useReducedMotion } from "framer-motion";
import junctionBox from "../assets/JunctionBox.png";
import ExploreProductsButton from "./ExploreProductsButton";
import brackets from '../assets/Brackets.jpg';
import counterweight from '../assets/counterWeights.jpeg'

const EASE = [0.16, 1, 0.3, 1]; // expo-out — the "awwwards" settle
const CASCADE_STEP = 0.10; // extra delay per card, left to right

// fires as soon as a card is 5% visible AND extends the trigger zone
// 200px below the viewport, so the reveal starts noticeably early on scroll
const VIEWPORT = { once: false, amount: 0, margin: "0px 0px -150px 0px" };

const PRODUCTS = [
  {
    id: "brackets",
    tag: "COIL · LOT-2291",
    eyebrow: "Material Spec",
    title: "Brackets",
    spec: "GRADE IS2062 · 2.5MM GAUGE · HOT ROLLED · 8.2T COIL WEIGHT",
    image:
    brackets,
    alt: "Mild steel coils stacked in a warehouse, ready for dispatch",
  },
  {
    id: "counterweight",
    tag: "COIL · LOT-3054",
    eyebrow: "Material Spec",
    title: "Counterweight Plates",
    spec: "HOT ROLLED PICKLED & OILED · 2.0MM GAUGE · SCALE-FREE FINISH",
    image:
    counterweight,
    alt: "Dark, oiled hot rolled pickled and oiled steel coil",
  },
  {
    id: "gi",
    tag: "COIL · LOT-4417",
    eyebrow: "Material Spec",
    title: "Junction Box",
    spec: "GALVANIZED IRON · Z100 ZINC COATING · 1.2MM GAUGE · CORROSION RESISTANT",
    image:
      junctionBox,
    alt: "Bright galvanized steel sheet with a zinc coating",
  },
];

// Detects touch / coarse-pointer devices (phones, tablets) on mount.
// Used to switch off the mouse-tilt effect, which has no clean touch
// equivalent and can otherwise get "stuck" mid-tilt after a tap.
function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const coarse = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
    const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouch(Boolean(coarse || touch));
  }, []);
  return isTouch;
}

function ProductCard({ product, index }) {
  const prefersReducedMotion = useReducedMotion();
  const isTouchDevice = useIsTouchDevice();
  const disableTilt = prefersReducedMotion || isTouchDevice;
  const cardRef = useRef(null);

  const cardVariants = {
    hidden: { y: "50%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.05, ease: EASE, delay: index * CASCADE_STEP },
    },
  };
  const imageVariants = {
    hidden: { scale: 1.18, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 1.5, ease: EASE, delay: index * CASCADE_STEP + 0.08 },
    },
  };
  const tagVariants = {
    hidden: { opacity: 0, y: -8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: EASE, delay: index * CASCADE_STEP + 0.9 },
    },
  };
  const panelVariants = {
    hidden: { y: 44, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.75, ease: EASE, delay: index * CASCADE_STEP + 0.55 },
    },
  };
  const lineVariants = {
    hidden: { y: "115%" },
    visible: {
      y: 0,
      transition: { duration: 0.85, ease: EASE, delay: index * CASCADE_STEP + 0.78 },
    },
  };
  const tickerFade = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, delay: index * CASCADE_STEP + 1.05 } },
  };

  // subtle tilt-on-hover — small, restrained, disabled on touch devices
  // and for reduced-motion users
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useTransform(rotateY, (v) => v);
  const springY = useTransform(rotateX, (v) => v);

  function handleMouseMove(e) {
    if (disableTilt) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 6);
    rotateX.set(py * -6);
  }
  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <div style={{ perspective: 1200 }} className="flex items-center justify-center w-full sm:w-auto">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        // On touch devices we skip the tilt transform entirely rather than
        // just zeroing it out, so there's no leftover 3D perspective jitter
        // on tap.
        style={disableTilt ? undefined : { rotateX: springY, rotateY: springX }}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={cardVariants}
        className="relative w-full max-w-[380px] h-[340px] xs:h-[360px] sm:w-[340px] sm:h-[400px] md:w-[380px] md:h-[430px] lg:w-[420px] lg:h-[460px] rounded-[18px] sm:rounded-[22px] overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] sm:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/10"
      >
        {/* ---- image layer ---- */}
        <motion.img
          variants={imageVariants}
          src={product.image}
          alt={product.alt}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
        {/* grading for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10] via-[#0B0D10]/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0D10]/50 via-transparent to-transparent" />

        {/* ---- corner lot tag ---- */}
        <motion.div
          variants={tagVariants}
          className="absolute top-3 right-3 sm:top-5 sm:right-5 rotate-2 rounded-full border border-white/15 bg-black/30 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5"
        >
          <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-[#EDEFF1]/85">
            {product.tag}
          </span>
        </motion.div>

        {/* ---- sub-box / spec plate ---- */}
        <motion.div
          variants={panelVariants}
          className="absolute left-3 right-3 bottom-3 sm:left-4 sm:right-4 sm:bottom-4 rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-xl px-4 pt-4 pb-3.5 sm:px-5 sm:pt-5 sm:pb-4"
        >
          <p className="font-mono text-[9px] sm:text-[10px] font-md tracking-[0.2em] sm:tracking-[0.25em] text-[#C04000] uppercase mb-1">
            {product.eyebrow}
          </p>

          <div className="overflow-hidden">
            <motion.h2
              variants={lineVariants}
              className="font-display text-[1.7rem] sm:text-[2rem] lg:text-[2.2rem] leading-[0.9] tracking-wide text-[#EDEFF1] uppercase"
            >
              {product.title}
            </motion.h2>
          </div>

          {/* scrolling mill-spec ticker */}
          <motion.div
            variants={tickerFade}
            className="mt-3 overflow-hidden border-y border-white/10 py-1.5"
          >
            <motion.div
              className="flex gap-8 whitespace-nowrap font-mono text-[9.5px] sm:text-[10.5px] text-[#C04000]"
              animate={prefersReducedMotion ? {} : { x: ["0%", "-50%"] }}
              transition={{ duration: 16, ease: "linear" }}
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <span key={i}>{product.spec}</span>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function SteelCoilRow() {
  return (
    <div className="w-full flex-col flex items-center sm:items-start justify-center bg-[#FFFBF5] p-4 sm:p-8 lg:p-12">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fjalla+One&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-display { font-family: 'Fjalla One', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 w-full">
        {PRODUCTS.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
      <div className="justify-start w-full items-center p-4">
        <ExploreProductsButton />
      </div>
    </div>
  );
}