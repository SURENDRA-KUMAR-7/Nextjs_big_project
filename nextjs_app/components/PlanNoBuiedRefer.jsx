"use client"
import React from 'react'
// import Image from "next/image";
import Link from "next/link";
import { planBuy } from '@/services/planBuyApiCall';
import { toast } from 'react-toastify';


const PlanNoBuiedRefer = () => {
  const buyHendle = async()=>{
    const amount = 567;
    let res;
    try{
      res = await planBuy(amount);
    }catch(err){
      res = {message:"Something went wrog Try Again!",success:false};
    }
    finally{
      if(res.success){
        toast.success(res.message);
        setTimeout(() => {
          location.reload();
        }, 1000);
      }else{
        toast.warning(res.message);
      }
    }
  }

  return (
    <>
     <div className="flex flex-col text-center w-full mb-12">
      <h1 className="sm:text-3xl text-2xl title-font mb-4 text-blue-500 font-bold ">FIRST BUY PLAN </h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-sm font-semibold">Plan Buy करने के बाद आप अनलिमिटेड रेफर कर सकते हैं और अनलिमिटेड पैसा कमा सकते हैं।</p>
    </div>
    <div className='flex justify-center'>
    <Link href={""} onClick={buyHendle} className="duration-200 ease inline-flex items-center mb-1 mr-1 transition py-3 px-10 rounded-full text-white bg-green-600 hover:bg-green-500 text-sm">
    <span>Buy Now</span>
  </Link>
  </div>
    </>
  )
}

export default PlanNoBuiedRefer