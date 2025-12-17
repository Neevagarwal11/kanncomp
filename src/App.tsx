import { Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'
import Infra  from './pages/Infra' 
import useLenis from './hooks/useLenis'
import Contact from './pages/contact'
import About from './pages/about'
import {LoaderProvider , useLoader} from './components/loader'
import { useEffect } from 'react'
import { useLocation } from "react-router-dom";

function App() {
  useLenis()
  const location = useLocation();
  const { showLoader } = useLoader();

 useEffect(() => {
    showLoader({
      images: [
        "/assets/hero.jpg",
        "/assets/factory.jpg",
        "/assets/logo.svg",
      ],
      fonts: ["Inter", "Roboto"],
    });
  }, []);

  
   useEffect(() => {
    showLoader({
      images: [
        "/assets/common-1.jpg",
        "/assets/common-2.jpg",
      ],
    });
  }, [location.pathname]);

  return (
    <>
      <div className='bg-primary-50 '>
        <Navbar/>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/infrastructure" element={<Infra />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>

      
      </div>
    </>
  )
}

export default App
