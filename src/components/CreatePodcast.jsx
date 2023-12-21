import React, { useState } from 'react'
import FileInput from './FileInput';
import { toast } from 'react-toastify';
import { auth, storage, db } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';

function CreatePodcast() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [banner, setBanner] = useState(null);
    const [display, setDisplay] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    const handleForm = async (e) => {
        e.preventDefault();
        if (!title || !description || !banner || !display) {
            toast.error('Please fill all the fields');
        }
        else {
            setLoading(true);
            try {
                const bannerRef = ref(storage, `podcasts/${auth.currentUser.uid}/${Date.now()}`);
                await uploadBytes(bannerRef, banner);

                const bannerImageUrl = await getDownloadURL(bannerRef);


                const displayRef = ref(storage, `podcasts/${auth.currentUser.uid}/${Date.now()}`);
                await uploadBytes(displayRef, display);

                const displayImageUrl = await getDownloadURL(displayRef);

                const podcastData = {
                    title: title,
                    description: description,
                    bannerUrl: bannerImageUrl,
                    displayUrl: displayImageUrl,
                    createdBy: auth.currentUser.uid
                }

                const docRef = await addDoc(collection(db, "podcast"), podcastData);
                toast.success("Podcast Created");
                setLoading(false);
                setTitle("");
                setDescription("");
                setBanner(null);
                setDisplay(null);
                navigate('/podcast');
            }
            catch (error) {
                setLoading(false);
                toast.error(error.message);
            }
        }
    }

    return (
        <div className='create-podcast-form'>
            <h1>Create A Podcast</h1>

            <form onSubmit={handleForm}>
                <input type="text" placeholder="Podcast Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" placeholder="Podcast Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <FileInput accept="image/*" id="banner" text="Podcast Banner" setState={setBanner} state={banner} />
                <FileInput accept="image/*" id="display" text="Podcast Display" setState={setDisplay} state={display} />
                <button type="submit">{loading? "Please Wait..." : "Create Podcast"}</button>
            </form>
        </div>
    )
}

export default CreatePodcast