import Navbar from "@/components/Navbar";
import React from "react";


export default function user() {
  return (
    <>
     <Navbar title={"Hi, User"}/>
     <section className=''>
        <div className='absolute top-1/2 left-1/2 font-bold -translate-x-2/4 -translate-y-1/2 text-blue-600 text-xl'>WELCOME</div>
       </section>
    </>
  );
}
