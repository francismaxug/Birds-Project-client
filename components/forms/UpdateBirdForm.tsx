"use client"
import React, { useEffect } from "react"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { Form } from "@/components/ui/form"

import { useState } from "react"
import { toast } from "sonner"
// import Image from "next/image"
import SaveButton from "../buttons/SaveButton"
import { DialogContent } from "@/components/ui/dialog"
import { MultiSelect } from "react-multi-select-component"

import InputCom from "./InputCom"
import SelectCom from "./SelectCom"
import { updataBird } from "@/actions/birds"
import { birdSchema } from "../form-schemas/bird-schema"
import { colors, habitats } from "@/lib/utils"
import { Bird } from "@/lib/types"
interface MultipleSelect {
  label: string
  value: string
  disabled?: boolean
}

type createBirdFormType = z.infer<typeof birdSchema>

const UpdateBirdForm = ({
  setOpen,
  bird,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  bird: Bird
}) => {
  // console.log(colorss)
  const [habitat, setHabitat] = useState<MultipleSelect[]>(
    bird?.habitat?.map((item) => ({
      label: item,
      value: item,
      disabled: !!item,
    })) || []
  )
  const [color, setColor] = useState<MultipleSelect[]>(
    (bird &&
      bird?.appearance?.color?.map((item) => ({
        label: item,
        value: item,
        disabled: !!item,
      }))) ||
      []
  )

  let selected_habitat = ""

  habitat?.forEach((item) => {
    selected_habitat += item.value + " "
  })

  let selected_color = ""

  color?.forEach((item) => {
    selected_color += item.value + " "
  })

  const router = useRouter()

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

    try {
      const res = await updataBird({ body: formData }, bird?._id)
      // console.log(res)
      if (res.status && res.status !== "success") {
        toast.error(res.message || "Error updating bird")
        return
      }
      // setAdminUser(data)
      router.refresh()
      toast.success(res.message || "Bird updated successfully")
      setTimeout(() => {
        setOpen(false)
      }, 1000)
      // setOpen(false)
      // console.log(data)
    } catch (error) {
      console.log(error)
    } finally {
    }
  }
  useEffect(() => {
    form.reset({
      commonName: bird?.commonName,
      scientificName: bird?.scientificName,
      description: bird?.description,
      size: bird?.appearance?.size,
    })
  }, [bird, form])
  return (
    <div>
      <DialogContent>
        <Form {...form}>
          <div className="pb-3 3xl:py-5 ">
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={`space-y-6 `}
            >
              <div className=" grid grid-cols-2 gap-x-7 pb-3 gap-y-4 items-center">
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
                  ? "Updating bird..."
                  : "Update bird"}
              </SaveButton>
            </form>
          </div>
        </Form>
      </DialogContent>
    </div>
  )
}

export default UpdateBirdForm
