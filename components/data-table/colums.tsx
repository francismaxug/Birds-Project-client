"use client"

import { ColumnDef, RowData } from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import { DataTableColumnHeader } from "./ColumnSortable"
import { DataTableDropdownOptions } from "../ActionsDropdown"
import CheckBox from "./CheckBox"
import { Bird } from "@/lib/types"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Bird>[] = [
  {
    id: "select",
    header: ({ table }) => <CheckBox table={table} />,
    cell: ({ row, table }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(!!value)
          row.getIsSelected()
          row.getToggleSelectedHandler()
        }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "commonName",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />
    },
  },
  {
    accessorKey: "scientificName",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Scientific Name" />
    },
  },
  {
    accessorKey: "description",
    // header: "Phone Number",
    header: ({ column }) => {
      return (
        <div className="text-[0.9rem] hover:bg-transparent">Description</div>
      )
    },
  },

  {
    id: "actions",
    header: ({ table }) => <h1 className="text-[0.9rem]">Actions</h1>,
    cell: ({ row }) => {
      // console.log(payment)

      return <DataTableDropdownOptions row={row} />
    },
  },
]
