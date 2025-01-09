import { cn } from "@/lib/utils"
import React from "react"

const SaveButton = ({
  className,
  children,
  onClick,
  type,
  disabled,
}: {
  className?: string
  children?: React.ReactNode
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  disabled?: boolean
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={cn(
        " text-[0.8rem] text-white rounded-[4px] hover:bg-[#7b75f2] bg-dashboardBaseColor py-[0.4rem] px-3",
        className
      )}
    >
     {children}
    </button>
  )
}

export default SaveButton
