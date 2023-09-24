"use client"
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { LoginUser } from "@/services/loginApiCall";
import LoadingSpin from "@/components/LoadingSpin";
import { useRouter } from "next/navigation";


const Loginjsx = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formdata, setFormdata] = useState({
      phone:"",
      password:"",
  });
  const changeHandle = (e)=>{
    let inputName = e.target.name;
    let inputValue = e.target.value;
    setFormdata({...formdata,[inputName]:inputValue});
}


const submitForm = async(e)=>{
  e.preventDefault();
  const regex = /^[6789]\d{9}$/;
  const validPhone = regex.test(formdata.phone);
  if(formdata.phone.trim() === '' || !validPhone){
      toast.warning("Invalid Phone number!");
      return;
  }
  if(formdata.password.trim() === '' || !((/^.{4,16}$/).test(formdata.password))){
      toast.warning("Wrong password");
      return;
  }
  let res;
  try {
    setIsLoading(true);
    res = await LoginUser(formdata);
        } catch (error) {
          console.log(error);
          res = {result:{error:"something went wrog Try-again!",success:false}};
        } finally {
          setIsLoading(false);
          if (res.result.success) {
            toast.success("Login successfully!");
            setFormdata({
              phone: "",
              password: "",
            });
            setTimeout(() => {
              router.push("/user");
            }, 500);
          } else {
            toast.error(res.result.error);
          }
        
        }
 }
  return (
    <div className="grid grid-cols-12">
   <LoadingSpin isload={isLoading}/>
 <div className="col-span-8 col-start-3 md:col-span-4 md:col-start-5">
   <div className="py-5">
     <div className="flex justify-center mb-2">
       <Image
         src="/signup_undrow.svg"
         alt="network Logo"
         width={80}
         height={10}
         priority
       />
     </div>
     <h1 className="text-2xl text-center mb-1 text-blue-500 font-semibold">
       Login Here
     </h1>
     <form onSubmit={submitForm}>
       {/* Phone Number */}
       <div className="mt-5">
         <label
           htmlFor="user_Phone Number"
           className="block text-sm font-medium pl-2 text-gray-700"
         >
           Phone Number
         </label>
         <input
           type="number"
           id="user_Phone Number"
           className="w-full p-2 rounded-xl bg-gray-200 border-2 border-gray-400 focus:bg-gray-100  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
           placeholder="Enter your Phone Number"
           name="phone" onChange={changeHandle} required value={formdata.phone}
         />
       </div>
       {/* Password */}
       <div className="mt-5">
         <label
           htmlFor="user_Password"
           className="block text-sm font-medium  pl-2 text-gray-700"
         >
           Password
         </label>
         <input
           type="password"
           id="user_Password"
           className="w-full p-2 rounded-xl bg-gray-200 border-2 border-gray-400 focus:bg-gray-100"
           placeholder="Enter Password"
           name="password" onChange={changeHandle} required value={formdata.password}
         />
       </div>
     
       <div className="mt-5">
         <button
           type="submit"
           className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-3xl hover:bg-blue-600"
         >
           Login
         </button>
       </div>
       <div className="flex mt-3 justify-center text-sm">
         <span className="mx-2">I haven't an account? /</span>
         <Link
           href={"/signup"}
           className="text-blue-500 hover:text-blue-600 font-semibold">
           SignUp
         </Link>
       </div>
     </form>
   </div>
 </div>
</div>
  )
}

export default Loginjsx