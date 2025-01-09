"use client"
import React from "react"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SelectCom = ({
  title,
  control,
  name,
  errorState,
  placeholder = "",
  selectContent,
}: {
  title: string
  control: any
  name: string
  errorState: string | undefined
  placeholder?: string
  selectContent: string[]
}) => {
  return (
    <div>
      <div>
        <label htmlFor={name} className="text-[0.75rem]">
          {title}
        </label>
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger
                    className={`${
                      errorState && "border border-red-500"
                    } font-varela w-full rounded-md border border-[#e0e0e0] dark:border-gray-500 bg-card  px-2 text-xs  text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md placeholder:text-[0.7rem]  text-[0.83rem]  h-[2.2rem] 3xl:h-[2.85rem] 3xl:text-[0.9rem]
                       4xl:h-[3.2rem] 4xl:text-[1rem]
                       `}
                  >
                    <SelectValue
                      placeholder={placeholder}
                      className="placeholder:text-[0.4rem] text-[0.5rem]"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {selectContent.map((item, index) => (
                    <SelectItem key={index} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage className=" 4xl:text-[0.9rem] pt-0 pb-1 -mt-7  mb-0 h-[0.1rem]" />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

export default SelectCom
