
import { useState, useEffect, type ReactNode } from "react";
import { GlobalContext } from "./GlobalContext";

interface GlobalProviderProps {
    children: ReactNode;
}

export const GlobalProvider = ({children} : GlobalProviderProps) => {
    const [isLogged, setIsLogged] = useState<boolean>();
    const [title, setTitle] = useState<string>("Loading...");
    useEffect( () => {
        fetch("https://xuan-tiep.com/api/auth/verify", {
            credentials: "include"
        })
        .then(res => {
            if (res.ok) setIsLogged(true);
            else setIsLogged(false);
        })
        .catch(() => setIsLogged(false));
    }, []);

    return (
        <GlobalContext.Provider value={{ isLogged, setIsLogged, title, setTitle }}>
            {children}
        </GlobalContext.Provider>
    );
};