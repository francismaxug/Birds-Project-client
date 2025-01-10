import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const habitats = [
  { label: "Woodlands", value: "Woodlands" },
  { label: "Backyards", value: "Backyards" },
  { label: "Forests", value: "Forests" },
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


export function shortenDescription(str: string, maxWords = 8) {
  const words = str?.split(" ")
  if (words.length > maxWords) {
    return words?.slice(0, maxWords)?.join(" ") + "..."
  }
  console.log(str, words)
  return str
}