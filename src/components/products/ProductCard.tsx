import React, { memo, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import type { Product } from "../../types/products";

const EASE = [0.16, 1, 0.3, 1] as const;

interface Props {
  product: Product;
  index: number;
}

function ProductCard({ product, index }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 180,
    damping: 18,
  });

  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 180,
    damping: 18,
  });

  const frame = useRef<number>();

  const isTouch =
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (isTouch || !ref.current) return;

    cancelAnimationFrame(frame.current!);

    frame.current = requestAnimationFrame(() => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();

      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;

      x.set(px);
      y.set(py);
    });
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.article
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      initial={{
        opacity: 0,
        y: 60,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.7,
        delay: index * 0.06,
        ease: EASE,
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{
        y: -8,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-[30px]
        border
        border-black/5
        bg-white
        shadow-[0_20px_45px_rgba(0,0,0,.08)]
        transform-gpu
        will-change-transform
      "
    >
      {/* IMAGE */}

      <div className="relative aspect-square overflow-hidden bg-[#F8F8F8]">
        <motion.img
          src={product.image}
          alt={product.name}
          loading={index < 4 ? "eager" : "lazy"}
          fetchPriority={index < 4 ? "high" : "low"}
          decoding="async"
          whileHover={{
            scale: 1.05,
          }}
          transition={{
            duration: 0.6,
            ease: EASE,
          }}
          className="
            h-full
            w-full
            object-cover
            transform-gpu
            will-change-transform
          "
        />

        {/* Gradient */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/55
            via-black/10
            to-transparent
          "
        />

        {/* Shine */}

        <motion.div
          initial={{
            x: "-140%",
          }}
          whileHover={{
            x: "160%",
          }}
          transition={{
            duration: 0.9,
            ease: "easeInOut",
          }}
          className="
            absolute
            inset-y-0
            w-20
            -skew-x-12
            bg-white/25
            blur-lg
            transform-gpu
          "
        />
      </div>

      {/* INFO */}

      <div
        className="
          relative
          bg-white
          px-6
          py-2
        "
      >
        <motion.div
          initial={{
            width: 0,
          }}
          whileInView={{
            width: 70,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.5,
            delay: 0.15,
          }}
          className="
            mb-1
            h-[3px]
            rounded-full
            bg-[#C04000]
          "
        />

        <h3
          className="
            text-2xl
            font-semibold
            tracking-tight
            text-[#352E2E]
            font-[primary]
          "
        >
          {product.name}
        </h3>

        <p
          className="
            mt-3
            text-sm
            leading-7
            text-neutral-500
            font-[secondary]
          "
        >
          {product.description}
        </p>

        <div
          className="
            mt-2
            flex
            items-center
            justify-between
          "
        >
          <span
            className="
              text-xs
              uppercase
              tracking-[0.25em]
              font-[primary]
              text-[#C04000]
            "
          >
            {product.material}
          </span>
        </div>
      </div>

      {/* Border Glow */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        whileHover={{
          opacity: 1,
        }}
        transition={{
          duration: 0.25,
        }}
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-[30px]
          border
          border-[#C04000]/40
        "
      />
    </motion.article>
  );
}

export default memo(ProductCard);