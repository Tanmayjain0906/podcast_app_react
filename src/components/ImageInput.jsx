import React from 'react'

function ImageInput({accept, id, text , setState, state}) {

    const handleImage = (e) => {
        setState(e.target.files[0])
    }
  return (
    <>
      <label htmlFor={id} className={state !== null ? "image-active": "image-label"}>{state !== null ? "File Selected" : text}</label>
      <input type='file' accept={accept} id={id} onChange={handleImage} style={{display: "none"}}/>
    </>
  )
}

export default ImageInput;