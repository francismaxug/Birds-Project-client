import React from "react"
import Image from "next/image"
import Link from "next/link"

const Home = () => {
  return (
    <div className=" mx-auto w-[30%] flex items-center justify-center mt-20">
      <div className="space-y-3 text-center flex flex-col items-center">
        <div className="overflow-hidden rounded-full size-48">
          <Image
            src="/bird1.jpg"
            alt="bird"
            width={1000}
            height={1000}
            quality={80}
            className=" object-cover object-center w-full h-full"
          />
        </div>
        <p className=" pb-3 text-2xl font-bold">Welcome to Birds Data</p>
        <Link
          className=" bg-dashboardBaseColor px-3 py-1.5 rounded-md text-white"
          href="/birds"
        >
          Click to continue
        </Link>
      </div>
    </div>
  )
}

export default Home
