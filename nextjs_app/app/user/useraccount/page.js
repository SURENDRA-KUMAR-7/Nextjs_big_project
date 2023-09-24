'use client'
import Navbar from "@/components/Navbar";
import Link from "next/link";
import React from "react";
try{
const token = localStorage.getItem("token");
if(token){
  console.log({token});
}
}catch(err){
console.log();
}

const Mynetwork = () => {
 
  return (
    <>
      <Navbar title={"My Account"} />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto">
          <div className="flex justify-center flex-col items-center">
            <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <svg
                className="absolute w-12 h-12 text-gray-400 -left-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                 
                ></path>
              </svg>
            </div>
            <span className="py-2 font-bold text-lg">User Name</span>
          </div>

       <div className="flex justify-center my-5"> 
<ul className="w-full text-base font-medium text-blue-500 bg-white border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
    <Link href={"./useraccount/mybank"}><li className="w-full px-5 py-3 border-b border-gray-300 rounded-t-lg hover:bg-gray-200 dark:border-gray-600">My Bank</li></Link>
    <Link href={"./useraccount/withdrawal"}><li className="w-full px-5 py-3 border-b border-gray-300 hover:bg-gray-200 dark:border-gray-600">Withdraw</li></Link>
    {/* <li className="w-full px-5 py-3 border-b border-gray-300 hover:bg-gray-200 dark:border-gray-600">My Courses</li> */}
    {/* <div onClick={()=>{}} className="w-full px-5 py-3 rounded-b-lg hover:bg-gray-200">Sing out</div> */}
</ul></div> 

        </div>
      </section>
    </>
  );
};

export default Mynetwork;
