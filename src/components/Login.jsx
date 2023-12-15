import React from 'react'
import { useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { storage, auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUser } from '../slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import loginOrSingupContext from "../context/checking/loginOrSingupContext";

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { setLoginOrSingup } = useContext(loginOrSingupContext);

  const handleForm = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please fill all the fields');
    }
    else {
      try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredentials.user;

        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();
        console.log(userData);

        dispatch(setUser({
          name: userData.name,
          email: userData.email,
          uid: userData.uid
        }))
        setLoginOrSingup(true);
        navigate("/profile")
      }
      catch (error) {
        alert(error.message);
      }
    }
  }

  return (
    <div className='login-form'>
      <h1>Login</h1>
      <form onSubmit={handleForm}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>

    </div>
  )
}

export default Login