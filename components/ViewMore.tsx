import { Bird } from "@/lib/types"
import React from "react"
import Image from "next/image"

const ViewMore = ({ data }: { data: Bird }) => {
  return (
    <div>
      <div>
        <p>Photos</p>
        <div>
          {data.photos?.map((photo, index) => (
            <div key={index}>
              <Image src={photo} alt="" width={1000} height={1000} />
            </div>
          ))}
        </div>
      </div>
      <hr />

      <div>
        <div>
          <p>Common Name</p>
        </div>
        <div>
          <p> Scientifc Name</p>
        </div>
        <div>
          <p> Description</p>
        </div>
        <div>
          <p>Appearance</p>
        </div>
        <div>
          <p>Habitat</p>
        </div>
      </div>
    </div>
  )
}

export default ViewMore
