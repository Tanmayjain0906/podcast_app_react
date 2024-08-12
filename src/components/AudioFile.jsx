import React, { useEffect, useRef, useState } from 'react'
import { FaCirclePause } from "react-icons/fa6";
import { FaPlayCircle, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

import { IconContext } from 'react-icons';

function AudioFile({ audioSrc, imageSrc, title }) {
  const audioRef = useRef();
  console.log("hiii");
  
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMute, setIsMute] = useState(false);
  const [prevVolume, setPrevVolume] = useState(volume);

  const handleDuration = (e) => {
    setCurrentTime(e.target.value)
    audioRef.current.currentTime = e.target.value;
  }

  const handleVolume = (e) => {
    setVolume(e.target.value)
    audioRef.current.volume = e.target.value;
    if (audioRef.current.volume == 0) {
      setIsMute(true);
    }
    else {
      setIsMute(false);
    }
  }

  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    }
  }, [])

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  }

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  }

  const handleEnded = () => {
    setCurrentTime(0);
    setIsPlaying(false);
  }

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    }
    else {
      audioRef.current.pause();
    }
  }, [isPlaying])

  useEffect(() => {
    if (isMute) {
      audioRef.current.volume = 0;
      //store previous volume before muting
      setPrevVolume(volume);
      setVolume(0);
    }
    else {
      audioRef.current.volume = prevVolume;
      setVolume(prevVolume);
    }

  }, [isMute])

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}: ${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
     // if you are playing some audio then suddenly change episode in that case next episode will automatic play
      if(isPlaying)
      {
        audioRef.current.play();
      }
      else
      {
        audioRef.current.pause();
      }
  }, [audioSrc])


  return (
    <div className='audio-container'>
      <div className='audio-flex'>
        <div className='audio-left'>
          <img src={imageSrc} />
          <h3>{title}</h3>
        </div>

        <audio ref={audioRef} src={audioSrc}></audio>
        <div className='duration-container'>
          <IconContext.Provider
            value={{ size: '25px' }}
          >
            <div onClick={() => setIsPlaying(!isPlaying)} className='icons'>
              {
                isPlaying ? <FaCirclePause /> : <FaPlayCircle />
              }
            </div>
          </IconContext.Provider>

          <p className='timer'>{formatTime(currentTime)}</p>
          <input type='range' value={currentTime} max={duration} step={0.01} onChange={handleDuration} className='duration-range' />
          <p className='timer'>-{formatTime(duration-currentTime)}</p>
        </div>

        <div className='volume-container'>
          <IconContext.Provider
            value={{ size: '25px' }}
          >
            <div onClick={() => setIsMute(!isMute)} className='icons'>
              {
                isMute ? <FaVolumeMute /> : <FaVolumeUp />
              }
            </div>
          </IconContext.Provider>

          <input type='range' value={volume} max={1} min={0} step={0.01} onChange={handleVolume} className='volume-range' />
        </div>
      </div>


    </div>
  )
}

export default AudioFile