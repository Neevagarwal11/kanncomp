import { Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'
import Infra  from './pages/Infra' 
import useLenis from './hooks/useLenis'
import Contact from './pages/contact'

function App() {
  useLenis()

  return (
    <>
      <div className='bg-primary-50 '>
        <Navbar/>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/infrastructure" element={<Infra />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      
      </div>
    </>
  )
}

export default App
