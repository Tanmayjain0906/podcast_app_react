import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import loginOrSingupContext from "../context/checking/loginOrSingupContext";
import { clearUser } from '../slices/userSlice';

function Profile() {

  const data = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loginOrSingup, setLoginOrSingup, setFlag } = useContext(loginOrSingupContext);

  useEffect(() => {

    if (!loginOrSingup) {
      navigate('/');
    }
  }, [])

  const handleLogOut = () => {
    dispatch(clearUser());
    setLoginOrSingup(false);
    setFlag(false);
    navigate('/');
  }

  return (
    <div >
      {data.user !== null && <div className='profile'>
        <h1>{`Welcome ${data.user.name}`}</h1>
        <button onClick={handleLogOut} id='logout-btn'>Logout</button>
      </div>}
    </div>
  )
}

export default Profile