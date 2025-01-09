"use server"
import { revalidatePath } from "next/cache"

export async function createBird({ body }: { body: FormData }) {
  try {
    const response = await fetch(`${process.env.BASE_URL}/create-bird`, {
      method: "POST",
      credentials: "include",
      headers: {
        // "Content-Type": "multipart/form-data",
      },
      body,
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.log(errorData)
      return {
        message: errorData.message,
        status: errorData.status,
      }
    }

    const data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
  revalidatePath("/")
}

export async function getAllbird() {
  // console.log(process.env.BASE_URL)
  try {
    const response = await fetch(`${process.env.BASE_URL}/getAllBirds`, {
      cache: "no-store",
    })
    // console.log(process.env.BASE_URL)

    if (!response.ok) {
      const errorData = await response.json()
      // console.log(errorData)
      return {
        message: errorData.message,
        status: errorData.status,
      }
    }

    const data = await response.json()
    console.log(data)
    return data
  } catch (err) {
    console.log(err)
  }
}
export async function getASingleBird(id: string) {
  const res = await fetch(`${process.env.BASE_URL}/${id}`)
  try {
    const data = await res.json()
    if (!res.ok) {
      const errorData = await res.json()
      // console.log(errorData)
      return {
        message: errorData.message,
        status: errorData.status,
      }
    }

    return data
  } catch (error) {
    console.log(error)
  }
}

export async function updataBird(bird: any, id: string | undefined) {
  try {
    console.log(bird)
    console.log(id)
    const res = await fetch(`${process.env.BASE_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(bird),
    })

    const data = await res.json()
    if (!res.ok) {
      const errorData = await res.json()
      console.log(errorData)
      return {
        message: errorData.message,
        status: errorData.status,
      }
    }

    return data
  } catch (error) {
    console.log(error)
  }
  revalidatePath("/")
}

export async function deleteBird(birdId: string) {
  try {
    const res = await fetch(`${process.env.BASE_URL}/${birdId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })

    if (!res.ok) {
      const errorData = await res.json()
      return {
        status: errorData.status,
        message: errorData.message || "Something went wrong",
      }
    }
    const data = await res.json()
    console.log(data)

    return data
  } catch (error) {
    console.log(error)
  }
  revalidatePath("/")
}
