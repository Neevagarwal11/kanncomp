import React from 'react'
import kci from '../assets/kcilogo.png'

function abouthero() {
  return (
    <section className="hero-section relative h-screen flex items-start justify-center overflow-hidden">

      {/* BG IMG */}
      <div className="hero-bg absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
          "linear-gradient(to bottom, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.45)), url(https://i.pinimg.com/originals/61/33/2a/61332a16967cb9f2289b8d3d6430f1de.jpg)",
        }}
        />
      {/* Text */}
      <div className="hero-content relative z-10 gap-12  flex items-center flex-col container-custom xs:-bottom-32 -bottom-52 lg:-bottom-46 w-[90vw]  text-[#FFFBF5]">
        <h1 className="text-hero font-[primary] text-4xl  lg:text-6xl mb-6  text-center tracking-tighter uppercase slide-up">
          Designing resilient <br /> metal systems that support <br /> a better tomorrow.
        </h1>
        <div className="flex justify-center flex-col h-[15vh]  lg:flex-row items-center">
          <div className="max-w-[80vw] flex flex-row gap-8 lg:max-w-[35vw] lg:px-4 px-0 tracking-tighter">
            <h5>ESTD</h5>
            <img src={kci} alt="logo" className="w-[10vh] scale-140" />
            <h5>2012</h5>
          </div>
        </div>
      </div>

    </section>
  )
}

export default abouthero