import React from 'react'


function PodcastCard({title, displayImage }) {
    return (
            <div>
               <img src={displayImage} alt={title} />
                <h2>{title}</h2>
            </div>
                
    )
}

export default PodcastCard