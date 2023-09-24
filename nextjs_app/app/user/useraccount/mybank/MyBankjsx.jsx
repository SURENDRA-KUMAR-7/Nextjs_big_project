"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { getUpiDetailes } from '@/services/upiApiCall';
import { getBankDetailes } from '@/services/bankApiCall';
import OnlySpin from '@/components/OnlySpin';


const MybankJsx = () => {
const [upiData, setUpiData] = useState(null);
const [bankData, setBankData] = useState(null);
const [isBank, setisBank] = useState(false);
const [isUpi, setisUpi] = useState(false);

  useEffect(() => {
async function getData() {
  const fatchUpi = await getUpiDetailes();
  const fatchBank = await getBankDetailes();
    if(fatchUpi.success){
      const deta = fatchUpi.data;
      setUpiData([
        {Name: deta.name},
        {Phone: deta.phone},
        {UPI: deta.upi},
      ])
      setisUpi(true);
    }else{
      const noUpi = fatchUpi.data || fatchUpi.error;
      if(!noUpi){
        setUpiData("Server Error Try Again!");
      }else{
        setUpiData(noUpi.toString());
        setisUpi(false);
      }
    }
    if(fatchBank.success){
      const deta = fatchBank.data;
      setBankData([
        {Name: deta.holder_name},
        {Bank: deta.bank_name},
        {'Account Number': deta.account_number},
        {IFSC: deta.ifsc_code},
      ])
      setisBank(true);
    }else{
      const noBank = fatchBank.data || fatchBank.error;
      if(!noBank){
        setBankData("Server Error Try Again!");
      }else{
        setBankData(noBank.toString());
        setisBank(false);
      }
    }
}
  getData();
  }, [])
  
  return (
    <>
    
    <div className="container mb-20 px-4 py-3 mx-auto">
  
   {/* UPI details */}
   <div className='mt-2'>
    <div className='border-2 border-gray-400 rounded p-2'>
      <div className='text-blue-500 text-center font-semibold text-lg'>UPI ID</div>
      <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-500"></hr>
      <OnlySpin isloading={!isUpi && !upiData}/>
      {isUpi && upiData.map((val,i)=>{
         return <div key={i} className='flex justify-between p-1 mt-1'><span className='font-semibold'>{Object.keys(val)[0]}</span><span>{Object.values(val)[0]}</span></div>
      }
      )}
      <div className='flex justify-end items-center gap-5'>
        {!isUpi && <span>{upiData}</span>}
    <Link href={"./mybank/upiform"} className="duration-200 ease inline-flex items-center m-1 transition py-2 px-5 rounded text-white bg-blue-500 hover:bg-blue-600 text-sm">
    <span>Edit Details</span>
  </Link>
  </div>
    </div>
   </div>

   <div className="inline-flex items-center justify-center w-full">
    <hr className="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
    <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 rounded-full ">or</span>
</div>

   {/* Bank Details */}
   <div>
    <div className='border-2 border-gray-400 rounded p-2'>
      <div className='text-blue-500 text-center font-semibold text-lg'>Bank Details</div>
      <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-500"></hr>
      <OnlySpin isloading={!isBank && !bankData}/>
      {isBank && bankData.map((val,i)=>{
         return <div key={i} className='flex justify-between p-1 mt-1'><span className='font-semibold'>{Object.keys(val)[0]}</span><span>{Object.values(val)[0]}</span></div>
      }
      )}
      <div className='flex justify-end items-center gap-5'>
      {!isBank && <span>{bankData}</span>}
    <Link href={"./mybank/bankdetailsform"} className="duration-200 ease inline-flex items-center m-1 transition py-2 px-5 rounded text-white bg-blue-500 hover:bg-blue-600 text-sm">
    <span>Edit Details</span>
  </Link>
  </div>
    </div>
   </div>
</div>
    </>
  )
}

export default MybankJsx