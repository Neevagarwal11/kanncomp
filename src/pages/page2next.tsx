import React from 'react'
import ProductReveal from '../components/productReveal'


const page2next = () => {
  return (
    <section className=" bg-[#FFFBF5]  w-full flex  flex-col justify-center">
      <div className="heading h-[25vh] lg:h-[35vh] flex items-end pr-4 justify-center pl-4 lg:pl-10 ">
        <h1 className="text-4xl lg:text-7xl border-b-1 lg:border-none lg:pb-0 pb-4 text-[#352E2E] uppercase font-[primary]">
          What We Manufacture
        </h1>
      </div>
      <ProductReveal/>
    </section>
  )
}

export default page2next