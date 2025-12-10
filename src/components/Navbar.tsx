// src/components/Navbar.tsx
import React, { useEffect, useRef, useState, type JSX } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, type Variants, useReducedMotion } from "framer-motion";

export function Navbar(): JSX.Element {
  const location = useLocation();

  // preserve your original scroll logic
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
  const getThreshold = () => (window.innerWidth <= 768 ? 450 : 500);

  const handleScroll = () => {
    const threshold = getThreshold();
    setIsScrolled(window.scrollY > threshold);
  };

  handleScroll(); // Run once on mount
  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", handleScroll); // Update threshold on resize

  return () => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", handleScroll);
  };
}, []);
  // menu open state (replaces previous isMobileMenuOpen)
  const [open, setOpen] = useState(false);

  // close menu on route change (keeps previous behavior)
  useEffect(() => setOpen(false), [location.pathname]);

  const prefersReducedMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  const navLinks = [
    { path: "/", label: "HOME" },
    { path: "/our-work", label: "MACHINERY" },
    { path: "/gallery", label: "GALLERY" },
    { path: "/about", label: "ABOUT" },
    { path: "/contact", label: "CONTACT" },
  ];

  // Body scroll lock while open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // focus trap + Escape to close
  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab") {
        const panel = panelRef.current;
        if (!panel) return;
        const focusables = Array.from(panel.querySelectorAll<HTMLElement>(
          'a, button, [tabindex]:not([tabindex="-1"])'
        ));
        if (focusables.length === 0) return;
        const first = focusables[0], last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // --- Motion Variants (compact & slick) --------------------------------
  const topLine: Variants = {
    closed: { y: -6, rotate: 0, width: "20px" },
    open: { y: 0, rotate: 45, width: "20px", transition: { duration: 0.28, ease: [0.2, 0.9, 0.2, 0.95] } },
  };
  const middleLine: Variants = {
    closed: { opacity: 1, scaleX: 1 },
    open: { opacity: 0, scaleX: 0.6, transition: { duration: 0.18 } },
  };
  const bottomLine: Variants = {
    closed: { y: 6, rotate: 0, width: "20px" },
    open: { y: 0, rotate: -45, width: "20px", transition: { duration: 0.28, ease: [0.2, 0.9, 0.2, 0.95] } },
  };

  const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.22 } },
    exit: { opacity: 0, transition: { duration: 0.18 } },
  };

  const panelVariants: Variants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.07,
        duration: 0.36,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: { opacity: 0, scale: 0.98, transition: { duration: 0.22 } },
  };

  const linkVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };
  // -----------------------------------------------------------------------

  // keep nav background animation from previous code
  const navClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-500 nav-scroll ${isScrolled ? "bg-[#FFFBF5]" : "bg-transparent"
    }`;

  return (
    <>
      <nav className={navClass}>
        <div className="container-custom">
          <div className="flex items-center justify-between h-20 lg:px-12 p-6">
            <Link to="/" className="flex items-center" aria-label="Kanncomp India Home">
              <div className="text-2xl md:text-4xl lg:text-4xl font-[secondary] font-semibold text-[#0A1A2F] tracking-tight">
                Kanncomp India
              </div>
            </Link>

            {/* Desktop links (same as earlier) */}
            <div className="hidden lg:flex items-center space-x-10">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-sans font-medium tracking-wide transition-colors duration-200 ${location.pathname === link.path ? "text-primary-900" : "text-primary-700 hover:text-primary-900"
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Single compact hamburger (same perfect code) */}
            <button
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              onClick={() => setOpen((s) => !s)}
              className="lg:hidden w-9 h-9 flex items-center justify-center relative z-[9999]"
            >
              <div className="relative w-5 mr-6 h-5">
                <motion.span
                  aria-hidden
                  className="absolute left-1/2 top-1/2 block h-[2px] bg-black rounded"
                  style={{ transformOrigin: "center" }}
                  variants={topLine}
                  animate={open ? "open" : "closed"}
                />
                <motion.span
                  aria-hidden
                  className="absolute left-1/2 top-1/2 block h-[2px] bg-black rounded"
                  style={{ transformOrigin: "center", translateY: "-0.5px" }}
                  variants={middleLine}
                  animate={open ? "open" : "closed"}
                />
                <motion.span
                  aria-hidden
                  className="absolute left-1/2 top-1/2 block h-[2px] bg-black rounded"
                  style={{ transformOrigin: "center" }}
                  variants={bottomLine}
                  animate={open ? "open" : "closed"}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen mobile menu (integrated, retains backdrop & behavior) */}
      <AnimatePresence initial={false} mode="wait">
        {open && (
          <>
            {/* backdrop (lower z so nav/hamburger remains clickable when needed) */}
            {!prefersReducedMotion ? (
              <motion.div
                key="backdrop"
                className="fixed inset-0 z-40 bg-black/55 backdrop-blur-md"
                onClick={() => setOpen(false)}
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              />
            ) : (
              <div key="backdrop-static" className="fixed inset-0 z-40 bg-black/55" onClick={() => setOpen(false)} />
            )}

            {/* centered panel with big links */}
            <motion.aside
              key="panel"
              role="dialog"
              aria-modal="true"
              ref={panelRef}
              className="fixed inset-0 z-40 flex items-center justify-center p-6"
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="w-full h-full flex flex-col items-center justify-center">
                <motion.ul className="flex flex-col items-center gap-8 text-center">
                  {navLinks.map((link, i) => (
                    <motion.li key={link.path} variants={linkVariants} className="w-full">
                      <Link
                        ref={i === 0 ? firstLinkRef : undefined}
                        to={link.path}
                        onClick={() => setOpen(false)}
                        className="block w-full text-[#FFFBF5] font-[primary] text-[3.2rem] sm:text-[3.8rem] md:text-[4.6rem] lg:text-[5.6rem] font-light leading-tight"
                        style={{ WebkitTapHighlightColor: "transparent" }}
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
