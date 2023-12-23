import { useState } from "react";
import loginOrSingupContext from "./loginOrSingupContext";

const LoginOrSingupProvider = (props) => {
    const [flag, setFlag] = useState(false);
    const [isForgot, setIsForgot] = useState(false);

    return(
        <loginOrSingupContext.Provider value={{flag, setFlag, isForgot, setIsForgot}}>
            {props.children}
        </loginOrSingupContext.Provider>
    )
}

export default LoginOrSingupProvider;