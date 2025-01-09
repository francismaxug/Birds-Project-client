"use client"

import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"

import { useState } from "react"
import ModalHolder from "./modals/ModalHolder"
import Modal from "./modals/Modal"

import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { deleteBird } from "@/actions/birds"
import UpdateBirdForm from "./forms/UpdateBirdForm"

interface DataTableViewOptionsProps<TData, RowData> {
  row: RowData
}

export function DataTableDropdownOptions<TData>({
  row,
}: DataTableViewOptionsProps<TData, any>) {
  const [openModal, setOpenModal] = useState(false)
  const [openUpdateModal, setOpenUpdateModal] = useState(false)
  const [open, setOpen] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [birdId, setBirdId] = useState("")
  const [bird, setBird] = useState(null)
  // const [openUpsa, setOpen] = useState(false)

  const router = useRouter()
  console.log(bird)

  const onConfirmDelete = async () => {
    try {
      setLoadingDelete(true)
      const res = await deleteBird(birdId)
      if (res?.status !== "success") {
        toast.error(res.message || "Error removing bird")
        return
      }
      toast.success(res.message || "Bird removed successfully")
      router.refresh()
    } catch (error) {
      toast.error("An error occured")
    } finally {
      setLoadingDelete(false)
      setOpenModal(false)
    }
  }
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0 ml-3">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          {/* <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className=" text-[0.8rem]  w-full text-left pl-2 text-gray-600 hover:bg-gray-100 rounded py-[0.3rem]">
              View more details
            </DialogTrigger>
            <UpdateBirdForm setOpen={setOpen} bird={bird} />
          </Dialog> */}

          <Dialog open={openUpdateModal} onOpenChange={setOpenUpdateModal}>
            <DialogTrigger
              onClick={() => setBird(row.original)}
              className=" text-[0.8rem]  w-full text-left pl-2 text-gray-600 hover:bg-gray-100 rounded py-[0.3rem]"
            >
              Update
            </DialogTrigger>
            <UpdateBirdForm setOpen={setOpen} bird={bird} />
          </Dialog>

          <DropdownMenuItem
            className="text-[0.8rem]  w-full text-left pl-2 text-gray-600 hover:bg-gray-100 rounded py-[0.3rem] cursor-pointer"
            onClick={() => {
              setOpenModal(true)
              setBirdId(row.original._id)
              //   console.log(row.original.id)
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {openModal && (
        <Modal>
          <ModalHolder
            className="max-w-[25rem]"
            onConfirmDelete={onConfirmDelete}
            loadingDelete={loadingDelete}
            setOpenModal={setOpenModal}
            title="Delete Bird"
            textContent="All bird data will be lost and cannot be recovered. Are you sure you want to delete this bird?"
          />
        </Modal>
      )}
      {/* {openUpdateModal && (
        <Modal>
          <ModalHolder
            className="max-w-[25rem]"
            onConfirmDelete={onConfirmDelete}
            loadingDelete={loadingDelete}
            setOpenModal={setOpenModal}
            title="Delete Bird"
            textContent="All bird data will be lost and cannot be recovered. Are you sure you want to delete this bird?"
          />
        </Modal>
      )} */}
    </div>
  )
}
