import {useAuthState} from "react-firebase-hooks/auth"
import { Outlet, Navigate } from "react-router-dom"
import { auth } from "../firebase"
import { toast } from 'react-toastify';

const PrivateRoutes = () => {
    const [user, loading, error] = useAuthState(auth)
   
    if (loading) 
    {
        return <h1 className="container"style={{color: "white"}}>Loading...</h1>
    }
    else if(!user|| error) {
        toast.error(`${error ? error : "Please Singup or Login"}`);
        return <Navigate to="/" replace/>
    }
    else {
        return <Outlet />
    } 
}

export default PrivateRoutes;