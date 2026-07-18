import { motion } from "framer-motion";
import type { Category } from "../../data/products";

const EASE = [0.16, 1, 0.3, 1];

interface Props {
  categories: readonly Category[];
  active: Category;
  onChange: (category: Category) => void;
}

export default function CategoryTabs({
  categories,
  active,
  onChange,
}: Props) {
  return (
    <div className="w-full">
      <div
        className="
          grid
          grid-cols-2
          gap-x-4
          gap-y-5
          border-b-1
          sm:grid-cols-3

          md:flex
          md:flex-wrap
          md:justify-center
          md:gap-x-10
          md:gap-y-6
        "
      >
        {categories.map((category) => {
          const isActive = active === category;

          return (
            <motion.button
              key={category}
              onClick={() => onChange(category)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{
                duration: 0.3,
                ease: EASE,
              }}
              className="
                group
                relative
                flex
                flex-col
                items-center
                pb-0
              "
            >
              {/* Text */}

              <motion.span
                animate={{
                  color: isActive ? "#111111" : "#6B7280",
                }}
                transition={{ duration: 0.3 }}
                className="
                  text-[13px]
                  sm:text-sm
                  md:text-base
                  font-[secondary]
                  uppercase
                  tracking-[0.15em]
                  md:tracking-[0.2em]
                  cursor-pointer
                  text-center
                "
              >
                {category}
              </motion.span>

              {/* Bottom Line */}

              <div className="relative mt-3 h-[1px] w-full">
                {/* Base black line */}


                {/* Active line */}

                {isActive && (
                  <motion.div
                    layoutId="active-line"
                    transition={{
                      duration: 0.35,
                      ease: EASE,
                    }}
                    className="
                      absolute
                      inset-x-0
                      bottom-0
                      h-[3px]
                      rounded-full
                      bg-[#C04000]
                    "
                  />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}