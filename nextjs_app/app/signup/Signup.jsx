"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SignupUser } from "@/services/signApiCall";
import LoadingSpin from "@/components/LoadingSpin";
import { useRouter } from "next/navigation";
import { useParams } from 'next/navigation';



const Signup = () => {
  const [isRefercode, setIsRefercode] = useState(false)
  const params = useParams();
  const router = useRouter();
 const [isLoading, setIsLoading] = useState(false);
    const [formdata, setFormdata] = useState({
        name:"",
        phone:"",
        password:"",
        referCode: false,
    });
    const [confirmpass, setConfpass] = useState("");

    const changeHandle = (e)=>{
        let inputName = e.target.name;
        let inputValue = e.target.value;
        setFormdata({...formdata,[inputName]:inputValue});
    }

    useEffect(() => {
  if(Object.keys(params).length === 1){
    setFormdata({...formdata,referCode:params.code});
    setIsRefercode(true);
  }
    }, [])
    



   const submitSignUP = async(e)=>{
    e.preventDefault();
    const regexP = /^[6789]\d{9}$/;
    const validPhone = regexP.test(formdata.phone);
    if(formdata.name.trim() === '' || formdata.name == null || !((/^[A-Z a-z]{2,25}$/).test(formdata.name))){
        toast.warning("Name length must be of 2-25!");
        return;
    }
    if(formdata.phone.trim() === '' || !validPhone){
        toast.warning("Invalid Phone number!");
        return;
    }
    if(formdata.password.trim() === '' || !((/^.{4,16}$/).test(formdata.password))){
        toast.warning("password length must be of 4-16!");
        return;
    }
    if(!(formdata.password == confirmpass)){
      toast.warning("Password not match!");
        return;
    }

    let res;
    try {
      setIsLoading(true);
      res = await SignupUser(formdata);
          } catch (error) {
            res = {error:"something went wrog Try-again!!",success:false};
          } finally {
            setIsLoading(false);
            if (res.success) {
              toast.success("SignUp successfully!");
              setFormdata({
                ...formdata,
                name: "",
                phone: "",
                password: "",
              });
              setConfpass("");
              setTimeout(() => {
                router.push("/login");
              }, 1000);
            } else {
              toast.warning(res.error);
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
            SignUp Here
          </h1>
          <form onSubmit={submitSignUP}>
            {/* name */}
            <div className="mt-3">
              <label
                htmlFor="user_name"
                className="block text-sm font-medium  pl-2 text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="user_name"
                className="w-full p-2 rounded-xl bg-gray-200 border-2 border-gray-400 focus:bg-gray-100"
                placeholder="Enter your name"
                name="name"
                onChange={changeHandle} required value={formdata.name}
              />
            </div>

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
            {/* Confirm password */}
            <div className="mt-5">
              <label
                htmlFor="user_cpassword"
                className="block text-sm font-medium pl-2 text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="user_cpassword"
                className="w-full p-2 rounded-xl bg-gray-200 border-2 border-gray-400 focus:bg-gray-100"
                placeholder="Confirm Password" required onChange={(e)=>setConfpass(e.target.value)} value={confirmpass}
              />
            </div>
            {/* Referal code */}
           {isRefercode && <div className="mt-3">
              <label
                htmlFor="user_cpassword"
                className="block text-sm font-medium pl-2 text-gray-700"
              >
                Refer code
              </label>
              <input
                type="text"
                id="user_cpassword"
                className="w-full p-2 rounded-xl bg-gray-200 border-2 border-gray-400 outline-none"
                required onChange={changeHandle} value={formdata.referCode} name="referCode"
              />
            </div>}
            <div className="mt-5">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-3xl hover:bg-blue-600"
              >
                SingUp
              </button>
            </div>
            <div className="flex mt-3 justify-center text-sm">
              <span className="mx-2">I have an account? /</span>
              <Link
                href={"/login"}
                className="text-blue-500 hover:text-blue-600 font-semibold">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
