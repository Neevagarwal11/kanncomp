import { motion } from "framer-motion";
import { PackageSearch } from "lucide-react";

export default function EmptyState() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
      }}
      className="
      flex
      min-h-[320px]
      flex-col
      items-center
      justify-center
      rounded-[32px]
      border
      border-dashed
      border-black/10
      bg-white/60
      backdrop-blur-xl
      "
    >
      <PackageSearch
        size={56}
        className="text-[#C04000]"
      />

      <h3 className="mt-6 text-3xl font-semibold">
        No Products Found
      </h3>

      <p className="mt-3 max-w-md text-center text-neutral-500">
        We couldn't find any products in this
        category. Please explore another
        category.
      </p>
    </motion.div>
  );
}