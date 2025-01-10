"use client"
import React from "react"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { useState } from "react"
import { toast } from "sonner"
// import Image from "next/image"
import SaveButton from "../buttons/SaveButton"
import { DialogContent } from "@/components/ui/dialog"
import { MultiSelect } from "react-multi-select-component"

import InputCom from "./InputCom"
import SelectCom from "./SelectCom"
import { createBird } from "@/actions/birds"
import { birdSchema } from "../form-schemas/bird-schema"
import { colors, habitats } from "@/lib/utils"
interface MultipleSelect {
  label: string
  value: string
  disabled?: boolean
}

type createBirdFormType = z.infer<typeof birdSchema>

const CreateBirdForm = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [habitat, setHabitat] = useState<MultipleSelect[]>([])
  const [color, setColor] = useState<MultipleSelect[]>([])
  const [birdImage, setBirdImage] = useState<File[] | []>([])
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  let selected_habitat = ""

  habitat.forEach((item) => {
    selected_habitat += item.value + " "
  })

  let selected_color = ""

  color.forEach((item) => {
    selected_color += item.value + " "
  })

  const router = useRouter()
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return

    const selectedFiles = event.target.files

    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles)
      setBirdImage((prevFiles) => [...prevFiles, ...newFiles])
    }
  }

  // Array.from(files).forEach((file) => URL.revokeObjectURL(file))

  const form = useForm<createBirdFormType>({
    resolver: zodResolver(birdSchema),
  })

  async function onSubmit(data: createBirdFormType) {
    const appearance = {
      size: data.size,
      color: selected_color,
    }
    console.log(appearance)
    const formData = new FormData()
    formData.append("commonName", data?.commonName)
    formData.append("scientificName", data?.scientificName)
    formData.append("description", data?.description)

    formData.append("habitat", selected_habitat || "")
    formData.append("appearance", JSON.stringify(appearance))

    // formData.append("appearance", appearance)
    birdImage?.forEach((file) => {
      formData.append("photos", file)
    })

    // console.log(formData)

    try {
      const res = await createBird({ body: formData })
      // console.log(res)
      if (res.status && res.status !== "success") {
        toast.error(res.message || "Error creating new bird")
        return
      }
      // setAdminUser(data)
      router.refresh()
      toast.success(res.message || "Bird created successfully")
      setTimeout(() => {
        setOpen(false)
      }, 1000)
      setOpen(false)
      form.reset()
      setBirdImage([])
      // console.log(data)
    } catch (error) {
      console.log(error)
    } finally {
    }
  }
  return (
    <div>
      <DialogContent className=" max-w-[36rem]">
        <Form {...form}>
          <div>
            <div className="flex gap-x-4  items-center">
              <div className="space-y-3">
                <div className=" flex gap-x-3">
                  <Input
                    id="picture"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                    type="file"
                    multiple
                    name="profileImage"
                    accept=".jpg, .png, .jpeg"
                    className="max-w-[40.5%]   "
                  />
                  <button
                    type="button"
                    onClick={() => {
                      fileInputRef.current?.click()
                    }}
                    className=" text-xs rounded-sm  bg-dashboardBaseColor text-white px-2"
                  >
                    Choose Images
                  </button>
                </div>
              </div>
            </div>
            <hr className=" mt-7 mb-1" />
          </div>
          <div className="pb-3 3xl:py-5 ">
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={`space-y-6 `}
            >
              <div className=" grid grid-cols-2 gap-x-7 pb-3 gap-y-5 items-start">
                <InputCom
                  title="Common Name"
                  placeholder="Common name"
                  control={form.control}
                  errorState={form.formState.errors.commonName?.message}
                  name="commonName"
                />
                <InputCom
                  title="Scientific Name"
                  placeholder="Scientific name"
                  control={form.control}
                  errorState={form.formState.errors.scientificName?.message}
                  name="scientificName"
                />
                <div className="mb-5">
                  <label
                    htmlFor="langauges"
                    className="mb-1 block text-xs text-gray-600 dark:text-gray-500"
                  >
                    Colors
                  </label>
                  <MultiSelect
                    className="  border-none bg-card  text-xs font-medium text-[#6B7280] "
                    options={colors}
                    value={color}
                    // shouldToggleOnHover={true}
                    onChange={setColor}
                    labelledBy="Select"
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="langauges"
                    className="mb-1 block text-xs text-gray-600 dark:text-gray-500"
                  >
                    Habitats
                  </label>
                  <MultiSelect
                    className="  border-none bg-card  text-xs font-medium text-[#6B7280] "
                    options={habitats}
                    value={habitat}
                    // shouldToggleOnHover={true}
                    onChange={setHabitat}
                    labelledBy="Select"
                  />
                </div>
                <InputCom
                  title="Description"
                  type=""
                  placeholder="Description"
                  control={form.control}
                  errorState={form.formState.errors.description?.message}
                  name="description"
                />

                <SelectCom
                  title="Size"
                  placeholder="Please Select"
                  selectContent={["Small", "Medium", "Large"]}
                  control={form.control}
                  errorState={form.formState.errors.size?.message}
                  name="size"
                />
              </div>
              <SaveButton
                disabled={form.formState.isSubmitting}
                type="submit"
                className=" w-full"
              >
                {form.formState.isSubmitting
                  ? "Creating new bird..."
                  : "Create bird"}
              </SaveButton>
            </form>
          </div>
        </Form>
      </DialogContent>
    </div>
  )
}

export default CreateBirdForm
