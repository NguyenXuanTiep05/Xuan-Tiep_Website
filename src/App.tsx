

import { useEffect, type ReactNode } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


import LoginView from "./view/LoginView";
import DashboardView from "./view/DashboardView";
import FinanceView from './view/FinanceView';

import { useGlobal } from "./hooks/UseGlobal.ts";

import darkIcon from '/dashboardBlack.png'
import lightIcon from '/dashboardWhite.png'


interface RouteProps{
  isLogged: boolean;
  children: ReactNode;
}



function ProtectedRoute({ isLogged, children } : RouteProps) {
  return isLogged ? children : <Navigate to="/login" replace />;
}

function PublicOnlyRoute({ isLogged, children } : RouteProps) {
  return isLogged ? <Navigate to="/" replace /> : children;
}


const useFavicon = () => {
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    
    const setFavicon = (isDark : boolean) => {
      document.querySelector<HTMLLinkElement>('#favicon')!.href = isDark
        ? lightIcon
        : darkIcon
    }

    const handleChange = (e: MediaQueryListEvent) => setFavicon(e.matches)
    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [])
}

const useTitle = (title: string) => {
  const  titleEl = document.querySelector<HTMLElement>("#title")
  titleEl!.innerHTML = title;
}

function App() {
  const { isLogged , title} = useGlobal();

  useFavicon()
  useTitle(title)

  if (isLogged === undefined) return null;

  return (
    <>
      <BrowserRouter>
        <Routes>


          <Route path='/login' element={
            <PublicOnlyRoute isLogged={isLogged}>
              <LoginView/>
            </PublicOnlyRoute>
          }></Route>

          <Route path='/finance' element={
            <ProtectedRoute isLogged={isLogged}>
              <FinanceView/>
            </ProtectedRoute>
          } ></Route>


          <Route path='/' element={
            <ProtectedRoute isLogged={isLogged}>
              <DashboardView/>
            </ProtectedRoute>
          }></Route>
          
        </Routes>
      </BrowserRouter>
    </>
  );
}


export default App
