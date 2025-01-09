import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { createPortal } from "react-dom"

const Modal = ({

  children,
  className,
}: {

  children?: React.ReactNode
  className?: string
}) => {
  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-50 bg-gray-900  bg-opacity-50 flex items-center justify-center transition-opacity-transform",
        className
      )}
    >
      {children}
    </div>,
    document.body
  )
}

export default Modal
