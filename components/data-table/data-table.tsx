"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  SortingState,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnFiltersState,
  VisibilityState,
  getFilteredRowModel,
  useReactTable,
  Column,
} from "@tanstack/react-table"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { GrFormUpload } from "react-icons/gr"
import { MdKeyboardArrowDown } from "react-icons/md"
import { IoIosAdd } from "react-icons/io"
import { HiOutlinePrinter } from "react-icons/hi2"
import { FaRegFileExcel } from "react-icons/fa"
import { FaRegFilePdf } from "react-icons/fa"
import CreateBirdForm from "../forms/CreateBirdForm"
import { DataTablePagination } from "./Pagination"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

// const ComponentA = dynamic(() => import("../../church/pdf-viewer/page"), {
//   ssr: false,
// })

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [open, setOpen] = useState(false)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    enableRowSelection: true,
    initialState: {
      pagination: {
        pageIndex: 0, //custom initial page index
        pageSize: 5, //custom default page size
      },
    },
  })

  // console.log(memberIds)

  // useEffect(() => {
  //   const selectedRows = table.getSelectedRowModel().flatRows
  //   console.log("Selected rows changed:", selectedRows)
  // }, [table.getState().rowSelection])

  return (
    <div className=" mx-auto max-w-[90%] space-y-7 my-6">
      <div className=" text-2xl font-bold text-center">Birds Data</div>
      <div>
        <div className="flex items-center py-4 gap-x-4 mb-4 flex-wrap gap-y-3">
          <Input
            placeholder="Filter bird names..."
            value={
              (table.getColumn("commonName")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("commonName")?.setFilterValue(event.target.value)
            }
            className="max-w-[10rem] h-8 border  bg-card dark:border dark:border-gray-500 motion-translate-x-in-100 motion-delay-[50ms] motion-ease-spring-bouncier"
          />

          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className=" outline-none py-1 border-none hidden md:block motion-translate-x-in-100 motion-delay-[150ms] motion-ease-spring-bouncier"
            >
              <Button
                variant="outline"
                className="outline-none  h-8 text-gray-400  bg-muted"
              >
                <GrFormUpload className="inline-block mr-2  text-gray-400/80" />{" "}
                Export{" "}
                <MdKeyboardArrowDown className="inline-block ml-2 text-gray-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className=" space-y-1.5 ">
              <DropdownMenuItem>
                {" "}
                <HiOutlinePrinter className="inline-block mr-1.5 text-gray-600" />
                Print
              </DropdownMenuItem>
              <DropdownMenuItem>
                {" "}
                <FaRegFileExcel className="inline-block mr-1.5 text-gray-500" />
                Csv
              </DropdownMenuItem>
              <DropdownMenuItem>
                {" "}
                <FaRegFilePdf className="inline-block mr-1.5 text-gray-500" />
                Pdf
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="ml-auto bg-dashboardBaseColor text-[0.9rem] hover:bg-dashboardBaseColor/80 cursor-pointer text-card duration-200 ease-linear px-3 py-1.5 rounded-sm motion-scale-in-[30%] motion-delay-[50ms] motion-ease-spring-bouncier motion-opacity-in-0">
              <IoIosAdd className="inline-block mr-2 text-white font-bold text-[1.2rem]" />
              Add new bird
            </DialogTrigger>
            <CreateBirdForm setOpen={setOpen} />
          </Dialog>
          {/* <div className=" ml-auto bg-dashboardBaseColor text-[0.9rem] hover:bg-dashboardBaseColor/80 cursor-pointer text-card duration-200 ease-linear px-3 py-1.5 rounded-sm">
          <IoIosAdd className="inline-block mr-2 text-white font-bold text-[1.2rem]" />
          Add member
        </div> */}
        </div>

        <div className="rounded-md  bg-card">
          <Table>
            <TableHeader>
              {table.getHeaderGroups()?.map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className=" text-center ">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,

                              header.getContext()
                            )}
                        {/* {header.column.getCanFilter() ? (
                        <div>
                          <Filter column={header.column} />
                        </div>
                      ) : null} */}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table?.getRowModel()?.rows?.length ? (
                table.getRowModel().rows?.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className=" even:bg-gray-200/15 "
                  >
                    {row.getVisibleCells()?.map((cell) => (
                      <TableCell
                        key={cell.id}
                        // onClick={() => {
                        //   console.log(cell.id)
                        // }}
                        className="p-2 text-[0.78rem]  text-center "
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns?.length}
                    className="h-24 text-center"
                  >
                    No members found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <DataTablePagination table={table} />
      </div>
    </div>
  )
}

// See faceted column filters example for datalist search suggestions
