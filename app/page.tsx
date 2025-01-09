import { getAllbird } from "@/actions/birds"
import { columns } from "@/components/data-table/colums"
import { DataTable } from "@/components/data-table/data-table"
import React from "react"

const Birds = async () => {
  const birds = await getAllbird()
  // console.log(birds)
  return <DataTable columns={columns} data={birds} />
}

export default Birds
