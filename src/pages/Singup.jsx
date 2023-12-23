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
          <h1>Already have an account? <b onClick={() => setFlag(!flag)}>Login</b></h1>
        </div>
       }
       {
        (flag && isForgot === false) && <div>
          <Login />
          <h1>Don't have an account? <b onClick={() => setFlag(!flag)}>Sign Up</b></h1>
        </div>
       }

       {
        isForgot && <div className="forgot-password-container">
           <ForgotPassword />
           <h1>Back to <b onClick={() => setIsForgot(false)}>Login</b></h1>
          </div>
       }
    </div>
  )
}

export default Singup