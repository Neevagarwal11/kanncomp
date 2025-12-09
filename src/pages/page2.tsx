import React from 'react'
import { Dot } from 'lucide-react';
import iso from '../assets/iso-removebg-preview.png'
import { MapPin } from 'lucide-react';
import since from '../assets/since2010.png'
function page2() {
  return (
    <div className=' h-screen'>

        <div className='w-full h-[10vh] flex flex-row justify-between'>

            <div className='leftside h-full w-[20vw] flex p-4 justify-center flex-row  '>

                <Dot className='animate-pulse' size={30} color='black'/>
                <p>Featured</p>


            </div>


            <div className='rightside gap-6 w-[60vw] h-full flex items-start justify-end pr-22 p-1 flex-row'>

                <div>
                <img src={iso} alt="ISO Certification" className="w-[3vw] "/>
                </div>
                <div>
                    <img src={since} alt="Since 2010" className="w-[3vw] scale-220 " />
                </div>
                <div className='flex gap-2 p-3 font-[secondary] items-center'>
                      <MapPin />
                    <p>Sri Krishna Nagar,Madhavaram</p>
                </div>

            </div>

        </div>

        <div className='w-full border-2'>

        </div>

    </div>
  )
}

export default page2