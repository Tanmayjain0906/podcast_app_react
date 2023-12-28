import React from 'react'

//hooks
import { useContext } from "react";


//react-router-dom helper
import { NavLink } from 'react-router-dom'


//context
import loginOrSingupContext from "../context/checking/loginOrSingupContext";
import MenuPopupState from './hamburger/Dashboard';


function Navbar() {
  const { flag } = useContext(loginOrSingupContext);
  return (
    <div className='navbar'>
      <nav>
        {
          flag === false ? <NavLink to="/">Signup</NavLink> : <NavLink to="/">Login</NavLink>
        }
        <NavLink to="/podcast">Podcasts</NavLink>
        <NavLink to="/create-podcast">Create A Podcast</NavLink>
        <NavLink to="/change-password">Change Password</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </nav>

      <div className='dashboard'>
        <MenuPopupState />
      </div>
    </div>

  )
}

export default Navbar