import SingUpForm from "../components/SingUpForm"
import Login from "../components/Login"
import { useContext } from "react";
import loginOrSingupContext from "../context/checking/loginOrSingupContext";
import ForgotPassword from "../components/ForgotPassword"



function Singup() {

  const {flag, setFlag, isForgot, setIsForgot } = useContext(loginOrSingupContext);
  

  return (
    <div className="signup container">
      
       {
        (!flag && isForgot === false) && <div>
          <SingUpForm />
          <p>Already have an account? <b onClick={() => setFlag(!flag)}>Login</b></p>
        </div>
       }
       {
        (flag && isForgot === false) && <div>
          <Login />
          <p>Don't have an account? <b onClick={() => setFlag(!flag)}>Sign Up</b></p>
        </div>
       }

       {
        isForgot && <div className="forgot-password-container">
           <ForgotPassword />
           <p>Back to <b onClick={() => setIsForgot(false)}>Login</b></p>
          </div>
       }
    </div>
  )
}

export default Singup