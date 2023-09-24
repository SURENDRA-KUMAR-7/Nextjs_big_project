import LoadingSpin from "@/components/LoadingSpin";
import Link from "next/link";
import React from "react";


export default function Home() {
  return (
    <>
     <nav className="bg-slate-300 w-full border-b border-gray-200">
      <div
        className={`max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-1.5 px-4 md:px-16`}
      >
        <span className="text-blue-600 self-center text-2xl font-semibold whitespace-nowrap">
          {process.env.WEBSITE_NAME}
        </span>

        <div className="flex md:order-2">
          <Link
            href="/login"
            className="text-green-600  hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-semibold rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 mr-1 md:mr-2 "
          >
            Login
          </Link>
          <Link
            href="signup"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 mr-1 md:mr-2 dark:bg-blue-600 "
          >
            Sign up
          </Link>
        </div>
      </div>
    </nav>
    <section className=''>
        <div className='absolute top-1/2 left-1/2 font-bold -translate-x-2/4 -translate-y-1/2 text-blue-600 text-xl'>WELCOME</div>
       </section>
    </>
  );
}
