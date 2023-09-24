"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingSpin from "@/components/LoadingSpin";
import { saveBankDetailes } from "@/services/bankApiCall";
import { getBankDetailes } from "@/services/bankApiCall";
import { useRouter } from "next/navigation";

const bankDetailForm = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formdata, setFormdata] = useState({
        holderName:"",
        bankName:"",
        accountNumber:"",
        ifscCode:"",
    });
      useEffect(() => {
    async function getData() {
      const fatchUpi = await getBankDetailes();
        if(fatchUpi.success){
          const deta = fatchUpi.data;
          setFormdata({
            holderName: deta.holder_name,
            bankName: deta.bank_name,
            accountNumber: deta.account_number,
            ifscCode: deta.ifsc_code,
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
        if(formdata.holderName.trim() === '' || formdata.holderName == null || !((/^.{3,20}$/).test(formdata.holderName))){
            toast.warning("Enter Name!");
            return;
        }
        if(formdata.bankName.trim() === '' || !((/^.{2,20}$/).test(formdata.bankName))){
            toast.warning("Enter Bank Name!");
            return;
        }
        if(!((/^.{2,25}$/).test(formdata.accountNumber))){
            toast.warning("Enter Account Number!");
            return;
        }
        if(formdata.ifscCode.trim() === '' || !((/^.{3,20}$/).test(formdata.ifscCode))){
            toast.warning("Enter IFSC code!");
            return;
        }
       
    
        let res;
        try {
          setIsLoading(true);
          res = await saveBankDetailes(formdata);
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
            <label className="block mb-1 text-sm font-medium text-gray-900 ">Bank Holder Name</label>
            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your Name"  name="holderName"
                onChange={changeHandle} required value={formdata.holderName}/>
        </div>
        <div>
            <label className="block mb-1 text-sm font-medium text-gray-900 ">Bank Name</label>
            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter bank name"  name="bankName" onChange={changeHandle} required value={formdata.bankName}/>
        </div>
        <div>
            <label className="block mb-1 text-sm font-medium text-gray-900 ">Account Number</label>
            <input type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter account number"  name="accountNumber" onChange={changeHandle} required value={formdata.accountNumber}/>
        </div>  
        <div>
            <label className="block mb-1 text-sm font-medium text-gray-900 ">IFSC</label>
            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter IFSC code"  name="ifscCode" onChange={changeHandle} required value={formdata.ifscCode}/>
        </div>  
        </div>
    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:focus:ring-blue-800">Submit</button>
</form>
</div>
   </>
  )
}

export default bankDetailForm;