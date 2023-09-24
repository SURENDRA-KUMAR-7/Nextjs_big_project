"use client"
import PlanNoBuiedRefer from "@/components/PlanNoBuiedRefer";
import React, { useEffect, useState } from "react";
import LoadingSpin from "@/components/LoadingSpin";
import { toast } from "react-toastify";
import { getEarnings } from '@/services/networkApiCall'

const Network = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlanBuy, setIsPlanBuy] = useState(false);
  
    useEffect(() => {
      async function getData() {
        const fatchEarn = await getEarnings();
          if(fatchEarn.success){
            const deta = fatchEarn.data;
            setIsPlanBuy(deta);
          }else{
            const noCode = fatchEarn.data || fatchEarn.error;
            if(!noCode){
              toast.error("Server Error Try Again!");
              return
            }
            toast.warning(noCode);
          }
          setIsLoading(false);
      }
        getData();
        }, []);


  return (
   <>
   <LoadingSpin isload={isLoading}/>
   {isPlanBuy ? <div className="space-y-5">
    <div className="flex flex-wrap -m-4 text-center justify-center">
      <div className=" md:w-1/4 w-1/2">
        <h2 className="title-font font-medium text-xl text-gray-900">₹ {isPlanBuy.total_earning}</h2>
        <p className="leading-relaxed">Total Earning</p>
      </div>
      <div className=" md:w-1/4 w-1/2">
        <h2 className="title-font font-medium text-xl text-gray-900">₹ {isPlanBuy.today_earning}</h2>
        <p className="leading-relaxed">Today Earning</p>
      </div>
    </div>
    {/* Levels */}
    <div className=" grid grid-cols-3 text-center text-sm text-gray-600 uppercase font-semibold bg-white">
      <div className="space-y-2 pb-3 border-r-2 border-gray-100">
      <div className="bg-gray-100">Level 1</div>
      {isPlanBuy.level_1.map((val,i)=>{return <div key={i}><span className="text-red-300">ID: </span>{val}</div>})}
      </div>
      <div className="space-y-2 pb-3 border-r-2 border-gray-100">
      <div className="bg-gray-100">Level 2</div>
      {isPlanBuy.level_2.map((val,i)=>{return <div key={i}><span className="text-red-300">ID: </span>{val}</div>})}
      </div>
      <div className="space-y-2 pb-3">
      <div className="bg-gray-100">Level 3</div>
      {isPlanBuy.level_3.map((val,i)=>{return <div key={i}><span className="text-red-300">ID: </span>{val}</div>})}
      </div>
    </div>
    </div> : <PlanNoBuiedRefer />}
   </>
  )
}

export default Network