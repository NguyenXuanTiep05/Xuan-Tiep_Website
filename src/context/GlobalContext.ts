import { createContext } from "react";
interface GlobalContextType {
  isLogged: boolean | undefined;
  setIsLogged: (value: boolean) => void;
  title: string;
  setTitle: (value: string) => void;
}
export const GlobalContext = createContext<GlobalContextType>({
										  isLogged: undefined,
										  setIsLogged: () => {},
										  title: "",
										  setTitle: () => {},
										});