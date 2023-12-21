import React from 'react'

function FileInput({accept, id, text , setState, state}) {

    const handleFile = (e) => {
        setState(e.target.files[0])
        console.log(e.target.files[0])
    }
  return (
    <>
      <label htmlFor={id} className={state !== null ? "file-active": "file-label"}>{state !== null ? "File Selected" : text}</label>
      <input type='file' accept={accept} id={id} onChange={handleFile} style={{display: "none"}}/>
    </>
  )
}

export default FileInput;