import React from 'react'

//hooks
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


//firebase events
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from '../firebase';
import { setDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

//slices
import { setUser } from '../slices/userSlice';


//react-tostifying
import { toast } from 'react-toastify';


import FileInput from './FileInput';


const SingUpForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fulName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  async function handleForm(e) {
    e.preventDefault();
    setLoading(true);
    if (!fulName || !email || !password || !confirmPassword || profile == null) {
      toast.error('Please fill all the fields');
      setLoading(false);
    }
    else if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      setLoading(false);
    }
    else if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      setLoading(false);
    }
    else {
      try {

        const profileRef = ref(storage, `profile/${auth.currentUser.uid}/${Date.now()}`);
        await uploadBytes(profileRef, profile);

        const profileUrl = await getDownloadURL(profileRef);


        // creating a new account
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredentials.user;

        // saving account
        await setDoc(doc(db, "users", user.uid), {
          name: fulName,
          email: user.email,
          uid: user.uid,
          profile: profileUrl,
        });

        dispatch(setUser({
          name: fulName,
          email: user.email,
          uid: user.uid,
          profile: profileUrl,
        }))
        setLoading(false);
        toast.success("Account created");
        navigate('/profile');
      }
      catch (error) {
        setLoading(false);
        toast.error(error.message);
      }

    }
  }

  return (

    <div className='signup-form'>
      <h1>Sing Up</h1>

      <form onSubmit={handleForm}>
        <input type="text" placeholder="Full Name" value={fulName} onChange={(e) => setFullName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <FileInput accept="image/*" id="profile-image" text="Profile Picture" setState={setProfile} state={profile} />
        <button type="submit">{loading ? "Please Wait..." : "Signup Now"}</button>
      </form>
    </div>


  )
}

export default SingUpForm