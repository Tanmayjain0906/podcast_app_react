import { useState } from "react";
import loginOrSingupContext from "./loginOrSingupContext";

const LoginOrSingupProvider = (props) => {
    const [flag, setFlag] = useState(false);
   

    return(
        <loginOrSingupContext.Provider value={{flag, setFlag}}>
            {props.children}
        </loginOrSingupContext.Provider>
    )
}

export default LoginOrSingupProvider;