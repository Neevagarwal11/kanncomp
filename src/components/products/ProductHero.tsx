import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];
const LOADER_DELAY = 2;

export default function ProductHero() {
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 600], [0, 120]);

  return (
    <section className="relative overflow-hidden">
      {/* Background */}

      <div className="absolute inset-0">
        {/* Spotlight */}

        <motion.div
          style={{ y }}
          className="
            absolute
            left-1/2
            top-[-250px]
            h-[700px]
            w-[700px]
            -translate-x-1/2
            rounded-full
            bg-[#C04000]/8
            blur-[180px]
          "
        />

        {/* Right Orb */}

        <motion.div
          style={{ y }}
          className="
            absolute
            right-[-200px]
            top-[120px]
            h-[450px]
            w-[450px]
            rounded-full
            bg-[#C04000]/5
            blur-[160px]
          "
        />
      </div>

      <div className="relative z-20 mx-auto max-w-7xl px-6">
        <div className="pt-30 pb-24">
          {/* Label */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: LOADER_DELAY,
              ease: EASE,
            }}
            className="
              flex
              items-center
              gap-4
              uppercase
              tracking-[0.35em]
              text-[#C04000]
              font-[secondary]
              text-xs
            "
          >
            <div className="h-px w-16 bg-[#C04000]" />
            Product Catalogue
          </motion.div>

          {/* Main */}

          <div
            className="
              mt-10
              flex
              flex-col
              lg:flex-row
              lg:justify-between
              lg:items-center
              gap-10
            "
          >
            {/* Left */}

            <div>
              <div className="overflow-hidden">
                <motion.h1
                  initial={{
                    y: 150,
                  }}
                  animate={{
                    y: 0,
                  }}
                  transition={{
                    duration: 1,
                    delay: LOADER_DELAY + 0.1,
                    ease: EASE,
                  }}
                  className="
                    text-[64px]
                    md:text-[90px]
                    xl:text-[130px]
                    font-[primary]
                    text-[#352E2E]
                    tracking-[-0.04em]
                    leading-[0.88]
                    uppercase
                  "
                >
                  Products
                </motion.h1>
              </div>

              <motion.div
                initial={{
                  scaleX: 0,
                }}
                animate={{
                  scaleX: 1,
                }}
                transition={{
                  duration: 1,
                  delay: LOADER_DELAY + 0.4,
                  ease: EASE,
                }}
                className="
                  mt-8
                  h-[3px]
                  w-40
                  origin-left
                  rounded-full
                  bg-[#C04000]
                "
              />
            </div>

            {/* Right */}

            <motion.div
              initial={{
                opacity: 0,
                y: 50,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 1,
                delay: LOADER_DELAY + 0.55,
                ease: EASE,
              }}
              className="max-w-lg"
            >
              <p
                className="
                  text-2xl
                  leading-relaxed
                  text-neutral-800
                  font-[secondary]
                "
              >
                Precision engineered elevator components manufactured for
                performance, durability and uncompromising quality.
              </p>

              <p
                className="
                  mt-6
                  text-neutral-500
                  leading-8
                  font-[secondary]
                "
              >
                Explore our collection of fabricated lift components engineered
                using laser cutting, CNC bending, robotic welding and precision
                finishing processes.
              </p>

              <motion.div
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: LOADER_DELAY + 0.75,
                  ease: EASE,
                }}
                whileHover={{
                  x: 8,
                }}
                className="
                  mt-12
                  flex
                  items-center
                  gap-3
                  text-lg
                  font-[primary]
                "
              >
                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    bg-[#111]
                    text-white
                  "
                >
                  <ArrowDownRight size={20} />
                </div>

                Scroll to Explore
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}