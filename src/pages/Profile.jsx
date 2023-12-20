import React from 'react'

//hooks
import { useSelector, useDispatch } from 'react-redux'
import { useContext } from "react";


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
  const dispatch = useDispatch();

  const { setFlag } = useContext(loginOrSingupContext);

  const handleLogOut = async () => {

    try {
      await signOut(auth);
      toast.success("User logged out");
      dispatch(clearUser());
      setFlag(false);
    }
    catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <div className='container'>
      {data.user !== null && <div className='profile'>
        <h1>{`Welcome ${data.user.name}`}</h1>
        <button onClick={handleLogOut} id='logout-btn'>Logout</button>
      </div>}
    </div>
  )
}

export default Profile