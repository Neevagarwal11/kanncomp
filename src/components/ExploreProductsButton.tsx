import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const EASE = [0.16, 1, 0.3, 1];

export default function ExploreProductsButton() {
  const navigate = useNavigate();
const [isTouchDevice, setIsTouchDevice] = useState(false);

useEffect(() => {
  const coarse =
    window.matchMedia &&
    window.matchMedia("(pointer: coarse)").matches;

  const touch =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0;

  setIsTouchDevice(coarse || touch);
}, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 1,
        ease: EASE,
      }}
      className="flex justify-center mt-8"
    >
      <motion.button
        onClick={() => navigate("/products")}
        initial="rest"
        whileHover="hover"
        whileTap={{ scale: 0.98 }}
        className="
group
relative
overflow-hidden
rounded-full
border
border-black/10
bg-white/60
backdrop-blur-2xl
w-full
max-w-[650px]
px-3
sm:px-7
lg:px-8
py-2
sm:py-5
"
      >
        {/* Background Sweep */}

        <motion.div
          variants={{
            rest: {
              x: "-110%",
            },
            hover: {
              x: "0%",
            },
          }}
          transition={{
            duration: 0.65,
            ease: EASE,
          }}
          className="
          absolute
          inset-0
          bg-[#C04000]
          "
        />

        {/* subtle gloss */}

        <motion.div
          variants={{
            rest: {
              x: "-180%",
            },
            hover: {
              x: "180%",
            },
          }}
          transition={{
            duration: 1.1,
            ease: "easeInOut",
          }}
          className="
          absolute
          inset-y-0
          w-24
          -skew-x-12
          bg-white/20
          blur-xl
          "
        />

        <div className="
relative
z-20
flex
items-center
justify-between
gap-4
sm:gap-8
">

          <motion.div
            variants={{
              hover: {
                x: 6,
              },
            }}
            transition={{
              duration: .4,
              ease: EASE,
            }}
          >
            <p
              className="
              lg:text-[10px]
              text-[8px]
              sm:text-xs
              uppercase
              tracking-[0.45em]
              text-[#C04000]
              group-hover:text-white/70
              transition-colors
              duration-500
              "
            >
              Catalogue
            </p>

            <h2
              className="
              mt-1
              text-lg
sm:text-xl
lg:text-2xl
              uppercase
              tracking-wide
              text-[#0B0D10]
              group-hover:text-white
              transition-colors
              duration-500
              "
            >
              Explore Products
            </h2>
          </motion.div>

          {/* Circle */}

          <motion.div
            variants={{
              hover: {
                x: 8,
                rotate: 45,
                scale: 1.08,
              },
            }}
            transition={{
              duration: .45,
              ease: EASE,
            }}
            className="
            h-12
w-12
sm:h-14
sm:w-14
lg:h-16
lg:w-16
flex-shrink-0
            rounded-full
            bg-[#0B0D10]
            group-hover:bg-white
            transition-colors
            duration-500
            flex
            items-center
            justify-center
            "
          >
            <ArrowUpRight
              className="
              text-white
              group-hover:text-[#C04000]
              transition-colors
              duration-500
              "
              size={24}
            />
          </motion.div>

        </div>
      </motion.button>
    </motion.div>
  );
}