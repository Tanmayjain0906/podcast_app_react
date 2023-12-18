import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { setPodcast } from '../../slices/podcastSlice';
import PodcastCard from './PodcastCard';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function PodcastData() {

  const dispatch = useDispatch();
  const podcasts = useSelector(state => state.podcast.podcast);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const filteredPodcasts = podcasts.filter((podcast) => podcast.title.trim().toLowerCase().includes(search.trim().toLowerCase()))

  useEffect(() => {
     
    const unsubscribe = onSnapshot(query(collection(db, "podcast")), (querySnapshot) => {
      const podcastData = [];
      querySnapshot.forEach((doc) => {
        podcastData.push({ id: doc.id, ...doc.data() });
      });

      dispatch(setPodcast(podcastData));
    }, (err) => {
      toast.error(err.message);
    });

    return () => {
      unsubscribe();
    }
  }, [dispatch])

  return (
    <div className='podcast-data-container'>
      
      {podcasts.length > 0 ? <h1>Discover Podcasts</h1> : <h1 className='container'>No Podcasts Available <NavLink to="/create-podcast">Click Here To Create A Podcast</NavLink></h1>}

      {
        podcasts.length > 0 && <input type='text' placeholder='Search podcast by title' value={search} onChange={(e) => setSearch(e.target.value)} />
      }

      {
        filteredPodcasts.length>0 && <div className='podcast-card-container'>
        { filteredPodcasts.map((podcast) => {
          return (
            <div className='podcast-card' key={podcast.id} onClick={() => navigate(`/podcast/${podcast.id}`)}>
              <PodcastCard  title={podcast.title} displayImage={podcast.displayUrl} />
            </div>
          )
        })}
      </div>
      }

      {
        (filteredPodcasts.length === 0 && search) && <h2>Result Not Found!</h2>
      }

    </div>
  )
}

export default PodcastData