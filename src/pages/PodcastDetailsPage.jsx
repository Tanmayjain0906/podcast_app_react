import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { collection, query, onSnapshot } from "firebase/firestore";
import AudioFile from '../components/AudioFile';
import { FaStop } from "react-icons/fa";

function PodcastDetailsPage() {
    const { id } = useParams();
    const [podcastDetails, setPodcastDetails] = useState({});
    const [episodeDetails, setEpisodeDetails] = useState([]);
    const [audioFile, setAudioFile] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchPodcastDetails();
        }
    }, [id]);

    useEffect(() => {

        const unsubscribe = onSnapshot(query(collection(db, "podcast", id, "episodes")), (querySnapshot) => {
            const episodeData = [];
            querySnapshot.forEach((doc) => {
                episodeData.push({ id: doc.id, ...doc.data() });
            });

            console.log(episodeData);
            setEpisodeDetails(episodeData);
        }, (err) => {
            toast.error(err.message);
        });

        return () => {
            unsubscribe();
        }
    }, [id])


    const fetchPodcastDetails = async () => {

        try {
            const docRef = doc(db, "podcast", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log(docSnap.data());
                setPodcastDetails({ id, ...docSnap.data() });
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
                toast.error("No such document!");
                navigate("/podcast");
            }

        }
        catch (err) {
            toast.error(err.message);
        }
    }



    return (
        <div>

            {
                podcastDetails.id && <div className='podcast-details'>
                    <div className='podcast-details-upper'>
                        <h1>{podcastDetails.title}</h1>
                        {podcastDetails.createdBy == auth.currentUser.uid && <button onClick={() => navigate(`/podcast/${id}/create-episodes`)}>Create Episode</button>}
                    </div>
                    <div className='banner-container'>
                        <img src={podcastDetails.bannerUrl} />
                    </div>
                    <p>{podcastDetails.description}</p>
                </div>
            }
            {
                episodeDetails.length > 0 ? <div className='episodes-container'>
                    <h2>Episodes</h2>
                    {
                        episodeDetails.map((episode, index) => (
                            <div key={index} className='episode'>
                                <div>
                                    <h3>{`${index + 1}. ${episode.title}`}</h3>
                                    <p>{episode.description}</p>
                                    {
                                        audioFile.title == episode.title ? <button onClick={() => setAudioFile({})}><FaStop /></button> : <button onClick={() => setAudioFile({ file: episode.audioUrl, title: episode.title })}>Play</button>
                                    }
                                </div>
                                <div>
                                    <button className='download-button'><a href={episode.audioUrl} target="blank">Download file</a></button>
                                </div>

                            </div>
                        )
                        )
                    }
                </div> : <div className='episodes-container'><h2>No Episodes Available</h2></div>
            }

            {
                audioFile.file && <AudioFile audioSrc={audioFile.file} imageSrc={podcastDetails.displayUrl} title={audioFile.title} />
            }
        </div>
    )
}

export default PodcastDetailsPage