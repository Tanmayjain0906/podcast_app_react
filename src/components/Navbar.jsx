import React from 'react'
import { NavLink } from 'react-router-dom'
import { useContext } from "react";
import loginOrSingupContext from "../context/checking/loginOrSingupContext";

function Navbar() {
  const {flag, loginOrSingup} = useContext(loginOrSingupContext);
  return (
    <nav>
        {
           loginOrSingup === false ? flag===false ? <NavLink to="/">Singup</NavLink>: <NavLink to="/">Login</NavLink> : null
        }
        <NavLink to="/podcasts">Podcasts</NavLink>
        <NavLink to="/start">Start A Podcast</NavLink>
        <NavLink to="/profile">Profile</NavLink>
    </nav>
  )
}

export default Navbar