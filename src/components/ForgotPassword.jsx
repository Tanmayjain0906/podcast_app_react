import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { auth } from '../firebase';
import {sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import loginOrSingupContext from '../context/checking/loginOrSingupContext';
import { useContext } from 'react';

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const {setIsForgot} = useContext(loginOrSingupContext);

    const navigate = useNavigate();

    const handleForm = async(e) => {
        e.preventDefault();
        setLoading(true);
        if(!email)
        {
            toast.error("Please enter your email");
            setLoading(false);
        }
        else
        {
           try
           {
            await sendPasswordResetEmail(auth, email);
            toast.success("Link sent to your gmail account");
            setEmail("");
            setLoading(false);
            setIsForgot(false);
            navigate("/");
           }
           catch(error)
           {
            toast.error(error.message);
            setLoading(false);
           }
        }
    }
  return (
    <div className='forgot-password-form'>
        <h1>Forgot Password</h1>
        <form onSubmit={handleForm}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <button type="submit">{loading ? "Please Wait...": "Submit"}</button>
        </form>


    </div>
  )
}

export default ForgotPassword