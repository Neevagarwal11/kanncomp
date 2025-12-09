import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 550);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { path: '/', label: 'HOME' },
    { path: '/our-work', label: 'OUR WORK' },
    { path: '/gallery', label: 'GALLERY' },
    { path: '/about', label: 'ABOUT' },
    { path: '/contact', label: 'CONTACT' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 nav-scroll ${
          isScrolled
            ? 'bg-[#FFFBF5]'
            : 'bg-transparent'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20 p-8">
            <Link to="/" className="flex items-center" aria-label="Kanncomp India Home">
              <div className="text-4xl font-[secondary] font-semibold text-primary-900 text-[#0A1A2F] tracking-tight">
                Kanncomp India
              </div>
            </Link>

            <div className="hidden lg:flex items-center space-x-10">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-sans font-medium tracking-wide transition-colors duration-200 ${
                    location.pathname === link.path
                      ? 'text-primary-900'
                      : 'text-primary-700 hover:text-primary-900'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>


            <button
              className="lg:hidden text-primary-900 p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-y-0 right-0 z-40 w-full max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pt-24 px-8 pb-8">
          <nav className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-lg font-sans font-medium tracking-wide transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'text-primary-900'
                    : 'text-primary-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-10">
            <Link to="/contact" className="btn-primary w-full text-center">
              LET'S TALK
            </Link>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
