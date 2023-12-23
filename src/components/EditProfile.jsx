import React, { useState } from 'react'
import FileInput from './FileInput';
import { toast } from 'react-toastify';
import { doc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateEmail, sendEmailVerification } from "firebase/auth";

function EditProfile() {
    const [profile, setProfile] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!name && !email && profile === null) {
            toast.error('Fill atleast one feild to save changes..');
            setLoading(false);
        }
        if (name) {

            try {
                const updateNameRef = doc(db, "users", auth.currentUser.uid);

                // Set the "capital" field of the city 'DC'
                await updateDoc(updateNameRef, {
                    "name": name,
                });
                toast.success("Name Updated");
                if (profile === null && !email) {
                    setLoading(false);
                    navigate("/profile");
                }
            }
            catch (error) {
                toast.error(error.message);
                setLoading(false);
            }

        }
        if (email) {

            // try {
            //     await updateEmail(auth.currentUser, email);


            //     const updateEmailRef = doc(db, "users", auth.currentUser.uid);

            //     // Set the "capital" field of the city 'DC'
            //     await updateDoc(updateEmailRef, {
            //         "email": email,
            //     });
            //     toast.success("Email Updated");
            //     if (profile === null) {
            //         setLoading(false);
            //         navigate("/profile");
            //     }
            // }
            // catch (error) {
            //     toast.error(error.message);
            //     setLoading(false);
            // }

            // sendEmailVerification(email)
            //     .then(() => {
            //         toast.success("Email Verified");

            //         auth.currentUser.updateEmail();
            //     }).catch((error) => {
            //         // An error occurred
            //         toast.error(error.message);
            //         //...
            //         //...
            //     });
        }

        if (profile) {
            try {
                const profileRef = ref(storage, `podcasts/${auth.currentUser.uid}/${Date.now()}`);
                await uploadBytes(profileRef, profile);

                const profileImageUrl = await getDownloadURL(profileRef);

                const updateProfileRef = doc(db, "users", auth.currentUser.uid);

                // Set the "capital" field of the city 'DC'
                await updateDoc(updateProfileRef, {
                    "profile": profileImageUrl,
                });
                toast.success("Profile Picture Updated");
                setLoading(false);
                navigate("/profile");
            }
            catch (error) {
                toast.error(error.message);
                setLoading(false);
            }

        }
    }

    return (
        <div className='edit-profile-form'>
            <h2>Edit Profile (Fill atleast one feild to save changes..)</h2>
            <form onSubmit={handleForm}>
                <input type='text' placeholder='Update Name' value={name} onChange={(e) => setName(e.target.value)} />
                {/* <input type='email' placeholder='Update Email' value={email} onChange={(e) => setEmail(e.target.value)} /> */}
                <FileInput accept="image/*" id="update-profile" text="Update Profile Picture" setState={setProfile} state={profile} />
                <button type='submit'>{loading ? "Please Wait..." : "Save Changes"}</button>
            </form>
        </div>
    )
}

export default EditProfile