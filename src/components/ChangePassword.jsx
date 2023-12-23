import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { auth } from '../firebase';
import {updatePassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    if(!password || !confirmPassword)
    {
        toast.error('Please fill all the fields');
        setLoading(false);
    }
    else if(password!== confirmPassword)
    {
      toast.error('Passwords do not match');
      setLoading(false);
    }
    else if(password.length<6)
    {
      toast.error('Password must be at least 6 characters');
      setLoading(false);
    }
    else
    {
      const user = auth.currentUser;
      const newPassword = password;

      try
      {
        await updatePassword(user, newPassword);
        toast.success("Password Changed");
        navigate("/profile");
      }
      catch(error)
      {
        setLoading(false);
        toast.error(error.message);
      }
    }

  };
  return (
    <div className='change-password-form'>
        <form onSubmit={handleForm}>
          <h1>Change Password</h1>
            <input type="password" placeholder='New Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            <input type='password' placeholder='Confirm New Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            <button type='submit'>{loading ? "Please Wait...":"Change Password"}</button>
        </form>
    </div>
  )
}

export default ChangePassword