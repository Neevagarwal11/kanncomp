import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="hero-section relative h-[92vh] flex items-center justify-center overflow-hidden">
      <div
        className="hero-bg absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.45)), url(https://i.pinimg.com/originals/61/33/2a/61332a16967cb9f2289b8d3d6430f1de.jpg)",
        }}
      />

      <div className="hero-content relative z-10 container-custom xs:-bottom-32 -bottom-52 lg:-bottom-26 w-[90vw]  text-[#FFFBF5]">
        <h1 className="text-hero font-[primary] text-4xl  lg:text-8xl mb-6 slide-up">
          Forging Tomorrow’s,
          <br /> Steel Structures
        </h1>
        <div className="flex justify-between flex-col lg:flex-row items-center">
          <div className="max-w-[80vw] lg:max-w-[35vw] lg:px-4 px-0 tracking-tighter">
            <p className="text-md lg:text-lg  font-[secondary] font-light mb-10 leading-6.5 lg:leading-5.5 slide-up delay-200">
              We deliver precision-engineered steel fabrication services, creating strong, dependable structures for construction, industrial, and commercial projects.
            </p>
          </div>
          <div className="flex flex-row lg:flex-row mr-2 p-2 xs:text-sm lg:p-4 font-[light] sm:flex-row gap-4 slide-up items-center justify-center delay-300">
            <Link to="/about" className="btn-primary  border-1 transition-all duration-500 ease-in-out rounded-full px-4 py-2 lg:py-2 border-[#EAECED]  text-[#EAECED] hover:bg-[#EAECED] hover:text-[#014E7A] text-center">
              EXPLORE US
            </Link>
            <Link
              to="/contact"
              className="btn-secondary    rounded-full px-4 py-2 border-1 border-[#EAECED] transition-all duration-500 ease-in-out text-[#EAECED] hover:bg-[#EAECED] hover:text-[#014E7A] text-center"
            >
              LET'S TALK
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
