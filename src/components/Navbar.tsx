// src/components/Navbar.tsx
import { useEffect, useRef, useState, type JSX } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, type Variants, useReducedMotion } from "framer-motion";
import kci from '../assets/kcilogo.png'

export function Navbar(): JSX.Element {
  const location = useLocation();

  // preserve your original scroll logic
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // use "smooth" if you want
    });
  }, [location.pathname]);

  useEffect(() => {
  const getThreshold = () => {
    if(location.pathname === '/' || location.pathname === '/about'){
      return window.innerWidth <= 768 ? (window.innerWidth + 190) : 550
    }else{
      return window.innerWidth <= 768 ? (window.innerWidth - 350) : 100
    }
  }
  

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
}, [location.pathname]);
  // menu open state (replaces previous isMobileMenuOpen)
  const [open, setOpen] = useState(false);

  // close menu on route change (keeps previous behavior)
  useEffect(() => setOpen(false), [location.pathname]);

  const prefersReducedMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  const navLinks = [
    { path: "/", label: "HOME" },
    { path: "/infrastructure", label: "Infrastructure" },
    { path: "/about", label: "ABOUT US" },
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


    // =====================================================
  // ANIMATION VARIANTS - PREMIUM Mobile PANEL SYSTEM
  // =====================================================


   const panelContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.06,
        staggerDirection: -1, // Reverse stagger on exit
      },
    },
  };

  // Individual panel animation
  const panelVariants = {
    hidden: {
      y: "-100%",
      transition: {
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1], // Premium cubic-bezier
      },
    },
    visible: {
      y: "0%",
      transition: {
        duration: 0.7,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    exit: {
      y: "-100%",
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  

  // Content container (appears after panels)
  const contentContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.4, // Wait for panels to settle
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  // Individual link animation
  const linkVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1], // Smooth, confident ease
      },
    },
  };

  // Hamburger animation
const topLine = {
    closed: { y: -6, rotate: 0, width: "20px" },
    open: { 
      y: 0, 
      rotate: 45, 
      width: "20px", 
      transition: { duration: 0.28, ease: [0.2, 0.9, 0.2, 0.95] } 
    },
  };
  const middleLine = {
    closed: { opacity: 1, scaleX: 1 },
    open: { opacity: 0, scaleX: 0.6, transition: { duration: 0.18 } },
  };
  const bottomLine = {
    closed: { y: 6, rotate: 0, width: "20px" },
    open: { 
      y: 0, 
      rotate: -45, 
      width: "20px", 
      transition: { duration: 0.28, ease: [0.2, 0.9, 0.2, 0.95] } 
    },
  };

  const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.22 } },
    exit: { opacity: 0, transition: { duration: 0.18 } },
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
            <Link
            onClick={() => window.scrollTo({top:0, behavior:"instant"})} 
             to="/" className="flex items-center" aria-label="Kanncomp India Home">
              <div className="text-2xl md:text-4xl lg:text-4xl font-[secondary] font-semibold text-[#0A1A2F] tracking-tight">
                Kanncomp India
              </div>
            </Link>

            {/* Desktop links (same as earlier) */}
            <div className="hidden lg:flex items-center uppercase space-x-10">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  onClick={()=>{
                    if(link.path === '/'){
                      window.scrollTo({top:0 , behavior:"instant"})
                    }else{
                      window.scrollTo({top:0 , behavior:"smooth"})
                    }
                  }}
                  to={link.path}
                  className={`text-sm font-bold uppercase font-[medium] tracking-wide transition-colors duration-200 ${location.pathname === '/contact' ? "text-[#FFFBF5]" : "text-primary-700 hover:text-primary-900"
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
     <AnimatePresence mode="wait">
        {open && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-40 lg:hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Three Vertical Panels */}
            <motion.div
              className="absolute inset-0 flex"
              variants={panelContainerVariants}
            >
              {/* Panel 1 */}
              <motion.div
                variants={panelVariants}
                className="w-1/3 h-full bg-[#FFFBF5]"
              />
              
              {/* Panel 2 */}
              <motion.div
                variants={panelVariants}
                className="w-1/3 h-full bg-[#FFFBF5]"
              />
              
              {/* Panel 3 */}
              <motion.div
                variants={panelVariants}
                className="w-1/3 h-full bg-[#FFFBF5]"
              />
            </motion.div>

            {/* Content Layer (on top of panels) */}
            <motion.aside
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              className="absolute inset-0 flex items-center px-8 md:px-12"
              variants={contentContainerVariants}
            >
              <motion.nav className="w-full">
                <motion.ul className="space-y-6">
                  {navLinks.map((link, i) => (
                    <motion.li 
                      key={link.path} 
                      variants={linkVariants}
                    >
                      <a
                        ref={i === 0 ? firstLinkRef : undefined}
                        href={link.path}
                        onClick={() => setOpen(false)}
                        className="block text-[#0A1A2F] font-[primary] text-[2.5rem] sm:text-[3.8rem] md:text-[4.6rem] uppercase leading-tight tracking-tight hover:opacity-60 transition-opacity"
                        style={{ WebkitTapHighlightColor: "transparent" }}
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.nav>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
