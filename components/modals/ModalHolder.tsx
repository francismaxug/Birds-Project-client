import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import { Loader2 } from "lucide-react"
import { IoWarningOutline } from "react-icons/io5"
import SaveButton from "../buttons/SaveButton"

const ModalHolder = ({
  onConfirmDelete,
  setOpenModal,
  loadingDelete,
  additionalClass,
  title,
  textContent,
  className,
}: {
  onConfirmDelete: () => void
  setOpenModal: (state: boolean) => void
  loadingDelete: boolean
  additionalClass?: string
  title: string
  textContent: string
  className?: string
}) => {
  return (
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.6 }}
      className={cn(
        "bg-white rounded-[16px]  max-w-[27rem] 3xl:max-w-[29rem] 4xl:max-w-[30rem]",
        className
      )}
    >
      <div
        className={cn(
          " flex flex-col gap-y-2 items-center justify-center px-8 py-6 pb-8 ",
          additionalClass
        )}
      >
        <div className=" bg-[#e3c652] bg-opacity-30 rounded-full size-[3.3rem] flex items-center justify-center 3xl:size-[3.5rem]">
          <IoWarningOutline className=" text-[#E1B300] text-[1.3rem] 3xl:text-[1.5rem]" />
        </div>
        <h1 className=" text-[#040A1D] font-bold text-[24px] 3xl:text-[30px] pb-1 text-center">
          {title}
        </h1>
        <p className=" font-varela text-[#4C536A] text-[0.85rem] text-center">
          {textContent}
        </p>
        <div className="flex items-center justify-between gap-x-5 mt-5">
          <SaveButton
            onClick={onConfirmDelete}
            className=" py-1.5  rounded-full bg-transparent px-10 text-[#DB2E78] font-bold border-2 border-[#DB2E78] hover:bg-[#d14481] hover:text-white"
          >
            <p className=" flex gap-x-[0.4rem] items-center justify-center text-center w-full ">
              {loadingDelete ? <Loader2 className=" animate-spin" /> : null}{" "}
              Remove
            </p>
          </SaveButton>
          <SaveButton
            onClick={() => setOpenModal(false)}
            className=" text-white py-1.5 px-12 font-bold hover:bg-gray-400/80 rounded-full flex items-center duration-300 ease-in-out  justify-center w-full  bg-gray-300/90"
          >
            Cancel
          </SaveButton>
        </div>
      </div>
    </motion.div>
  )
}

export default ModalHolder
