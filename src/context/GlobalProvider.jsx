
import { useState, useEffect } from "react";
import { GlobalContext } from "./GlobalContext";

export const GlobalProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);
    useEffect( () => {
        fetch("https://xuan-tiep.com/api/verify", {
            credentials: "include"
        })
        .then(res => {
            if (res.ok) setIsLogged(true);
            else setIsLogged(false);
        })
        .catch(() => setIsLogged(false));
    }, []);
    return (
        <GlobalContext.Provider value={{ isLogged, setIsLogged }}>
            {children}
        </GlobalContext.Provider>
    );
};