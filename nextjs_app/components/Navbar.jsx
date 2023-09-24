"use client"
import Link from "next/link";
import React from "react";
import { LogoutUser } from "@/services/loginApiCall";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


const Header = (props) => {
const route = useRouter();
  const doLogout = async()=>{
    let res;
    try{
       res = await LogoutUser();
    }catch(err){
      console.log(err);
      res = {success:false,message:"Something went wrog Try Again!"}
    }
    finally{
      if(res.success){
        toast.success(res.message);
        setTimeout(() => {
          route.push("/")
        }, 600);
      }else{
        toast.error(res.message);
      }
    }
  }


  return (
    <nav className="bg-slate-300 w-full border-b border-gray-200">
      <div
        className={`max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-1.5 px-4 md:px-16`}
      >
        <span className="text-blue-600 self-center text-2xl font-semibold whitespace-nowrap text-center">
          {props.title}
        </span>

        <div className="flex md:order-2">
        <span onClick={doLogout}
            className="text-green-900 cursor-pointer hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-semibold rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 mr-1 md:mr-2 "
          >
            Logout
          </span>
          <Link
            href={"/support"}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 mr-1 md:mr-2 dark:bg-blue-600 "
          >
            Support
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;


