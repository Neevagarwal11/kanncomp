import { Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'
import useLenis from './hooks/useLenis'

function App() {
  useLenis()

  return (
    <>
      <div className='bg-primary-50 min-h-[140vh]'>
        <Navbar/>

        <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      
      </div>
    </>
  )
}

export default App
