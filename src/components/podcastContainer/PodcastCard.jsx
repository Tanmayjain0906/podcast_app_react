import React from 'react'



function PodcastCard({title, displayImage}) {
    return (
            <div >
               <img src={displayImage} alt={title} />
               <div>
               <h2>{title}</h2>
               </div> 
            </div>           
    )
}

export default PodcastCard