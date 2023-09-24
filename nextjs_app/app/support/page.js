"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import LoadingSpin from "@/components/LoadingSpin";
import { saveHelp } from "@/services/supportApiCall";

const supportForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formdata, setFormdata] = useState({
        name:"",
        email:"",
        phoneNumber:"",
        reason:"",
    });

    const changeHandle = (e)=>{
        let inputName = e.target.name;
        let inputValue = e.target.value;
        setFormdata({...formdata,[inputName]:inputValue});
    }


    const submitForm = async(e)=>{
        e.preventDefault();
        const regexP = /^[6789]\d{9}$/;
        const validPhone = regexP.test(formdata.phoneNumber);
        if(formdata.name.trim() === '' || formdata.name == null || !((/^.{3,25}$/).test(formdata.name))){
            toast.warning("Enter Name!");
            return;
        }
        if(formdata.email.trim() === '' || !((/^.{5,35}$/).test(formdata.email))){
            toast.warning("Invalid Email!");
            return;
        }
        if(!validPhone){
            toast.warning("Invalid Phone number!");
            return;
        }
        if(formdata.reason.trim() === '' || !((/^.{19,250}$/).test(formdata.reason))){
            toast.warning("Reson length must be of 19-250 character!");
            return;
        }
       
    
        let res;
        try {
          setIsLoading(true);
          res = await saveHelp(formdata);
              } catch (error) {
                res = {error:"something went wrog Try-again!",success:false};
              } finally {
                setIsLoading(false);
                if (res.success) {
                  toast.success(res.message);
                  setFormdata({
                    name:"",
                    email:"",
                    phoneNumber:"",
                    reason:"",
                  })
                } else {
                  toast.error(res.error);
                }
              
              }
       }




  return (
   <>
    <LoadingSpin isload={isLoading}/>
   <div className=" text-center w-full p-2 bg-pink-100 text-blue-700 self-center text-xl font-semibold">How can we Help You</div>
    <div className="container mb-20 px-4 py-3 mx-auto">
    <form onSubmit={submitForm}>
    <div className="grid gap-4 mb-6 md:grid-cols-2 mt-5">
        <div>
            <label className="block mb-1 text-sm font-medium text-gray-900 ">Name</label>
            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your Name"  name="name"
                onChange={changeHandle} required value={formdata.name}/>
        </div>
        <div>
            <label className="block mb-1 text-sm font-medium text-gray-900 ">Email</label>
            <input type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter email"  name="email" onChange={changeHandle} required value={formdata.email}/>
        </div>
        <div>
            <label className="block mb-1 text-sm font-medium text-gray-900 ">Phone Number</label>
            <input type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter phone number"  name="phoneNumber" onChange={changeHandle} required value={formdata.phoneNumber}/>
        </div>  
        <div>
            <label className="block mb-1 text-sm font-medium text-gray-900 ">Reason for Contact</label>
            <textarea type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter reason"  name="reason" onChange={changeHandle} required value={formdata.reason}/>
        </div>  
        </div>
    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:focus:ring-blue-800">Submit</button>
</form>
</div>
   </>
  )
}

export default supportForm;