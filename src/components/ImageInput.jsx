import React, { useState } from 'react'

function ImageInput({accept, id, text , func}) {

  const [image, setImage] = useState(false)

    const handleImage = (e) => {
        func(e.target.files[0].name)
        setImage(true);
    }
  return (
    <>
      <label htmlFor={id} className={image ? "image-active": "image-label"}>{image ? "File Selected" : text}</label>
      <input type='file' accept={accept} id={id} onChange={handleImage} style={{display: "none"}}/>
    </>
  )
}

export default ImageInput