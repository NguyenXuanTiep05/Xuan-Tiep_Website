import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export const useGlobal = () => useContext(GlobalContext);