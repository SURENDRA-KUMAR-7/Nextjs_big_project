"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingSpin from "@/components/LoadingSpin";
import { saveUpiDetailes } from "@/services/upiApiCall";
import { getUpiDetailes } from '@/services/upiApiCall';
import { useRouter } from "next/navigation";

const Upiform = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formdata, setFormdata] = useState({
        name:"",
        phone:"",
        upiid:"",
    });
      useEffect(() => {
    async function getData() {
      const fatchUpi = await getUpiDetailes();
        if(fatchUpi.success){
          const deta = fatchUpi.data;
          setFormdata({
            name: deta.name,
            phone: deta.phone,
            upiid: deta.upi,
        })
        }else{
          const noUpi = fatchUpi.data || fatchUpi.error;
          if(!noUpi){
            toast.error("Server Error Try Again!");
            return
          }
        }
    }
      getData();
      }, [])

    const changeHandle = (e)=>{
        let inputName = e.target.name;
        let inputValue = e.target.value;
        setFormdata({...formdata,[inputName]:inputValue});
    }


    const submitForm = async(e)=>{
        e.preventDefault();
        const regexP = /^[6789]\d{9}$/;
        const validPhone = regexP.test(formdata.phone);
        if(formdata.name.trim() === '' || formdata.name == null || !((/^[A-Z a-z]{2,16}$/).test(formdata.name))){
            toast.warning("Name length must be of 2-16!");
            return;
        }
        if(!validPhone){
            toast.warning("Invalid Phone number!");
            return;
        }
        if(formdata.upiid.trim() === '' || !((/^.{4,25}$/).test(formdata.upiid))){
            toast.warning("Invalid UPI!");
            return;
        }
       
    
        let res;
        try {
          setIsLoading(true);
          res = await saveUpiDetailes(formdata);
              } catch (error) {
                console.log(error);
                res = {error:"something went wrog Try-again!",success:false};
              } finally {
                setIsLoading(false);
                if (res.success) {
                  toast.success(res.message);
                  setTimeout(() => {
                    router.back();
                  }, 1000);
                } else {
                  toast.error(res.error);
                }
              
              }
       }




  return (
   <>
    <LoadingSpin isload={isLoading}/>
   
    <div className="container mb-20 px-4 py-3 mx-auto">
    <form onSubmit={submitForm}>
    <div className="grid gap-6 mb-6 md:grid-cols-2 mt-5">
        <div>
            <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-900 ">Name</label>
            <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Name"  name="name"
                onChange={changeHandle} required value={formdata.name}/>
        </div>
        <div>
            <label htmlFor="phone" className="block mb-1 text-sm font-medium text-gray-900 ">Phone Number</label>
            <input type="number" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Number"  name="phone" onChange={changeHandle} required value={formdata.phone}/>
        </div>
        <div>
            <label htmlFor="upiid" className="block mb-1 text-sm font-medium text-gray-900 ">UPI ID</label>
            <input type="text" id="upiid" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter UPI"  name="upiid" onChange={changeHandle} required value={formdata.upiid}/>
        </div>  
        </div>
    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:focus:ring-blue-800">Submit</button>
</form>
</div>
   </>
  )
}

export default Upiform