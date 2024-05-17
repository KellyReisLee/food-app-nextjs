'use server'

import { redirect } from "next/navigation"
import { saveMeal } from "./meals"
import { revalidatePath } from "next/cache"


function isInvalidData(data) {
  const { title, summary, instructions, image, creator, creator_email } = data

  if (!title || !summary || !instructions || !creator || !creator_email.includes('@') || !image) {
    return false
  }
  return true

}
export async function shareMeal(prevState, formData) {

  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email')
  }

  console.log(meal)

  if (!isInvalidData(meal)) {
    return ({
      message: 'All fields are required.'
    })
  }


  await saveMeal(meal)
  //If I pass 'page revalidate just the specific page
  revalidatePath('/meals', 'page')
  //If I pass 'layout revalidate todas as paginas que estão dentro do layout.
  //revalidatePath('/meals', 'layout')
  redirect('/meals')

}