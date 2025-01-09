import React, { useEffect } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Table } from "@tanstack/react-table"

interface DataTablePaginationProps<TData> {
  table: Table<TData>
}

export function CheckBox<TData>({ table }: DataTablePaginationProps<TData>) {
  return (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && "indeterminate")
      }
      onCheckedChange={(value) => {
        // console.log(table.getRow(""))
        table.toggleAllPageRowsSelected(!!value)
        table.getToggleAllRowsSelectedHandler()
      }}
      aria-label="Select all"
    />
  )
}

export default CheckBox
