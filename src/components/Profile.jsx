import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import loginOrSingupContext from "../context/checking/loginOrSingupContext";

function Profile() {

  const data = useSelector((state) => state.user);
  const navigate = useNavigate();

  const { loginOrSingup } = useContext(loginOrSingupContext);

  useEffect(() => {

    if(!loginOrSingup) {
      navigate('/');
    }
  }, [])

  return (
    <div className='profile'>
      {data.user !== null && <h1>{`Welcome ${data.user.name}`}</h1>}
    </div>
  )
}

export default Profile