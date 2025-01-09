import { z } from "zod"

export const birdSchema = z.object({
  commonName: z.string({
    required_error: "Common name is required",
  }),
  scientificName: z
    .string({
      required_error: "Scientific  is required",
    })
    .nonempty(),
  description: z
    .string({
      required_error: "Description  is required",
    })
    .nonempty(),

  size: z.string().optional(),

})
