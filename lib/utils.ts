import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const habitats = [
  { label: "Woodlands", value: "Woodlands" },
  { label: "Backyards", value: "Backyards" },
  { label: "Forests", value: "Forests" },
  { label: "Urban Areas", value: "Urban Areas" },
  { label: "Desert", value: "Desert" },
  { label: "Meadows", value: "Meadows" },
  { label: "Gardens", value: "Gardens" },
]

export const colors = [
  { label: "White", value: "White" },
  { label: "Green", value: "Green" },
  { label: "Red", value: "Red" },
  { label: "Orange", value: "Orange" },
  { label: "Blue", value: "Blue" },
]
