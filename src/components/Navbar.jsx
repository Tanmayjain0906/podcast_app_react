import React from 'react'

//hooks
import { useContext } from "react";


//react-router-dom helper
import { NavLink } from 'react-router-dom'


//context
import loginOrSingupContext from "../context/checking/loginOrSingupContext";

function Navbar() {
  const {flag} = useContext(loginOrSingupContext);
  return (
    <nav>
        {
           flag===false ? <NavLink to="/">Singup</NavLink>: <NavLink to="/">Login</NavLink>
        }
        <NavLink to="/podcast">Podcasts</NavLink>
        <NavLink to="/create-podcast">Create A Podcast</NavLink>
        <NavLink to="/profile">Profile</NavLink>
    </nav>
  )
}

export default Navbar