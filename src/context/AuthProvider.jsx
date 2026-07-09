
import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
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
        <AuthContext.Provider value={{ isLogged, setIsLogged }}>
            {children}
        </AuthContext.Provider>
    );
};