import { Bird } from "@/lib/types"
import React from "react"
import Image from "next/image"
import { DialogContent } from "@/components/ui/dialog"

const ViewMore = ({ bird }: { bird: Bird | null }) => {
  //   console.log(bird)
  return (
    <div className="">
      <DialogContent className="max-w-[42rem] overflow-y-scroll h-screen ">
        <div>
          <p className=" font-bold pb-3">Bird Details</p>
          <p className=" pb-2">Photos</p>
          <div className=" flex gap-x-3 items-center">
            {bird?.photos?.map((photo, index) => (
              <div
                key={index}
                className=" rounded-sm w-[7rem] h-[8.5rem] overflow-hidden object-cover object-center "
              >
                <Image
                  src={photo}
                  alt=""
                  quality={80}
                  width={1000}
                  height={1000}
                  className="w-full h-full "
                />
              </div>
            ))}
            {bird?.photos.length === 0 && (
              <p className=" text-[0.9rem]">No photos</p>
            )}
          </div>
        </div>
        <hr className="-mt-2" />

        <div className=" grid grid-cols-2 gap-y-4 w-full">
          <div className=" flex flex-col ">
            <p>Common Name</p>
            <p className=" text-gray-500 text-[0.87rem]">{bird?.commonName}</p>
          </div>
          <div className=" flex flex-col ">
            <p> Scientifc Name</p>
            <p className=" text-gray-500 text-[0.87rem]">
              {bird?.scientificName}
            </p>
          </div>

          <div className=" flex flex-col ">
            <p>Appearance</p>
            <div>
              <div className=" flex gap-x-2 items-center">
                <div className=" text-[0.85rem]">Size:</div>
                <div className=" text-gray-500 text-[0.85rem]">
                  {bird?.appearance?.size}
                </div>
              </div>
              <div className=" flex gap-x-2 items-center">
                <div className=" text-[0.85rem]">Colors:</div>
                <div className=" text-gray-500 text-[0.85rem]">
                  {bird?.appearance?.color?.join(", ")}
                </div>
              </div>
            </div>
          </div>
          <div className=" flex flex-col ">
            <p>Habitat</p>
            <p className=" text-gray-500 text-[0.87rem]">
              {bird?.habitat.join(", ")}
            </p>
          </div>
        </div>
        <div>
          <div className=" flex flex-col pb-1 ">
            <p> Description</p>
            <p className=" text-gray-500 text-[0.87rem]">{bird?.description}</p>
          </div>
        </div>
      </DialogContent>
    </div>
  )
}

export default ViewMore
