import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ProductHero from "../components/products/ProductHero";
import CategoryTabs from "../components/products/CategoryTabs";
import ProductGrid from "../components/products/ProductGrid";

import { categories, products, type Category } from "../data/products";
import Contact from '../components/contact'

const EASE = [0.16, 1, 0.3, 1];

export default function Products() {
  const [selectedCategory, setSelectedCategory] =
    useState<Category>("All");

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return products;

    return products.filter(
      (product) => product.category === selectedCategory
    );
  }, [selectedCategory]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FFFBF5] text-[#0B0D10]">

      {/* ---------------- Background ---------------- */}

      <div className="pointer-events-none absolute inset-0">

        {/* Top spotlight */}

        <div
          className="
          absolute
          left-1/2
          top-[-320px]
          h-[700px]
          w-[700px]
          -translate-x-1/2
          rounded-full
          bg-[#C04000]/6
          blur-[160px]
          "
        />

        {/* Bottom light */}

        <div
          className="
          absolute
          bottom-[-350px]
          right-[-200px]
          h-[650px]
          w-[650px]
          rounded-full
          bg-[#D76A2A]/5
          blur-[180px]
          "
        />

        {/* Grid */}

        
      </div>

      {/* ---------------- Hero ---------------- */}

      <ProductHero />

      {/* ---------------- Category ---------------- */}

      <section className="relative z-20">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            ease: EASE,
          }}
          className="
          sticky
          top-[92px]
          items-end
          z-30
          mx-auto
          mb-0
          mt-20
          w-fit
          px-3
          pt-3
          pb-0
          backdrop-blur-3xl
          "
        >
          <CategoryTabs
            categories={categories}
            active={selectedCategory}
            onChange={setSelectedCategory}
          />
        </motion.div>
      </section>

      {/* ---------------- Grid ---------------- */}

      <section className="relative z-10 mb-30">

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{
              opacity: 0,
              y: 70,
              filter: "blur(10px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              y: -30,
              filter: "blur(8px)",
            }}
            transition={{
              duration: 0.75,
              ease: EASE,
            }}
          >
            <ProductGrid
              products={filteredProducts}
            />
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ---------------- CTA ---------------- */}

      {/* <motion.section
        initial={{
          opacity: 0,
          y: 80,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{ once: true }}
        transition={{
          duration: 1,
          ease: EASE,
        }}
        className="
        relative
        z-20
        mx-auto
        mt-32
        mb-36
        max-w-7xl
        px-6
        "
      >
        <div
          className="
          overflow-hidden
          rounded-[42px]
          border
          border-black/6
          bg-gradient-to-br
          from-[#111111]
          via-[#181818]
          to-[#202020]
          px-10
          py-20
          text-center
          "
        >
          <h2
            className="
            text-4xl
            font-semibold
            tracking-tight
            text-white
            md:text-6xl
            "
          >
            Looking for a
            <span className="block text-[#D76A2A]">
              Custom Fabricated Part?
            </span>
          </h2>

          <p
            className="
            mx-auto
            mt-6
            max-w-2xl
            text-lg
            leading-8
            text-white/60
            "
          >
            We manufacture precision engineered
            elevator components according to your
            drawings and specifications.
          </p>

          <motion.button
            whileHover={{
              scale: 1.04,
            }}
            whileTap={{
              scale: .97,
            }}
            className="
            mt-12
            rounded-full
            bg-[#D76A2A]
            px-10
            py-5
            text-sm
            font-semibold
            uppercase
            tracking-[0.28em]
            text-white
            "
          >
            Request Quotation
          </motion.button>
        </div>
      </motion.section> */}

      <Contact/>


    </main>
  );
}