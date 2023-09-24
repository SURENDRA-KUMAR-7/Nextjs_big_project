import React from 'react';
import Image from "next/image";
import Link from 'next/link';

export default function Footermenu() {
  return (
    <>
<div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200">
<div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
  <Link href={"/user"} className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 "
  >
    <Image
      src="/home.svg"
      alt="home Logo"
      width={28}
      height={10}
    />
    <span className="text-sm text-gray-500 group-hover:text-blue-600">
      Home
    </span>
  </Link>
  <Link href={"/user/refer"} className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50"
  >
    <Image
      src="/refer.svg"
      alt="refer Logo"
      width={28}
      height={10}
      priority
    />
    <span className="text-sm text-gray-500 group-hover:text-blue-600 ">
      Refer
    </span>
    </Link>

    <Link href={"/user/mynetwork"} className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50"
  >
    <Image
      src="/network.svg"
      alt="network Logo"
      width={28}
      height={10}
      priority
    />
    <span className="text-sm text-gray-500 group-hover:text-blue-600">
      {" "}
      Network
    </span>
  </Link>

  <Link href={"/user/learn"} className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50"
  >
    <Image
      src="/learn.svg"
      alt="learn Logo"
      width={28}
      height={10}
      priority
    />
    <span className="text-sm text-gray-500 group-hover:text-blue-600">
      Learn
    </span>
  </Link>

  <Link href={"/user/useraccount"} className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50"
  >
    <Image
      src="/user.svg"
      alt="user Logo"
      width={28}
      height={10}
      priority
    />
    <span className="text-sm text-gray-500 group-hover:text-blue-600">
      Account
    </span>
  </Link>
</div>
</div>

</>
  )
}