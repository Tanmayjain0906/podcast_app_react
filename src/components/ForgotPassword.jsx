import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { auth } from '../firebase';
import {sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const handleForm = async(e) => {
        e.preventDefault();
        if(!email)
        {
            toast.error("Please enter your email");
        }
        else
        {
           try
           {
            await sendPasswordResetEmail(auth, email);
            toast.success("Link sent to your gmail account");
            setEmail("");
            navigate("/");
           }
           catch(error)
           {
            toast.error(error.message);
           }
        }
    }
  return (
    <div className='forgot-password-form'>
        <h1>Forgot Password</h1>
        <form onSubmit={handleForm}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <button type="submit">Submit</button>
        </form>


    </div>
  )
}

export default ForgotPassword