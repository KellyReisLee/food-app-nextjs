'use server'

import { redirect } from "next/navigation"
import { saveMeal } from "./meals"


function isInvalidData(data) {
  const { title, summary, description, instructions, image, creator, creator_email } = data

  if (!title || !summary || !description || !instructions || !creator || !creator_email.includes('@') || !image || image.size === '') {
    return false
  }
  return true

}
export async function shareMeal(prevState, formData) {

  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    description: formData.get('description'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email')
  }

  if (!isInvalidData(meal)) {
    return {
      message: 'All fields are required!'
    }
  }

  await saveMeal(meal)
  //redirect('/meals')

}