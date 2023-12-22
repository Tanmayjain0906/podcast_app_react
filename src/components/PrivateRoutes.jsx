import {useAuthState} from "react-firebase-hooks/auth"
import { Outlet, Navigate } from "react-router-dom"
import { auth } from "../firebase"
import { toast } from 'react-toastify';

const PrivateRoutes = () => {
    const [user, loading, error] = useAuthState(auth)
   
    if (loading) 
    {
        return <div className="container"><span className="loader"></span></div>
    }
    else if(!user|| error) {
        toast.error("Please Singup or Login");
        return <Navigate to="/" replace/>
    }
    else {
        return <Outlet />
    } 
}

export default PrivateRoutes;