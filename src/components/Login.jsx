import React from 'react'

//hooks
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';


//firebase events
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';


//slices
import { setUser } from '../slices/userSlice';


//react-tostifying
import { toast } from 'react-toastify';

import loginOrSingupContext from '../context/checking/loginOrSingupContext';



function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const {setIsForgot} = useContext(loginOrSingupContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      toast.error('Please fill all the fields');
      setLoading(false);
    }
    else {
      try {
        //signup process
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        //getting user credentials data
        const user = userCredentials.user;

        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();


        dispatch(setUser({
          name: userData.name,
          email: userData.email,
          uid: userData.uid,
          profile: userData.profile,
        }))
        setLoading(false);
        toast.success("Login successful");
        navigate("/profile")
      }
      catch (error) {
        setLoading(false);
        toast.error(error.message);
      }
    }
  }

  return (
    <div className='login-form'>
      <h1>Login</h1>
      <form onSubmit={handleForm}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">{loading ? "Please Wait..." : "Login"}</button>
        <p onClick={() => setIsForgot(true)}>Forgot Password?</p>
      </form>

    </div>
  )
}

export default Login