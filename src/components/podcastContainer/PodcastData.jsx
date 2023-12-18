import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { setPodcast } from '../../slices/podcastSlice';
import PodcastCard from './PodcastCard';
import { toast } from 'react-toastify';

function PodcastData() {

  const dispatch = useDispatch();
  const podcasts = useSelector(state => state.podcast.podcast);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
     
    setLoading(true);
    const unsubscribe = onSnapshot(query(collection(db, "podcast")), (querySnapshot) => {
      const podcastData = [];
      querySnapshot.forEach((doc) => {
        podcastData.push({ id: doc.id, ...doc.data() });
      });

      dispatch(setPodcast(podcastData));
      setLoading(false);
    }, (err) => {
      toast.error(err.message);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    }
  }, [dispatch])

  if(loading)
  {
    return <h1 className="container"style={{color: "white"}}>Loading...</h1>
  }

  return (
    <div className='podcast-data-container'>
      <h1>Discover Podcasts</h1>

      <div className='podcast-card-container'>
        {podcasts.map((podcast) => {
          return (
            <div className='podcast-card' key={podcast.id}>
              <PodcastCard id={podcast.id} title={podcast.title} displayImage={podcast.displayUrl} />
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default PodcastData