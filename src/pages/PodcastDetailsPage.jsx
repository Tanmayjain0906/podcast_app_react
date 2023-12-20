import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';

function PodcastDetailsPage() {
    const { id } = useParams();
    const [podcastDetails, setPodcastDetails] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchDetails();
        }
    }, [id]);

    const fetchDetails = async () => {

        try {
            const docRef = doc(db, "podcast", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
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
                    {podcastDetails.createdBy==auth.currentUser.uid &&<button onClick={() => navigate(`/podcast/${id}/create-episodes`)}>Create Episode</button>}
                    </div> 
                    <div className='banner-container'>
                        <img src={podcastDetails.bannerUrl} />
                    </div>
                    <p>{podcastDetails.description}</p>
                </div>
            }
        </div>
    )
}

export default PodcastDetailsPage