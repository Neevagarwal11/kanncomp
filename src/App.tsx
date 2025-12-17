import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import Infra from "./pages/Infra";
import useLenis from "./hooks/useLenis";
import Contact from "./pages/contact";
import About from "./pages/about";
import { LoaderProvider, useLoader } from "./components/loader";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import kci from "./assets/kcilogo.png";

function App() {
  useLenis();
  const location = useLocation();
  const { showLoader } = useLoader();

  useEffect(() => {
    showLoader({
      images: ["/assets/hero.jpg", "/assets/factory.jpg", "/assets/logo.svg"],
      fonts: ["Inter", "Roboto"],
    });
  }, []);

  useEffect(() => {
    showLoader({
      images: ["/assets/common-1.jpg", "/assets/common-2.jpg"],
    });
  }, [location.pathname]);

  return (
    <>
      <div className="bg-primary-50 ">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/infrastructure" element={<Infra />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>

        <Helmet>
          <title>Kanncomp India</title>
          <meta name="description" content="Kanncomp India" />
          <link rel="icon" type="image/png" href={kci} />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta property="og:title" content="Kanncomp India" />
          <meta property="og:image" content="/og-image.png" />
          <meta property="og:type" content="website" />
        </Helmet>
      </div>
    </>
  );
}

export default App;
