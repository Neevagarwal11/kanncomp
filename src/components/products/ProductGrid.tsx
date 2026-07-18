import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import ProductCard from "./ProductCard";
import EmptyState from "./EmptyState";
import { type Product } from "../../types/products";

interface Props {
  products: Product[];
}

const EASE = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.96,
    filter: "blur(8px)",
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",

    transition: {
      duration: 0.8,
      ease: EASE,
    },
  },

  exit: {
    opacity: 0,
    y: -30,
    scale: 0.95,
    filter: "blur(8px)",

    transition: {
      duration: 0.4,
      ease: EASE,
    },
  },
};

export default function ProductGrid({
  products,
}: Props) {
  return (
    <section className="relative mt-20">

      {/* Decorative Background */}

      <div className="pointer-events-none absolute inset-0">

        <div
          className="
          absolute
          left-0
          top-40
          h-96
          w-96
          rounded-full
          bg-[#C04000]/5
          blur-[160px]
          "
        />

        <div
          className="
          absolute
          right-0
          bottom-40
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#C04000]/4
          blur-[200px]
          "
        />

      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        <AnimatePresence mode="wait">

          {products.length === 0 ? (
            <EmptyState />
          ) : (
            <LayoutGroup>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                layout
                className="
                grid
                gap-8

                grid-cols-1

                sm:grid-cols-2

                lg:grid-cols-3

                2xl:grid-cols-4
                "
              >
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    variants={itemVariants}
                    layoutId={`product-${product.id}`}
                  >
                    <ProductCard
                      product={product}
                      index={index}
                    />
                  </motion.div>
                ))}
              </motion.div>

            </LayoutGroup>
          )}

        </AnimatePresence>

      </div>
    </section>
  );
}