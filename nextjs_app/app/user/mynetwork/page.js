import Navbar from '@/components/Navbar';
import Network from '@/components/Network';
import React from 'react';


const Mynetwork = () => {
  return (
   <>
    <Navbar title={"MY NETWORK"} />
        <section className="text-gray-600 body-font">
          <div className="container px-2 py-20 mx-auto md:w-1/2">
          <Network/>
          </div>
        </section>
   </>
  )
}

export default Mynetwork