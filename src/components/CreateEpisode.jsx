import React, { useState } from 'react'
import FileInput from './FileInput'
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { auth, storage, db } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';



function CreateEpisode() {
    const [audio, setAudio] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    const handleForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!audio || !title || !description) {
            toast.error('Please fill all the fields');
            setLoading(false);
        }
        else {
            try {
                const audioRef = ref(storage, `podcast-episodes/${auth.currentUser.uid}/${Date.now()}`);
                await uploadBytes(audioRef, audio);

                const audioUrl = await getDownloadURL(audioRef);
                console.log(audioUrl);
                const episodeData = {
                    title: title,
                    description: description,
                    audioUrl: audioUrl,
                };

                await addDoc(collection(db, "podcast", id, "episodes"), episodeData);
                    
                toast.success("Episode Created");
                setLoading(false);
                setTitle("");
                setDescription("");
                setAudio(null);
                navigate(`/podcast/${id}`);
            }
            catch (error) {
                setLoading(false);
                toast.error(error.message);
            }
        }

    }

    return (
        <div className='episode-form'>
            <h1>Create Episode</h1>
            <form onSubmit={handleForm}>
                <input type="text" placeholder="Episode Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" placeholder="Episode Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <FileInput accept="audio/*" id="audio-file" text="Audio File" setState={setAudio} state={audio} />
                <button type="submit">{loading ? "Please Wait..." : "Create Episode"}</button>
            </form>
        </div>
    )
}

export default CreateEpisode