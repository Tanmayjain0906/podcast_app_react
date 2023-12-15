import { useState } from "react";
import loginOrSingupContext from "./loginOrSingupContext";

const LoginOrSingupProvider = (props) => {
    const [flag, setFlag] = useState(false);
    const [loginOrSingup, setLoginOrSingup] = useState(false);

    return(
        <loginOrSingupContext.Provider value={{flag, setFlag, loginOrSingup, setLoginOrSingup}}>
            {props.children}
        </loginOrSingupContext.Provider>
    )
}

export default LoginOrSingupProvider;