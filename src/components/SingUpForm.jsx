import React from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { storage, auth, db } from '../firebase';
import { useState } from 'react';
import { setDoc, doc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUser } from '../slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import loginOrSingupContext from "../context/checking/loginOrSingupContext";

const SingUpForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fulName, setFullName] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { setLoginOrSingup } = useContext(loginOrSingupContext);


  async function handleForm(e) {
    e.preventDefault();
    if(!fulName || !email || !password || !confirmPassword)
    {
      alert('Please fill all the fields');
    }
    if(password !== confirmPassword)
    {
      alert('Passwords do not match');
    }
    if(password.length<6)
    {
      alert('Password must be at least 6 characters');
    }
    if(password.length>=6)
    {
      try
      {
        // creating a new account
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredentials.user;

        // saving account
        await setDoc(doc(db, "users", user.uid), {
          name: fulName,
          email: user.email,
          uid: user.uid
        });

        dispatch(setUser({
          name: fulName,
          email: user.email,
          uid: user.uid
        }))
        setLoginOrSingup(true);
        navigate('/profile');
      }
      catch(error)
      {
        alert(error.message);
      }
      
    }
  }

  return (
    <div className='signup-form'>
      <h1>Sing Up</h1>

      <form onSubmit={handleForm}>
        <input type="text" placeholder="Full Name" value={fulName} onChange={(e) => setFullName(e.target.value)}/>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
        <button type="submit">Signup Now</button>
      </form>


    </div>
  )
}

export default SingUpForm