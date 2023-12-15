import SingUpForm from "../components/SingUpForm"
import Login from "../components/Login"
import { useContext } from "react";
import loginOrSingupContext from "../context/checking/loginOrSingupContext";

function Singup() {

  const {flag, setFlag} = useContext(loginOrSingupContext);

  return (
    <div className="signup">
       {
        !flag && <div>
          <SingUpForm />
          <h1>Already have an account? <b onClick={() => setFlag(!flag)}>Login</b></h1>
        </div>
       }
       {
        flag && <div>
          <Login />
          <h1>Don't have an account? <b onClick={() => setFlag(!flag)}>Sign Up</b></h1>
        </div>
       }
    </div>
  )
}

export default Singup