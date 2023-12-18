import React from 'react'
import { NavLink } from 'react-router-dom'

function PodcastCard({ id, title, displayImage }) {
    return (
            <NavLink to={`/podcast/${id}`}>
                <img src={displayImage} alt={title} />
                <h2>{title}</h2>
            </NavLink>
    )
}

export default PodcastCard