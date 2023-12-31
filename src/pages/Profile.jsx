import React from 'react'

//hooks
import { useSelector, useDispatch } from 'react-redux'
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';


//firebase events
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';


//slices
import { clearUser } from '../slices/userSlice';


//react-tostifying
import { toast } from 'react-toastify';


//context
import loginOrSingupContext from "../context/checking/loginOrSingupContext";



function Profile() {

  const data = useSelector((state) => state.user);
  console.log(data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { setFlag } = useContext(loginOrSingupContext);

  const handleLogOut = async () => {

    try {
      await signOut(auth);
      toast.success("User logged out");
      dispatch(clearUser());
      setFlag(false);
      navigate("/");
    }
    catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <div className='container profile-container'>
      {data.user !== null && <h1>{`Welcome ${data.user.name}`}</h1>}
      <div className='profile-card'>
        {data.user !== null && <div className='profile'>
          {data.user.profile ? <img src={data.user.profile}/> : <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'/>}
          <button onClick={handleLogOut} id='logout-btn'>Logout</button>
        </div>}
      </div>
      {data.user !== null && <button className='edit-btn' onClick={() => navigate("/edit-profile")}>Edit Profile</button>}
    </div>
  )
}

export default Profile;