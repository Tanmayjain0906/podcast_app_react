import React, { useState } from 'react'
import ImageInput from './ImageInput';
import { toast } from 'react-toastify';

function CreatePodcast() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [banner, setBanner] = useState(null);
    const [display, setDisplay] = useState(null);

    const bannerImageHandle = (file) => {
        setBanner(file);
    }

    const displayImageHandle = (file) => {
        setDisplay(file);
    }

    const handleForm = (e) => {
        e.preventDefault();
        if (!title ||!description ||!banner ||!display) {
            toast.error('Please fill all the fields');
        }
        else {
            toast.success("Podcast Created");
        }
    }

  return (
    <div className='create-podcast-form'>
        <h1>Create A Podcast</h1>

        <form onSubmit={handleForm}>
            <input type="text" placeholder="Podcast Title"  value={title} onChange={(e) => setTitle(e.target.value)}/>
            <input type="text" placeholder="Podcast Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
            <ImageInput accept="image/*" id="banner" text="Podcast Banner" func={bannerImageHandle}/>
            <ImageInput accept="image/*" id="display" text="Podcast Display" func={displayImageHandle}/>
            <button type="submit">Create Podcast</button>
        </form>
    </div>
  )
}

export default CreatePodcast