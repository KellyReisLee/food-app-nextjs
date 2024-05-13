'use client'
import React, { useRef, useState } from 'react'
import classes from './image-picker.module.css'
import Image from 'next/image'

export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState()
  const imageInput = useRef()

  const handleOnClick = () => {
    imageInput.current.click()
  }

  const handleOnChange = (e) => {
    const file = e.target.files[0]
    if (!file) {
      setPickedImage(null)
      return
    }
    const fileReader = new FileReader()
    fileReader.onload = () => {

      setPickedImage(fileReader.result)
    }
    fileReader.readAsDataURL(file)

  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && <Image src={pickedImage} alt='Image selected by user' fill />}
        </div>
        <input
          className={classes.input}
          name={name}
          type='file'
          id={name}
          accept='image/png, image/jpeg'
          ref={imageInput}
          onChange={handleOnChange}
          required

        />
        {/* default button is submit */}
        <button onClick={handleOnClick} type='button' className={classes.button}>Pick your image</button>
      </div>
    </div>
  )
}
