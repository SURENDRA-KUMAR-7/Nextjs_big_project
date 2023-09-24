"use client"
import PlanNoBuiedRefer from "@/components/PlanNoBuiedRefer";
import React, { useEffect, useState } from "react";
import { getReferCode } from '@/services/referCodeApiCall';
import LoadingSpin from "@/components/LoadingSpin";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";




const PlanBuiedRefer = ({baseUrl}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [refrCode, setRefrCode] = useState(false);
  const [isPlanBuy, setIsPlanBuy] = useState(false);
  
    useEffect(() => {
      async function getData() {
        const fatchRefer = await getReferCode();
          if(fatchRefer.success){
            const deta = fatchRefer.data;
            setRefrCode(deta.refer_code);
            setIsPlanBuy(deta.isPlan_buy);
          }else{
            const noCode = fatchRefer.data || fatchRefer.error;
            if(!noCode){
              toast.error("Server Error Try Again!");
              return
            }
          }
          setIsLoading(false);
      }
        getData();
        }, []);
  
  return (
    <>
 <LoadingSpin isload={isLoading}/>
    {isPlanBuy ? <div className=' flex justify-center items-center'>
      <div className='md:w-1/2'>
    <div className="flex flex-col text-center w-full mb-12">
      <h1 className="sm:text-3xl text-2xl title-font mb-4 text-blue-500 font-bold ">Now You Refer unlimited</h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-sm font-semibold">Plan Buy करने के बाद आप अनलिमिटेड रेफर कर सकते हैं और अनलिमिटेड पैसा कमा सकते हैं।</p>
    </div>
     {/* Share link box with copy */}
     <div className="border border-dashed p-2 border- border-gray-300 text-blue-600 font-semibold text-sm flex justify-between items-center cursor-pointer" onClick={(e)=>{navigator.clipboard.writeText(e.target.innerText); toast.success("Copy!");}}><span>{ baseUrl+"/signup/refer/"+refrCode}</span> 
    <Image
      src="/copy.svg"
      alt="home Logo"
      className=" cursor-pointer rounded hover:bg-gray-200 p-0.5"
      width={24}
      height={10}
    />
    </div>

{/* share links buttons */}
    <div className="flex justify-between p-2 mt-4 ">
  <Link href={`whatsapp://send?text=${baseUrl}/signup/refer/${refrCode}`} className="duration-200 ease inline-flex items-center mb-1 mr-1 transition py-3 px-5 rounded-full text-white bg-green-600 hover:bg-green-500 text-sm" target="_blank" rel="noopener">
    <svg aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6">
      <path d="M413 97A222 222 0 0 0 64 365L31 480l118-31a224 224 0 0 0 330-195c0-59-25-115-67-157zM256 439c-33 0-66-9-94-26l-7-4-70 18 19-68-4-7a185 185 0 0 1 287-229c34 36 56 82 55 131 1 102-84 185-186 185zm101-138c-5-3-33-17-38-18-5-2-9-3-12 2l-18 22c-3 4-6 4-12 2-32-17-54-30-75-66-6-10 5-10 16-31 2-4 1-7-1-10l-17-41c-4-10-9-9-12-9h-11c-4 0-9 1-15 7-5 5-19 19-19 46s20 54 23 57c2 4 39 60 94 84 36 15 49 17 67 14 11-2 33-14 37-27s5-24 4-26c-2-2-5-4-11-6z">
      </path>
    </svg>
    <span className="ml-2">Whatsapp</span>
  </Link>
  <Link href={""} className="border duration-200 ease inline-flex items-center mb-1 mr-1 transition py-3 px-12 rounded-full text-black border-gray-400 hover:bg-blue-100 text-sm font-semibold" target="_blank" rel="noopener">
    <span>Share</span>
  </Link>
</div> 
</div>
</div> : <PlanNoBuiedRefer />}
    </>
  )
}

export default PlanBuiedRefer